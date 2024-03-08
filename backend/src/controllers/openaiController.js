import { OpenAI } from 'openai';
import { embed } from '../services/embeddingService.js'
import PineconeManager from '../services/pineconeService.js'
let openai

export const generateText = async (req, res) => {

    if (!openai) {
      openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      })
    }
    
    let instructionMessage
    const { prompt, settings, contextPrompt } = req.body;

    if (settings.embeddingsEnabled) {
      try {
        const embeddingResult = await embed(prompt);
        const embedding = embeddingResult.data[0].embedding;
        const pineconeManager = new PineconeManager('tracomgpt');
        const contextEmbedding = await pineconeManager.queryEmbeddings(embedding,1);
        if (contextEmbedding.matches[0].score > 0.6){
          instructionMessage = {
            role: "system",
            content: `You are a helpful AI assistant who is very knoledgabel about Tracom. Use the following pieces of context to help answer the question at the end.
            If you don't know the answer, just say you don't know. DO NOT try to make up an answer.
            If the question is not related to the context or Tracom, politely respond that you can only answer questions about Tracom.
            
            ${contextEmbedding.matches[0].text}
            
            Question: ${prompt}
            Helpful answer in markdown:
            `
          }
        }
        else {
          instructionMessage = {
            role: "system",
            content: "You are a helpful AI assistant who is very knowledgable about Tracom. If you don't know the answer, just say that you don't know.. DO NOT try to make up an answer."
          }
        }
      } catch (error) {
        console.error('Error with embeddingsor Pinecone query', error);
        // fall back message
        instructionMessage = {
          role: "system",
          content: "Please provide more details for a better response."
        };
      }
    } 
    else {
      instructionMessage = {
        role: "system",
        content: "You are a helpful AI assistant who is very knowledgable about Tracom. If you don't know the answer, just say that you don't know.. DO NOT try to make up an answer."
      };
    }

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
