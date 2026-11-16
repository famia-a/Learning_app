
const express = require("express");
const router = express.Router();

const {
    generateQuiz,
    getQuizById,
    getQuizzesByLearning
} = require("../controllers/quiz.controller");

const authMiddleware = require("../middleware/auth.middleware");

// Generate quiz from a learning transcript
router.post(
    "/generate",
    authMiddleware,
    generateQuiz
);

// Get all quizzes for one learning
router.get(
    "/learning/:learningId",
    authMiddleware,
    getQuizzesByLearning
);

// Get one quiz
router.get(
    "/:quizId",
    authMiddleware,
    getQuizById
);

module.exports = router;
