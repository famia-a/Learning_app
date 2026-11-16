
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    CheckCircle2,
    XCircle,
    MinusCircle,
    Trophy,
    Loader2,
    RotateCcw,
    BookOpen
} from "lucide-react";
import api from "../services/api";

function QuizResult() {
    const { attemptId } = useParams();
    const navigate = useNavigate();

    const [attempt, setAttempt] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchResult = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get(
                    `/quiz-attempt/${attemptId}`
                );

                console.log("QUIZ RESULT DETAILS:", response.data);

                setAttempt(response.data?.data);

            } catch (err) {
                console.error("Fetch Result Error:", err);

                setError(
                    err.response?.data?.message ||
                    "Unable to load quiz result."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchResult();
    }, [attemptId]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="animate-spin text-[#c65d83]" size={35} />
            </div>
        );
    }

    if (error || !attempt) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center px-5">
                <p className="text-red-500">
                    {error || "Result not found."}
                </p>

                <button
                    onClick={() => navigate("/dashboard")}
                    className="mt-5 rounded-xl bg-[#292d49] px-5 py-3 text-white"
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }

    const answers = attempt.answers || [];

    const percentage = attempt.percentage || 0;

    const getPerformanceMessage = () => {
        if (percentage >= 80) return "Excellent Work!";
        if (percentage >= 60) return "Good Job!";
        if (percentage >= 40) return "Keep Practicing!";
        return "Don't Give Up!";
    };

    return (
        <div className="min-h-screen bg-[#f8f8fc] px-4 py-8 sm:px-6">

            <div className="mx-auto max-w-4xl">

                {/* Back Button */}
                <button
                    onClick={() => navigate("/dashboard")}
                    className="mb-7 flex items-center gap-2 text-sm text-gray-500 hover:text-[#c65d83]"
                >
                    <ArrowLeft size={18} />
                    Back to Dashboard
                </button>

                {/* Result Header */}
                <div className="mb-7 rounded-3xl bg-[#292d49] p-7 text-center text-white sm:p-10">

                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-yellow-300">
                        <Trophy size={34} />
                    </div>

                    <p className="mb-2 text-sm font-medium text-pink-200">
                        Quiz Completed
                    </p>

                    <h1 className="text-3xl font-bold sm:text-4xl">
                        {getPerformanceMessage()}
                    </h1>

                    <p className="mt-3 text-sm text-gray-300">
                        {attempt.quiz?.title || "Your Learning Quiz"}
                    </p>

                    <div className="mt-8">

                        <p className="text-6xl font-bold">
                            {percentage}%
                        </p>

                        <p className="mt-2 text-sm text-gray-300">
                            Your Final Score
                        </p>

                        <p className="mt-4 text-lg font-semibold text-pink-200">
                            {attempt.score} / {attempt.totalMarks} Marks
                        </p>

                    </div>

                </div>

                {/* Statistics */}
                <div className="mb-7 grid grid-cols-2 gap-4 sm:grid-cols-4">

                    <div className="rounded-2xl border border-gray-100 bg-white p-5">
                        <CheckCircle2 className="mb-3 text-green-500" size={25} />
                        <p className="text-2xl font-bold text-[#292d49]">
                            {attempt.correctCount}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                            Correct
                        </p>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-white p-5">
                        <XCircle className="mb-3 text-red-500" size={25} />
                        <p className="text-2xl font-bold text-[#292d49]">
                            {attempt.incorrectCount}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                            Incorrect
                        </p>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-white p-5">
                        <MinusCircle className="mb-3 text-orange-500" size={25} />
                        <p className="text-2xl font-bold text-[#292d49]">
                            {attempt.unansweredCount}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                            Unanswered
                        </p>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-white p-5">
                        <BookOpen className="mb-3 text-[#c65d83]" size={25} />
                        <p className="text-2xl font-bold text-[#292d49]">
                            {attempt.totalQuestions}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                            Total Questions
                        </p>
                    </div>

                </div>

                {/* Answer Review */}
                <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

                    <div className="mb-7">
                        <h2 className="text-xl font-bold text-[#292d49]">
                            Answer Review
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Review your answers and learn from your mistakes.
                        </p>
                    </div>

                    <div className="space-y-7">

                        {answers.map((answer, index) => {

                            const isUnanswered =
                                answer.selectedOption === null ||
                                answer.selectedOption === undefined;

                            return (
                                <div
                                    key={answer._id || answer.question || index}
                                    className="rounded-2xl border border-gray-100 p-5 sm:p-6"
                                >

                                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">

                                        <span className="text-sm font-bold text-[#292d49]">
                                            Question {index + 1}
                                        </span>

                                        {answer.isCorrect ? (
                                            <span className="flex items-center gap-1 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                                                <CheckCircle2 size={15} />
                                                Correct
                                            </span>
                                        ) : isUnanswered ? (
                                            <span className="flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-700">
                                                <MinusCircle size={15} />
                                                Unanswered
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700">
                                                <XCircle size={15} />
                                                Incorrect
                                            </span>
                                        )}

                                    </div>

                                    <h3 className="mb-5 font-semibold leading-7 text-[#20243a]">
                                        {answer.questionText}
                                    </h3>

                                    <div className="space-y-3">

                                        {(answer.options || []).map((option, optionIndex) => {

                                            const isCorrectOption =
                                                optionIndex === answer.correctOption;

                                            const isSelectedOption =
                                                optionIndex === answer.selectedOption;

                                            let optionStyle =
                                                "border-gray-200 bg-white text-gray-600";

                                            if (isCorrectOption) {
                                                optionStyle =
                                                    "border-green-300 bg-green-50 text-green-800";
                                            } else if (isSelectedOption) {
                                                optionStyle =
                                                    "border-red-300 bg-red-50 text-red-700";
                                            }

                                            return (
                                                <div
                                                    key={optionIndex}
                                                    className={`flex items-center gap-3 rounded-xl border p-3 text-sm ${optionStyle}`}
                                                >

                                                    <span className="font-bold">
                                                        {String.fromCharCode(65 + optionIndex)}.
                                                    </span>

                                                    <span className="flex-1">
                                                        {option}
                                                    </span>

                                                    {isCorrectOption && (
                                                        <CheckCircle2
                                                            size={18}
                                                            className="shrink-0 text-green-600"
                                                        />
                                                    )}

                                                    {isSelectedOption && !isCorrectOption && (
                                                        <XCircle
                                                            size={18}
                                                            className="shrink-0 text-red-500"
                                                        />
                                                    )}

                                                </div>
                                            );
                                        })}

                                    </div>

                                    {isUnanswered && (
                                        <p className="mt-4 text-xs text-orange-700">
                                            You did not select an answer for this question.
                                        </p>
                                    )}

                                    {answer.explanation && (
                                        <div className="mt-5 rounded-xl bg-[#f8f8fc] p-4">

                                            <p className="mb-2 text-sm font-bold text-[#292d49]">
                                                Explanation
                                            </p>

                                            <p className="text-sm leading-6 text-gray-600">
                                                {answer.explanation}
                                            </p>

                                        </div>
                                    )}

                                    <p className="mt-4 text-xs text-gray-500">
                                        Marks: {answer.marksAwarded} / {answer.marksPossible}
                                    </p>

                                </div>
                            );
                        })}

                    </div>

                </section>

                {/* Bottom Actions */}
                <div className="mt-7 flex flex-col gap-4 sm:flex-row">

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#292d49] px-6 py-4 font-semibold text-white transition hover:bg-[#3a3e60]"
                    >
                        <ArrowLeft size={18} />
                        Back to Dashboard
                    </button>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#c65d83] bg-white px-6 py-4 font-semibold text-[#c65d83] transition hover:bg-pink-50"
                    >
                        <RotateCcw size={18} />
                        Finish
                    </button>

                </div>

            </div>
        </div>
    );
}

export default QuizResult;
