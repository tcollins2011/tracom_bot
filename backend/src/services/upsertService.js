import { processPdf } from './simplePdfProcessingService.js';
import PineconeManager from './pineconeService.js';
import { embed } from './embeddingService.js';

class DocumentEmbeddingService {
  constructor(indexName) {
    this.pineconeManager = new PineconeManager(indexName);
  }

  async processAndUpsertPdf(pdfPath) {
    const chunks = await processPdf(pdfPath);
    for (const chunk of chunks) {

      const embeddingResult = await embed(chunk.metadata.text)
      const embedding = embeddingResult.data[0].embedding

      await this.pineconeManager.upsertEmbeddings([{
        id: chunk.id,
        values: embedding,
        metadata: chunk.metadata
      }]);
    }
  }
}

export default DocumentEmbeddingService;
