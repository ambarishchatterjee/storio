const Folder = require('../models/Folder');
const File = require('../models/File');

const createFolder = async (req, res) => {
  const { name } = req.body;
  const userId = req.user._id;
  const folder = await Folder.create({ name, user: userId });
  res.status(201).json({ message: 'Folder created', folder });
};

const deleteFolder = async (req, res) => {
  await Folder.findByIdAndDelete(req.params.id);
  await File.deleteMany({ folder: req.params.id });
  res.json({ message: 'Folder and its files deleted' });
};

module.exports = { createFolder, deleteFolder };