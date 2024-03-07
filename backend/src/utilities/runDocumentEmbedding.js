import DocumentEmbeddingService from '../services/upsertService.js';
import dotenv from 'dotenv';
dotenv.config();

async function main(index,pdf) {
    const documentEmbeddingService = new DocumentEmbeddingService(index);
    const pdfPath = pdf;

    try {
        await documentEmbeddingService.processAndUpsertPdf(pdfPath);
        console.log('PDF processed and embeddings upserted successfully.');
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

main('tracomgpt','../../static/AdaptiveSellingBook.pdf');
