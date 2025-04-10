const express = require('express');
const { getContents, createContent, deleteContent } = require('../controllers/contentController');

const router = express.Router();

// GET /api/contents
router.get('/', getContents);

// POST /api/contents
router.post('/', createContent);

// DELETE /api/contents/:id
router.delete('/:id', deleteContent);

module.exports = router;
