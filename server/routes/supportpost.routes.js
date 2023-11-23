const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const supportPostController = require('../controllers/supportpost.controller');

router.post('/', upload.single('image'), supportPostController.createSupportPost);
router.get('/', supportPostController.getAllSupportPosts);
router.get('/:id', supportPostController.getSupportPostById);
router.put('/:id', supportPostController.updateSupportPost);
router.delete('/:id', supportPostController.deleteSupportPost);

module.exports = router;
