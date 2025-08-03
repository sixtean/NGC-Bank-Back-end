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
exports.RegisterControler = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const RegisterService_1 = require("../../services/LoginUserService/RegisterService");
const RegisterUserDTO_1 = require("../../dtos/RegisterUserDTO");
class RegisterControler {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dto = (0, class_transformer_1.plainToInstance)(RegisterUserDTO_1.RegisterUserDTO, req.body);
            const errors = yield (0, class_validator_1.validate)(dto);
            if (errors.length > 0) {
                const messages = errors.map(err => Object.values(err.constraints || {})).flat();
                return res.status(400).json({ error: messages });
            }
            try {
                const data = req.body;
                const registerService = new RegisterService_1.RegisterUser(data);
                const user = yield registerService.verifyUser();
                return res.status(200).json({
                    token: user.token,
                });
            }
            catch (error) {
                return res.status(400).json({
                    error: error.message
                });
            }
        });
    }
}
exports.RegisterControler = RegisterControler;
