import { getDocument } from 'pdfjs-dist/build/pdf.mjs';

export async function processPdf(pdfPath) {
  const loadingTask = getDocument(pdfPath);
  const pdf = await loadingTask.promise;

  let textContent = '';

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const text = await page.getTextContent();
    textContent += text.items.map(item => item.str).join(' ');
  }

  const words = textContent.split(/\s+/);
  const chunks = [];
  const chunkSize = 1000;
  const overlapSize = 200;

  for (let i = 0; i < words.length; i += (chunkSize - overlapSize)) {
    const chunk = words.slice(i, i + chunkSize).join(' ');
    chunks.push(chunk);
  }

  return chunks
}


