import { diskStorage } from 'multer';
import { extname } from 'path';
import fs from 'fs';

const uploadDir = 'uploads';

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const savedFilesDir = 'saved_files';

if (!fs.existsSync(savedFilesDir)) {
    fs.mkdirSync(savedFilesDir);
}

export const storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
    },
});
