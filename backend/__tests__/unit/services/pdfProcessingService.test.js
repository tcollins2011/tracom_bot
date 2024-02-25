import  PdfChapterExtractor  from '../../../src/services/pdfProcessingService.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Handling __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('PdfChapterExtractor Integration Tests', () => {
  let extractor;

  beforeAll(() => {
      // Initialize the PdfChapterExtractor with a real PDF file path
      const pdfPath = path.join(__dirname, 'test_assets', 'sample.pdf');
      extractor = new PdfChapterExtractor(pdfPath);
  });

  it('should extract images from a real PDF page', async () => {
      await extractor.init();
      const page = await extractor.pdfDocument.getPage(1); // Assuming you want to test the first page
      const images = await extractor.extractImagesFromPage(page);

      // Assertions based on expected outcomes from the real PDF content
      expect(images.length).toBeGreaterThan(0); // Expecting at least one image to be extracted
      
      const ocrText = []
      for (const imageSrc of images) {
        const text = await extractor.preprocessImageForOcr(imageSrc);
        ocrText.push(text)
      }
      const final = []
      for (const image of ocrText) {
        const text = await extractor.performOcr(image);
        final.push(text)
      }
      console.log(final[1])
      // More detailed assertions depending on what you expect from the specific test PDF
  });

  // Add more test cases as needed for other functionalities or scenarios
});

