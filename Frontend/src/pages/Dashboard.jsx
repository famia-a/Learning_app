
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    LayoutDashboard,
    BookOpen,
    ClipboardList,
    Settings,
    Plus,
    PlayCircle,
    Trophy,
    Clock3,
    ArrowUpRight,
    Sparkles,
    RefreshCw,
    Home,
    LogOut
} from "lucide-react";

import api from "../services/api";
import { logout } from "../redux/authSlice";

function Dashboard() {
    const user = useSelector((state) => state.auth.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userName = user?.name || "Learner";
    const username = user?.username || "username";

    const [learnings, setLearnings] = useState([]);
    const [attempts, setAttempts] = useState([]);
    const [quizCount, setQuizCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login", { replace: true });
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setError("");

            const [learningResponse, attemptResponse] = await Promise.all([
                api.get("/learning"),
                api.get("/quiz-attempt")
            ]);

            const learningData = learningResponse.data?.data || [];
            const attemptData = attemptResponse.data?.data || [];

            setLearnings(Array.isArray(learningData) ? learningData : []);
            setAttempts(Array.isArray(attemptData) ? attemptData : []);

            const quizResponses = await Promise.all(
                learningData.map((learning) =>
                    api.get(`/quiz/learning/${learning._id}`)
                )
            );

            const totalQuizzes = quizResponses.reduce((total, response) => {
                const quizzes = response.data?.data || [];
                return total + (Array.isArray(quizzes) ? quizzes.length : 0);
            }, 0);

            setQuizCount(totalQuizzes);

        } catch (err) {
            console.error("Dashboard error:", err);
            setError(
                err.response?.data?.message ||
                "Unable to load dashboard data."
            );
        } finally {
            setLoading(false);
        }
    };

    const averageScore = attempts.length
        ? Math.round(
            attempts.reduce(
                (total, attempt) => total + (attempt.percentage || 0),
                0
            ) / attempts.length
        )
        : 0;

    const recentLearnings = [...learnings]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);

    return (
        <div className="min-h-screen bg-[#f8f8fc] text-[#20243a] md:flex">

            {/* Sidebar */}
            <aside className="flex w-full flex-col border-b border-gray-200 bg-white p-5 md:sticky md:top-0 md:h-screen md:min-h-screen md:w-64 md:shrink-0 md:border-b-0 md:border-r">

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
                        className="flex shrink-0 items-center gap-3 rounded-xl bg-[#fcecf2] px-4 py-3 font-semibold text-[#bd5279]"
                    >
                        <LayoutDashboard size={19} />
                        Dashboard
                    </Link>

                    <Link
                        to="/my-learnings"
                        className="flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-gray-500 transition hover:bg-[#fcecf2] hover:text-[#bd5279]"
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

                    <Link
                        to="/settings"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-500 transition hover:bg-[#fcecf2] hover:text-[#bd5279]"
                    >
                        <Settings size={19} />
                        Settings
                    </Link>

                </div>

                <div className="mt-8 hidden rounded-2xl bg-[#fff4f7] p-4 md:block">

                    <Sparkles className="mb-3 text-[#c65d83]" size={22} />

                    <h3 className="font-semibold">
                        Keep learning!
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-500">
                        Turn your favourite videos into an opportunity to learn something new.
                    </p>

                </div>

                {/* Logout at bottom */}
                <div className="mt-auto hidden border-t border-gray-100 pt-5 md:block">

                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 font-medium text-red-500 transition hover:bg-red-50"
                    >
                        <LogOut size={19} />
                        Logout
                    </button>

                </div>

                {/* Mobile Logout */}
                <button
                    onClick={handleLogout}
                    className="mt-4 flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-red-500 hover:bg-red-50 md:hidden"
                >
                    <LogOut size={19} />
                    Logout
                </button>

            </aside>

            {/* Main Dashboard */}
            <main className="min-w-0 flex-1 p-5 sm:p-8 lg:p-10">

                {/* Top Bar */}
                <div className="mb-9 flex flex-wrap items-center justify-between gap-4">

                    <div>
                        <p className="text-sm text-gray-500">
                            Your personal learning space
                        </p>

                        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                            Dashboard
                        </h1>
                    </div>

                    <Link
                        to="/settings"
                        className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm transition hover:shadow-md"
                    >

                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f8e8ef] text-lg font-bold text-[#bd5279]">
                            {userName.charAt(0).toUpperCase()}
                        </div>

                        <div>
                            <p className="font-semibold text-[#20243a]">
                                {userName}
                            </p>

                            <p className="text-xs text-gray-400">
                                @{username}
                            </p>
                        </div>

                        <ArrowUpRight size={17} className="ml-2 text-gray-400" />

                    </Link>

                </div>

                {/* Welcome */}
                <section className="mb-8 overflow-hidden rounded-3xl bg-[#292d49] p-6 text-white sm:p-9">

                    <div className="max-w-2xl">

                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-pink-200">
                            <Sparkles size={15} />
                            Welcome to LearnFlow
                        </div>

                        <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
                            Hello, {userName}! Ready to learn something new?
                        </h2>

                        <p className="mt-3 max-w-xl text-sm leading-6 text-gray-300 sm:text-base">
                            Turn YouTube videos into structured learning experiences and test your knowledge with AI-generated quizzes.
                        </p>

                        <Link
                            to="/create-learning"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#e99bb8] px-5 py-3 text-sm font-semibold text-[#292d49] transition hover:bg-[#f2b2ca]"
                        >
                            <Plus size={18} />
                            Create New Learning
                        </Link>

                    </div>

                </section>

                {/* Overview */}
                <div className="mb-5 flex items-center justify-between">

                    <div>
                        <h2 className="text-lg font-bold">
                            Your Learning Overview
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Track your learning progress and activity.
                        </p>
                    </div>

                    <button
                        onClick={fetchDashboardData}
                        disabled={loading}
                        className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
                    >
                        <RefreshCw
                            size={15}
                            className={loading ? "animate-spin" : ""}
                        />
                        Refresh
                    </button>

                </div>

                {error && (
                    <p className="mb-5 rounded-xl bg-red-50 p-4 text-sm text-red-600">
                        {error}
                    </p>
                )}

                {/* Statistics */}
                <section className="mb-8">
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                        <StatCard
                            icon={<BookOpen size={21} />}
                            title="Total Learnings"
                            value={loading ? "..." : learnings.length}
                            description="Videos processed"
                            iconBg="bg-blue-50"
                            iconColor="text-blue-600"
                        />

                        <StatCard
                            icon={<ClipboardList size={21} />}
                            title="Quizzes Created"
                            value={loading ? "..." : quizCount}
                            description="AI-generated quizzes"
                            iconBg="bg-pink-50"
                            iconColor="text-pink-600"
                        />

                        <StatCard
                            icon={<Trophy size={21} />}
                            title="Quiz Attempts"
                            value={loading ? "..." : attempts.length}
                            description="Completed attempts"
                            iconBg="bg-amber-50"
                            iconColor="text-amber-600"
                        />

                        <StatCard
                            icon={<Clock3 size={21} />}
                            title="Learning Time"
                            value="Not tracked"
                            description="Duration tracking not enabled"
                            iconBg="bg-purple-50"
                            iconColor="text-purple-600"
                        />

                    </div>
                </section>

                {/* Recent Learnings and Performance */}
                <section className="grid gap-5 lg:grid-cols-3">

                    <div className="rounded-2xl border border-gray-100 bg-white p-6 lg:col-span-2">

                        <div className="mb-5 flex items-center justify-between">

                            <div>
                                <h2 className="text-lg font-bold">
                                    Recent Learnings
                                </h2>

                                <p className="mt-1 text-xs text-gray-400">
                                    Your latest processed videos
                                </p>
                            </div>

                            <Link
                                to="/my-learnings"
                                className="text-sm font-medium text-[#c65d83] hover:underline"
                            >
                                View all
                            </Link>

                        </div>

                        {loading ? (
                            <div className="flex min-h-52 items-center justify-center text-sm text-gray-400">
                                Loading learnings...
                            </div>
                        ) : recentLearnings.length === 0 ? (

                            <div className="flex min-h-52 flex-col items-center justify-center text-center">

                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff0f5] text-[#c65d83]">
                                    <PlayCircle size={28} />
                                </div>

                                <h3 className="font-semibold">
                                    No learnings yet
                                </h3>

                                <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
                                    Your processed YouTube videos will appear here when you start creating learnings.
                                </p>

                                <Link
                                    to="/create-learning"
                                    className="mt-4 text-sm font-semibold text-[#c65d83] hover:underline"
                                >
                                    Create your first learning
                                </Link>

                            </div>

                        ) : (

                            <div className="space-y-4">

                                {recentLearnings.map((learning) => (

                                    <div
                                        key={learning._id}
                                        className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-100 p-4 transition hover:bg-gray-50"
                                    >

                                        <div className="flex min-w-0 items-center gap-3">

                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fff0f5] text-[#c65d83]">
                                                <PlayCircle size={22} />
                                            </div>

                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-semibold">
                                                    {learning.videoUrl}
                                                </p>

                                                <p className="mt-1 text-xs text-gray-400">
                                                    {formatDate(learning.createdAt)}
                                                </p>
                                            </div>

                                        </div>

                                        <Link
                                            to={`/learning/${learning._id}`}
                                            className="shrink-0 text-sm font-semibold text-[#c65d83] hover:underline"
                                        >
                                            Open <ArrowUpRight className="inline" size={15} />
                                        </Link>

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>

                    {/* Quiz Performance */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-6">

                        <h2 className="text-lg font-bold">
                            Quiz Performance
                        </h2>

                        <p className="mt-1 text-xs text-gray-400">
                            Your average quiz score
                        </p>

                        {loading ? (

                            <div className="flex min-h-52 items-center justify-center text-sm text-gray-400">
                                Loading performance...
                            </div>

                        ) : attempts.length === 0 ? (

                            <div className="flex min-h-52 flex-col items-center justify-center text-center">

                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                                    <Trophy size={27} />
                                </div>

                                <h3 className="font-semibold">
                                    No quiz results yet
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-gray-500">
                                    Complete your first quiz to see your performance here.
                                </p>

                            </div>

                        ) : (

                            <div className="flex min-h-52 flex-col items-center justify-center text-center">

                                <div className="flex h-32 w-32 items-center justify-center rounded-full border-[10px] border-[#f8e8ef]">

                                    <div>
                                        <h3 className="text-3xl font-bold text-[#292d49]">
                                            {averageScore}%
                                        </h3>

                                        <p className="text-xs text-gray-400">
                                            Average score
                                        </p>
                                    </div>

                                </div>

                                <p className="mt-5 text-sm text-gray-500">
                                    Based on {attempts.length} completed quiz{attempts.length === 1 ? "" : "zes"}.
                                </p>

                                <Link
                                    to="/quiz-history"
                                    className="mt-4 text-sm font-semibold text-[#c65d83] hover:underline"
                                >
                                    View Quiz History
                                </Link>

                            </div>

                        )}

                    </div>

                </section>

                {/* Footer */}
                <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 sm:flex-row">

                    <p className="text-xs text-gray-400">
                        LearnFlow · Make every video a learning opportunity.
                    </p>

                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-[#292d49] transition hover:border-[#c65d83] hover:bg-[#fff4f7] hover:text-[#bd5279]"
                    >
                        <Home size={17} />
                        Back to Home
                    </Link>

                </div>

            </main>

        </div>
    );
}

function formatDate(date) {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}

function StatCard({
    icon,
    title,
    value,
    description,
    iconBg,
    iconColor
}) {
    return (
        <div className="rounded-2xl border border-gray-100 bg-white p-5 transition hover:-translate-y-1 hover:shadow-md">

            <div className="flex items-center justify-between">

                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}>
                    {icon}
                </div>

                <ArrowUpRight size={18} className="text-gray-300" />

            </div>

            <p className="mt-5 text-sm text-gray-500">
                {title}
            </p>

            <h3 className="mt-1 text-2xl font-bold">
                {value}
            </h3>

            <p className="mt-1 text-xs text-gray-400">
                {description}
            </p>

        </div>
    );
}

export default Dashboard;
