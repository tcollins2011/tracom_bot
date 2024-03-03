import express from 'express';
const router = express.Router();

import { generateText } from '../controllers/openaiController.js';
import { tokenCount } from '../controllers/tokenCountController.js'

// Route to handle OpenAI requests
router.post('/generate-text', generateText);
router.post('/token-counts/', tokenCount)

export default router;
