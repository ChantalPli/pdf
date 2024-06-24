import { extractTextFromPDF } from '../services/pdfService.js';
import { renameSync } from 'fs';
import { extname } from 'path';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import Document from '../models/Document.js';
import { extractData, extractCIIU, extractObjetoSocial } from '../utils/extractors.js';
import { Types } from 'mongoose';
import { writeFileSync } from 'fs';

export const uploadDocument = async (req, res) => {
    try {
        const filePath = req.file.path;
        const text = await extractTextFromPDF(filePath);
        const legalRepresentative = extractData(text, 'REPRESENTANTE LEGAL');
        const alternateLegalRepresentative = extractData(text, 'Representante legal suplente');
        const societyActivity = extractObjetoSocial(text, 'OBJETO SOCIAL');
        const ciiuCode = extractCIIU(text, 'CIIU');

        const fileId = new Types.ObjectId();

        const dataText = `
        Legal Representative: ${legalRepresentative}
        Alternate Legal Representative: ${alternateLegalRepresentative}
        Society Activity: ${societyActivity}
        CIIU Code: ${ciiuCode}
        `;

        const pdfDoc = await PDFDocument.create()
        const page = pdfDoc.addPage()

        const fontSize = 8
        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
        const { width, height } = page.getSize()
        page.drawText(dataText, {
            x: 0,
            y: height - 4 * fontSize,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(0, 0, 0),
        })
        const pdfBytes = await pdfDoc.save()

        const newFilePath = `saved_files/${fileId}.pdf`;
        writeFileSync(newFilePath, pdfBytes);
        const newDocument = new Document({
            legalRepresentative,
            alternateLegalRepresentative,
            societyActivity,
            ciiuCode,
            fileId,
        });

        await newDocument.save();

        res.status(200).json({
            message: 'Documento procesado y guardado exitosamente',
            fileId,
            legalRepresentative,
            alternateLegalRepresentative,
            societyActivity,
            ciiuCode
        });


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
