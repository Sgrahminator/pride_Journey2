const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [2, 'Name must be at least 2 characters long']
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        minlength: [2, 'City must be at least 2 characters long']
    },
    state: {
        type: String,
        required: [true, 'State is required'],
        minlength: [2, 'State must be at least 2 characters long']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minlength: [10, 'Description must be at least 10 characters long'],
        maxlength: [255, 'Description cannot be more than 255 characters']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    
}, { timestamps: true });

module.exports = mongoose.model('Submission', SubmissionSchema);
