import { OpenAI } from 'openai';

/**
 * Generates an embedding for the given text using OpenAI's embedding model.
 *
 * @param {string} text - The text to be embedded.
 * @returns {Promise<Object>} - A promise that resolves to the embedding object.
 */

export const embed = async (text) => {
    
    let openai

    if (!openai) {
        openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        })
      }

    const embedding = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: text,
        encoding_format: "float"
    })

    return embedding
}
