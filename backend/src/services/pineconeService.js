import { Pinecone } from '@pinecone-database/pinecone'

/**
 * PineconeManager is a class that provides methods to interact with a Pinecone index.
 * It allows for upserting and querying embeddings in the Pinecone database.
 */
class PineconeManager {
    constructor(indexName) {
        const pc = new Pinecone({
            apiKey: process.env.PINCECONE_API_KEY
        });
        this.index = pc.index(indexName);
    }

    async upsertEmbeddings(embeddings) {
        try {
            const response = await this.index.upsert(embeddings);
            return response;
        } catch (error) {
            console.error('Error upserting embeddings:', error);
            throw error;
        }
    }

    async queryEmbeddings(queryEmbeddings, topK) {
        try {
            const response = await this.index.query({topK: topK, vector: queryEmbeddings, includeMetadata: true});
            return response;
        } catch (error) {
            console.error('Error querying embeddings:', error);
            throw error;
        }
    }
}
export default PineconeManager;