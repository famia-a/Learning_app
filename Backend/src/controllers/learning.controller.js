
const Learning = require("../models/learning.model");
const { YoutubeTranscript } = require("youtube-transcript");
const axios = require("axios");

// Generate transcript from YouTube video
async function generateLearningFromVideo(req, res) {
    try {
        const userId = req.user?.id || req.user?._id;
        const { videoUrl } = req.body;

        // 1. Check authentication
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        // 2. Validate video URL
        if (!videoUrl) {
            return res.status(400).json({
                success: false,
                message: "YouTube video URL is required"
            });
        }

        // 3. Extract YouTube video ID
        let videoId;

        try {
            const url = new URL(videoUrl);

            if (url.hostname === "youtu.be") {
                videoId = url.pathname.slice(1);
            } else if (
                url.hostname.includes("youtube.com") ||
                url.hostname.includes("youtube-nocookie.com")
            ) {
                videoId =
                    url.searchParams.get("v") ||
                    url.pathname.split("/").filter(Boolean).pop();
            }

        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Invalid YouTube URL"
            });
        }

        if (!videoId || !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid YouTube video ID"
            });
        }

        // 4. Fetch original transcript
        let transcriptData;

        try {
            transcriptData = await YoutubeTranscript.fetchTranscript(videoId);
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Unable to fetch transcript. Captions may be unavailable or YouTube may have blocked access.",
                error: error.message
            });
        }

        if (!transcriptData || transcriptData.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No transcript found for this video"
            });
        }

        // 5. Convert transcript array into text
        const originalTranscript = transcriptData
            .map(item => item.text)
            .join(" ")
            .replace(/\s+/g, " ")
            .trim();

        if (!originalTranscript) {
            return res.status(400).json({
                success: false,
                message: "Transcript is empty"
            });
        }

        // 6. Check Groq API key
        if (!process.env.GROQ_API_KEY) {
            return res.status(500).json({
                success: false,
                message: "Groq API key is missing"
            });
        }

        const groqUrl = "https://api.groq.com/openai/v1/chat/completions";

        // 7. Detect transcript language
        const languageResponse = await axios.post(
            groqUrl,
            {
                model: "openai/gpt-oss-120b",
                messages: [
                    {
                        role: "system",
                        content: "Identify the language of the provided transcript. Return only the language name in English. Do not explain."
                    },
                    {
                        role: "user",
                        content: originalTranscript.slice(0, 5000)
                    }
                ],
                temperature: 0
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const originalLanguage = languageResponse.data.choices[0].message.content.trim();

        // 8. Translate only when language is not English
        let englishTranscript = originalTranscript;
        let translated = false;

        if (!/^english$/i.test(originalLanguage)) {
            const translationResponse = await axios.post(
                groqUrl,
                {
                    model: "openai/gpt-oss-120b",
                    messages: [
                        {
                            role: "system",
                            content: "Translate the following transcript into natural English. Preserve the original meaning and all important details. Do not summarize, shorten, add notes, or explain. Return only the complete English translation."
                        },
                        {
                            role: "user",
                            content: originalTranscript
                        }
                    ],
                    temperature: 0.2
                },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            englishTranscript =
                translationResponse.data.choices[0].message.content.trim();

            translated = true;
        }

        // 9. Save learning data in MongoDB
        const learning = await Learning.create({
            user: userId,
            videoUrl,
            transcript: englishTranscript,
            originalLanguage,
            translated
        });

        // 10. Send response
        return res.status(201).json({
            success: true,
            message: translated
                ? "Transcript translated into English successfully"
                : "English transcript generated successfully",
            data: {
                learningId: learning._id,
                videoUrl: learning.videoUrl,
                originalLanguage: learning.originalLanguage,
                translated: learning.translated,
                transcript: learning.transcript,
                createdAt: learning.createdAt
            }
        });

    } catch (error) {
        console.error("Learning Controller Error:", error.response?.data || error.message);

        return res.status(500).json({
            success: false,
            message: "Something went wrong while generating the transcript",
            error: error.response?.data?.error?.message || error.message
        });
    }
}

// Get all learning videos of logged-in user
async function getMyLearnings(req, res) {
    try {
        const userId = req.user?.id || req.user?._id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        const learnings = await Learning.find({ user: userId })
            .select("-transcript")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: learnings.length,
            data: learnings
        });

    } catch (error) {
        console.error("Get Learnings Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch learning history"
        });
    }
}

// Get one learning video with its transcript
async function getLearningById(req, res) {
    try {
        const userId = req.user?.id || req.user?._id;
        const { learningId } = req.params;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        const learning = await Learning.findOne({
            _id: learningId,
            user: userId
        });

        if (!learning) {
            return res.status(404).json({
                success: false,
                message: "Learning video not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: learning
        });

    } catch (error) {
        console.error("Get Learning Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch learning video"
        });
    }
}

module.exports = {
    generateLearningFromVideo,
    getMyLearnings,
    getLearningById
};