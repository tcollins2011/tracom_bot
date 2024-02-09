// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

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

// Inside server.js or your route setup file
const openAIRoutes = require('./src/api/openai');

// Use the OpenAI routes with a specific base path
app.use('/api/openai', openAIRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
