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
exports.DashboardService = DashboardService;
const database_1 = require("../../database/database");
const userModel_1 = require("../../models/userModel");
function DashboardService(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepository = database_1.Connection.getRepository(userModel_1.Users);
        const user = yield userRepository.findOne({
            where: { id: userID },
            relations: ['notificacoes'],
        });
        if (!user) {
            throw new Error('Usuário não encontrado');
        }
        return {
            nome: user.nome,
            verificado: user.verificado,
            notificacoes: user.notificacoes.map(n => ({
                id: n.id,
                titulo: n.titulo,
                mensagem: n.mensagem,
                lida: n.lida,
                criadaEm: n.criadaEm,
            })),
        };
    });
}
