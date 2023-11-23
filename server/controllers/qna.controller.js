const QnA = require('../models/qna.model');

// Create a new question
exports.createQuestion = async (req, res) => {
    try {
        const { title, question, author } = req.body;
        const newQuestion = new QnA({ title, question, author });
        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all questions
exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await QnA.find().populate('author', 'firstName lastName');
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific question by ID
exports.getQuestionById = async (req, res) => {
    try {
        const question = await QnA.findById(req.params.id).populate('author', 'firstName lastName');
        if (!question) return res.status(404).json({ message: 'Question not found' });
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a specific question
exports.updateQuestion = async (req, res) => {
    try {
        const updatedQuestion = await QnA.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedQuestion) return res.status(404).json({ message: 'Question not found' });
        res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a specific question
exports.deleteQuestion = async (req, res) => {
    try {
        const question = await QnA.findByIdAndDelete(req.params.id);
        if (!question) return res.status(404).json({ message: 'Question not found' });
        res.status(200).json({ message: 'Question deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add an answer to a question
exports.addAnswerToQuestion = async (req, res) => {
    try {
        const question = await QnA.findById(req.params.id);
        if (!question) return res.status(404).json({ message: 'Question not found' });

        const { content, author } = req.body;
        question.answers.push({ content, author });
        await question.save();

        res.status(200).json(question);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
