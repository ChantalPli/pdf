import express from 'express';
import multer from 'multer';
import { uploadDocument } from '../controllers/documentController.js';
import { storage } from '../services/storageService.js';

const upload = multer({ storage });

const router = express.Router();

router.post('/upload', upload.single('document'), uploadDocument);

export default router;
