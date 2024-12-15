const express = require('express');
const bookController = require('../controllers/bookController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

const router = express.Router();

// Add a new book (Authors only)
router.post('/create',authenticateToken,authorizeRole('Author'),bookController.addBook);

// Get all books
router.get('/', bookController.getAllBooks);

// Get all books by a specific author
router.get('/author/:id',authenticateToken,authorizeRole('Author'),bookController.getBooksByAuthor);

// Update book details
router.put('/update/:id',authenticateToken,authorizeRole('Author'),bookController.updateBook);

// Delete a book
router.delete('/delete/:id',authenticateToken, authorizeRole('Author'), bookController.deleteBook);

module.exports = router;
