const User = require('../models/User');
const bcrypt = require('bcrypt');

const authController = {
    register: async (req, res) => {
        try {
            const { firstName, lastName, pronouns, membershipType, email, password } = req.body;
            // Check if user already exists
            const userExists = await User.findOne({ email });
            if (userExists) {
                return res.status(400).json({ error: "Email already in use." });
            }

            // Create new user
            const newUser = new User({ firstName, lastName, pronouns, membershipType, email, password });
            await newUser.save();

            res.status(201).json({ message: "User registered successfully!" });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            // Check if user exists
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ error: "Invalid credentials." });
            }

            // Check if password is correct
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ error: "Invalid credentials." });
            }

            // Create session
            req.session.user = {
                id: user._id,
                email: user.email
            };

            res.json({ message: "User logged in successfully!" });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    logout: (req, res) => {
        req.session.destroy(err => {
            if (err) {
                return res.status(400).json({ error: "Unable to log out." });
            }
            res.clearCookie('connect.sid'); // If you're using 'connect.sid' for your session ID
            res.json({ message: "User logged out successfully!" });
        });
    }
};

module.exports = authController;

