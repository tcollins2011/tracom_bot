const {  OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

exports.generateText = async (req, res) => {
    const { prompt } = req.body;
  
    try {
      const response = await openai.chat.completions.create({
        // model: "gpt-3.5-turbo",
        model: "gpt-4-turbo-preview",
        messages: [{ role: "system", content: prompt }],
        stream: true,
        temperature: 1,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      console.log(response)
      res.writeHead(200, {
        "Content-Type": "text/plain; charset=utf-8",
      });
      for await (const chunk of response) {
        res.write(chunk.choices[0]?.delta?.content || "")
      }
      res.end()
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      res.status(500).json({ message: 'Error processing your request' });
    }
  };
  
