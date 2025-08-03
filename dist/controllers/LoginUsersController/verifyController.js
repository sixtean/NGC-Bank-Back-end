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
exports.verifyUserController = void 0;
const database_1 = require("../../database/database");
const userModel_1 = require("../../models/userModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo } = req.body;
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: 'Token não fornecido.' });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const userRepository = database_1.Connection.getRepository(userModel_1.Users);
        const user = yield userRepository.findOne({ where: { id: decoded.id } });
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }
        if (user.verificado) {
            return res.status(200).json({ message: "Conta já verificada.", verificado: true });
        }
        if (user.codigoVerificacao !== codigo) {
            return res.status(401).json({ error: "Código incorreto.", verificado: false });
        }
        user.verificado = true;
        user.codigoVerificacao = '';
        yield userRepository.save(user);
        return res.status(200).json({
            message: 'Conta verificada com sucesso!',
            verificado: true
        });
    }
    catch (error) {
        return res.status(401).json({
            error: 'Token invalido ou expirado.'
        });
    }
});
exports.verifyUserController = verifyUserController;
