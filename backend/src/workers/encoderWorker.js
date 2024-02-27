import { parentPort } from 'worker_threads';

parentPort.on('message', (task) => {
  const { enc, textChunk } = task;

  // Perform the encoding operation here
  const outputTokens = enc.encode(textChunk);
  const outputTokenCount = outputTokens.length;

  // Send the result back to the main thread
  parentPort.postMessage({ outputTokenCount });
});
