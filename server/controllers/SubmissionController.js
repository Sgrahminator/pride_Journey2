const Submission = require('../models/Submission');
const User = require('../models/User');

const submissionController = {
    // Create a new submission
    create: async (req, res) => {
        try {
            const { name, city, state, description } = req.body;
            const userId = req.session.user?.id;
            if (!userId) {
                return res.status(401).json({ error: "Unauthorized access. Please log in." });
            }

            const newSubmission = new Submission({ name, city, state, description, user: userId });
            await newSubmission.save();

            res.status(201).json({ message: "Submission created successfully!", submission: newSubmission });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    // Get all submissions
    getAll: async (req, res) => {
        try {
            const submissions = await Submission.find().populate('user', 'firstName');
            res.json(submissions);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Get a single submission by ID
    getOne: async (req, res) => {
        try {
            const submission = await Submission.findById(req.params.id).populate('user', 'firstName');
            if (!submission) {
                return res.status(404).json({ error: "Submission not found." });
            }
            res.json(submission);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Update a submission
    update: async (req, res) => {
        try {
            const { name, city, state, description } = req.body;
            const submission = await Submission.findById(req.params.id);

            if (!submission) {
                return res.status(404).json({ error: "Submission not found." });
            }

            if (submission.user.toString() !== req.session.user?.id) {
                return res.status(401).json({ error: "Unauthorized operation." });
            }

            submission.name = name;
            submission.city = city;
            submission.state = state;
            submission.description = description;
            await submission.save();

            res.json({ message: "Submission updated successfully!", submission });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Delete a submission
    delete: async (req, res) => {
        try {
            const submission = await Submission.findById(req.params.id);

            if (!submission) {
                return res.status(404).json({ error: "Submission not found." });
            }

            if (submission.user.toString() !== req.session.user?.id) {
                return res.status(401).json({ error: "Unauthorized operation." });
            }

            await submission.remove();
            res.json({ message: "Submission deleted successfully!" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = submissionController;
