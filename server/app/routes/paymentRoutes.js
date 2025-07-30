const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const router = express.Router();
const { AuthCheck } = require("../middleware/auth");
const User = require("../models/User");
const paymentController = require('../controllers/paymentController')

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order
router.post("/order", AuthCheck, paymentController.order);

// Verify payment and update user plan
router.post("/verify", AuthCheck, paymentController.verify);

module.exports = router;
