const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true });

const qnaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    question: {
        type: String,
        required: [true, 'Question is required']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    answers: [answerSchema]
}, { timestamps: true });

module.exports = mongoose.model('QnA', qnaSchema);
