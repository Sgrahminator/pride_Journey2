const User = require('../models/User');
const Submission = require('../models/Submission');

const userController = {
    // Get user profile
    getProfile: async (req, res) => {
        try {
            const userId = req.session.user?.id;
            if (!userId) {
                return res.status(401).json({ error: "Unauthorized access. Please log in." });
            }

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ error: "User not found." });
            }

            const submissions = await Submission.find({ user: userId });
            res.json({ user, submissions });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Update user profile
    updateProfile: async (req, res) => {
        try {
            const userId = req.session.user?.id;
            if (!userId) {
                return res.status(401).json({ error: "Unauthorized access. Please log in." });
            }

            const { firstName, lastName, pronouns, membershipType } = req.body;
            const updatedUser = await User.findByIdAndUpdate(userId, {
                firstName,
                lastName,
                pronouns,
                membershipType
            }, { new: true });

            if (!updatedUser) {
                return res.status(404).json({ error: "User not found." });
            }

            res.json({ message: "Profile updated successfully!", updatedUser });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = userController;
