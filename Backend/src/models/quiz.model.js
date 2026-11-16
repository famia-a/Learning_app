const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
    {
        questionText: {
            type: String,
            required: true,
            trim: true
        },

        options: {
            type: [String],
            required: true,
            validate: {
                validator: function (options) {
                    return options.length >= 2;
                },
                message: "A question must have at least two options"
            }
        },

        // Index of the correct option: 0, 1, 2, or 3
        correctOption: {
            type: Number,
            required: true,
            min: 0,
            validate: {
                validator: function (value) {
                    return value < this.options.length;
                },
                message: "Correct option must match one of the available options"
            }
        },

        explanation: {
            type: String,
            default: ""
        },

        marks: {
            type: Number,
            default: 1,
            min: 1
        }
    },
    {
        _id: true
    }
);

const quizSchema = new mongoose.Schema(
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

        title: {
            type: String,
            required: true,
            default: "Learning Quiz",
            trim: true
        },

        questions: {
            type: [questionSchema],
            required: true,
            validate: {
                validator: function (questions) {
                    return questions.length > 0;
                },
                message: "A quiz must contain at least one question"
            }
        },

        totalMarks: {
            type: Number,
            required: true,
            min: 1
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Quiz", quizSchema);