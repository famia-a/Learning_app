const axios = require("axios");

const Learning = require("../models/learning.model");
const Quiz = require("../models/quiz.model");

// Generate a quiz from a saved learning transcript
async function generateQuiz(req, res) {
    try {
        const userId = req.user?.id || req.user?._id;
        const { learningId, numberOfQuestions = 10 } = req.body;

        // 1. Check authentication
        if (!userId) {
            return res.status(401).json({
                message: "User is not authenticated"
            });
        }

        // 2. Validate learning ID
        if (!learningId) {
            return res.status(400).json({
                message: "Learning ID is required"
            });
        }

        // 3. Validate question count
        const questionCount = Number(numberOfQuestions);

        if (
            !Number.isInteger(questionCount) ||
            questionCount < 1 ||
            questionCount > 20
        ) {
            return res.status(400).json({
                message: "numberOfQuestions must be between 1 and 20"
            });
        }

        // 4. Find the learning document belonging to this user
        const learning = await Learning.findOne({
            _id: learningId,
            user: userId
        });

        if (!learning) {
            return res.status(404).json({
                message: "Learning material not found"
            });
        }

        if (!learning.transcript) {
            return res.status(400).json({
                message: "This learning material has no transcript"
            });
        }

        // 5. Check Groq API key
        const groqApiKey = process.env.GROQ_API_KEY;

        if (!groqApiKey) {
            return res.status(500).json({
                message: "GROQ_API_KEY is missing from environment variables"
            });
        }

        // 6. Generate quiz questions using Groq
        let generatedQuiz;

        try {
            const aiResponse = await axios.post(
                "https://api.groq.com/openai/v1/chat/completions",
                {
                    model: "openai/gpt-oss-120b",

                    messages: [
                        {
                            role: "system",
                            content: `
You are an expert educational quiz creator.

Create multiple-choice questions using ONLY the provided transcript.

Return ONLY valid JSON. Do not include markdown code fences or extra text.

Use this exact JSON structure:
{
  "title": "Short quiz title",
  "questions": [
    {
      "questionText": "Question text",
      "options": [
        "Option A",
        "Option B",
        "Option C",
        "Option D"
      ],
      "correctOption": 0,
      "explanation": "Short explanation of the correct answer",
      "marks": 1
    }
  ]
}

Rules:
- Create exactly the requested number of questions.
- Each question must have exactly 4 options.
- correctOption must be an integer from 0 to 3.
- Only one option should be correct.
- Questions must be based on the transcript.
- Do not invent facts.
- Avoid duplicate questions.
- Use clear, beginner-friendly language.
- Keep explanations short and accurate.
- Use the same language as the transcript.
`
                        },
                        {
                            role: "user",
                            content: `
Create ${questionCount} multiple-choice questions from this transcript:

${learning.transcript}
`
                        }
                    ],

                    temperature: 0.3,
                    max_completion_tokens: 5000
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${groqApiKey}`
                    },
                    timeout: 120000
                }
            );

            const aiContent =
                aiResponse.data.choices?.[0]?.message?.content;

            if (!aiContent) {
                throw new Error("Groq returned an empty response");
            }

            // Remove possible markdown code fences
            const cleanedContent = aiContent
                .replace(/^```json\s*/i, "")
                .replace(/^```\s*/i, "")
                .replace(/\s*```$/i, "")
                .trim();

            generatedQuiz = JSON.parse(cleanedContent);

        } catch (aiError) {
            console.error(
                "Groq quiz generation error:",
                aiError.response?.data || aiError.message
            );

            return res.status(502).json({
                message: "Failed to generate quiz",
                error:
                    aiError.response?.data?.error?.message ||
                    aiError.message
            });
        }

        // 7. Validate the generated quiz
        if (
            !generatedQuiz ||
            !Array.isArray(generatedQuiz.questions) ||
            generatedQuiz.questions.length === 0
        ) {
            return res.status(502).json({
                message: "Groq returned an invalid quiz structure"
            });
        }

        const validQuestions = generatedQuiz.questions.every((question) => {
            return (
                typeof question.questionText === "string" &&
                Array.isArray(question.options) &&
                question.options.length === 4 &&
                Number.isInteger(question.correctOption) &&
                question.correctOption >= 0 &&
                question.correctOption < question.options.length
            );
        });

        if (!validQuestions) {
            return res.status(502).json({
                message: "Groq generated invalid questions or answer options"
            });
        }

        // 8. Calculate total marks
        const totalMarks = generatedQuiz.questions.reduce(
            (total, question) => total + Number(question.marks || 1),
            0
        );

        // 9. Save quiz in MongoDB
        const newQuiz = await Quiz.create({
            user: userId,
            learning: learning._id,
            title: generatedQuiz.title || "Learning Quiz",
            questions: generatedQuiz.questions.map((question) => ({
                questionText: question.questionText,
                options: question.options,
                correctOption: question.correctOption,
                explanation: question.explanation || "",
                marks: Number(question.marks || 1)
            })),
            totalMarks
        });

        // 10. Remove answers before sending quiz to frontend
        const safeQuestions = newQuiz.questions.map((question) => ({
            _id: question._id,
            questionText: question.questionText,
            options: question.options,
            marks: question.marks
        }));

        return res.status(201).json({
            message: "Quiz generated successfully",
            data: {
                _id: newQuiz._id,
                learning: newQuiz.learning,
                title: newQuiz.title,
                questions: safeQuestions,
                totalQuestions: newQuiz.questions.length,
                totalMarks: newQuiz.totalMarks,
                createdAt: newQuiz.createdAt
            }
        });

    } catch (error) {
        console.error("Generate quiz controller error:", error);

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}


// Get one quiz without exposing correct answers
async function getQuizById(req, res) {
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

        const safeQuestions = quiz.questions.map((question) => ({
            _id: question._id,
            questionText: question.questionText,
            options: question.options,
            marks: question.marks
        }));

        return res.status(200).json({
            message: "Quiz fetched successfully",
            data: {
                _id: quiz._id,
                learning: quiz.learning,
                title: quiz.title,
                questions: safeQuestions,
                totalQuestions: quiz.questions.length,
                totalMarks: quiz.totalMarks,
                createdAt: quiz.createdAt
            }
        });

    } catch (error) {
        console.error("Get quiz controller error:", error);

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}


// Get quizzes belonging to a learning document
async function getQuizzesByLearning(req, res) {
    try {
        const userId = req.user?.id || req.user?._id;
        const { learningId } = req.params;

        if (!userId) {
            return res.status(401).json({
                message: "User is not authenticated"
            });
        }

        const learning = await Learning.findOne({
            _id: learningId,
            user: userId
        });

        if (!learning) {
            return res.status(404).json({
                message: "Learning material not found"
            });
        }

        const quizzes = await Quiz.find({
            learning: learningId,
            user: userId
        })
            .select("-questions.correctOption -questions.explanation")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Quizzes fetched successfully",
            count: quizzes.length,
            data: quizzes
        });

    } catch (error) {
        console.error("Get quizzes controller error:", error);

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}


module.exports = {
    generateQuiz,
    getQuizById,
    getQuizzesByLearning
};