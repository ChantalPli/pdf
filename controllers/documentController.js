import { extractTextFromPDF } from '../services/pdfService.js';
import { renameSync } from 'fs';
import { extname } from 'path';
import Document from '../models/Document.js';
import { extractData, extractCIIU, extractObjetoSocial } from '../utils/extractors.js';
import { Types } from 'mongoose';

export const uploadDocument = async (req, res) => {
    try {
        const filePath = req.file.path;
        const text = await extractTextFromPDF(filePath);
        const legalRepresentative = extractData(text, 'REPRESENTANTE LEGAL');
        const alternateLegalRepresentative = extractData(text, 'Representante legal suplente');
        const societyActivity = extractObjetoSocial(text, 'OBJETO SOCIAL');
        const ciiuCode = extractCIIU(text, 'CIIU');

        const fileId = new Types.ObjectId();

        const newDocument = new Document({
            legalRepresentative,
            alternateLegalRepresentative,
            societyActivity,
            ciiuCode,
            fileId,
        });

        await newDocument.save();

        const newFilePath = `saved_files/${fileId}${extname(req.file.originalname)}`;
        renameSync(filePath, newFilePath);

        res.status(200).json({
            message: 'Documento procesado y guardado exitosamente',
            fileId,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
