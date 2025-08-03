"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database/database");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const login_1 = __importDefault(require("./routes/login"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true
}));
app.use(express_1.default.json());
app.use('/user', login_1.default);
const PORT = 5000;
database_1.Connection.initialize()
    .then(() => {
    console.log('🟢 Banco de dados conectado com sucesso!');
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
})
    .catch((error) => {
    console.error('🔴 Erro ao se conectar no banco: ', error);
});
