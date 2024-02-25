import { readFileSync } from 'fs';
import { getDocument }from 'pdfjs-dist/build/pdf.mjs';
import Tesseract from 'tesseract.js';
import {  createCanvas, loadImage, ImageData  } from 'canvas';

class PdfChapterExtractor {
    constructor(pdfPath) {
        this.pdfPath = pdfPath;
        this.pdfDocument = null;
    }

    async init() {
        const data = new Uint8Array(readFileSync(this.pdfPath));
        this.pdfDocument = await getDocument({ data }).promise;
    }

    async extractChapters() {
        if (!this.pdfDocument) {
            await this.init();
        }

        let chapters = [];
        let currentChapterContent = '';
        let currentChapterStartPage = 1;

        for (let pageNum = 1; pageNum <= this.pdfDocument.numPages; pageNum++) {
            const page = await this.pdfDocument.getPage(pageNum);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');

            const isChapterStart = this.isChapterStart(pageText);
            if (isChapterStart && currentChapterContent) {
                chapters.push({ content: currentChapterContent, startPage: currentChapterStartPage });
                currentChapterContent = '';
                currentChapterStartPage = pageNum;
            }
            currentChapterContent += pageText;

            // Extract images and check for chapter titles within them
            const imgSrcs = await this.extractImagesFromPage(page);
            for (let imgSrc of imgSrcs) {
                const imgText = await this.performOcr(imgSrc);
                if (this.isChapterStart(imgText)) {
                    chapters.push({ content: currentChapterContent, startPage: currentChapterStartPage });
                    currentChapterContent = '';
                    currentChapterStartPage = pageNum;
                    break; // Assuming only one chapter title per page
                }
            }
        }

        // Add the last chapter
        if (currentChapterContent) {
            chapters.push({ content: currentChapterContent, startPage: currentChapterStartPage });
        }

        return chapters;
    }

    isChapterStart(text) {
        // Implement logic to determine if the given text indicates the start of a new chapter
        const chapterPattern = /Chapter \d+: \w+/; // Example pattern, adjust as needed
        return chapterPattern.test(text);
    }

    async extractImagesFromPage(page) {
        const viewport = page.getViewport({ scale: 1.0 });
        const canvas = createCanvas(viewport.width, viewport.height);
        const context = canvas.getContext('2d');

        const renderContext = {
            canvasContext: context,
            viewport: viewport,
        };

        await page.render(renderContext).promise;

        return [canvas.toDataURL('image/png')];
    }

    async preprocessImageForOcr(imageSrc) {
        // Load the image from the source
        const image = await loadImage(imageSrc);
    
        // Create a canvas and draw the loaded image onto it
        const canvas = createCanvas(image.width, image.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
    
        // Convert to grayscale
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < imageData.data.length; i += 4) {
            let avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
            imageData.data[i] = avg; // red
            imageData.data[i + 1] = avg; // green
            imageData.data[i + 2] = avg; // blue
        }
        ctx.putImageData(imageData, 0, 0);
    
        // Binarization (Thresholding)
        // imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        // const threshold = 190; // This value can be adjusted depending on the image
        // for (let i = 0; i < imageData.data.length; i += 4) {
        //     const brightness = 0.34 * imageData.data[i] + 0.5 * imageData.data[i + 1] + 0.16 * imageData.data[i + 2];
        //     const binaryColor = brightness < threshold ? 0 : 255;
        //     imageData.data[i] = binaryColor; // red
        //     imageData.data[i + 1] = binaryColor; // green
        //     imageData.data[i + 2] = binaryColor; // blue
        // }
        // ctx.putImageData(imageData, 0, 0);
    
        // Return the preprocessed image data as a data URL
        return canvas.toDataURL('image/png');
    }

    async performOcr(imageSrc) {
        const { data: { text } } = await Tesseract.recognize(imageSrc, 'eng');
        return text;
    }
}

export default PdfChapterExtractor;