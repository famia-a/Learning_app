
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    BookOpen,
    LayoutDashboard,
    ClipboardList,
    Settings,
    Plus,
    PlayCircle,
    Clock3,
    Languages,
    ArrowUpRight,
    Sparkles,
    ExternalLink,
    RefreshCw,
    AlertCircle
} from "lucide-react";

import api from "../services/api";

function MyLearnings() {
    const [learnings, setLearnings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchLearnings();
    }, []);

    const fetchLearnings = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/learning");

            const data = response.data?.data;

            setLearnings(Array.isArray(data) ? data : []);

        } catch (err) {
            console.error("Error fetching learnings:", err);

            setError(
                err.response?.data?.message ||
                "Unable to load your learnings. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date) => {
        if (!date) return "Date unavailable";

        return new Date(date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    };

    return (
        <div className="min-h-screen bg-[#f8f8fc] text-[#20243a] md:flex">

            {/* Sidebar */}
            <aside className="w-full border-b border-gray-200 bg-white p-5 md:min-h-screen md:w-64 md:border-b-0 md:border-r">

                <Link to="/" className="mb-6 flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f8e8ef] text-[#c65d83]">
                        <BookOpen size={22} />
                    </div>

                    <span className="text-2xl font-bold tracking-tight">
                        Learn<span className="text-[#c65d83]">Flow</span>
                    </span>
                </Link>

                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Workspace
                </p>

                <nav className="flex gap-2 overflow-x-auto md:flex-col">

                    <Link
                        to="/dashboard"
                        className="flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-gray-500 transition hover:bg-[#fcecf2] hover:text-[#bd5279]"
                    >
                        <LayoutDashboard size={19} />
                        Dashboard
                    </Link>

                    <Link
                        to="/my-learnings"
                        className="flex shrink-0 items-center gap-3 rounded-xl bg-[#fcecf2] px-4 py-3 font-semibold text-[#bd5279]"
                    >
                        <BookOpen size={19} />
                        My Learnings
                    </Link>

                    <Link
                        to="/quiz-history"
                        className="flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-gray-500 transition hover:bg-[#fcecf2] hover:text-[#bd5279]"
                    >
                        <ClipboardList size={19} />
                        My Quizzes
                    </Link>

                </nav>

                <div className="mt-8 hidden md:block">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Preferences
                    </p>

                    <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-400">
                        <Settings size={19} />
                        Settings
                        <span className="ml-auto text-xs">Soon</span>
                    </div>
                </div>

                <div className="mt-10 hidden rounded-2xl bg-[#fff4f7] p-4 md:block">
                    <Sparkles className="mb-3 text-[#c65d83]" size={22} />

                    <h3 className="font-semibold">Keep learning!</h3>

                    <p className="mt-1 text-sm leading-6 text-gray-500">
                        Turn your favourite videos into an opportunity to learn something new.
                    </p>
                </div>

            </aside>

            {/* Main Content */}
            <main className="min-w-0 flex-1 p-5 sm:p-8 lg:p-10">

                {/* Header */}
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

                    <div>
                        <p className="text-sm text-gray-500">
                            Your personal learning library
                        </p>

                        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                            My Learnings
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            All your processed YouTube videos in one place.
                        </p>
                    </div>

                    <Link
                        to="/create-learning"
                        className="inline-flex items-center gap-2 rounded-xl bg-[#292d49] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3a3f60]"
                    >
                        <Plus size={18} />
                        Create Learning
                    </Link>

                </div>

                {/* Learning Stats */}
                <section className="mb-8">
                    <div className="rounded-2xl border border-gray-100 bg-white p-5 sm:p-6">

                        <div className="flex items-center gap-4">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f8e8ef] text-[#c65d83]">
                                <BookOpen size={23} />
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Total Learnings
                                </p>

                                <h2 className="text-2xl font-bold">
                                    {loading ? "..." : learnings.length}
                                </h2>
                            </div>

                        </div>

                    </div>
                </section>

                {/* Section Heading */}
                <div className="mb-5 flex items-center justify-between gap-3">

                    <div>
                        <h2 className="text-lg font-bold">
                            Your Saved Videos
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Continue where you left off.
                        </p>
                    </div>

                    <button
                        onClick={fetchLearnings}
                        disabled={loading}
                        className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
                    >
                        <RefreshCw
                            size={16}
                            className={loading ? "animate-spin" : ""}
                        />
                        Refresh
                    </button>

                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white">

                        <RefreshCw className="mb-3 animate-spin text-[#c65d83]" size={30} />

                        <p className="text-sm text-gray-500">
                            Loading your learnings...
                        </p>

                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="rounded-2xl border border-red-100 bg-white p-8 text-center">

                        <AlertCircle className="mx-auto mb-3 text-red-500" size={30} />

                        <h3 className="font-semibold text-gray-800">
                            Something went wrong
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            {error}
                        </p>

                        <button
                            onClick={fetchLearnings}
                            className="mt-5 rounded-xl bg-[#292d49] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#3a3f60]"
                        >
                            Try Again
                        </button>

                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && learnings.length === 0 && (
                    <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white px-5 text-center">

                        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff0f5] text-[#c65d83]">
                            <PlayCircle size={32} />
                        </div>

                        <h3 className="text-lg font-bold">
                            No learnings yet
                        </h3>

                        <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
                            You haven't processed any YouTube videos yet.
                            Create your first learning and it will appear here.
                        </p>

                        <Link
                            to="/create-learning"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#292d49] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3a3f60]"
                        >
                            <Plus size={18} />
                            Create Your First Learning
                        </Link>

                    </div>
                )}

                {/* Learning Cards */}
                {!loading && !error && learnings.length > 0 && (
                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                        {learnings.map((learning) => (

                            <div
                                key={learning._id}
                                className="overflow-hidden rounded-2xl border border-gray-100 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >

                                {/* Video Preview */}
                                <div className="flex h-40 items-center justify-center bg-[#292d49]">
                                    <PlayCircle
                                        size={48}
                                        className="text-pink-200"
                                    />
                                </div>

                                {/* Card Content */}
                                <div className="p-5">

                                    <h3 className="line-clamp-2 break-all font-semibold leading-6">
                                        {learning.videoUrl}
                                    </h3>

                                    <div className="mt-4 flex flex-wrap gap-2">

                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                                            <Languages size={13} />
                                            {learning.originalLanguage || "Unknown"}
                                        </span>

                                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                                            learning.translated
                                                ? "bg-green-50 text-green-600"
                                                : "bg-gray-100 text-gray-600"
                                        }`}>
                                            {learning.translated
                                                ? "Translated to English"
                                                : "Original Transcript"}
                                        </span>

                                    </div>

                                    <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                                        <Clock3 size={14} />
                                        Created {formatDate(learning.createdAt)}
                                    </div>

                                    <div className="mt-5 flex gap-2">

                                        <Link
                                            to={`/learning/${learning._id}`}
                                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#292d49] px-3 py-3 text-sm font-semibold text-white transition hover:bg-[#3a3f60]"
                                        >
                                            Open Learning
                                            <ArrowUpRight size={16} />
                                        </Link>

                                        <a
                                            href={learning.videoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center rounded-xl border border-gray-200 px-3 text-gray-500 transition hover:bg-gray-50"
                                            title="Watch YouTube video"
                                        >
                                            <ExternalLink size={18} />
                                        </a>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>
                )}

                <p className="mt-10 text-center text-xs text-gray-400">
                    LearnFlow · Make every video a learning opportunity.
                </p>

            </main>
        </div>
    );
}

export default MyLearnings;
