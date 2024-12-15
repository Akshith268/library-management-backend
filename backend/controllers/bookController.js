const Book = require('../models/Book');
const User = require('../models/User');

// Add a new book (Authors only)
exports.addBook = async (req, res) => {
    try {
        const { title, genre, stock } = req.body;
        const authorId = req.user.id; // Retrieve from authenticated token

        // Ensure the user is an Author
        const author = await User.findById(authorId);
        if (!author || author.role !== 'Author') {
            return res.status(403).json({ error: 'Only authors can add books.' });
        }

        const book = new Book({ title, genre, stock, author: authorId });
        await book.save();

        // Add book to author's booksWritten list
        author.booksWritten.push(book._id);
        await author.save();

        res.status(201).json({ message: 'Book added successfully.', book });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add book.' });
    }
};

// Get all books
exports.getAllBooks = async (req, res) => {
    try {
        const { title, author, genre } = req.query;

        const searchFilter = {};
        if (title) {
            searchFilter.title = { $regex: title, $options: 'i' };
        }
        if (author) {
            searchFilter.author = author;
        }
        if (genre) {
            searchFilter.genre = { $regex: genre, $options: 'i' }; 
        }

        // Query the database with the filter
        const books = await Book.find(searchFilter).populate('author', 'name'); // Populate only the author's name
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch books.' });
    }
};


// Get all books by a specific author
exports.getBooksByAuthor = async (req, res) => {
    try {
        const { id: authorId } = req.params;

        // Ensure the user is an Author
        const author = await User.findById(authorId);
        if (!author || author.role !== 'Author') {
            return res.status(403).json({ error: 'Only authors can view their books.' });
        }

        const books = await Book.find({ author: authorId });
        const borrowedBooks = books.filter((book) => book.borrowedBy.length > 0);

        res.status(200).json({ books, borrowedBooks });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch books by author.' });
    }
};

// Update a book
exports.updateBook = async (req, res) => {
    try {
        const { id } = req.params; // Book ID
        const updates = req.body; // Updates from request body
        const userId = req.user.id; // ID of the logged-in user (from the token)

        // Find the book and check if the user is the author
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ error: 'Book not found.' });
        }

        if (book.author.toString() !== userId) {
            return res.status(403).json({ error: 'Unauthorized. Only the author can update this book.' });
        }

        console.log("Book found and user is the author");

        // Update the book
        const updatedBook = await Book.findByIdAndUpdate(id, updates, { new: true });

        res.status(200).json({ message: 'Book updated successfully.', updatedBook });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to update book.' });
    }
};


// Delete a book
exports.deleteBook = async (req, res) => {
    try {
        const { id } = req.params; // Book ID
        const userId = req.user.id; // ID of the logged-in user (from the token)

        // Find the book to check if the user is the author
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ error: 'Book not found.' });
        }

        // Check if the logged-in user is the author of the book
        if (book.author.toString() !== userId) {
            return res.status(403).json({ error: 'Unauthorized. Only the author can delete this book.' });
        }

        // Delete the book
        await Book.findByIdAndDelete(id);

        res.status(200).json({ message: 'Book deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete book.' });
    }
};

