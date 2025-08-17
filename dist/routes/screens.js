"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashBoardController_1 = require("../controllers/screens/dashBoardController");
const screens = (0, express_1.Router)();
const dashboard = new dashBoardController_1.dashboardController();
screens.post('/dashboard', (req, res) => dashboard.handleController(req, res));
exports.default = screens;
