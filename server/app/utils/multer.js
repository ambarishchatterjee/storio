const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Define the base upload directory
const BASE_UPLOAD_PATH = path.join(__dirname, "..", "public", "uploads");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = req.user._id.toString();
    const userUploadPath = path.join(BASE_UPLOAD_PATH, userId);

    // Create directory if it doesn't exist
    if (!fs.existsSync(userUploadPath)) {
      fs.mkdirSync(userUploadPath, { recursive: true });
    }

    cb(null, userUploadPath);
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const fileFilter = (req, file, cb) => {
  // Accept any file for now — you can restrict types here
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max (adjust as needed)
  },
});

module.exports = upload;
