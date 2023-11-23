const mongoose = require('mongoose');

const supportPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    postType: {
        type: String,
        enum: ['text', 'image', 'combo'],
        required: true
    },
    imagePath: String // To store the image path
}, { timestamps: true });

module.exports = mongoose.model('SupportPost', supportPostSchema);

