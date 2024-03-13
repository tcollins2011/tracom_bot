import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import openAIRoutes from './src/api/openai.js';
import pdfRoutes from './src/api/pdf.js';  

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Express backend!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Use the OpenAI routes with a specific base path
app.use('/openai', openAIRoutes);
app.use('/pdf', pdfRoutes)

app.listen(port, () => {
  console.log(`Server listening at ${port}`);
});

