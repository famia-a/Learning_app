const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
    {
        question: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },

        // Snapshot of the question at the time of the attempt
        questionText: {
            type: String,
            required: true
        },

        options: {
            type: [String],
            required: true
        },

        // The option selected by the user.
        // null means the question was left unanswered.
        selectedOption: {
            type: Number,
            default: null,
            min: 0
        },

        // Correct option saved for reviewing the attempt
        correctOption: {
            type: Number,
            required: true,
            min: 0
        },

        isCorrect: {
            type: Boolean,
            default: false
        },

        explanation: {
            type: String,
            default: ""
        },

        marksAwarded: {
            type: Number,
            default: 0,
            min: 0
        },

        marksPossible: {
            type: Number,
            required: true,
            min: 1
        }
    },
    {
        _id: false
    }
);

const quizAttemptSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },

        learning: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Learning",
            required: true,
            index: true
        },

        quiz: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quiz",
            required: true,
            index: true
        },

        answers: {
            type: [answerSchema],
            required: true
        },

        totalQuestions: {
            type: Number,
            required: true,
            min: 1
        },

        correctCount: {
            type: Number,
            default: 0,
            min: 0
        },

        incorrectCount: {
            type: Number,
            default: 0,
            min: 0
        },

        unansweredCount: {
            type: Number,
            default: 0,
            min: 0
        },

        score: {
            type: Number,
            default: 0,
            min: 0
        },

        totalMarks: {
            type: Number,
            required: true,
            min: 1
        },

        percentage: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },

        status: {
            type: String,
            enum: ["completed"],
            default: "completed"
        },

        completedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("QuizAttempt", quizAttemptSchema);