const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper to create JWT
const createToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.SECRET_KEY, { expiresIn: '15d' });
};

// Signup logic
exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'User already exists.' });

        // Create new user
        const user = new User({ name, email, password, role });
        await user.save();
        console.log(user);
        // Generate token
        const token = createToken(user._id);
        res.status(201).json({ message: 'Signup successful', token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to sign up.' });
    }
};

// Login logic
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid email or password.' });

        // Verify password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid email or password.' });

        // Generate token
        const token = createToken(user._id);
        console.log("login successful");
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: 'Failed to log in.' });
    }
};
