// src/api/openai.js
const express = require('express');
const router = express.Router();

// Import the controller
const { generateText } = require('../controllers/openaiController');

// Route to handle OpenAI requests
router.post('/generate-text', generateText);

module.exports = router;
