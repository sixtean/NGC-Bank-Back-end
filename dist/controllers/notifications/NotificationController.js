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
exports.NotifyController = void 0;
const notificationService_1 = require("../../services/notifications/notificationService");
class NotifyController {
    static createNotification(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token, icon, titulo, mensagem, lida } = req.body;
                if (!token || !titulo || !mensagem) {
                    return res.status(400).json({ error: "Campos obrigatórios faltando" });
                }
                const notifyService = new notificationService_1.NotifyService(token, icon, titulo, mensagem, lida !== null && lida !== void 0 ? lida : false);
                const notification = yield notifyService.pushNotifyTable();
                return res.status(201).json({
                    message: "Notificação criada com sucesso",
                    notification,
                });
            }
            catch (error) {
                console.error("Erro no controller de notificações:", error);
                return res.status(500).json({ error: error.message || "Erro interno no servidor" });
            }
        });
    }
    static getNotifications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token } = req.body;
                if (!token)
                    return res.status(400).json({ error: "Token obrigatório" });
                const notifyService = new notificationService_1.NotifyService(token, "", "", "", false);
                const notifications = yield notifyService.listNotifications();
                return res.status(200).json({ notifications });
            }
            catch (error) {
                console.error("Erro ao listar notificações:", error);
                return res.status(500).json({ error: error.message || "Erro interno no servidor" });
            }
        });
    }
}
exports.NotifyController = NotifyController;
