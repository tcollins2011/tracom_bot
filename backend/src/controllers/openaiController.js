import { OpenAI } from 'openai';

let openai

export const generateText = async (req, res) => {

    if (!openai) {
      openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      })
    }
    
    const { prompt, settings, contextPrompt } = req.body;

    const instructionMessage = {
      role: "system",
      content: "You are a helpful AI assistant who is very knowledgable about Tracom. If you don't know the answer, just say that you don't know.. DO NOT try to make up an answer."
    };

    try {
      const response = await openai.chat.completions.create({
        model: settings.model,
        messages: [
          instructionMessage,
          { role: "user", content: prompt }
        ],
        stream: true,
        temperature: parseFloat(settings.temperature),
        max_tokens: parseInt(settings.maxTokens),
        top_p: parseFloat(settings.topP),
        frequency_penalty: parseFloat(settings.frequencyPenalty),
        presence_penalty: parseFloat(settings.presencePenalty),
      });

      res.writeHead(200, {
        "Content-Type": "text/plain; charset=utf-8",
      });

      for await (const chunk of response) {
        const textChunk = chunk.choices[0]?.delta?.content || "";
        res.write(textChunk);
      }
      
      res.end();
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        res.status(500).json({ message: 'Error processing your request' });
    } 
};
