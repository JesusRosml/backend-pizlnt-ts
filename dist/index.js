"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connection_database_1 = __importDefault(require("./database/connection-database"));
const routes_1 = require("./routes");
(() => {
    const app = (0, express_1.default)();
    const PORT = process.env.PORT || '3000';
    connection_database_1.default.moongoseConnection;
    app.use((0, cors_1.default)({
        origin: 'http://127.0.0.1:5500',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    app.use('/uploads', express_1.default.static('uploads'));
    app.use(express_1.default.json());
    app.use(routes_1.authenticationRoute);
    app.use(routes_1.registerRoute);
    app.use(routes_1.registerUniversityCareerRoute);
    app.use(routes_1.getAllUniversityCareersRoute);
    app.use(routes_1.createPublicationRoute);
    app.use(routes_1.getPublicationsRoute);
    app.listen(PORT, () => {
        console.log(`Server is running in http://localhost:${PORT}`);
    });
})();
//# sourceMappingURL=index.js.map