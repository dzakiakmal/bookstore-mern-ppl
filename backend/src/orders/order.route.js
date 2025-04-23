const express = require('express');
const { create } = require('./order.model');
const { createAOrder, getOrderByEmail } = require('./order.controller');

const router = express.Router();

//Create Order EndPoint
router.post("/", createAOrder);

// get orders by user email
router.get("/email/:email", getOrderByEmail);

module.exports = router;