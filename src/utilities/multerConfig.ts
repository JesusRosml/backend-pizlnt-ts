import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';
import { FileFilterCallback } from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder: string = file.mimetype.startsWith('image/') ? 'uploads/images' : 'uploads/videos';
        fs.mkdirSync(folder, { recursive: true });

        cb(null, folder);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix: string = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ storage, fileFilter });

export default upload;