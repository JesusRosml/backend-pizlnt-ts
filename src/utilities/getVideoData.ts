import fs from 'fs';
import path from 'path';

interface VideoData {
    name: string;
    type: string;
    size: number;
    url: string;
}

export const getVideoData = ( pathVideo: string, baseUrl: string ): VideoData | null => {
    try {
        const absolutePath = path.resolve(pathVideo);
        const videoBuffer = fs.readFileSync(absolutePath);
        const videoName = path.basename(pathVideo);
        const videoType = path.extname(pathVideo).substring(1);
        const videoSize = videoBuffer.length;
        const videoUrl = `${baseUrl}/${pathVideo.replace(/\\/g, '/')}`;

        return {
            name: videoName,
            type: videoType,
            size: videoSize,
            url: videoUrl
        };
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error al leer el video: ${error.message}`);
        } else {
            console.error('Error desconocido al leer el video');
        }
        return null;
    }
};