// src/controllers/openaiController.js
const axios = require('axios');

exports.generateText = async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci/completions',
      {
        prompt: prompt,
        max_tokens: 150,
        // Add more parameters as needed
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Send the response back to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    res.status(500).json({ message: 'Error processing your request' });
  }
};
