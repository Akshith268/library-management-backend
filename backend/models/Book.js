const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true, // Must reference an Author
    },
    genre: {
        type: String,
        required: true,
        trim: true,
    },
    stock: {
        type: Number,
        required: true,
        min: 0, // Ensure stock cannot be negative
    },
    borrowedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // References Readers
        }
    ], // Track who has borrowed the book
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
