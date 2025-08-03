import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Users } from '../models/userModel';
import { BankData } from '../models/BankDataModel';
import { Notification } from '../models/NotificationModel';
import dotenv from 'dotenv';

dotenv.config();
export const Connection = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Users, BankData, Notification],
});