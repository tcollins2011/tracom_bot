import { readFileSync } from 'fs';
import pdfjsLib from 'pdfjs-dist/build/pdf.mjs';
import workerSrc from 'pdfjs-dist/build/pdf.worker.mjs';

// Setting up the worker source for pdfjsLib
pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

async function parsePdf(pdfPath) {
    const data = new Uint8Array(readFileSync(pdfPath));
    const loadingTask = pdfjsLib.getDocument({data});
    const pdf = await loadingTask.promise;

    let fullText = '';

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const textItems = textContent.items.map(item => item.str);
        fullText += textItems.join(' ') + '\n'; // Add a newline at the end of each page's text
    }

    return fullText;
}

function fragmentText(text, delimiterRegex = /Chapter \d+/) {
    // Split text using the provided regex pattern for chapters or sections
    const fragments = text.split(delimiterRegex).filter(Boolean); // Remove any empty strings from the array
    return fragments;
}

function cleanText(text) {
    // Example: Replace multiple spaces with a single space and trim whitespace
    return text.replace(/\s+/g, ' ').trim();
}

// Exporting functions using ESM syntax
export { parsePdf, fragmentText, cleanText };
