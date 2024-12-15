// borrowController.js
const Book = require('../models/Book');
const User = require('../models/User');

// Borrow a book
exports.borrowBook = async (req, res) => {
  try {
    const { bookId } = req.body;  // Assuming you're passing bookId in the body, adjust if in params
    const userId = req.user.id;  // Assuming the user ID is added to the request by authenticateToken middleware

    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user || !book) return res.status(404).json({ error: 'User or book not found.' });

    if (book.stock <= 0) return res.status(400).json({ error: 'Book is out of stock.' });
    if (user.borrowedBooks.length >= 5) return res.status(400).json({ error: 'Borrow limit reached.' });

    // Update borrowedBooks list and book stock
    user.borrowedBooks.push(bookId);
    book.stock -= 1;

    await user.save();
    await book.save();

    res.status(200).json({ message: 'Book borrowed successfully.', book });
  } catch (error) {
    res.status(500).json({ error: 'Failed to borrow book.' });
  }
};

// Return a book
exports.returnBook = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user || !book) return res.status(404).json({ error: 'User or book not found.' });

    // Remove book from borrowedBooks list and increase stock
    user.borrowedBooks = user.borrowedBooks.filter((id) => id.toString() !== bookId);
    book.stock += 1;

    await user.save();
    await book.save();

    res.status(200).json({ message: 'Book returned successfully.', book });
  } catch (error) {
    res.status(500).json({ error: 'Failed to return book.' });
  }
};

// View Borrowed Books (assuming userId is passed in the params)
exports.getBorrowedBooks = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate('borrowedBooks');  // Populate with actual book data

    if (!user) return res.status(404).json({ error: 'User not found.' });

    res.status(200).json({ borrowedBooks: user.borrowedBooks });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get borrowed books.' });
  }
};
