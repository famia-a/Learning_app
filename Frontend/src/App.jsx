import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import CreateLearning from "./pages/CreateLearning";
import LearningDetail from "./pages/LearningDetail";
import QuizPreview from "./pages/QuizPreview";
import TakeQuiz from "./pages/TakeQuiz";
import QuizResult from "./pages/QuizResult";
import QuizHistory from "./pages/QuizHistory";
import MyLearnings from "./pages/MyLearnings";
import Settings from "./pages/Settings";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create-learning" element={<CreateLearning />} />
                <Route path="/learning/:learningId" element={<LearningDetail />} />
                <Route path="/quiz/:quizId" element={<QuizPreview />} />
                <Route path="/quiz/:quizId/take" element={<TakeQuiz />} />
                <Route path="/quiz-result/:attemptId" element={<QuizResult />} />
                <Route path="/quiz-history" element={<QuizHistory />} />
                <Route path="/my-learnings" element={<MyLearnings />} />
                <Route path="/settings" element={<Settings />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
