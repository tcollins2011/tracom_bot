import express from 'express';
const router = express.Router();

import { servePDF } from '../controllers/pdfController.js';

router.get('/:filename', servePDF);

export default router;
