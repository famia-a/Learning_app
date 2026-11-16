
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    BookOpen,
    Sparkles,
    Loader2,
    SquarePlay,
    Languages
} from "lucide-react";
import api from "../services/api";

function LearningDetail() {
    const { learningId } = useParams();
    const navigate = useNavigate();

    const [learning, setLearning] = useState(null);
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);
    const [error, setError] = useState("");

    // Fetch saved transcript
    useEffect(() => {
        const fetchLearning = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get(
                    `/learning/${learningId}`
                );

                console.log("LEARNING DETAILS:", response.data);

                setLearning(response.data?.data);

            } catch (err) {
                console.error("Fetch Learning Error:", err);

                setError(
                    err.response?.data?.message ||
                    "Unable to load this learning."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchLearning();
    }, [learningId]);

    // Generate quiz questions
    const handleGenerateQuestions = async () => {
        try {
            setGenerating(true);
            setError("");

            const response = await api.post("/quiz/generate", {
                learningId,
                numberOfQuestions: 10
            });

            console.log("GENERATED QUIZ:", response.data);

            const quizId = response.data?.data?._id;

            if (!quizId) {
                throw new Error("Quiz ID was not returned by the backend.");
            }

            navigate(`/quiz/${quizId}`);

        } catch (err) {
            console.error("Generate Quiz Error:", err);

            setError(
                err.response?.data?.message ||
                err.message ||
                "Unable to generate questions."
            );
        } finally {
            setGenerating(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="animate-spin text-[#c65d83]" size={35} />
            </div>
        );
    }

    if (error && !learning) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center px-5">
                <p className="text-red-500">{error}</p>
                <button
                    onClick={() => navigate("/dashboard")}
                    className="mt-5 rounded-xl bg-[#292d49] px-5 py-3 text-white"
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }

    if (!learning) return null;

    return (
        <div className="min-h-screen bg-[#f8f8fc] px-5 py-8">

            <div className="mx-auto max-w-5xl">

                {/* Back Button */}
                <button
                    onClick={() => navigate("/dashboard")}
                    className="mb-7 flex items-center gap-2 text-sm text-gray-500 hover:text-[#c65d83]"
                >
                    <ArrowLeft size={18} />
                    Back to Dashboard
                </button>

                {/* Header */}
                <div className="mb-7 rounded-3xl bg-[#292d49] p-7 text-white sm:p-9">

                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-pink-200">
                        <BookOpen size={25} />
                    </div>

                    <p className="mb-2 text-sm font-medium text-pink-200">
                        Your Learning Space
                    </p>

                    <h1 className="text-2xl font-bold sm:text-3xl">
                        Transcript & Learning
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-gray-300">
                        Read your video transcript and generate questions
                        whenever you are ready to test your knowledge.
                    </p>

                    <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-300">
                        <span className="flex items-center gap-2">
                            <Languages size={16} />
                            {learning.originalLanguage || "Unknown language"}
                        </span>

                        <span className="flex items-center gap-2">
                            <SquarePlay size={16} />
                            {learning.translated
                                ? "Translated into English"
                                : "Original transcript"}
                        </span>
                    </div>

                </div>

                {/* Video Link */}
                {learning.videoUrl && (
                    <a
                        href={learning.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mb-6 flex items-center gap-3 break-all rounded-2xl border border-gray-100 bg-white p-5 text-sm text-[#c65d83] hover:bg-pink-50"
                    >
                        <SquarePlay size={21} />
                        Watch Original YouTube Video
                    </a>
                )}

                {/* Transcript */}
                <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-9">

                    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h2 className="text-xl font-bold text-[#20243a]">
                                Video Transcript
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Your complete video transcript
                            </p>
                        </div>

                        <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                            Saved
                        </span>
                    </div>

                    <div className="max-h-[600px] overflow-y-auto whitespace-pre-wrap rounded-2xl bg-[#fafafd] p-5 text-sm leading-8 text-gray-700 sm:p-7">
                        {learning.transcript || "No transcript available."}
                    </div>

                    {/* Generate Questions */}
                    <div className="mt-8 rounded-2xl border border-[#f4dce6] bg-[#fff7fa] p-6">

                        <div className="flex items-start gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#c65d83]">
                                <Sparkles size={22} />
                            </div>

                            <div>
                                <h3 className="font-bold text-[#292d49]">
                                    Ready to test your knowledge?
                                </h3>

                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    Generate AI-powered questions from this
                                    transcript. Your questions will stay hidden
                                    until you start the quiz.
                                </p>
                            </div>
                        </div>

                        {error && (
                            <p className="mt-4 text-sm text-red-500">
                                {error}
                            </p>
                        )}

                        <button
                            onClick={handleGenerateQuestions}
                            disabled={generating || !learning.transcript}
                            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#292d49] px-5 py-4 font-semibold text-white transition hover:bg-[#3a3e60] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                        >
                            {generating ? (
                                <>
                                    <Loader2 className="animate-spin" size={19} />
                                    Generating Questions...
                                </>
                            ) : (
                                <>
                                    <Sparkles size={19} />
                                    Generate Questions
                                </>
                            )}
                        </button>

                    </div>

                </section>

            </div>
        </div>
    );
}

export default LearningDetail;
