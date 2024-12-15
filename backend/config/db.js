const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Database connection failed', err);
        process.exit(1);
    }
};

module.exports = connectDB;
