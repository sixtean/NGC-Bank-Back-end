"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const NotificationController_1 = require("../controllers/notifications/NotificationController");
const utilsRouter = (0, express_1.Router)();
utilsRouter.post('/notifyCreate', NotificationController_1.NotifyController.createNotification);
utilsRouter.post('/notifyList', NotificationController_1.NotifyController.getNotifications);
exports.default = utilsRouter;
