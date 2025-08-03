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
exports.RegisterUser = void 0;
const userModel_1 = require("../../models/userModel");
const database_1 = require("../../database/database");
const bcrypt_1 = __importDefault(require("bcrypt"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class RegisterUser {
    constructor(data) {
        this.data = data;
    }
    createCode() {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        return code;
    }
    sendEmail(code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transporter = nodemailer_1.default.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.NODEMAILER_USER,
                        pass: process.env.NODEMAILER_PASS
                    }
                });
                yield transporter.sendMail({
                    from: 'NGC Bank',
                    to: this.data.email,
                    subject: 'Código de Verificação',
                    html: `
                    <h1 style="color: #8b00ff; font-family: Arial, sans-serif;">NGC Bank</h1>
                    <div style="width: 90%;">    
                        <p style="font-size: 18px; color: #333;">
                            Obrigado por fazer parte da NGC Bank ${this.data.name}. <br> O codigo abaixo é de uso pessoal e não deve ser compartilhado com terceiros, esse codigo é valido somente para você.
                            <br><br>
                            Seu código de verificação é: <strong style="color: red;">${code}</strong>
                        </p>
                    </div>
                    <footer style="border-top: 1px solid purple;">
                        <p>Este é um email altomatico e não deve ser respondido. A equipe NGC Bank agradece</p>
                    </footer>
                `
                });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    verifyUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = database_1.Connection.getRepository(userModel_1.Users);
            const userVerify = yield userRepository.findOne({ where: { email: this.data.email } });
            if ((userVerify === null || userVerify === void 0 ? void 0 : userVerify.email) === this.data.email) {
                throw new Error('User already exists');
            }
            const code = this.createCode();
            yield this.sendEmail(code);
            const criptoPassword = yield bcrypt_1.default.hash(this.data.password, 10);
            const payload = {
                email: this.data.email,
            };
            const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });
            const newUser = userRepository.create({
                nome: this.data.name,
                email: this.data.email,
                senha: criptoPassword,
                cpf: this.data.cpf,
                codigoVerificacao: code,
                verificado: false,
                token: token
            });
            yield userRepository.save(newUser);
            return {
                token: token
            };
        });
    }
}
exports.RegisterUser = RegisterUser;
