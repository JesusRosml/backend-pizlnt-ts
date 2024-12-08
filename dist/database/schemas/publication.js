"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const getCurrentSchedule_1 = require("../../utilities/getCurrentSchedule");
const publicationSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 150,
    },
    titleColor: {
        type: String,
        default: "#000000",
        minlength: 7,
        maxlength: 7,
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 500,
    },
    descriptionColor: {
        type: String,
        default: "#000000",
        minlength: 7,
        maxlength: 7,
    },
    category: {
        type: String,
        required: true,
        minlength: 3
    },
    user: {
        type: String,
        minlength: 10,
        required: true,
    },
    email: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 255,
    },
    pathImage: {
        type: String,
    },
    pathVideo: {
        type: String,
    },
    date: {
        type: String,
        default: () => (0, getCurrentSchedule_1.getCurrentSchedule)(new Date()),
    }
});
const Publication = mongoose_1.default.model('Publication', publicationSchema);
exports.default = Publication;
//# sourceMappingURL=publication.js.map