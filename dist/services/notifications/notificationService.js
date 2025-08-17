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
exports.NotifyService = void 0;
const database_1 = require("../../database/database");
const userModel_1 = require("../../models/userModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const NotificationModel_1 = require("../../models/NotificationModel");
class NotifyService {
    constructor(token, icon, titulo, mensagem, lida) {
        this.token = token,
            this.icon = icon,
            this.titulo = titulo,
            this.mensagem = mensagem,
            this.lida = lida;
    }
    decryptedToken() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decoded = jsonwebtoken_1.default.verify(this.token, process.env.JWT_SECRET);
                if (typeof decoded === "string") {
                    throw new Error("Invalid token payload");
                }
                if (!decoded.email) {
                    throw new Error('Email not found in token');
                }
                return decoded;
            }
            catch (err) {
                console.error('Erro ao verificar o token: ', err);
                throw new Error('Invalid token or expired');
            }
        });
    }
    pushNotifyTable() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('PushNotify ativado com sucesso!');
            try {
                const decoded = yield this.decryptedToken();
                const userRepo = database_1.Connection.getRepository(userModel_1.Users);
                const user = yield userRepo.findOne({ where: { email: decoded.email } });
                if (!user) {
                    throw new Error('User not found!');
                }
                const notifyRepo = database_1.Connection.getRepository(NotificationModel_1.Notification);
                const newNotification = notifyRepo.create({
                    user,
                    icon: this.icon,
                    titulo: this.titulo,
                    mensagem: this.mensagem,
                    lida: this.lida,
                });
                yield notifyRepo.save(newNotification);
                return newNotification;
            }
            catch (error) {
                throw new Error(error.message || "Erro ao salvar notificação");
            }
        });
    }
    listNotifications() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decoded = yield this.decryptedToken();
                const userRepo = database_1.Connection.getRepository(userModel_1.Users);
                const user = yield userRepo.findOne({
                    where: { email: decoded.email },
                    relations: ["notificacoes"]
                });
                if (!user) {
                    throw new Error("User not found!");
                }
                return user.notificacoes;
            }
            catch (err) {
                throw new Error(err.message || "Erro ao listar notificações");
            }
        });
    }
}
exports.NotifyService = NotifyService;
