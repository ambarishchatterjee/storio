// controllers/fileController.js
const Folder = require('../models/Folder');
const File = require('../models/File');
const path = require("path");
const fs = require('fs')
const User = require('../models/User')

exports.createFolder = async (req, res) => {
  const { name } = req.body;
  const folder = await Folder.create({ name, user: req.user._id });
  res.status(201).json(folder);
};

exports.uploadFile = async (req, res) => {
  try {
    const { folderId } = req.body;

    // Get the relative path from /public
    const relativePath = path.relative(
      path.join(__dirname, "..", "public"),
      req.file.path
    );

    const file = await File.create({
      filename: req.file.originalname,
      path: relativePath, // ✅ Save this
      size: req.file.size,
      mimetype: req.file.mimetype,
      user: req.user._id,
      folder: folderId,
    });

    res.status(201).json(file);
  } catch (error) {
    console.error("File Upload Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const folders = await Folder.find({ user: req.user._id }) || [];
    const files = await File.find({ user: req.user._id }) || [];

    return res.status(200).json({ folders, files });
  } catch (err) {
    console.error("Dashboard fetch error:", err.message);
    return res.status(500).json({ message: "Failed to fetch dashboard data" });
  }
};

exports.deleteFolder = async (req, res) => {
  try {
    const folderId = req.params.id;

    // Find all files under this folder
    const files = await File.find({ folder: folderId });

    // Delete each file from filesystem and update user storage
    for (const file of files) {
      const filePath = path.join(__dirname, "..", "public", file.path);

      // Remove physical file
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (err) {
        console.error("Error deleting file from disk:", filePath, err.message);
      }

      // Reduce user storage
      await User.findByIdAndUpdate(file.user, {
        $inc: { usedStorage: -file.size },
      });
    }

    // Delete all file entries from DB
    await File.deleteMany({ folder: folderId });

    // Delete the folder itself
    await Folder.findByIdAndDelete(folderId);

    res.json({ message: "Folder and its files deleted successfully" });
  } catch (err) {
    console.error("Folder deletion failed:", err.message);
    res.status(500).json({ error: "Failed to delete folder and its files" });
  }
};


exports.deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    // Get absolute path from relative `file.path`
    const filePath = path.join(__dirname, "..", "public", file.path);

    // Delete file from filesystem
    fs.unlink(filePath, async (err) => {
      if (err && err.code !== 'ENOENT') {
        console.error("Failed to delete file from disk:", err);
        return res.status(500).json({ error: "File deletion failed" });
      }

      // Reduce user's used storage
      await User.findByIdAndUpdate(file.user, {
        $inc: { usedStorage: -file.size }
      });

      // Delete file record from DB
      await File.findByIdAndDelete(req.params.id);

      res.json({ message: "File deleted successfully" });
    });

  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.shareItem = async (req, res) => {
  const { type, id } = req.body;

  let item;
  if (type === 'folder') {
    item = await Folder.findByIdAndUpdate(id, { shared: true }, { new: true });
  } else {
    item = await File.findByIdAndUpdate(id, { shared: true }, { new: true });
  }

  res.json({ message: `${type} shared`, item });
};
