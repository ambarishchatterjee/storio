// controllers/adminController.js
const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const isAdmin = req.user && req.user.role === "admin";
    if (!isAdmin) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const users = await User.find().select("name email plan storageLimit createdAt isActive");

    res.status(200).json({ users });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
