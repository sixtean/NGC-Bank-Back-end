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
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarNotificacaoManual = void 0;
const database_1 = require("../../database/database");
const NotificationModel_1 = require("../../models/NotificationModel");
const userModel_1 = require("../../models/userModel");
const notifyRepo = database_1.Connection.getRepository(NotificationModel_1.Notification);
const userRepo = database_1.Connection.getRepository(userModel_1.Users);
const criarNotificacaoManual = () => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { icon, titulo, mensagem } = req.body;
    if (!icon || !titulo || !mensagem) {
        return res.status(400).json({ error: 'Campos obrigatórios faltando: icon, titulo, mensagem' });
    }
    try {
        const userId = req.userId;
        const user = yield userRepo.findOneBy({ id: userId });
        if (!user)
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        const novaNotificacao = notifyRepo.create({
            icon,
            titulo,
            mensagem,
            user,
        });
        const salva = yield notifyRepo.save(novaNotificacao);
        return res.status(201).json({
            message: "Notificação criada com sucesso",
            notificacao: salva
        });
    }
    catch (err) {
        console.error("Erro ao criar notificação:", err);
        res.status(500).json({ error: "Erro interno ao criar notificação" });
    }
});
exports.criarNotificacaoManual = criarNotificacaoManual;
