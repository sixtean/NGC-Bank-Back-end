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
exports.verifyCode = void 0;
const database_1 = require("../database/database");
const userModel_1 = require("../models/userModel");
const verifyCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [email, codigo] = req.body;
    if (!email || !codigo) {
        return res.status(400).json({
            error: 'Preeencha todos os campos!'
        });
    }
    const userRepository = database_1.Connection.getRepository(userModel_1.Users);
    const user = yield userRepository.findOne({ where: { email } });
    if (!user) {
        return res.status(404).json({
            error: 'Usuário não encontrado!'
        });
    }
    if (user.verificado) {
        return res.status(400).json({
            error: 'Usuário já verificado!'
        });
    }
    if (user.codigoVerificacao !== codigo) {
        return res.status(401).json({
            erro: 'Código Incorreto!'
        });
    }
    user.verificado = true;
    yield userRepository.save(user);
    return res.status(200).json({
        message: 'Usuário verificado com sucesso!'
    });
});
exports.verifyCode = verifyCode;
