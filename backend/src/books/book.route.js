const express = require("express");
const router = express.Router();

router.post("/create-book", async (req, res) => {
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
});

module.exports = router;
