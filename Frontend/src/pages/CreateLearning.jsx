
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SquarePlay, ArrowLeft, Sparkles, Loader2 } from "lucide-react";
import api from "../services/api";

function CreateLearning() {
    const navigate = useNavigate();

    const [videoUrl, setVideoUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!videoUrl.trim()) {
            setError("Please enter a YouTube video URL.");
            return;
        }

        if (
            !videoUrl.includes("youtube.com/") &&
            !videoUrl.includes("youtu.be/")
        ) {
            setError("Please enter a valid YouTube URL.");
            return;
        }

        
try {
    setLoading(true);
    setError("");

    const response = await api.post("/learning/generate", {
        videoUrl
    });

    console.log("BACKEND RESPONSE:", response.data);

    const learningId = response.data?.data?.learningId;

    if (!learningId) {
        throw new Error("Learning ID was not returned by the server.");
    }

    navigate(`/learning/${learningId}`);

} catch (err) {
    console.error("Learning Error:", err);

    setError(
        err.response?.data?.message ||
        err.message ||
        "Something went wrong. Please try again."
    );
} finally {
    setLoading(false);
}

    };

    return (
        <div className="min-h-screen bg-[#f8f8fc] px-5 py-8">

            <div className="mx-auto max-w-3xl">

                <button
                    onClick={() => navigate("/dashboard")}
                    className="mb-8 flex items-center gap-2 text-sm text-gray-500 hover:text-[#c65d83]"
                >
                    <ArrowLeft size={18} />
                    Back to Dashboard
                </button>

                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10">

                    <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff0f5] text-[#c65d83]">
                        <SquarePlay size={28} />
                    </div>

                    <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#c65d83]">
                        <Sparkles size={16} />
                        AI-powered learning
                    </p>

                    <h1 className="text-3xl font-bold text-[#20243a]">
                        Create New Learning
                    </h1>

                    <p className="mt-3 leading-7 text-gray-500">
                        Paste a YouTube video link and LearnFlow will
                        generate its transcript to create your learning space.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-8">

                        <label className="mb-2 block text-sm font-semibold">
                            YouTube Video URL
                        </label>

                        <input
                            type="url"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            placeholder="https://www.youtube.com/watch?v=..."
                            className="w-full rounded-xl border border-gray-200 px-4 py-4 outline-none transition focus:border-[#c65d83] focus:ring-2 focus:ring-pink-100"
                        />

                        {error && (
                            <p className="mt-3 text-sm text-red-500">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#292d49] px-5 py-4 font-semibold text-white transition hover:bg-[#3a3e60] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={19} />
                                    Generating Transcript...
                                </>
                            ) : (
                                <>
                                    <Sparkles size={19} />
                                    Generate Learning
                                </>
                            )}
                        </button>

                    </form>

                    <div className="mt-8 rounded-2xl bg-[#fff7fa] p-5">
                        <h3 className="font-semibold text-[#292d49]">
                            What happens next?
                        </h3>

                        <ul className="mt-3 space-y-2 text-sm leading-6 text-gray-600">
                            <li>1. LearnFlow fetches the video transcript.</li>
                            <li>2. The transcript is saved in your learning space.</li>
                            <li>3. You can read it and generate a quiz whenever you are ready.</li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default CreateLearning;
