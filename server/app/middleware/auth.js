const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const httpStatusCode = require("../helpers/httpStatusCodes");
const User = require("../models/User");

const hashedPassword = (password) => {
  const salt = 10;
  const hash = bcryptjs.hashSync(password, salt);
  return hash;
};

const comparePassword = (password, hashedPassword) => {
  return bcryptjs.compareSync(password, hashedPassword);
};

const AuthCheck = async (req, res, next) => {
  const token =
    req.body?.token ||
    req.headers["x-access-token"] ||
    req.headers["authorization"]?.split(" ")[1]; // Bearer token

  if (!token) {
    return res.status(401).json({
      status: false,
      message: "Please login first to access this page",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Fetch full user from DB
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "User not found",
      });
    }

    req.user = user; // ✅ attach full user object (with _id)
    next();
  } catch (error) {
    console.error("AuthCheck Error:", error);
    return res.status(401).json({
      status: false,
      message: "Invalid token access",
    });
  }
};

const AdminCheck = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

module.exports = { hashedPassword, comparePassword, AuthCheck, AdminCheck };
