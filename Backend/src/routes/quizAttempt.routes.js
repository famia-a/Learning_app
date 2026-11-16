
const express = require("express");
const router = express.Router();

const {
    submitQuizAttempt,
    getMyQuizAttempts,
    getQuizAttemptById,
    getAttemptsByQuiz
} = require("../controllers/quizAttempt.controller");

const authMiddleware = require("../middleware/auth.middleware");

// Submit quiz answers
router.post(
    "/:quizId/submit",
    authMiddleware,
    submitQuizAttempt
);

// Get all attempts of logged-in user
router.get(
    "/",
    authMiddleware,
    getMyQuizAttempts
);

// Get attempts for a particular quiz
router.get(
    "/quiz/:quizId",
    authMiddleware,
    getAttemptsByQuiz
);

// Get one attempt with result and answer review
router.get(
    "/:attemptId",
    authMiddleware,
    getQuizAttemptById
);

module.exports = router;