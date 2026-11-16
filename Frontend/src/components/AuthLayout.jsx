
import { Link } from "react-router-dom";
import { GraduationCap, Sparkles } from "lucide-react";

function AuthLayout({ children, title, subtitle }) {
    return (
        <div className="min-h-screen bg-white flex flex-col">

            {/* Navbar */}
            <nav className="h-16 px-6 md:px-12 border-b border-gray-100 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <div className="bg-pink-100 p-2 rounded-lg">
                        <GraduationCap className="w-5 h-5 text-pink-500" />
                    </div>

                    <span className="text-xl font-bold text-gray-900">
                        Learn<span className="text-pink-500">Flow</span>
                    </span>
                </Link>

                <Link
                    to="/"
                    className="text-sm text-gray-500 hover:text-pink-500 transition"
                >
                    Back to Home
                </Link>
            </nav>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center px-4 py-10">
                <div className="w-full max-w-5xl grid md:grid-cols-2 gap-12 items-center">

                    {/* Left Side */}
                    <div className="hidden md:block">
                        <div className="inline-flex items-center gap-2 bg-pink-50 text-pink-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <Sparkles size={16} />
                            Your personal AI learning space
                        </div>

                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                            Turn videos into
                            <span className="text-pink-500"> knowledge.</span>
                        </h1>

                        <p className="text-gray-500 mt-5 leading-7 max-w-md">
                            Learn smarter with video transcripts, interactive
                            quizzes and personalized learning experiences.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <span className="bg-pink-50 text-pink-600 px-4 py-2 rounded-full text-sm">
                                AI Transcripts
                            </span>
                            <span className="bg-gray-50 text-gray-600 px-4 py-2 rounded-full text-sm">
                                Smart Quizzes
                            </span>
                            <span className="bg-gray-50 text-gray-600 px-4 py-2 rounded-full text-sm">
                                Track Progress
                            </span>
                        </div>

                        <div className="mt-10 rounded-2xl from-pink-50 to-white border border-pink-100 p-7">
                            <p className="text-gray-700 font-medium">
                                "Make every video a learning opportunity."
                            </p>
                            <p className="text-sm text-gray-400 mt-2">
                                LearnFlow — Learn at your own pace.
                            </p>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="w-full max-w-md mx-auto">
                        <div className="mb-7">
                            <p className="text-sm text-pink-500 font-semibold mb-2">
                                WELCOME TO LEARNFLOW
                            </p>

                            <h2 className="text-3xl font-bold text-gray-900">
                                {title}
                            </h2>

                            <p className="text-gray-500 text-sm mt-2">
                                {subtitle}
                            </p>
                        </div>

                        {children}
                    </div>

                </div>
            </main>

            <footer className="text-center text-xs text-gray-400 py-5 border-t border-gray-100">
                © {new Date().getFullYear()} LearnFlow. All rights reserved.
            </footer>
        </div>
    );
}

export default AuthLayout;
