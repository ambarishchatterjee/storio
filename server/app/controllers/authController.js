const User = require("../models/User");
const userValidation = require("../helpers/validations/authValidation");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const path = require("path");
const sendOtp = require("../helpers/sendOtp");
const HTTP = require("../helpers/httpStatusCodes"); // ✅ Added
const generateToken = require("../helpers/generateToken");
const { comparePassword } = require("../middleware/auth");

class authController {
  async signUp(req, res) {
    try {
      const { name, email, password } = req.body;

      const exists = await User.findOne({ email });
      if (exists)
        return res.status(400).json({ message: "User already exists" });

      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        name,
        email,
        password: hashedPassword,
        otpCode: otp,
        profileImage: req.file ? `/uploads/profile/${req.file.filename}` : "",
      });

      await user.save();

      await sendOtp(email, otp); // Implement this to send email

      res
        .status(201)
        .json({ message: "User created. Please verify OTP.", email });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Signup failed" });
    }
  }

  async verifyOtp(req, res, next) {
    try {
      const { email, otp } = req.body;
      const user = await User.findOne({ email });

      if (!user || user.otpCode !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
      }

      user.emailVerified = true;
      user.otpCode = null;
      await user.save();

      const token = generateToken(user);

      if (token) {
        res.cookie("token", token);
        return res.status(HTTP.OK).json({
          status: true,
          message: "Login successfull",
          user: user,
          token: token,
        });
      } else {
        return res.status(HTTP.BAD_REQUEST).json({
          message: "Invalid token",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async postLogin(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(HTTP.BAD_REQUEST).json({
          message: "All fields are required",
        });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(HTTP.BAD_REQUEST).json({
          message: "User not found",
        });
      }

      const isMatch = comparePassword(password, user.password);

      if (!isMatch) {
        return res.status(HTTP.BAD_REQUEST).json({
          message: "Invalid password",
        });
      }

      const token = generateToken(user);

      //req.session.isLoggedIn = true;
      if (token) {
        res.cookie("token", token);
        return res.status(HTTP.OK).json({
          status: true,
          message: "Login successfull",
          user: user,
          token: token,
        });
      } else {
        return res.status(HTTP.BAD_REQUEST).json({
          message: "Invalid token",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getme(req, res) {
    res.status(200).json({
      status: true,
      user: req.user,
    });
  }

  async logout(req, res) {
    try {
      res.clearCookie("usertoken");
      return res.json({
        message: "Logout successgully",
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = new authController();
