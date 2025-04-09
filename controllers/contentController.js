import Content from '../models/Content.js';

// GET all contents
export const getContents = async (req, res) => {
  try {
    const contents = await Content.find();
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST create new content
export const createContent = async (req, res) => {
  const { name, image, description, category, age, patreonLink } = req.body;
  
  if (!name || !image) {
    return res.status(400).json({ message: 'Name and image are required' });
  }

  try {
    const newContent = new Content({ name, image, description, category, age, patreonLink });
    const savedContent = await newContent.save();
    res.status(201).json(savedContent);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
