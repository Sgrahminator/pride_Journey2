const Submission = require('../models/submission.model');
const User = require('../models/user.model');

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
            const submissions = await Submission.find().populate('user', '_id firstName');
            res.json(submissions);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Get a single submission by ID
    getOne: async (req, res) => {
        try {
            const submission = await Submission.findById(req.params.id).populate('user', '_id firstName');
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
            const submissionId = req.params.id;
            const userId = req.session.user?.id;

            console.log(`Attempting to delete submission with ID: ${submissionId} by user: ${userId}`);

            // Check if the submission belongs to the user
            const submission = await Submission.findById(submissionId);
            if (!submission) {
                console.error(`Submission not found with ID: ${submissionId}`);
                return res.status(404).json({ error: "Submission not found." });
            }
            if (submission.user.toString() !== userId) {
                console.error(`Unauthorized deletion attempt by user: ${userId} on submission: ${submissionId}`);
                return res.status(401).json({ error: "Unauthorized operation." });
            }

            // Delete the submission
            await Submission.findByIdAndDelete(submissionId);

            console.log(`Submission with ID: ${submissionId} deleted successfully`);
            res.json({ message: "Submission deleted successfully!" });
        } catch (err) {
            console.error(`Error deleting submission: ${err}`);
            res.status(500).json({ error: err.message });
        }
    }

};

module.exports = submissionController;
