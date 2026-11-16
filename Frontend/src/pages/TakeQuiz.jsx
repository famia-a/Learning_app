
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Circle,
    Loader2,
    Send,
    Lock
} from "lucide-react";
import api from "../services/api";

function TakeQuiz() {
    const { quizId } = useParams();
    const navigate = useNavigate();

    const [quiz, setQuiz] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    // Fetch quiz questions
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                setLoading(true);

                const response = await api.get(`/quiz/${quizId}`);

                console.log("TAKE QUIZ:", response.data);

                const quizData = response.data?.data;

                if (!quizData || !Array.isArray(quizData.questions)) {
                    throw new Error("Invalid quiz data received.");
                }

                setQuiz(quizData);

            } catch (err) {
                console.error("Fetch Quiz Error:", err);

                setError(
                    err.response?.data?.message ||
                    err.message ||
                    "Unable to load quiz."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchQuiz();
    }, [quizId]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="animate-spin text-[#c65d83]" size={35} />
            </div>
        );
    }

    if (error || !quiz) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center px-5">
                <p className="text-red-500">
                    {error || "Quiz not found."}
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

    const questions = quiz.questions;
    const currentQuestion = questions[currentIndex];

    const selectedOption = selectedAnswers[currentQuestion._id];

    const answeredCount = Object.keys(selectedAnswers).length;

    const progress = (answeredCount / questions.length) * 100;

    // Select an answer only once
    const handleSelectOption = (optionIndex) => {
        const questionId = currentQuestion._id;

        // Do not allow changing an already selected answer
        if (selectedAnswers[questionId] !== undefined) {
            return;
        }

        setSelectedAnswers((previous) => ({
            ...previous,
            [questionId]: optionIndex
        }));
    };

    // Submit quiz
    const handleSubmitQuiz = async () => {
        const confirmSubmit = window.confirm(
            "Are you sure you want to submit your quiz? You cannot change your answers after submission."
        );

        if (!confirmSubmit) return;

        try {
            setSubmitting(true);
            setError("");

            const answers = questions.map((question) => ({
                questionId: question._id,
                selectedOption:
                    selectedAnswers[question._id] !== undefined
                        ? selectedAnswers[question._id]
                        : null
            }));

            const response = await api.post(
                `/quiz-attempt/${quizId}/submit`,
                { answers }
            );

            console.log("QUIZ RESULT:", response.data);

            const attemptId = response.data?.result?.attemptId;

            if (!attemptId) {
                throw new Error("Attempt ID was not returned.");
            }

            navigate(`/quiz-result/${attemptId}`);

        } catch (err) {
            console.error("Submit Quiz Error:", err);

            setError(
                err.response?.data?.message ||
                err.message ||
                "Unable to submit quiz."
            );

        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8f8fc] px-4 py-8 sm:px-6">

            <div className="mx-auto max-w-4xl">

                {/* Header */}
                <button
                    onClick={() => navigate(`/quiz/${quizId}`)}
                    className="mb-6 flex items-center gap-2 text-sm text-gray-500 hover:text-[#c65d83]"
                >
                    <ArrowLeft size={18} />
                    Back to Quiz Preview
                </button>

                <div className="mb-6 rounded-3xl bg-[#292d49] p-6 text-white sm:p-8">

                    <p className="mb-2 text-sm text-pink-200">
                        Your Quiz
                    </p>

                    <h1 className="text-2xl font-bold sm:text-3xl">
                        {quiz.title}
                    </h1>

                    <div className="mt-5 flex flex-wrap gap-5 text-sm text-gray-300">
                        <span>
                            {questions.length} Questions
                        </span>

                        <span>
                            {quiz.totalMarks} Total Marks
                        </span>

                        <span>
                            {answeredCount} Answered
                        </span>
                    </div>

                </div>

                {/* Progress */}
                <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-5">

                    <div className="mb-3 flex items-center justify-between text-sm">
                        <span className="font-semibold text-[#292d49]">
                            Your Progress
                        </span>

                        <span className="text-gray-500">
                            {answeredCount}/{questions.length} answered
                        </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                        <div
                            className="h-full rounded-full bg-[#c65d83] transition-all"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                </div>

                {/* Question */}
                <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-9">

                    <div className="mb-6 flex items-center justify-between">

                        <span className="rounded-full bg-pink-50 px-4 py-2 text-sm font-semibold text-[#c65d83]">
                            Question {currentIndex + 1} of {questions.length}
                        </span>

                        <span className="text-sm font-medium text-gray-500">
                            {currentQuestion.marks} Mark(s)
                        </span>

                    </div>

                    <h2 className="mb-8 text-xl font-bold leading-8 text-[#20243a] sm:text-2xl">
                        {currentQuestion.questionText}
                    </h2>

                    {/* Options */}
                    <div className="space-y-4">

                        {currentQuestion.options.map((option, index) => {
                            const isSelected = selectedOption === index;
                            const isLocked = selectedOption !== undefined;

                            return (
                                <button
                                    key={index}
                                    type="button"
                                    disabled={isLocked}
                                    onClick={() => handleSelectOption(index)}
                                    className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                                        isSelected
                                            ? "border-[#c65d83] bg-pink-50 text-[#292d49]"
                                            : "border-gray-200 bg-white text-gray-700"
                                    } ${
                                        isLocked
                                            ? "cursor-not-allowed"
                                            : "hover:border-[#c65d83] hover:bg-pink-50/50"
                                    }`}
                                >

                                    <span
                                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                                            isSelected
                                                ? "bg-[#c65d83] text-white"
                                                : "bg-gray-100 text-gray-600"
                                        }`}
                                    >
                                        {String.fromCharCode(65 + index)}
                                    </span>

                                    <span className="flex-1 text-sm font-medium leading-6">
                                        {option}
                                    </span>

                                    {isSelected && (
                                        <CheckCircle2
                                            size={21}
                                            className="shrink-0 text-[#c65d83]"
                                        />
                                    )}

                                    {!isSelected && !isLocked && (
                                        <Circle
                                            size={20}
                                            className="shrink-0 text-gray-300"
                                        />
                                    )}

                                    {!isSelected && isLocked && (
                                        <Lock
                                            size={17}
                                            className="shrink-0 text-gray-300"
                                        />
                                    )}

                                </button>
                            );
                        })}

                    </div>

                    {/* Locked Answer Message */}
                    {selectedOption !== undefined && (
                        <div className="mt-5 flex items-center gap-2 rounded-xl bg-green-50 p-4 text-sm text-green-700">
                            <Lock size={17} />
                            Answer locked! You cannot change this selection.
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="mt-9 flex flex-wrap items-center justify-between gap-4">

                        <button
                            onClick={() => setCurrentIndex((prev) => prev - 1)}
                            disabled={currentIndex === 0 || submitting}
                            className="flex items-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <ArrowLeft size={17} />
                            Previous
                        </button>

                        {currentIndex < questions.length - 1 ? (
                            <button
                                onClick={() => setCurrentIndex((prev) => prev + 1)}
                                disabled={submitting}
                                className="flex items-center gap-2 rounded-xl bg-[#292d49] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3a3e60]"
                            >
                                Next Question
                                <ArrowRight size={17} />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmitQuiz}
                                disabled={submitting}
                                className="flex items-center gap-2 rounded-xl bg-[#c65d83] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#b44c72] disabled:opacity-60"
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 className="animate-spin" size={18} />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <Send size={17} />
                                        Submit Quiz
                                    </>
                                )}
                            </button>
                        )}

                    </div>

                    {error && (
                        <p className="mt-5 text-sm text-red-500">
                            {error}
                        </p>
                    )}

                </section>

                {/* Question Navigation */}
                <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-5">

                    <h3 className="mb-4 font-bold text-[#292d49]">
                        Question Overview
                    </h3>

                    <div className="flex flex-wrap gap-3">

                        {questions.map((question, index) => {
                            const isAnswered =
                                selectedAnswers[question._id] !== undefined;

                            return (
                                <button
                                    key={question._id}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`flex h-11 w-11 items-center justify-center rounded-xl text-sm font-semibold transition ${
                                        currentIndex === index
                                            ? "bg-[#292d49] text-white"
                                            : isAnswered
                                                ? "bg-green-100 text-green-700"
                                                : "bg-gray-100 text-gray-600"
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            );
                        })}

                    </div>

                    <p className="mt-4 text-xs text-gray-500">
                        Pink/Dark: Current question · Green: Answered · Grey: Not answered
                    </p>

                </div>

            </div>
        </div>
    );
}

export default TakeQuiz;
