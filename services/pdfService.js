import PdfParse from 'pdf-parse';
import fs from 'fs';

export const extractTextFromPDF = async (filePath) => {
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await PdfParse(dataBuffer);

    return pdfData.text;
};
