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
exports.criarNotificacao = void 0;
const database_1 = require("../database/database");
const NotificationModel_1 = require("../models/NotificationModel");
const userModel_1 = require("../models/userModel");
const notificationRepo = database_1.Connection.getRepository(NotificationModel_1.Notification);
const userRepo = database_1.Connection.getRepository(userModel_1.Users);
const criarNotificacao = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { icon, userId, titulo, mensagem } = params;
    const user = yield userRepo.findOneBy({ id: userId });
    if (!user)
        throw new Error("Usuário não encontrado");
    const novaNotif = notificationRepo.create({
        icon,
        titulo,
        mensagem,
        user,
    });
    return yield notificationRepo.save(novaNotif);
});
exports.criarNotificacao = criarNotificacao;
