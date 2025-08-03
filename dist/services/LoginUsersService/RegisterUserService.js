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
exports.registerUserService = registerUserService;
const database_1 = require("../../database/database");
const userModel_1 = require("../../models/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const nodemailer_1 = __importDefault(require("nodemailer"));
dotenv_1.default.config();
function registerUserService(nome, email, senha) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepository = database_1.Connection.getRepository(userModel_1.Users);
        const emailExist = yield userRepository.findOne({ where: { email } });
        if (emailExist)
            throw new Error("Email já registrado!");
        const hashedPassword = yield bcrypt_1.default.hash(senha, 10);
        const codigoVerificacao = Math.floor(100000 + Math.random() * 900000).toString();
        const user = userRepository.create({
            nome,
            email,
            senha: hashedPassword,
            codigoVerificacao,
            verificado: false,
        });
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1m' });
        user.token = token;
        yield userRepository.save(user);
        yield sendVerificationEmail(email, codigoVerificacao);
        return {
            token,
            message: "Usuário cadastrado. Verifique seu e-mail para ativar sua conta.",
            user: {
                verificado: user.verificado,
                id: user.id,
                nome: user.nome,
                email: user.email,
            },
        };
    });
}
function sendVerificationEmail(email, codigo) {
    return __awaiter(this, void 0, void 0, function* () {
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS,
            },
        });
        const mailOptions = {
            from: 'NGC Bank',
            to: email,
            subject: 'Código de Verificação - NGC Bank',
            html: `
            <h2>Bem-vindo ao NGC Bank</h2>
            <p>Seu código de verificação é:</p>
            <h1>${codigo}</h1>
            <p>Digite esse codigo no site para confirmar seu e-mail.<p>
            <br />
            <smail>Se você não se cadastrou, ignore este e-mail.</small>
        `,
        };
        const result = yield transporter.sendMail(mailOptions);
        return result;
    });
}
