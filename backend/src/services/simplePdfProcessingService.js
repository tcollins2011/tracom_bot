import { getDocument } from 'pdfjs-dist/build/pdf.mjs';
import path from 'path';

/**
 * Processes a PDF file and splits its text content into chunks.
 * Each chunk contains a specified number of words, with some overlap between chunks.
 * The function returns an array of chunk objects, each containing metadata about the chunk.
 *
 * @param {string} pdfPath - The path to the PDF file to be processed.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of chunk objects.
 * Each chunk object contains the following properties:
 *   - id: A unique identifier for the chunk.
 *   - metadata: An object containing metadata about the chunk, including:
 *     - fileName: The name of the PDF file.
 *     - startPage: The starting page number of the chunk.
 *     - endPage: The ending page number of the chunk.
 *     - text: The text content of the chunk.
 */
export async function processPdf(pdfPath) {
    const loadingTask = getDocument(pdfPath);
    const pdf = await loadingTask.promise;

    let currentPageText = '';
    let chunks = [];
    const chunkSize = 1000;
    const overlapSize = 200;
    let currentChunkWords = [];
    let currentChunkStartPage = 1;
    let currentChunkEndPage = 0;
    const fileName = path.basename(pdfPath);

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const text = await page.getTextContent();
        currentPageText = text.items.map(item => item.str).join(' ');

        const pageWords = currentPageText.split(/\s+/);
        let wordsIndex = 0;

        while (wordsIndex < pageWords.length) {
            const spaceLeft = chunkSize - currentChunkWords.length;
            const wordsToAdd = pageWords.slice(wordsIndex, wordsIndex + spaceLeft);
            currentChunkWords = currentChunkWords.concat(wordsToAdd);
            wordsIndex += wordsToAdd.length;

            if (currentChunkWords.length >= chunkSize) {
                const chunkText = currentChunkWords.join(' ');
                const chunkId = `${fileName}-page${currentChunkStartPage}-to-${pageNum}`;
                chunks.push({
                    id: chunkId,
                    metadata: {
                        fileName,
                        startPage: currentChunkStartPage,
                        endPage: pageNum,
                        text: chunkText,
                    }
                });

                currentChunkWords = currentChunkWords.slice(currentChunkWords.length - overlapSize);
                currentChunkStartPage = pageNum;
            }
        }

        currentChunkEndPage = pageNum;
    }

    if (currentChunkWords.length > 0) {
        const chunkText = currentChunkWords.join(' ');
        const chunkId = `${fileName}-page${currentChunkStartPage}-to-${currentChunkEndPage}`;
        chunks.push({
            id: chunkId,
            metadata: {
                fileName,
                startPage: currentChunkStartPage,
                endPage: currentChunkEndPage,
                text: chunkText,
            }
        });
    }
    return chunks;
}

