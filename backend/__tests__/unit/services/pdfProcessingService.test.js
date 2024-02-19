const { parsePdf, fragmentText, cleanText } = require('../../../src/services/pdfProcessingService');
const fs = require('fs');
const path = require('path');

describe('parsePdf', () => {
    it('should extract text correctly from a PDF', async () => {
      const pdfPath = path.join(__dirname, 'test_assets', 'sample.pdf'); 
      const text = await parsePdf(pdfPath);
      expect(text).toContain('Known text from your sample PDF');
      // Add more assertions as needed based on the expected content of your sample PDF
    });
  });
  
//   describe('fragmentText', () => {
//     it('should correctly fragment text into chapters or sections', () => {
//       const sampleText = 'Chapter 1: Introduction\nThis is the first chapter.\nChapter 2: Conclusion\nThis is the second chapter.';
//       const fragments = fragmentText(sampleText, /Chapter \d+:/);
//       expect(fragments.length).toBe(2); 
//       expect(fragments[0]).toContain('Introduction');
//       expect(fragments[1]).toContain('Conclusion');
//     });
//   });

//   describe('cleanText', () => {
//     it('should remove unnecessary spaces and special characters', () => {
//       const dirtyText = ' This is   a test text with  unnecessary   spaces. ';
//       const cleanedText = cleanText(dirtyText);
//       expect(cleanedText).toBe('This is a test text with unnecessary spaces.');
//     });
//   });
   