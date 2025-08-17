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
exports.dashboardController = void 0;
const DashboardService_1 = require("../../services/screens/DashboardService");
class dashboardController {
    handleController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenHeader = req.headers.authorization;
                if (!tokenHeader) {
                    throw new Error("Token not found.");
                }
                if (typeof tokenHeader !== 'string') {
                    throw new Error('Invalid token format.');
                }
                const token = tokenHeader.replace("Bearer ", "").trim();
                const service = new DashboardService_1.dashboardService(token);
                const user = yield service.getUser();
                if (token !== (user === null || user === void 0 ? void 0 : user.token)) {
                    throw new Error('Invalid Token.');
                }
                return res.status(200).json({
                    userName: user.nome,
                    role: user.role,
                    verify: user.verificado,
                    notify: user.notificacoes,
                    bank: user.bankData
                });
            }
            catch (error) {
                return res.status(500).send('Internal error in server');
            }
        });
    }
}
exports.dashboardController = dashboardController;
