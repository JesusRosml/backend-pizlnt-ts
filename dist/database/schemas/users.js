"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 50 },
    surname: { type: String, required: true, minlength: 3, maxlength: 50 },
    secondSurname: { type: String, required: true, minlength: 3, maxlength: 50 },
    email: { type: String, required: true, minlength: 10, maxlength: 255, index: true, unique: true },
    password: { type: String, required: true, minlength: 8, maxlength: 1024 },
    career: { type: String, required: true, minlength: 3, maxlength: 50 },
    admin: { type: Boolean, required: true },
    typeUser: { type: String, required: true, minlength: 3, maxlength: 50 },
});
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
//# sourceMappingURL=users.js.map