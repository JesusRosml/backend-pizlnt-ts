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
exports.universityCareerService = void 0;
const mongoose_1 = require("mongoose");
const universityCourses_1 = __importDefault(require("../../database/schemas/universityCourses"));
class universityCareerService {
    static getAllUniversityCareers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const searchUniversityCareers = yield universityCourses_1.default.find();
                if (searchUniversityCareers) {
                    const universityCareers = searchUniversityCareers.map(career => (Object.assign(Object.assign({}, career.toObject()), { _id: new mongoose_1.Types.ObjectId(career._id.toString()) })));
                    return universityCareers;
                }
                return [];
            }
            catch (error) {
                console.error(`Error al obtener las carreras universitarias: ${error}`);
                return [];
            }
        });
    }
    constructor(name) {
        this.name = name;
    }
    registerCareerUniversity() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCareerUniversity = new universityCourses_1.default({ name: this.name });
                yield newCareerUniversity.save();
                return { message: 'Carrera registrada correctamente', register: true };
            }
            catch (error) {
                console.error(`Error al registrar la carrera: ${error}`);
                return { message: 'Error interno del servidor', register: false };
            }
        });
    }
}
exports.universityCareerService = universityCareerService;
