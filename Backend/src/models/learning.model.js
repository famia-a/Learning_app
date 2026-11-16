const mongoose = require("mongoose");

const learningSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },

        videoUrl: {
            type: String,
            required: true,
            trim: true
        },

        transcript: {
            type: String,
            required: true
        },

        originalLanguage: {
            type: String,
            required: true,
            default: "English"
        },

        translated: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Learning", learningSchema);