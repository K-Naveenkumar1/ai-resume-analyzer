const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Resume = require('../models/Resume');

const analyzeResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No resume file uploaded' });
        }

        // 1. Extract Text from PDF
        const pdfData = await pdfParse(req.file.buffer);
        const resumeText = pdfData.text;

        if (!resumeText || resumeText.length < 50) {
            return res.status(400).json({ error: 'Could not extract sufficient text from the resume.' });
        }

        // 2. Analyze with AI
        let analysisData;

        // Helper for dynamic mock data
        const getMockData = (text) => {
            // 1. Simple Keyword Analysis
            const keywords = ['javascript', 'python', 'react', 'node', 'sql', 'led', 'managed', 'developed', 'analysis', 'design', 'java', 'html', 'css'];
            const foundKeywords = keywords.filter(k => text.toLowerCase().includes(k));

            // 2. Calculate "Fake" Score
            // Base score 60 + points for length (capped) + points for keywords + random variance
            let calculatedScore = 60 + Math.min(20, text.length / 200) + (foundKeywords.length * 2);
            calculatedScore = Math.min(96, Math.floor(calculatedScore + (Math.random() * 5) - 2)); // Add small +/- random

            // 3. Dynamic Improvements
            const potentialImprovements = [
                "Quantify your impact (e.g., 'Increased sales by 20%').",
                "Add a dedicated 'Skills' section if missing.",
                "Ensure your LinkedIn profile is linked.",
                "Use more action verbs like 'Spearheaded', 'Orchestrated'.",
                "Tailor your summary to the specific job role.",
                "Check for consistency in date formatting.",
                "Highlight your leadership experiences.",
                "Reduce text density, use more bullet points.",
                "Add a link to your portfolio or GitHub."
            ];

            // Pick random 3 unique improvements
            const selectedImprovements = [];
            while (selectedImprovements.length < 3) {
                const rand = potentialImprovements[Math.floor(Math.random() * potentialImprovements.length)];
                if (!selectedImprovements.includes(rand)) selectedImprovements.push(rand);
            }

            const summaryText = foundKeywords.length > 0
                ? `Simulation: The resume mentions specific skills like ${foundKeywords.slice(0, 3).join(', ')}. To score higher, focus on measurable outcomes.`
                : "Simulation: The resume is well-structured but lacks specific keywords related to the target role.";

            return {
                score: calculatedScore,
                summary: summaryText,
                improvements: selectedImprovements
            };
        };

        if (!process.env.GEMINI_API_KEY) {
            console.warn("No GEMINI_API_KEY found. Returning mock data.");
            analysisData = getMockData(resumeText);
        } else {
            try {
                const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
                // Using correct model version
                const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

                const prompt = `
          Analyze the following resume text.
          Provide the output in strict JSON format with the following structure:
          {
            "score": <number between 0 and 100>,
            "summary": "<brief summary of the candidate's profile>",
            "improvements": ["<improvement suggestion 1>", "<improvement suggestion 2>", "<improvement suggestion 3>"]
          }
          
          Resume Text:
          ${resumeText}
        `;

                const result = await model.generateContent(prompt);
                const response = await result.response;
                let text = response.text();

                // Clean up markdown code blocks if present
                text = text.replace(/```json/g, '').replace(/```/g, '').trim();
                analysisData = JSON.parse(text);
            } catch (apiError) {
                console.error("Gemini API Error (falling back to mock data):", apiError.message);
                analysisData = getMockData(resumeText);
                // Append a note about the fallback
                if (analysisData.summary) {
                    analysisData.summary += " (Note: Real AI Analysis failed due to API Key error, showing simulation.)";
                }
            }
        }

        // 3. Save to Database (Optional)
        const newResume = new Resume({
            originalName: req.file.originalname,
            textPreview: resumeText.substring(0, 200),
            score: analysisData.score,
            summary: analysisData.summary,
            improvements: analysisData.improvements,
        });
        await newResume.save();

        res.json(analysisData);

    } catch (error) {
        console.error('Error analyzing resume:', error);
        res.status(500).json({ error: 'Failed to analyze resume', details: error.message });
    }
};

module.exports = { analyzeResume };
