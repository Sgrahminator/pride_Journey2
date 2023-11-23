const express = require('express');
const router = express.Router();
const qnaController = require('../controllers/qna.controller');

// Route to create a new question
router.post('/', qnaController.createQuestion);

// Route to get all questions
router.get('/', qnaController.getAllQuestions);

// Route to get a specific question by ID
router.get('/:id', qnaController.getQuestionById);

// Route to update a specific question
router.put('/:id', qnaController.updateQuestion);

// Route to delete a specific question
router.delete('/:id', qnaController.deleteQuestion);

// Route to add an answer to a specific question
router.post('/:id/answer', qnaController.addAnswerToQuestion);

module.exports = router;
