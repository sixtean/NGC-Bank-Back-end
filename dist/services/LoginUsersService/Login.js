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
exports.loginUserService = loginUserService;
const userModel_1 = require("../../models/userModel");
const database_1 = require("../../database/database");
const bcrypt_1 = __importDefault(require("bcrypt"));
function loginUserService(email, senha) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepository = database_1.Connection.getRepository(userModel_1.Users);
        const user = yield userRepository.findOne({ where: { email } });
        console.log('Usuário: ', user);
        if (!user) {
            throw new Error("Email ou senha incorretos.");
        }
        const senhaDecoded = yield bcrypt_1.default.compare(senha, user.senha);
        if (!senhaDecoded) {
            throw new Error("Email ou senha incorretos.");
        }
        return {
            nome: user.nome,
            id: user.id,
            email: user.email,
        };
    });
}
