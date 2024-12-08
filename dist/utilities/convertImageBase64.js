"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertImageBase64 = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const convertImageBase64 = (pathImage) => {
    try {
        const absolutePath = path_1.default.resolve(pathImage);
        const imageBuffer = fs_1.default.readFileSync(absolutePath);
        const base64Image = imageBuffer.toString('base64');
        const imageName = path_1.default.basename(pathImage);
        const imageType = path_1.default.extname(pathImage).substring(1);
        const imageSize = imageBuffer.length;
        return {
            name: imageName,
            type: imageType,
            base64: base64Image,
            size: imageSize
        };
    }
    catch (error) {
        (error instanceof Error) ?
            console.error(`Error al leer la imagen: ${error.message}`) : console.error('Error desconocido al leer la imagen');
        return null;
    }
};
exports.convertImageBase64 = convertImageBase64;
//# sourceMappingURL=convertImageBase64.js.map