
const express = require("express");
const router = express.Router();

const {
    generateLearningFromVideo,
    getMyLearnings,
    getLearningById
} = require("../controllers/learning.controller");

const authMiddleware = require("../middleware/auth.middleware");

// Generate transcript from YouTube video
router.post(
    "/generate",
    authMiddleware,
    generateLearningFromVideo
);

// Get all learnings of logged-in user
router.get(
    "/",
    authMiddleware,
    getMyLearnings
);

// Get one learning with transcript
router.get(
    "/:learningId",
    authMiddleware,
    getLearningById
);

module.exports = router;