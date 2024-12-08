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
const UserService_1 = require("./services/UserService");
const users_1 = __importDefault(require("../database/schemas/users"));
const joi_1 = __importDefault(require("joi"));
const validationRegisterSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    surname: joi_1.default.string().required(),
    secondSurname: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
    career: joi_1.default.string().required(),
    admin: joi_1.default.boolean().required(),
    typeUser: joi_1.default.string().required()
});
exports.router = express_1.default.Router();
exports.router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = validationRegisterSchema.validate(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
    }
    const { name, surname, secondSurname, email, password, career, admin, typeUser } = value;
    try {
        const existingUser = yield users_1.default.findOne({ email });
        if (existingUser) {
            res.status(409).json({ message: 'El correo ya esta registrado' });
            return;
        }
        const userService = new UserService_1.UserService(name, surname, secondSurname, email, password, career, admin, typeUser);
        const resultUserService = yield userService.registerUser();
        if (resultUserService.register) {
            res.status(201).json(resultUserService);
            return;
        }
        res.status(500).json(resultUserService);
    }
    catch (error) {
        console.error(`Error al registrar al usuario: ${(error instanceof Error) ? error.message : 'Error desconocido'}`);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}));
//# sourceMappingURL=registerUserRoute.js.map