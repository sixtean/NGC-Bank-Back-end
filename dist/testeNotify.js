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
const database_1 = require("./database/database");
const Notifications_1 = require("./middlewares/Notifications");
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.Connection.initialize();
        const userId = "20db7a83-4b83-47d2-8327-f5bdb9f3688e";
        const notificacao = yield (0, Notifications_1.criarNotificacao)(userId, "🎉 Bem-vindo!", "Obrigado por testar o sistema de notificações!");
        console.log("✅ Notificação criada:", notificacao);
        process.exit(0);
    }
    catch (err) {
        console.error("❌ Erro ao criar notificação:", err);
        process.exit(1);
    }
}))();
