"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const PublicationService_1 = require("./services/PublicationService");
const joi_1 = __importDefault(require("joi"));
const multerConfig_1 = __importDefault(require("../utilities/multerConfig"));
const fs_1 = __importDefault(require("fs"));
const validationPublicationSchema = joi_1.default.object({
    title: joi_1.default.string().min(10).required(),
    titleColor: joi_1.default.string().required(),
    description: joi_1.default.string().min(10).required(),
    descriptionColor: joi_1.default.string().required(),
    category: joi_1.default.string().required(),
    image: joi_1.default.string().optional(),
    video: joi_1.default.string().optional(),
    user: joi_1.default.string().required(),
    email: joi_1.default.string().email().required()
});
exports.router = express_1.default.Router();
const validatePublication = (req, res, next) => {
    const { title, titleColor, description, descriptionColor, category, user, email } = req.body;
    const { error } = validationPublicationSchema.validate({
        title,
        titleColor,
        description,
        descriptionColor,
        category,
        user,
        email
    });
    if (error) {
        const files = req.files;
        if (files) {
            Object.values(files).forEach((fileArray) => {
                fileArray.forEach((file) => {
                    fs_1.default.unlinkSync(file.path);
                });
            });
        }
        res.status(400).json({ message: error.details[0].message, register: false });
        return;
    }
    next();
};
exports.router.post('/createPublication', multerConfig_1.default.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), validatePublication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const files = req.files;
        const imagePath = files['image'] ? files['image'][0].path : undefined;
        const videoPath = files['video'] ? files['video'][0].path : undefined;
        const { title, titleColor, description, descriptionColor, category, user, email } = req.body;
        const publicationService = new PublicationService_1.PublicationService(title, titleColor, description, descriptionColor, category, user, email, imagePath, videoPath);
        const resultSavePublication = yield publicationService.createPublication();
        res.status(201).json(resultSavePublication);
    }
    catch (error) {
        console.error(`Error al registrar la publicación: ${error instanceof Error ? error.message : 'Error desconocido'}`);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}));
//# sourceMappingURL=createPublicationRoute.js.map