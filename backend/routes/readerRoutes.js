const express = require('express');``
const borrowController = require('../controllers/borrowController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const router = express.Router();

// Create a new Reader profile
router.post('/profile', authController.signup); 

// Update Reader details
router.put('/profile/:id', authenticateToken, authorizeRole('Reader'), userController.updateUser); 


// Borrow and Return Books
router.post('/books/borrow', authenticateToken, authorizeRole('Reader'), borrowController.borrowBook); // Borrow a book
router.post('/books/return', authenticateToken, authorizeRole('Reader'), borrowController.returnBook); // Return a borrowed book


// View Borrowed Books
router.get('/books/:id', authenticateToken, authorizeRole('Reader'), borrowController.getBorrowedBooks); // View all books borrowed by a reader

module.exports = router;
