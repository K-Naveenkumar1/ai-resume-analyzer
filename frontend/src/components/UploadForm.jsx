import React, { useState } from 'react';
import { FaCloudUploadAlt, FaSpinner } from 'react-icons/fa';

const UploadForm = ({ onAnalyze, isLoading }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (file) {
            onAnalyze(file);
        }
    };

    return (
        <div className="card text-center">
            <h2>Upload Resume</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Upload a PDF resume to get an AI analysis.</p>

            <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
                <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        id="file-upload"
                        style={{ display: 'none' }}
                    />
                    <label
                        htmlFor="file-upload"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '2rem',
                            border: '2px dashed var(--border)',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            backgroundColor: file ? '#f0f9ff' : 'transparent',
                            borderColor: file ? 'var(--primary)' : 'var(--border)'
                        }}
                    >
                        <FaCloudUploadAlt size={40} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                        <span style={{ fontWeight: 500 }}>
                            {file ? file.name : 'Click to select PDF'}
                        </span>
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={!file || isLoading}
                    style={{
                        backgroundColor: 'var(--primary)',
                        color: 'white',
                        padding: '0.75rem 2rem',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        opacity: (!file || isLoading) ? 0.7 : 1,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    {isLoading ? (
                        <>
                            <FaSpinner className="spin" /> Analyzing...
                        </>
                    ) : (
                        'Analyze Resume'
                    )}
                </button>
            </form>
            <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
        </div>
    );
};

export default UploadForm;
