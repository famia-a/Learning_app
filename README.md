# LearnFlow – AI-Powered Learning Platform

LearnFlow is an AI-powered learning platform built using the MERN stack. It helps users turn educational YouTube videos into interactive learning experiences by extracting video transcripts, translating content into English, and generating AI-powered quizzes.

The goal of LearnFlow is to make learning more interactive, accessible, and engaging.

## ✨ Features

- **User Authentication:** Register and log in to access your personal learning space.
- **YouTube Video Integration:** Create learning resources using YouTube video URLs.
- **Transcript Extraction:** Extract and save transcripts from YouTube videos.
- **Transcript Translation:** Translate video transcripts into English.
- **AI-Powered Quiz Generation:** Generate quizzes from saved learning transcripts using AI.
- **Interactive Quizzes:** Attempt generated quizzes and submit answers.
- **Quiz Evaluation:** Calculate correct, incorrect, and unanswered questions and track quiz performance.
- **Personal Learning Management:** Access your saved learning resources and generated quizzes.

## 🛠️ Technologies Used

### Frontend
- React.js
- Redux Toolkit
- React Router DOM
- Axios
- Tailwind CSS / CSS
- Lucide React
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cookie Parser
- CORS

### AI Integration
- Groq API
- AI-powered quiz generation

## 📁 Project Structure

```text
LearnFlow/
│
├── Backend/
│   ├── controllers/
│   ├── db/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── services/
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```

## ⚙️ Getting Started

Follow these steps to run LearnFlow locally.

### 1. Clone the Repository

```bash
git clone https://github.com/famia-a/Learning_app.git
```

### 2. Navigate to the Project

```bash
cd Learning_app
```

### 3. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file using the provided `.env.example` file.

Add your required environment variables, including your MongoDB connection string, authentication secret, and Groq API key, using the variable names specified in `.env.example`.

Start the backend using the development script configured in `package.json`.

### 4. Frontend Setup

Open another terminal:

```bash
cd Frontend
npm install
```

Create a `.env` file using the provided `.env.example` file.

Configure the frontend API URL according to your backend configuration.

Start the frontend using the development script configured in `package.json`.

### 5. Open the Application

Once both servers are running, open the frontend URL displayed in your terminal (Vite commonly uses `http://localhost:5173`).

## 🔄 How LearnFlow Works

1. Create an account or log in.
2. Add a YouTube video URL to create a learning resource.
3. LearnFlow extracts and saves the video's transcript.
4. The transcript is translated into English.
5. Open the learning resource to review its content.
6. Generate a quiz when you're ready to test your understanding.
7. Take the generated quiz and submit your answers.
8. Review your quiz performance.

## 🔐 Environment Variables

LearnFlow requires environment configuration for its frontend and backend.

- **Backend:** Configure MongoDB, authentication, and AI API credentials.
- **Frontend:** Configure the backend API URL.

Refer to the `.env.example` files in both folders for the required variable names.

**Important:** Never commit actual `.env` files, API keys, database credentials, or authentication secrets to GitHub.

## 🚀 Future Improvements

- Learning progress dashboard
- More detailed performance analytics
- Additional AI-powered learning tools
- Improved quiz customization
- Enhanced learning recommendations

## 👩‍💻 Developer

**LearnFlow** is a personal full-stack development project built to explore the integration of the MERN stack with AI-powered learning features.

---

⭐ If you find this project interesting, feel free to explore the repository and share your feedback.

**Built with React, Node.js, Express, MongoDB, and AI.**
