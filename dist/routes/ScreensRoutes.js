"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DashboradController_1 = require("../controllers/screenControllers/DashboradController");
const screenRouters = (0, express_1.Router)();
screenRouters.post('/Dashboard', DashboradController_1.DashboardController);
exports.default = screenRouters;
