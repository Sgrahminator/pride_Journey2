const express = require('express');
const cors = require('cors');
const session = require('express-session');
const multer = require('multer');  // Add multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Configure multer
const app = express();
const port = 8000;

require('./config/mongoose.config');
app.use(express.json());
app.use(session({
    secret: 'supersecret', 
    resave: false,
    saveUninitialized: false, 
    cookie: { 
        maxAge: 3600000,
        httpOnly: true 
    }
}));
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true, 
    exposedHeaders: ['set-cookie'],
}));

const authRoutes = require('./routes/auth.routes');
const submissionRoutes = require('./routes/submissions.routes');
const userRoutes = require('./routes/users.routes');
const qnaRoutes = require('./routes/qna.routes');
const supportPostRoutes = require('./routes/supportpost.routes');

app.use('/auth', authRoutes);
app.use('/submissions', submissionRoutes);
app.use('/users', userRoutes);
app.use('/qna', qnaRoutes);
app.use('/supportpost', supportPostRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.use('/uploads', express.static('uploads')); // Serve static files from uploads

app.listen(port, () => console.log(`Listening on port: ${port}`));

