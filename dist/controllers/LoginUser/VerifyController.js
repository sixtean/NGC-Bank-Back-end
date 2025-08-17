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
exports.VerifyController = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const VerifyCode_1 = require("../../dtos/login/VerifyCode");
const VerifyService_1 = require("../../services/LoginUserService/VerifyService");
class VerifyController {
    handleController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dto = (0, class_transformer_1.plainToInstance)(VerifyCode_1.VerifyCodeDTO, req.body);
            const errors = yield (0, class_validator_1.validate)(dto);
            if (errors.length > 0) {
                const messages = errors.map(err => Object.values(err.constraints || {})).flat();
                return res.status(400).json({ error: messages });
            }
            try {
                const data = req.body;
                const verifyService = new VerifyService_1.VerifyService(data.code);
                const user = yield verifyService.verify();
                if (!user.success) {
                    return res.status(400).json({ error: user.message });
                }
                return res.status(200).json({ success: user.success });
            }
            catch (error) {
                return res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.VerifyController = VerifyController;
