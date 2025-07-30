// routes/fileRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const {AuthCheck} = require('../middleware/auth');
const {
  createFolder,
  uploadFile,
  getDashboard,
  deleteFolder,
  deleteFile,
  shareItem
} = require('../controllers/fileController');

// Folder
router.post('/folders', AuthCheck, createFolder);
router.delete('/folders/:id', AuthCheck, deleteFolder);

// File
router.post('/files', AuthCheck, upload.single('file'), uploadFile);
router.delete('/files/:id', AuthCheck, deleteFile);

// Dashboard
router.get('/allfiles', AuthCheck, getDashboard);

// Share
router.post('/share', AuthCheck, shareItem);

module.exports = router;
