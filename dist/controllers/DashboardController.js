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
exports.Dashboard = void 0;
const database_1 = require("../database/database");
const userModel_1 = require("../models/userModel");
const NotificationModel_1 = require("../models/NotificationModel");
const Dashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = database_1.Connection.getRepository(userModel_1.Users);
    const notificationRepo = database_1.Connection.getRepository(NotificationModel_1.Notification);
    const user = yield userRepository.findOne({
        where: { id: req.userId }
    });
    if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    return res.status(200).json({
        nome: user.nome,
    });
});
exports.Dashboard = Dashboard;
