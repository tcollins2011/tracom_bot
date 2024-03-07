import { Pinecone } from '@pinecone-database/pinecone'

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
            const response = await this.index.query(vector=queryEmbeddings, topK=topK);
            console.log('Query response:', response);
            return response;
        } catch (error) {
            console.error('Error querying embeddings:', error);
            throw error;
        }
    }
}
export default PineconeManager;