import { Connection } from "../../database/database";
import { Users } from "../../models/userModel";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Notification } from "../../models/NotificationModel";
import type { NotificationDTO } from '../../dtos/notifications/notificationsDTO'

interface TokenPayload extends JwtPayload {
    email: string;
    id: string;
}
  

export class NotifyService {
    private token: string
    private icon: string;
    private titulo: string;
    private mensagem: string;
    private lida: boolean;

    constructor (token: string, icon: string, titulo: string, mensagem: string, lida: boolean) {
        this.token = token,
        this.icon = icon,
        this.titulo = titulo,
        this.mensagem = mensagem,
        this.lida = lida
    }


    private async decryptedToken(): Promise<TokenPayload> {
        try {
            const decoded = jwt.verify(this.token, process.env.JWT_SECRET as string) as TokenPayload;
            if (typeof decoded === "string") {
                throw new Error("Invalid token payload");
            }

            if(!decoded.email) {
                throw new Error('Email not found in token')
            }
            return decoded;
        } catch (err) {
            console.error('Erro ao verificar o token: ', err);
            throw new Error('Invalid token or expired')
        }
    }
    async pushNotifyTable(): Promise<NotificationDTO> {
        console.log('PushNotify ativado com sucesso!');
        try {
            const decoded = await this.decryptedToken();
            const userRepo = Connection.getRepository(Users);
            const user = await userRepo.findOne({ where: { email: decoded.email } })

            if (!user) {
                throw new Error('User not found!');
            }

            const notifyRepo = Connection.getRepository(Notification);
            const newNotification = notifyRepo.create({
                user,
                icon: this.icon,
                titulo: this.titulo,
                mensagem: this.mensagem,
                lida: this.lida,
            });

            await notifyRepo.save(newNotification);

            return newNotification;
            
        } catch (error: any) {
            throw new Error(error.message || "Erro ao salvar notificação");
        }
    }

    async notifyLida(idNotify: string) {
        try {
            const decoded = await this.decryptedToken();
            const userRepo = Connection.getRepository(Users);
            const user = await userRepo.findOne({ where: { email: decoded.email } })

            if (!user) {
                throw new Error('User not found!');
            }

            const notifyRepo = Connection.getRepository(Notification);
            const notify = await notifyRepo.findOne({
                where: {id: idNotify},
                relations: ['user'],
            });

            if(!notify || notify.user.id !== user.id) {
                throw new Error('Notification not found or does not belong to this user!');
            }

            notify.lida = true;

            await notifyRepo.save(notify);

            return notify;
            
        } catch (error) {
            console.error(error);
            throw new Error('Error internal in server.')
        }
    }
}