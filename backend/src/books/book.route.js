const express = require("express");
const {
  postABook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
} = require("./book.controller");
const verifyAdminToken = require("../middleware/verifyAdminToken");
const router = express.Router();

// post new book
router.post("/create-book", verifyAdminToken, postABook);

// get all books
router.get("/", getAllBooks);

//get a book by id
router.get("/:id", getSingleBook);

// update a book by id
router.put("/edit/:id", verifyAdminToken, updateBook);

// delete a book by id
router.delete("/delete/:id", verifyAdminToken, deleteBook);

module.exports = router;
