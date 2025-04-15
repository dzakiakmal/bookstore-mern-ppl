const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    descripsion: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    trending: {
        type: Boolean,
        required: true,
    },
    coverImage: {
        type: String,
        required: true,
    },
    oldPrice: Number,
    newPrice: Number,
    createdAt: {
        type: Date,
        default: Date.now,
    }

  },{timestamps: true,});

  const Book = mongoose.model('Book', BookSchema);

  module.exports = Book;