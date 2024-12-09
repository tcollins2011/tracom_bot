import { embed } from '../services/embeddingService.js'
import PineconeManager from '../services/pineconeService.js'

/**
 * Handles the request to retrieve relevant embeddings based on the provided prompt.
 * 
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.prompt - The prompt to generate embeddings for.
 * @param {Object} req.body.settings - Additional settings for the request.
 * @param {Object} res - The response object.
 * 
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 * 
 * @throws {Error} - Throws an error if there is an issue retrieving the embeddings.
 */
export const relevantEmbedding = async (req,res) => {

    const { prompt, settings } = req.body;

    try {
        const embeddingResult = await embed(prompt);
        const embedding = embeddingResult.data[0].embedding;
        const pineconeManager = new PineconeManager('tracomgpt');
        const contextEmbedding = await pineconeManager.queryEmbeddings(embedding,1);
        if (contextEmbedding.matches[0].score > 0.3){
            res.json({
                contextText: contextEmbedding.matches[0].metadata.text,
                fileName: contextEmbedding.matches[0].metadata.fileName,
                startPage: contextEmbedding.matches[0].metadata.startPage,
                endPage: contextEmbedding.matches[0].metadata.endPage,
            })
        } else {
            res.json({
                contextText: '',
                fileName: '',
                startPage: '',
                endPage: ''
            })
        }
    } catch (error) {
        console.error('Error retreiving embedding', error);
        res.status(500).json({ message: 'Error with the embeddings' });
    } 
}