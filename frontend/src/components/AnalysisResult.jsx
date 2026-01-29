import React from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaChartLine } from 'react-icons/fa';

const AnalysisResult = ({ result }) => {
    if (!result) return null;

    const { score, summary, improvements } = result;

    const getScoreColor = (s) => {
        if (s >= 80) return 'var(--success)';
        if (s >= 60) return 'var(--warning)';
        return 'var(--error)';
    };

    return (
        <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <div>
                    <h2>Analysis Report</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Here is how your resume performed.</p>
                </div>
                <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    border: `4px solid ${getScoreColor(score)}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: getScoreColor(score)
                }}>
                    {score}
                </div>
            </div>

            <div className="mb-4">
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <FaChartLine color="var(--primary)" /> Summary
                </h3>
                <p style={{ lineHeight: 1.8 }}>{summary}</p>
            </div>

            <div style={{ marginTop: '2rem' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <FaExclamationTriangle color="var(--warning)" /> Improvements Needed
                </h3>
                <ul style={{ paddingLeft: '0', listStyle: 'none' }}>
                    {improvements.map((item, index) => (
                        <li key={index} style={{
                            background: '#fff7ed',
                            padding: '1rem',
                            borderRadius: '8px',
                            marginBottom: '0.75rem',
                            borderLeft: '4px solid var(--warning)',
                            display: 'flex',
                            gap: '0.75rem'
                        }}>
                            <span>•</span>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AnalysisResult;
