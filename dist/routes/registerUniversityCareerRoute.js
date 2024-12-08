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
const UniversityCareerService_1 = require("./services/UniversityCareerService");
const joi_1 = __importDefault(require("joi"));
const validationRegisterSchema = joi_1.default.object({
    nameCareerUniversity: joi_1.default.string().required()
});
exports.router = express_1.default.Router();
exports.router.post('/registerCareer', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = validationRegisterSchema.validate(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
    }
    const { nameCareerUniversity } = value;
    try {
        const careerUniversity = new UniversityCareerService_1.UniversityCareerService(nameCareerUniversity);
        const registerResult = yield careerUniversity.registerCareerUniversity();
        if (registerResult.register) {
            res.status(201).json(registerResult);
            return;
        }
        res.status(401).json(registerResult);
    }
    catch (error) {
        console.error(`Error al registrar la carrera: ${error}`);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}));
//# sourceMappingURL=registerUniversityCareerRoute.js.map