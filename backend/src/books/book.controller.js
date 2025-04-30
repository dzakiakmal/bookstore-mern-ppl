const Book = require("./book.model");

const postABook = async (req, res) => {
  try {
    // Assuming you have a Book model defined elsewhere
    const newBook = await Book({ ...req.body });
    await newBook.save();
    res
      .status(201)
      .send({ message: "Book created successfully", book: newBook });
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ message: "Error creating book", error });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({}).sort({ createdAt: -1 });
    res.status(200).send(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).send({ message: "Error fetching books", error });
  }
};

const getSingleBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    res.status(200).send(book);
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).send({ message: "Error fetching book", error });
  }
};

const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    res.status(200).send({
      message: "Book updated successfully",
      book: book,
    });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).send({ message: "Error updating book", error });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    res.status(200).send({
      message: "Book deleted successfully",
      book: book,
    });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).send({ message: "Error deleting book", error });
  }
};

module.exports = {
  postABook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
