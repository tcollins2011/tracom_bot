import { OpenAI } from 'openai';
import { encoding_for_model } from "tiktoken";
import { setTokenCount } from '../services/tokenCountsCacheService.js';
import { Worker } from 'worker_threads';

let openai

const workerScriptPath = new URL('../workers/encoderWorker.js', import.meta.url);

export const generateText = async (req, res) => {

    if (!openai) {
      openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      })
    }
    
    const { prompt, settings, contextPrompt } = req.body;

    const instructionMessage = {
      role: "system",
      content: "You are a helpful AI assistant who is very knowledgable about the Tracom Corporation. If you don't know the answer, just say you don't know. DO NOT try to make up an answer."
    };

    const enc = encoding_for_model(settings.model);
    const worker = new Worker(workerScriptPath);

    async function encodeWithWorker(textChunk) {
      return new Promise((resolve, reject) => {
        worker.once('message', resolve);
        worker.once('error', reject);
        worker.postMessage({ enc, textChunk });
      });
    }

    try {
      let inputTokenCount = enc.encode(prompt).length
      let outputTokenCount = 0;

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
        
        const { outputTokenCount: chunkTokenCount } = await encodeWithWorker(textChunk);
        outputTokenCount += chunkTokenCount;
      }

      const cacheKey = Date.now().toString();
      await setTokenCount(cacheKey, {
        inputTokenCount: inputTokenCount,
        outputTokenCount: outputTokenCount
      })

      res.write(`STREAM_END:${cacheKey}`);
      res.end();
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        res.status(500).json({ message: 'Error processing your request' });
    } finally {
        enc.free();
        worker.terminate()
    }
};
