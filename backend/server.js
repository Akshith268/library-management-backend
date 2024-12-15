const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const readerRoutes = require('./routes/readerRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/reader', readerRoutes);

// Database Connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected successfully.'))
    .catch((err) => console.error('Database connection failed:', err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
