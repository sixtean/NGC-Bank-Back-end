import { Router } from "express";
import { dashboardController } from "../controllers/screens/dashBoardController";

const screens = Router();

const dashboard = new dashboardController();

screens.post('/dashboard', (req, res) => dashboard.handleController(req, res));

export default screens;