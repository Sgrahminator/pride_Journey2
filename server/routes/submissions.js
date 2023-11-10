const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/SubmissionController');

router.post('/', submissionController.create);
router.get('/', submissionController.getAll);
router.get('/:id', submissionController.getOne);
router.put('/:id', submissionController.update);
router.delete('/:id', submissionController.delete);

module.exports = router;
