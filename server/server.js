const express = require('express');
const cors = require('cors');
const session = require('express-session');
const app = express();
const port = 8000;

// Import the mongoose configuration file to establish a connection to the database
require('./config/mongoose.config');

// Middleware for JSON request body parsing
app.use(express.json());

// Session configuration
app.use(session({
    secret: 'supersecret', 
    resave: false,
    saveUninitialized: false, 
    cookie: { 
        maxAge: 3600000, // 1 hour
        httpOnly: true 
    }
}));

// Define CORS configuration
app.use(
    cors({
        origin: 'http://localhost:5173', 
        credentials: true, 
        exposedHeaders: ['set-cookie'],
    })
);

// Routes
const authRoutes = require('./routes/auth.routes');
const submissionRoutes = require('./routes/submissions.routes');
const userRoutes = require('./routes/users.routes');

app.use('/auth', authRoutes);
app.use('/submissions', submissionRoutes);
app.use('/users', userRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => console.log(`Listening on port: ${port}`));
