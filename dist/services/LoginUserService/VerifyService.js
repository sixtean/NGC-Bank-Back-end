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
exports.VerifyService = void 0;
const database_1 = require("../../database/database");
const userModel_1 = require("../../models/userModel");
class VerifyService {
    constructor(code) {
        this.code = code;
    }
    ;
    verify() {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = database_1.Connection.getRepository(userModel_1.Users);
            const user = yield userRepository.findOne({ where: { codigoVerificacao: this.code } });
            if (!user) {
                return {
                    success: false,
                    message: 'User not found'
                };
            }
            if (user === null || user === void 0 ? void 0 : user.verificado) {
                return {
                    success: false,
                    message: 'User already verified'
                };
            }
            if ((user === null || user === void 0 ? void 0 : user.codigoVerificacao) === this.code) {
                user.verificado = true;
                yield userRepository.save(user);
                return { success: true };
            }
            return { success: false, message: 'Invalid code' };
        });
    }
}
exports.VerifyService = VerifyService;
