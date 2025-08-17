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
function resetDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("⏳ Iniciando reset do banco de dados...");
            yield database_1.Connection.initialize();
            yield database_1.Connection.dropDatabase();
            yield database_1.Connection.synchronize();
            console.log("✅ Banco de dados resetado com sucesso!");
            process.exit(0);
        }
        catch (error) {
            console.error("❌ Erro ao resetar o banco de dados:", error);
            process.exit(1);
        }
    });
}
resetDatabase();
