import express from 'express';
const router = express.Router();

import { feedBack } from '../controllers/feedbackController.js';

router.post('/submission', feedBack);

export default router