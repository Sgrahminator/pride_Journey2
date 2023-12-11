const SupportPost = require('../models/supportpost.model');

// Create a new support post
exports.createSupportPost = async (req, res) => {
    try {
        const { title, content, author, postType } = req.body;
        const imagePath = req.file ? req.file.path : null; 

        const newSupportPost = new SupportPost({
            title,
            content,
            author,
            postType,
            imagePath
        });

        await newSupportPost.save();
        res.status(201).json(newSupportPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all support posts
exports.getAllSupportPosts = async (req, res) => {
    try {
        const supportPosts = await SupportPost.find().populate('author', 'firstName lastName');
        res.status(200).json(supportPosts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific support post by ID
exports.getSupportPostById = async (req, res) => {
    try {
        const supportPost = await SupportPost.findById(req.params.id).populate('author', 'firstName lastName');
        if (!supportPost) return res.status(404).json({ message: 'Support post not found' });
        res.status(200).json(supportPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a specific support post
exports.updateSupportPost = async (req, res) => {
    try {
        const updatedSupportPost = await SupportPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSupportPost) return res.status(404).json({ message: 'Support post not found' });
        res.status(200).json(updatedSupportPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a specific support post
exports.deleteSupportPost = async (req, res) => {
    try {
        const supportPost = await SupportPost.findByIdAndDelete(req.params.id);
        if (!supportPost) return res.status(404).json({ message: 'Support post not found' });
        res.status(200).json({ message: 'Support post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
