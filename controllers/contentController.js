const Content = require('../models/Content');

// GET all contents
const getContents = async (req, res) => {
  try {
    const contents = await Content.find({}, 'name image category age patreonLink');
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST create new content
const createContent = async (req, res) => {
  const { name, image, category, age, patreonLink } = req.body;

  if (!name || !image) {
    return res.status(400).json({ message: 'Name and image are required' });
  }

  try {
    const newContent = new Content({ name, image, category, age, patreonLink });
    const savedContent = await newContent.save();
    res.status(201).json(savedContent);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE a content by ID
const deleteContent = async (req, res) => {
  try {
    const deleted = await Content.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.status(200).json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getContents,
  createContent,
  deleteContent
};
