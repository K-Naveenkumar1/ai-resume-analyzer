const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
    originalName: String,
    uploadDate: {
        type: Date,
        default: Date.now
    },
    textPreview: String,
    score: Number,
    summary: String,
    improvements: [String]
});

module.exports = mongoose.model('Resume', ResumeSchema);
