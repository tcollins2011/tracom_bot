import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import openAIRoutes from './src/api/openai.js';
import pdfRoutes from './src/api/pdf.js';
import feedbackRoutes from './src/api/feedback.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());

// Serve static files from the Vue app build directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../tracom-gpt/dist')));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Express backend!' });
});

app.use('/openai', openAIRoutes);
app.use('/pdf', pdfRoutes);
app.use('/feedback', feedbackRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// All non-API requests should be forwarded to the Vue app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
