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
exports.dashboardService = void 0;
const database_1 = require("../../database/database");
const userModel_1 = require("../../models/userModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class dashboardService {
    constructor(token) {
        this.token = token;
    }
    decryptedToken() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decoded = jsonwebtoken_1.default.verify(this.token, process.env.JWT_SECRET);
                if (typeof decoded === "string") {
                    throw new Error("Invalid token payload");
                }
                if (!decoded.email) {
                    throw new Error('Email not found in token');
                }
                return decoded;
            }
            catch (err) {
                console.error('Erro ao verificar o token: ', err);
                throw new Error('Invalid token or expired');
            }
        });
    }
    getUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = yield this.decryptedToken();
                const userRepository = database_1.Connection.getRepository(userModel_1.Users);
                const user = yield userRepository.findOne({
                    where: { email: payload.email },
                    relations: ['notificacoes', 'bankData']
                });
                if (!user) {
                    throw new Error('User not found');
                }
                return user;
            }
            catch (err) {
                console.error('Error searching for user in database: ', err);
                throw new Error('Error for searching user');
            }
        });
    }
}
exports.dashboardService = dashboardService;
