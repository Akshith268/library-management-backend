const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Reader', 'Author'],
        required: true,
    },
    borrowedBooks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
        }
    ], // Only for Readers
    booksWritten: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
        }
    ], // Only for Authors
}, { timestamps: true });

// Pre-save hook to hash passwords
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
