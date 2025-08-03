"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const userModel_1 = require("../models/userModel");
const BankDataModel_1 = require("../models/BankDataModel");
const NotificationModel_1 = require("../models/NotificationModel");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.Connection = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [userModel_1.Users, BankDataModel_1.BankData, NotificationModel_1.Notification],
});
