# AI Resume Analyzer

A simple MERN application that analyzes resumes (PDF) using AI to provide a score and improvement suggestions.

## Features
- **Upload PDF Resume**: Drag and drop or select a file.
- **AI Analysis**: Uses Google Gemini (or mock data) to analyze the content.
- **Scoring System**: Visual score meter.
- **Improvement Tips**: Actionable advice to improve the resume.

## Prerequisites
- Node.js installed.
- MongoDB installed and running (optional, app works without DB but won't save history).
- Google Gemini API Key (optional, defaults to mock data if not provided).

## Setup & Running

### 1. Backend Setup
Navigate to the `backend` folder:
```bash
cd backend
npm install
```

Create a `.env` file in `backend/` (or edit the existing one):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-resume-analyzer
GEMINI_API_KEY=your_gemini_api_key_here
```
*Note: If you don't have an API key, leave it blank. The app will return a mock analysis response.*

Start the server:
```bash
npm run dev
```

### 2. Frontend Setup
Open a new terminal and navigate to the `frontend` folder:
```bash
cd frontend
npm install
npm run dev
```

### 3. Usage
- Open your browser at `http://localhost:5173`.
- Upload a resume PDF.
- View the analysis result.
