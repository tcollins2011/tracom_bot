// src/services/OpenAIService.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Your backend base URL
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default {
  getOpenAIResponse(prompt) {
    return apiClient.post('/openai', { prompt });
  }
};
