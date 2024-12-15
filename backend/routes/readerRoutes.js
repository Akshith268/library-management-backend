const express = require('express');``
const borrowController = require('../controllers/borrowController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');
const router = express.Router();

// Reader Profile Management
router.post('/profile', authenticateToken, authorizeRole('Reader'), (req, res) => {
    res.status(200).json({ message: 'Reader profile created/managed.' });
});

// Borrow and Return Books
router.post('/books/borrow', authenticateToken, authorizeRole('Reader'), borrowController.borrowBook); // Borrow a book
router.post('/books/return', authenticateToken, authorizeRole('Reader'), borrowController.returnBook); // Return a borrowed book

// View Borrowed Books
router.get('/books/:id', authenticateToken, authorizeRole('Reader'), borrowController.getBorrowedBooks); // View all books borrowed by a reader

module.exports = router;
