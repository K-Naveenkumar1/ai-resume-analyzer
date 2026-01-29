import { useState } from "react";
import "./App.css";

function App() {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [resume, setResume] = useState("");
  const [feedback, setFeedback] = useState("");

  // LOGIN
  const login = async () => {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    setToken(data.token);
  };

  // ANALYZE
  const analyzeResume = async () => {
    const res = await fetch("http://localhost:5000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
      body: JSON.stringify({ resume }),
    });

    const data = await res.json();
    setFeedback(data.feedback);
  };

  // LOGIN PAGE
  if (!token) {
    return (
      <div className="container">
        <div className="card">
          <h1>Login</h1>
          <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          <button onClick={login}>Login</button>
        </div>
      </div>
    );
  }

  // MAIN APP
  return (
    <div className="container">
      <div className="card">
        <h1>AI Resume Analyzer</h1>

        <textarea
          rows="8"
          placeholder="Paste resume here..."
          onChange={e => setResume(e.target.value)}
        />

        <button onClick={analyzeResume}>Analyze</button>

        <div className="feedback">{feedback}</div>
      </div>
    </div>
  );
}

export default App;
