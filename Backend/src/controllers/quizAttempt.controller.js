const Quiz = require("../models/quiz.model");
const QuizAttempt = require("../models/quizAttempt.model");
const Learning = require("../models/learning.model");


// Submit quiz answers and calculate the result
async function submitQuizAttempt(req, res) {
    try {
        const userId = req.user?.id || req.user?._id;
        const { quizId } = req.params;
        const { answers } = req.body;

        // 1. Check authentication
        if (!userId) {
            return res.status(401).json({
                message: "User is not authenticated"
            });
        }

        // 2. Validate answers
        if (!Array.isArray(answers)) {
            return res.status(400).json({
                message: "Answers must be provided as an array"
            });
        }

        // 3. Find quiz belonging to the logged-in user
        const quiz = await Quiz.findOne({
            _id: quizId,
            user: userId
        });

        if (!quiz) {
            return res.status(404).json({
                message: "Quiz not found"
            });
        }

        // 4. Create a map of submitted answers
        const submittedAnswers = new Map();

        for (const answer of answers) {
            const { questionId, selectedOption } = answer;

            if (!questionId) {
                return res.status(400).json({
                    message: "Each answer must include questionId"
                });
            }

            if (submittedAnswers.has(String(questionId))) {
                return res.status(400).json({
                    message: "Duplicate answers for the same question are not allowed"
                });
            }

            // null means unanswered
            if (
                selectedOption !== null &&
                (
                    !Number.isInteger(selectedOption) ||
                    selectedOption < 0
                )
            ) {
                return res.status(400).json({
                    message: "selectedOption must be a valid option index or null"
                });
            }

            submittedAnswers.set(
                String(questionId),
                selectedOption
            );
        }

        // 5. Check that submitted question IDs belong to this quiz
        const quizQuestionIds = new Set(
            quiz.questions.map((question) => String(question._id))
        );

        for (const questionId of submittedAnswers.keys()) {
            if (!quizQuestionIds.has(questionId)) {
                return res.status(400).json({
                    message: "An answer contains a question that does not belong to this quiz"
                });
            }
        }

        // 6. Check each answer and calculate the result
        let correctCount = 0;
        let incorrectCount = 0;
        let unansweredCount = 0;
        let score = 0;

        const reviewedAnswers = quiz.questions.map((question) => {
            const questionId = String(question._id);

            const selectedOption = submittedAnswers.has(questionId)
                ? submittedAnswers.get(questionId)
                : null;

            const isUnanswered = selectedOption === null;

            const isCorrect =
                !isUnanswered &&
                selectedOption === question.correctOption;

            let marksAwarded = 0;

            if (isUnanswered) {
                unansweredCount++;
            } else if (isCorrect) {
                correctCount++;
                marksAwarded = question.marks;
            } else {
                incorrectCount++;
            }

            score += marksAwarded;

            return {
                question: question._id,
                questionText: question.questionText,
                options: question.options,
                selectedOption,
                correctOption: question.correctOption,
                isCorrect,
                explanation: question.explanation,
                marksAwarded,
                marksPossible: question.marks
            };
        });

        // 7. Calculate percentage
        const totalMarks = quiz.totalMarks;

        const percentage =
            totalMarks > 0
                ? Number(((score / totalMarks) * 100).toFixed(2))
                : 0;

        // 8. Save attempt in MongoDB
        const newAttempt = await QuizAttempt.create({
            user: userId,
            learning: quiz.learning,
            quiz: quiz._id,
            answers: reviewedAnswers,
            totalQuestions: quiz.questions.length,
            correctCount,
            incorrectCount,
            unansweredCount,
            score,
            totalMarks,
            percentage,
            status: "completed",
            completedAt: new Date()
        });

        // 9. Return result and answer review
        return res.status(201).json({
            message: "Quiz submitted successfully",

            result: {
                attemptId: newAttempt._id,
                quizId: quiz._id,
                title: quiz.title,
                totalQuestions: newAttempt.totalQuestions,
                correctCount: newAttempt.correctCount,
                incorrectCount: newAttempt.incorrectCount,
                unansweredCount: newAttempt.unansweredCount,
                score: newAttempt.score,
                totalMarks: newAttempt.totalMarks,
                percentage: newAttempt.percentage,
                completedAt: newAttempt.completedAt
            },

            review: newAttempt.answers
        });

    } catch (error) {
        console.error("Submit quiz attempt controller error:", error);

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}


// Get all quiz attempts for the logged-in user
async function getMyQuizAttempts(req, res) {
    try {
        const userId = req.user?.id || req.user?._id;

        if (!userId) {
            return res.status(401).json({
                message: "User is not authenticated"
            });
        }

        const attempts = await QuizAttempt.find({
            user: userId
        })
            .populate("quiz", "title")
            .populate("learning", "videoUrl")
            .select(
                "quiz learning totalQuestions correctCount incorrectCount unansweredCount score totalMarks percentage status completedAt createdAt"
            )
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Quiz attempts fetched successfully",
            count: attempts.length,
            data: attempts
        });

    } catch (error) {
        console.error("Get quiz attempts controller error:", error);

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}


// Get one quiz attempt with its answer review
async function getQuizAttemptById(req, res) {
    try {
        const userId = req.user?.id || req.user?._id;
        const { attemptId } = req.params;

        if (!userId) {
            return res.status(401).json({
                message: "User is not authenticated"
            });
        }

        const attempt = await QuizAttempt.findOne({
            _id: attemptId,
            user: userId
        })
            .populate("quiz", "title")
            .populate("learning", "videoUrl");

        if (!attempt) {
            return res.status(404).json({
                message: "Quiz attempt not found"
            });
        }

        return res.status(200).json({
            message: "Quiz attempt fetched successfully",
            data: attempt
        });

    } catch (error) {
        console.error("Get quiz attempt controller error:", error);

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}


// Get attempts for a particular quiz
async function getAttemptsByQuiz(req, res) {
    try {
        const userId = req.user?.id || req.user?._id;
        const { quizId } = req.params;

        if (!userId) {
            return res.status(401).json({
                message: "User is not authenticated"
            });
        }

        const quiz = await Quiz.findOne({
            _id: quizId,
            user: userId
        });

        if (!quiz) {
            return res.status(404).json({
                message: "Quiz not found"
            });
        }

        const attempts = await QuizAttempt.find({
            quiz: quizId,
            user: userId
        })
            .select(
                "totalQuestions correctCount incorrectCount unansweredCount score totalMarks percentage completedAt createdAt"
            )
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Quiz attempts fetched successfully",
            count: attempts.length,
            data: attempts
        });

    } catch (error) {
        console.error("Get attempts by quiz controller error:", error);

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}


module.exports = {
    submitQuizAttempt,
    getMyQuizAttempts,
    getQuizAttemptById,
    getAttemptsByQuiz
};