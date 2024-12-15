const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to validate token
exports.authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied, no token provided.' });

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err){ 
          console.log(err);
          return res.status(403).json({ error: 'Invalid token.' });
    }
        req.user = decoded;
        next();
    });
};

// Middleware to authorize user roles
exports.authorizeRole = (role) => {
    return async (req, res, next) => {
        const user = await User.findById(req.user.id);
        if (!user || user.role !== role) {
            return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
        }
        next();
    };
};
