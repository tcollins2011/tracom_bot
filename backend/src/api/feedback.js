import express from 'express';
const router = express.Router();

// Routes to feedBack Database
import { feedBack } from '../controllers/feedbackController.js';

router.post('/feedback', feedBack);

export default router