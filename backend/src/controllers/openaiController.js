const {  OpenAI } = require('openai');

const openai = new OpenAI();

exports.generateText = async (req, res) => {
    const { prompt } = req.body;
  
    try {
      const response = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "gpt-3.5-turbo",
      });
  
      // Send the response back to the client
      res.json(response.choices[0]);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      res.status(500).json({ message: 'Error processing your request' });
    }
  };
  
