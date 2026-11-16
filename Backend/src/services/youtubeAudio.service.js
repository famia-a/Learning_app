const { getStreamUrlViaInnertube } = require("yt-innertube");
const axios = require("axios");

async function getYoutubeAudio(videoUrl) {
    let videoId;
    try {
        const parsed = new URL(videoUrl);
        if (parsed.hostname === "youtu.be" || parsed.hostname === "www.youtu.be") {
            videoId = parsed.pathname.substring(1);
        } else if (parsed.hostname.includes("youtube.com")) {
            if (parsed.pathname === "/watch") {
                videoId = parsed.searchParams.get("v");
            } else if (parsed.pathname.startsWith("/shorts/") || parsed.pathname.startsWith("/embed/")) {
                videoId = parsed.pathname.split("/")[2];
            }
        }
    } catch {
        throw new Error("Invalid YouTube URL");
    }

    if (!videoId) throw new Error("Could not extract video ID");

    const streamUrl = await getStreamUrlViaInnertube(videoId, "audio");
    if (!streamUrl) throw new Error("Could not resolve audio stream URL");

    const response = await axios.get(streamUrl, {
        responseType: "arraybuffer",
        headers: { "User-Agent": "Mozilla/5.0" },
        timeout: 120000,
    });

    return Buffer.from(response.data);
}

module.exports = { getYoutubeAudio };