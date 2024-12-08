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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const PublicationService_1 = require("./services/PublicationService");
const convertImageBase64_1 = require("../utilities/convertImageBase64");
const getVideoData_1 = require("../utilities/getVideoData");
exports.router = express_1.default.Router();
const BASE_URL = 'http://localhost:3000';
exports.router.post('/getPublications', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category } = req.body;
        const allPublications = yield PublicationService_1.PublicationService.getAllPublicationCategory(category);
        const publications = allPublications.map(publication => {
            const { pathVideo, pathImage } = publication, rest = __rest(publication, ["pathVideo", "pathImage"]);
            return Object.assign(Object.assign({}, rest), { image: (pathImage) ? (0, convertImageBase64_1.convertImageBase64)(pathImage) : null, video: (pathVideo) ? (0, getVideoData_1.getVideoData)(pathVideo, BASE_URL) : null });
        });
        res.status(201).json(publications);
    }
    catch (error) {
        console.error(`Error al obtener las publicaciones: ${error}`);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}));
//# sourceMappingURL=getPublicationsRoute.js.map