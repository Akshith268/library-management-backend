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
        const books = await Book.find().populate('author', 'name');
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
        const { id } = req.params;
        const updates = req.body;

        const updatedBook = await Book.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedBook) return res.status(404).json({ error: 'Book not found.' });

        res.status(200).json({ message: 'Book updated successfully.', updatedBook });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update book.' });
    }
};

// Delete a book
exports.deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) return res.status(404).json({ error: 'Book not found.' });

        res.status(200).json({ message: 'Book deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete book.' });
    }
};
