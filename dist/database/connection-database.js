"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI)
    throw new Error('La variable de entorno "MONGODB_URI" no tiene un valor');
mongoose_1.default
    .connect(MONGODB_URI)
    .then(() => console.log('Conexión exitosa a la base de datos'))
    .catch(error => console.log(`Error al conectar con la base de datos: ${error}`));
mongoose_1.default.connection.on('error', error => console.log(`Error de conexión a la base de datos: ${error}`));
exports.default = {
    moongoseConnection: mongoose_1.default.connection,
};
//# sourceMappingURL=connection-database.js.map