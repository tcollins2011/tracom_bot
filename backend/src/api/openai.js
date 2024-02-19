import express from 'express';
const router = express.Router();

import { generateText } from '../controllers/openaiController.js'; // Ensure to use the .js extension

// Route to handle OpenAI requests
router.post('/generate-text', generateText);

export default router;
