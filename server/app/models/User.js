const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  emailVerified: {
    type: Boolean,
    default: false,
  },

  otpCode: {
    type: String,
    default: null,
  },

  // 'user' or 'admin'
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  plan: {
    type: String,
    enum: ["free", "pro", "premium"],
    default: "free",
  },

  profileImage: {
    type: String,
    default: "",
  },

  usedStorage: {
    type: Number, // bytes
    default: 0,
  },
  storageLimit: {
    type: Number,
    default: 10 * 1024 * 1024 * 1024, // 10 GB
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
},{
  timestamps: true
});


const User = mongoose.model('User', userSchema)

module.exports = User