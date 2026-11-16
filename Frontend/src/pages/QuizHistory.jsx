
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    BookOpen,
    CalendarDays,
    CheckCircle2,
    Clock,
    Loader2,
    Trophy,
    History,
    ArrowRight,
    FileQuestion
} from "lucide-react";

import api from "../services/api";

function QuizHistory() {
    const navigate = useNavigate();

    const [attempts, setAttempts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch previous quiz attempts
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get("/quiz-attempt");

                console.log("QUIZ HISTORY:", response.data);

                setAttempts(response.data?.data || []);

            } catch (err) {
                console.error("Quiz History Error:", err);

                setError(
                    err.response?.data?.message ||
                    "Unable to load quiz history."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    const formatDate = (date) => {
        if (!date) return "Date unavailable";

        return new Date(date).toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const getScoreColor = (percentage) => {
        if (percentage >= 80) {
            return "text-green-600 bg-green-50";
        }

        if (percentage >= 50) {
            return "text-orange-600 bg-orange-50";
        }

        return "text-red-600 bg-red-50";
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2
                    className="animate-spin text-[#c65d83]"
                    size={35}
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8f8fc] px-4 py-8 sm:px-6">

            <div className="mx-auto max-w-6xl">

                {/* Back Button */}
                <button
                    onClick={() => navigate("/dashboard")}
                    className="mb-7 flex items-center gap-2 text-sm text-gray-500 hover:text-[#c65d83]"
                >
                    <ArrowLeft size={18} />
                    Back to Dashboard
                </button>

                {/* Page Header */}
                <div className="mb-8 rounded-3xl bg-[#292d49] p-7 text-white sm:p-9">

                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-pink-200">
                        <History size={26} />
                    </div>

                    <p className="mb-2 text-sm font-medium text-pink-200">
                        Your Progress
                    </p>

                    <h1 className="text-2xl font-bold sm:text-3xl">
                        Quiz History
                    </h1>

                    <p className="mt-3 max-w-xl text-sm leading-6 text-gray-300">
                        Keep track of your learning journey. Review your
                        previous quiz attempts, scores and performance.
                    </p>

                    <div className="mt-6 flex items-center gap-3 text-sm text-gray-300">
                        <Trophy size={18} className="text-yellow-300" />
                        {attempts.length} Quiz Attempts Completed
                    </div>

                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {/* Empty State */}
                {!error && attempts.length === 0 && (
                    <div className="rounded-3xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">

                        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-50 text-[#c65d83]">
                            <FileQuestion size={32} />
                        </div>

                        <h2 className="text-xl font-bold text-[#292d49]">
                            No Quiz History Yet
                        </h2>

                        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
                            You haven't completed any quizzes yet.
                            Start learning and your quiz attempts will
                            appear here.
                        </p>

                        <button
                            onClick={() => navigate("/dashboard")}
                            className="mt-7 rounded-xl bg-[#292d49] px-6 py-3 font-semibold text-white transition hover:bg-[#3a3e60]"
                        >
                            Start Learning
                        </button>

                    </div>
                )}

                {/* History List */}
                {attempts.length > 0 && (

                    <div className="space-y-5">

                        {attempts.map((attempt) => {

                            const percentage = attempt.percentage || 0;

                            return (
                                <div
                                    key={attempt._id}
                                    className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-7"
                                >

                                    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

                                        {/* Quiz Information */}
                                        <div className="flex flex-1 items-start gap-4">

                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pink-50 text-[#c65d83]">
                                                <BookOpen size={23} />
                                            </div>

                                            <div className="min-w-0">

                                                <h2 className="break-words text-lg font-bold text-[#292d49]">
                                                    {attempt.quiz?.title || "Learning Quiz"}
                                                </h2>

                                                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500">

                                                    <span className="flex items-center gap-1.5">
                                                        <CalendarDays size={14} />
                                                        {formatDate(
                                                            attempt.completedAt || attempt.createdAt
                                                        )}
                                                    </span>

                                                    <span className="flex items-center gap-1.5">
                                                        <FileQuestion size={14} />
                                                        {attempt.totalQuestions} Questions
                                                    </span>

                                                </div>

                                            </div>

                                        </div>

                                        {/* Score */}
                                        <div className="flex flex-wrap items-center justify-between gap-4 md:justify-end">

                                            <div className="text-left md:text-right">

                                                <span className={`inline-flex rounded-full px-4 py-2 text-sm font-bold ${getScoreColor(percentage)}`}>
                                                    {percentage}%
                                                </span>

                                                <p className="mt-2 text-sm font-semibold text-[#292d49]">
                                                    {attempt.score} / {attempt.totalMarks} Marks
                                                </p>

                                            </div>

                                            <button
                                                onClick={() => navigate(
                                                    `/quiz-result/${attempt._id}`
                                                )}
                                                className="flex items-center gap-2 rounded-xl bg-[#292d49] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#3a3e60]"
                                            >
                                                View Result
                                                <ArrowRight size={16} />
                                            </button>

                                        </div>

                                    </div>

                                    {/* Performance Details */}
                                    <div className="mt-6 grid grid-cols-3 gap-3 border-t border-gray-100 pt-5">

                                        <div>
                                            <p className="text-lg font-bold text-green-600">
                                                {attempt.correctCount}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Correct
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-lg font-bold text-red-500">
                                                {attempt.incorrectCount}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Incorrect
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-lg font-bold text-orange-500">
                                                {attempt.unansweredCount}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Unanswered
                                            </p>
                                        </div>

                                    </div>

                                </div>
                            );
                        })}

                    </div>
                )}

            </div>

        </div>
    );
}

export default QuizHistory;
