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
exports.LoginController = void 0;
const LoginService_1 = require("../../services/LoginUserService/LoginService");
class LoginController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const service = new LoginService_1.LoginService(email, password);
                const user = yield service.getUser();
                return res.status(200).json({
                    verify: user.verify,
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
exports.LoginController = LoginController;
