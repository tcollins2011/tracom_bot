import { OpenAI } from 'openai';

/**
 * Generates text using the OpenAI API based on the provided prompt and settings.
*/

let openai;

export const generateText = async (req, res) => {

    if (!openai) {
      openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      })
    }
    
    let instructionMessage
    const { prompt, settings, context, embedding } = req.body;

    if (settings.embeddingsEnabled) {
      instructionMessage = {
        role: "user",
        content: `
          ${context}
          Reference: <${embedding}>     
          Question: ${prompt}
          `
      }
    }  else {
      instructionMessage = {
        role:"user",
        content: `
          ${context}
          Question: ${prompt}
        `
      }
    }
    // Edge case for o-1 model while it is in beta
    if (settings.model === 'o1-mini' || settings.model === 'o1-preview') {
      try {
        const response = await openai.chat.completions.create({
          model: settings.model,
          messages: [
            instructionMessage,
          ],
          stream: true,
          max_completion_tokens: parseInt(settings.maxTokens),
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
    }
    else {
      try {
        const response = await openai.chat.completions.create({
          model: settings.model,
          messages: [
            instructionMessage,
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
    }
};
