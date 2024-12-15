const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware'); // Token validation middleware
const router = express.Router();

// Signup and Login
router.post('/signup', authController.signup); // Register a new user
router.post('/login', authController.login);   // Authenticate user credentials

// User Management
router.put('/update/:id', authenticateToken, userController.updateUser); // Update user details
router.delete('/delete/:id', authenticateToken, userController.deleteUser); // Delete user account

// Session Validation
router.get('/session/validate', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'Session is valid.' });
});

module.exports = router;
