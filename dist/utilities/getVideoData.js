"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideoData = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getVideoData = (pathVideo, baseUrl) => {
    try {
        const absolutePath = path_1.default.resolve(pathVideo);
        const videoBuffer = fs_1.default.readFileSync(absolutePath);
        const videoName = path_1.default.basename(pathVideo);
        const videoType = path_1.default.extname(pathVideo).substring(1);
        const videoSize = videoBuffer.length;
        const videoUrl = `${baseUrl}/${pathVideo.replace(/\\/g, '/')}`;
        return {
            name: videoName,
            type: videoType,
            size: videoSize,
            url: videoUrl
        };
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`Error al leer el video: ${error.message}`);
        }
        else {
            console.error('Error desconocido al leer el video');
        }
        return null;
    }
};
exports.getVideoData = getVideoData;
//# sourceMappingURL=getVideoData.js.map