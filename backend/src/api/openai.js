import express from 'express';
const router = express.Router();

import { generateText } from '../controllers/openaiController.js';
import { tokenCount } from '../controllers/tokenCountController.js'
import { relevantEmbedding } from '../controllers/embeddingController.js';

// Route to handle OpenAI requests
router.post('/generate-text', generateText);
router.post('/token-counts/', tokenCount)
router.post('/relevant-embedding', relevantEmbedding)

export default router;
