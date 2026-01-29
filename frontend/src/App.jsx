import React, { useState } from 'react';
import axios from 'axios';
import { FaRobot } from 'react-icons/fa';
import UploadForm from './components/UploadForm';
import AnalysisResult from './components/AnalysisResult';

const App = () => {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async (file) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('resume', file);

    try {
      // Assuming backend is running on port 5000
      const response = await axios.post('http://localhost:5000/api/resume/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Something went wrong. Please ensure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <header style={{ textAlign: 'center', marginBottom: '3rem', paddingTop: '2rem' }}>
        <div style={{
          display: 'inline-flex',
          padding: '1rem',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          marginBottom: '1rem'
        }}>
          <FaRobot size={40} color="var(--primary)" />
        </div>
        <h1>AI Resume Analyzer</h1>
        <p style={{ color: 'var(--text-secondary)' }}> optimize your resume with AI-powered insights</p>
      </header>

      <main>
        <UploadForm onAnalyze={handleAnalyze} isLoading={isLoading} />

        {error && (
          <div style={{
            padding: '1rem',
            background: '#fef2f2',
            color: 'var(--error)',
            borderRadius: '8px',
            textAlign: 'center',
            marginBottom: '2rem',
            border: '1px solid #fecaca'
          }}>
            {error}
          </div>
        )}

        <AnalysisResult result={result} />
      </main>

      <footer style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        <p>© {new Date().getFullYear()} AI Resume Analyzer. Built with MERN Stack.</p>
      </footer>
    </div>
  );
};

export default App;
