import { Connection } from "../../database/database";
import { Users } from "../../models/userModel";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export class dashboardService {
    token: string;

    constructor(token: string) {
        this.token = token;
    }

    private async decryptedToken(): Promise<JwtPayload> {
        try {
            const decoded = jwt.verify(this.token, process.env.JWT_SECRET as string);
            if (typeof decoded === "string") {
                throw new Error("Invalid token payload");
            }

            if(!decoded.email) {
                throw new Error('Email not found in token')
            }
            return decoded;
        } catch (err) {
            console.error('Erro ao verificar o token: ', err);
            throw new Error('Invalid token or expired')
        }
    }

    async getUser() {
        try {
            const payload = await this.decryptedToken();
            const userRepository = Connection.getRepository(Users);
            const user = await userRepository.findOne({
                where: { email: payload.email },
                relations: ['notificacoes', 'bankData']
            });

            if(!user) {
                throw new Error('User not found')
            }

            return user;
        } catch (err) {
            console.error('Error searching for user in database: ', err);
            throw new Error('Error for searching user');
        }
    }
}