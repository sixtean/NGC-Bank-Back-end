import { Request, Response } from "express";
import { NotifyService } from "../../services/notifications/notificationService";

export class NotifyController {
    static async createNotification(req: Request, res: Response) {
        try {
        const { token, icon, titulo, mensagem, lida } = req.body;

        if (!token || !titulo || !mensagem) {
            return res.status(400).json({ error: "Campos obrigatórios faltando" });
        }

        const notifyService = new NotifyService(token, icon, titulo, mensagem, lida ?? false);
        const notification = await notifyService.pushNotifyTable();

        return res.status(201).json({
            message: "Notificação criada com sucesso",
            notification,
        });
        } catch (error: any) {
        console.error("Erro no controller de notificações:", error);
        return res.status(500).json({ error: error.message || "Erro interno no servidor" });
        }
    }
}