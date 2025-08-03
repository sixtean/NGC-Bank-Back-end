"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notifyController_1 = require("../../controllers/notify/notifyController");
const auth_1 = require("../../middlewares/auth");
const notifyRouter = (0, express_1.Router)();
notifyRouter.post('/notifications', auth_1.authenticateToken, notifyController_1.criarNotificacaoManual);
exports.default = notifyRouter;
