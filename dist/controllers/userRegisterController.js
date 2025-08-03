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
exports.userRegister = void 0;
const database_1 = require("../database/database");
const userModel_1 = require("../models/userModel");
const nodemailer_1 = __importDefault(require("nodemailer"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const userRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, senha, nome } = req.body;
    if (!email || !senha || !nome) {
        return res.status(400).json({
            error: 'Preencha todos os campos!'
        });
    }
    const userRepository = database_1.Connection.getRepository(userModel_1.Users);
    const emailExist = yield userRepository.findOne({ where: { email } });
    console.log(emailExist);
    if (emailExist) {
        return res.status(400).json({
            error: 'Email já registrado!'
        });
    }
    const hashedPassword = yield bcrypt_1.default.hash(senha, 10);
    const codigoVerificacao = Math.floor(100000 + Math.random() * 900000).toString();
    const user = userRepository.create({
        nome,
        email,
        senha: hashedPassword,
        codigoVerificacao,
        verificado: false
    });
    yield userRepository.save(user);
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS,
        },
    });
    const mailOptions = {
        from: process.env.NODEMAILER_USER,
        to: email,
        subject: 'Código de verificação NGC',
        html: `
            <h2>Bem-vindo ao NGC Bank</h2>
            <p>Seu código de verificação é:</p>
            <h1>${codigoVerificacao}</h1>
            <p>Digite este código no aplicativo para confirmar seu e-mail.</p>
            <br />
            <small>Se você não se cadastrou, ignore este e-mail.</small>
        `
    };
    const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    user.token = token;
    yield userRepository.save(user);
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({
                error: 'Erro ao enviar email de verificação!'
            });
        }
        else {
            return res.status(201).json({
                token,
                dados: true,
                message: 'Usuário cadastrado. Verifique seu email para ativar sua conta.',
                user: {
                    verificado: user.verificado
                }
            });
        }
    });
});
exports.userRegister = userRegister;
