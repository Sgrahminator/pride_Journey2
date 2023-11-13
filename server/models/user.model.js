const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        minlength: [2, 'First name must be at least 2 characters long']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        minlength: [2, 'Last name must be at least 2 characters long']
    },
    pronouns: {
        type: String,
        required: [true, 'Pronouns are required'],
        enum: ['He/Him', 'She/Her', 'They/Them']
    },
    membershipType: {
        type: String,
        required: [true, 'Membership type is required'],
        enum: ['LGBTQIA+', 'Ally']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        minlength: [9, 'Email must be at least 9 characters long'],
        validate: {
            validator: function(v) {
                return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        },
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long']
    },
}, { timestamps: true });

// Password hashing middleware
UserSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next();

    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    });
});

module.exports = mongoose.model('User', UserSchema);

