import { OpenAI } from 'openai';

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
