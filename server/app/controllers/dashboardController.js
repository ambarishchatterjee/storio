const HTTP = require("../helpers/httpStatusCodes");
const User = require("../models/User");
const Folder = require("../models/Folder");
const File = require("../models/File");
const bcrypt = require("bcryptjs");

class dashboardController {
  // controllers/fileController.js
  async getDashboard(req, res) {
    try {
      const folders = await Folder.find({ user: req.user._id });
      const files = await File.find({ user: req.user._id });

      const usedStorage = files.reduce((acc, file) => acc + file.size, 0); // in bytes

      // Convert bytes to GB and round to 2 decimals
      const usedStorageGB = +(usedStorage / 1024 ** 3).toFixed(2);

      // Sort files by createdAt descending for recent uploads
      const recentUploads = files
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 5)
        .map((file) => ({
          name: file.filename,
          size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
          uploaded: file.createdAt,
          thumb: file.path,
          mimetype: file.mimetype
        }));

      res.status(200).json({
        usedStorage: usedStorageGB,
        filesCount: files.length,
        foldersCount: folders.length,
        recentUploads,
      });
    } catch (err) {
      res.status(500).json({ error: "Something went wrong" });
    }
  }

  async changepassword(req, res, next) {
    try {
      const userId = req.user.id;
      const { currentPassword, newPassword } = req.body;

      const user = await User.findById(userId);
      const isMatch = await bcrypt.compare(currentPassword, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Current password is incorrect" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      console.error("Password change error:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  async updateUser(req, res, next) {
    try {
      const userId = req.user.id;
      const { name, profileImage } = req.body;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, profileImage },
        { new: true }
      );

      res
        .status(200)
        .json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}

module.exports = new dashboardController();
