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
exports.PublicationService = void 0;
const mongoose_1 = require("mongoose");
const publication_1 = __importDefault(require("../../database/schemas/publication"));
class PublicationService {
    static getAllPublicationCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const searchPublications = yield publication_1.default.find({ category: category });
                if (searchPublications) {
                    const publications = searchPublications.map(publication => (Object.assign(Object.assign({}, publication.toObject()), { _id: new mongoose_1.Types.ObjectId(publication._id.toString()) })));
                    return publications;
                }
                return [];
            }
            catch (error) {
                console.error(`Error al obtener todas las publicaciones de ${category}: ${error}`);
                return [];
            }
        });
    }
    constructor(title, titleColor, description, descriptionColor, category, user, email, pathImage, pathVideo) {
        this.title = title;
        this.titleColor = titleColor;
        this.description = description;
        this.descriptionColor = descriptionColor;
        this.category = category;
        this.user = user;
        this.email = email;
        this.pathImage = pathImage;
        this.pathVideo = pathVideo;
    }
    createPublication() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newPublication = new publication_1.default({
                    title: this.title,
                    titleColor: this.titleColor,
                    description: this.description,
                    descriptionColor: this.descriptionColor,
                    category: this.category,
                    user: this.user,
                    email: this.email,
                    pathImage: this.pathImage,
                    pathVideo: this.pathVideo
                });
                yield newPublication.save();
                return {
                    register: true,
                    message: 'Publicación registrada correctamente'
                };
            }
            catch (error) {
                console.log(`Error al registrar la publicación: ${error}`);
                return {
                    register: false,
                    message: 'Error interno del servidor'
                };
            }
        });
    }
}
exports.PublicationService = PublicationService;
//# sourceMappingURL=PublicationService.js.map