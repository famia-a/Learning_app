
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    Sparkles,
    ClipboardList,
    Clock,
    Trophy,
    Play,
    Loader2
} from "lucide-react";
import api from "../services/api";

function QuizPreview() {
    const { quizId } = useParams();
    const navigate = useNavigate();

    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                setLoading(true);

                const response = await api.get(`/quiz/${quizId}`);

                console.log("QUIZ PREVIEW RESPONSE:", response.data);

                const quizData =
                    response.data?.data?.quiz ||
                    response.data?.quiz ||
                    response.data?.data;

                if (!quizData) {
                    throw new Error("Quiz details were not returned.");
                }

                setQuiz(quizData);

            } catch (err) {
                console.error("Quiz Preview Error:", err);

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
            <div className="flex min-h-screen flex-col items-center justify-center gap-4">
                <p className="text-red-500">
                    {error || "Quiz not found."}
                </p>

                <button
                    onClick={() => navigate("/dashboard")}
                    className="rounded-xl bg-[#292d49] px-5 py-3 text-white"
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }

    const questionCount = quiz.questions?.length || 0;

    return (
        <div className="min-h-screen bg-[#f8f8fc] px-5 py-10">

            <div className="mx-auto max-w-3xl">

                <button
                    onClick={() => navigate(-1)}
                    className="mb-8 flex items-center gap-2 text-sm text-gray-500 hover:text-[#c65d83]"
                >
                    <ArrowLeft size={18} />
                    Back to Transcript
                </button>

                <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">

                    {/* Header */}
                    <div className="bg-[#292d49] px-7 py-10 text-center text-white sm:px-12">

                        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-pink-200">
                            <Sparkles size={30} />
                        </div>

                        <p className="mb-3 text-sm font-semibold text-pink-200">
                            Your AI Quiz Is Ready
                        </p>

                        <h1 className="text-3xl font-bold">
                            {quiz.title || "Knowledge Check"}
                        </h1>

                        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-300">
                            Your quiz has been generated from your video
                            transcript. Get ready to test what you have learned!
                        </p>

                    </div>

                    {/* Quiz Information */}
                    <div className="p-7 sm:p-10">

                        <h2 className="text-xl font-bold text-[#20243a]">
                            Quiz Overview
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Here is what you need to know before starting.
                        </p>

                        <div className="mt-7 grid gap-4 sm:grid-cols-3">

                            <InfoCard
                                icon={<ClipboardList size={22} />}
                                label="Questions"
                                value={questionCount}
                                color="text-blue-600"
                                bg="bg-blue-50"
                            />

                            <InfoCard
                                icon={<Trophy size={22} />}
                                label="Total Marks"
                                value={quiz.totalMarks ?? "—"}
                                color="text-amber-600"
                                bg="bg-amber-50"
                            />

                            <InfoCard
                                icon={<Clock size={22} />}
                                label="Quiz Type"
                                value="MCQs"
                                color="text-purple-600"
                                bg="bg-purple-50"
                            />

                        </div>

                        {/* Hidden Questions Notice */}
                        <div className="mt-8 rounded-2xl border border-[#f4dce6] bg-[#fff7fa] p-6">

                            <div className="flex items-center gap-3">
                                <Sparkles className="text-[#c65d83]" size={22} />

                                <h3 className="font-bold text-[#292d49]">
                                    Your questions are ready!
                                </h3>
                            </div>

                            <p className="mt-3 text-sm leading-7 text-gray-600">
                                Questions and answer options are hidden on
                                this page. They will appear only when you
                                start the quiz.
                            </p>

                            <ul className="mt-4 space-y-2 text-sm text-gray-600">
                                <li>✓ Read each question carefully.</li>
                                <li>✓ Select one answer for each question.</li>
                                <li>✓ Submit your answers to see your result.</li>
                            </ul>

                        </div>

                        {/* Start Quiz */}
                        <button
                            onClick={() => navigate(`/quiz/${quizId}/take`)}
                            className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-[#292d49] px-6 py-4 font-semibold text-white transition hover:bg-[#3a3e60]"
                        >
                            <Play size={19} />
                            Take Quiz
                        </button>

                        <p className="mt-4 text-center text-xs text-gray-400">
                            Good luck! Give it your best.
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
}

function InfoCard({ icon, label, value, color, bg }) {
    return (
        <div className="rounded-2xl border border-gray-100 p-5">
            <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${bg} ${color}`}>
                {icon}
            </div>

            <p className="text-sm text-gray-500">{label}</p>

            <h3 className="mt-1 text-2xl font-bold text-[#292d49]">
                {value}
            </h3>
        </div>
    );
}

export default QuizPreview;
