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
const joi_1 = __importDefault(require("joi"));
const validationAuthenticationSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required()
});
exports.router = express_1.default.Router();
exports.router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = validationAuthenticationSchema.validate(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
    }
    const { email, password } = value;
    try {
        const isAuthenticated = yield UserService_1.UserService.userAuthentication(email, password);
        if (isAuthenticated.authentication) {
            res.json(isAuthenticated);
            return;
        }
        res.status(401).json(isAuthenticated);
    }
    catch (error) {
        console.error(`Error al autenticar al usuario: ${error}`);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}));
//# sourceMappingURL=authenticationRoute.js.map