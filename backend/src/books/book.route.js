const express = require("express");
const Book = require("./book.model");
const {
  postABook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
} = require("./book.controller");
const router = express.Router();

// post new book
router.post("/create-book", postABook);

// get all books
router.get("/", getAllBooks);

//get a book by id
router.get("/:id", getSingleBook);

// update a book by id
router.put("/edit/:id", updateBook);

// delete a book by id
router.delete("/delete/:id", deleteBook);

module.exports = router;
