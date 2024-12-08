"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const careerUniversitySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 100,
        unique: true,
    }
});
const CareerUniversity = mongoose_1.default.model('CareerUniversity', careerUniversitySchema);
exports.default = CareerUniversity;
//# sourceMappingURL=universityCourses.js.map