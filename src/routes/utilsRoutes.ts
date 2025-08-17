import { Router } from "express";
import { NotifyController } from "../controllers/notifications/NotificationController";

const utilsRouter = Router();

utilsRouter.post('/notifyCreate', NotifyController.createNotification);

export default utilsRouter;