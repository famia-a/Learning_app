require("dotenv").config();
const express = require("express")
const cookieParser = require("cookie-parser")

const learningRoutes = require('./routes/learning.routes');
const authRoutes = require("./routes/user.route");
const quizRoutes = require("./routes/quiz.routes");
const quizAttemptRoutes = require("./routes/quizAttempt.routes");

const cors = require('cors');
const app = express()

app.use(express.json())
app.use(cookieParser())


app.use(cors({
    origin: 'http://localhost:5173', // Aapka frontend ka URL
    credentials: true // <--- Yeh cookie transfer ke liye zaroori hai
}));


app.use("/api/auth", authRoutes);
app.use('/api/learning', learningRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/quiz-attempt", quizAttemptRoutes);

app.get("/", (req, res) => {
    res.send("LearnFlow Backend is running!");
});

module.exports = app