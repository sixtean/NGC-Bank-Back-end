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
exports.registerUserController = registerUserController;
const RegisterUserService_1 = require("../../services/LoginUsersService/RegisterUserService");
function registerUserController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nome, email, senha } = req.body;
        if (!nome || !email || !senha) {
            return res.status(400).json({ error: 'Preencha todos os campos!' });
        }
        try {
            const result = yield (0, RegisterUserService_1.registerUserService)(nome, email, senha);
            return res.status(201).json(Object.assign({ dados: true }, result));
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
