const Razorpay = require("razorpay");
const crypto = require("crypto");
const User = require("../models/User");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


class paymentController {
  //create-order
  async order(req, res, next) {
    try {
      const { amount } = req.body;
      const options = {
        amount,
        currency: "INR",
        receipt: `receipt_order_${Date.now()}`,
      };

      const order = await razorpay.orders.create(options);
      res.json(order);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Order creation failed" });
    }
  }
  async verify(req, res, next) {
    //verify payment
    try {
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        plan,
      } = req.body;

      const hmac = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest("hex");

      if (hmac !== razorpay_signature) {
        return res.status(400).json({ message: "Invalid payment signature" });
      }

      // Determine storage based on plan
      let newStorage = 10 * 1024 * 1024 * 1024; // 10 GB
      let planKey = "free";

      if (plan === "Pro Plan") {
        newStorage = 50 * 1024 * 1024 * 1024; // 50 GB
        planKey = "pro";
      }
      if (plan === "Business Plan") {
        newStorage = 100 * 1024 * 1024 * 1024; // 100 GB
        planKey = "premium";
      }

      await User.findByIdAndUpdate(req.user._id, {
        plan: planKey,
        storageLimit: newStorage,
      });

      res.json({ message: `Successfully upgraded to ${plan}` });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Payment verification failed" });
    }
  }
}


module.exports = new paymentController()