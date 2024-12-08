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
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_1 = __importDefault(require("../../database/schemas/users"));
const mongoose_1 = require("mongoose");
class UserService {
    static userAuthentication(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield users_1.default.findOne({ email }).select('password').lean();
                if (!user)
                    return { message: 'Usuario no encontrado', authentication: false };
                const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
                if (passwordMatch) {
                    const userWithoutPassword = yield users_1.default.findOne({ email }).select('-password').lean();
                    if (userWithoutPassword) {
                        const userWithoutPasswordTyped = Object.assign(Object.assign({}, userWithoutPassword), { _id: new mongoose_1.Types.ObjectId(userWithoutPassword._id.toString()) });
                        return { message: 'Usuario autenticado', authentication: true, user: userWithoutPasswordTyped };
                    }
                }
                return { message: 'Contraseña incorrecta', authentication: false };
            }
            catch (error) {
                console.error(`Error al autenticar al usuario: ${error}`);
                return { message: 'Error interno del servidor', authentication: false };
            }
        });
    }
    constructor(name, surname, secondSurname, email, password, career, admin, typeUser) {
        this.name = name;
        this.surname = surname;
        this.secondSurname = secondSurname;
        this.email = email;
        this.password = password;
        this.career = career;
        this.admin = admin;
        this.typeUser = typeUser;
    }
    registerUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = yield bcrypt_1.default.hash(this.password, 10);
                const newUser = new users_1.default({
                    name: this.name,
                    surname: this.surname,
                    secondSurname: this.secondSurname,
                    email: this.email,
                    password: hashedPassword,
                    career: this.career,
                    admin: this.admin,
                    typeUser: this.typeUser
                });
                yield newUser.save();
                return {
                    register: true,
                    message: 'Usuario registrado correctamente'
                };
            }
            catch (error) {
                console.log(`Error al registrar al usuario: ${error}`);
                return {
                    register: false,
                    message: 'Error interno del servidor'
                };
            }
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map