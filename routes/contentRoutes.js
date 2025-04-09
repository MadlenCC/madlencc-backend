import express from 'express';
import { getContents, createContent } from '../controllers/contentController.js';

const router = express.Router();

// GET /api/contents
router.get('/', getContents);

// POST /api/contents
router.post('/', createContent);

export default router;
