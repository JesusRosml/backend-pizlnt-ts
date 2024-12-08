import fs from 'fs';
import path from 'path';

interface ImageData {
    name: string;
    type: string;
    base64: string;
    size: number;
}

export const convertImageBase64 = (pathImage: string): (ImageData | null) => {
    try {
        const absolutePath = path.resolve(pathImage);
        const imageBuffer = fs.readFileSync(absolutePath);
        const base64Image = imageBuffer.toString('base64');
        const imageName = path.basename(pathImage);
        const imageType = path.extname(pathImage).substring(1);
        const imageSize = imageBuffer.length;

        return {
            name: imageName,
            type: imageType,
            base64: base64Image,
            size: imageSize
        };
    } catch (error) {
        (error instanceof Error) ?
            console.error(`Error al leer la imagen: ${error.message}`) : console.error('Error desconocido al leer la imagen');

        return null;
    }
}