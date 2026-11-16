
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    BookOpen,
    LayoutDashboard,
    ClipboardList,
    Settings as SettingsIcon,
    UserRound,
    LockKeyhole,
    Bell,
    ArrowLeft,
    Save
} from "lucide-react";

function Settings() {
    const user = useSelector((state) => state.auth.user);

    const [notifications, setNotifications] = useState(true);
    const [profileVisibility, setProfileVisibility] = useState("private");
    const [message, setMessage] = useState("");

    const handleSavePreferences = () => {
        localStorage.setItem(
            "learnflow-preferences",
            JSON.stringify({
                notifications,
                profileVisibility
            })
        );

        setMessage("Preferences saved successfully!");

        setTimeout(() => {
            setMessage("");
        }, 3000);
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

                    <Link to="/dashboard" className="flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-gray-500 hover:bg-[#fcecf2] hover:text-[#bd5279]">
                        <LayoutDashboard size={19} />
                        Dashboard
                    </Link>

                    <Link to="/my-learnings" className="flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-gray-500 hover:bg-[#fcecf2] hover:text-[#bd5279]">
                        <BookOpen size={19} />
                        My Learnings
                    </Link>

                    <Link to="/quiz-history" className="flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-gray-500 hover:bg-[#fcecf2] hover:text-[#bd5279]">
                        <ClipboardList size={19} />
                        My Quizzes
                    </Link>

                    <Link to="/settings" className="flex shrink-0 items-center gap-3 rounded-xl bg-[#fcecf2] px-4 py-3 font-semibold text-[#bd5279]">
                        <SettingsIcon size={19} />
                        Settings
                    </Link>

                </nav>
            </aside>

            {/* Main */}
            <main className="min-w-0 flex-1 p-5 sm:p-8 lg:p-10">

                <div className="mb-8">
                    <Link
                        to="/dashboard"
                        className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#c65d83]"
                    >
                        <ArrowLeft size={16} />
                        Back to Dashboard
                    </Link>

                    <p className="text-sm text-gray-500">
                        Manage your account and preferences
                    </p>

                    <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                        Settings
                    </h1>
                </div>

                {message && (
                    <div className="mb-5 rounded-xl border border-green-100 bg-green-50 p-4 text-sm text-green-700">
                        {message}
                    </div>
                )}

                {/* Profile */}
                <section className="mb-6 rounded-2xl border border-gray-100 bg-white p-6">

                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8e8ef] text-[#c65d83]">
                            <UserRound size={22} />
                        </div>

                        <div>
                            <h2 className="font-bold">Profile Information</h2>
                            <p className="text-sm text-gray-400">
                                Your account details
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-600">
                                Full Name
                            </label>

                            <input
                                type="text"
                                value={user?.name || ""}
                                readOnly
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-600">
                                Email Address
                            </label>

                            <input
                                type="email"
                                value={user?.email || ""}
                                readOnly
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none"
                            />
                        </div>

                    </div>

                    <p className="mt-4 text-xs text-gray-400">
                        Profile editing will be enabled after connecting the account update API.
                    </p>

                </section>

                {/* Security */}
                <section className="mb-6 rounded-2xl border border-gray-100 bg-white p-6">

                    <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <LockKeyhole size={22} />
                        </div>

                        <div>
                            <h2 className="font-bold">Security</h2>
                            <p className="text-sm text-gray-400">
                                Manage your account security
                            </p>
                        </div>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-4">
                        <p className="font-medium text-gray-700">
                            Password Management
                        </p>

                        <p className="mt-1 text-sm leading-6 text-gray-500">
                            You will be able to change your password securely once the password update API is connected.
                        </p>
                    </div>

                </section>

                {/* Preferences */}
                <section className="rounded-2xl border border-gray-100 bg-white p-6">

                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                            <Bell size={22} />
                        </div>

                        <div>
                            <h2 className="font-bold">Preferences</h2>
                            <p className="text-sm text-gray-400">
                                Customize your LearnFlow experience
                            </p>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 py-5">

                        <div>
                            <p className="font-medium">Notifications</p>
                            <p className="mt-1 text-sm text-gray-400">
                                Enable or disable learning notifications.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setNotifications(!notifications)}
                            className={`relative h-7 w-12 rounded-full transition ${
                                notifications ? "bg-[#c65d83]" : "bg-gray-300"
                            }`}
                            aria-label="Toggle notifications"
                        >
                            <span
                                className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                                    notifications ? "left-6" : "left-1"
                                }`}
                            />
                        </button>

                    </div>

                    {/* Privacy */}
                    <div className="py-5">

                        <label className="mb-2 block font-medium">
                            Profile Visibility
                        </label>

                        <p className="mb-3 text-sm text-gray-400">
                            Choose your profile visibility preference.
                        </p>

                        <select
                            value={profileVisibility}
                            onChange={(e) => setProfileVisibility(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#c65d83] sm:max-w-xs"
                        >
                            <option value="private">Private</option>
                            <option value="public">Public</option>
                        </select>

                    </div>

                    <button
                        onClick={handleSavePreferences}
                        className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[#292d49] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3a3f60]"
                    >
                        <Save size={17} />
                        Save Preferences
                    </button>

                </section>

                <p className="mt-8 text-center text-xs text-gray-400">
                    LearnFlow · Make every video a learning opportunity.
                </p>

            </main>
        </div>
    );
}

export default Settings;
