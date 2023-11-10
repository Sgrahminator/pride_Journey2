const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // If you're developing with a separate server and client, you may need CORS
const app = express();
const port = 8000;

// Import the mongoose configuration file to establish a connection to the database
require('./config/mongoose');

// Middlewares
app.use(cors()); // Enable CORS if your client is on a different domain during development
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('secret'));

// Session middleware for handling user sessions
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true }
}));

// API routes
const authRoutes = require('./routes/auth');
const submissionRoutes = require('./routes/submissions');
const userRoutes = require('./routes/users');

// Use the API routes
app.use('/api/auth', authRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware - This will catch any errors that occur in the process of handling a request.
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => console.log(`Server running on port: ${port}`));

