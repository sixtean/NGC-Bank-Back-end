import { Users } from '../../models/userModel';
import { Connection } from '../../database/database';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { RegisterUserDTO } from '../../dtos/login/RegisterUserDTO';

dotenv.config();

export class RegisterUser {
    private data: RegisterUserDTO;

    constructor(data: RegisterUserDTO) {
        this.data = data;
    }

    private createCode() {
        const code: string = Math.floor(100000 + Math.random() * 900000).toString();
        return code;
    }

    private async sendEmail(code: string) {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.NODEMAILER_USER,
                    pass: process.env.NODEMAILER_PASS
                }
            })

            await transporter.sendMail({
                from: 'NGC Bank',
                to: this.data.email,
                subject: 'Código de Verificação',
                html:
                `
                    <h1 style="color: #8b00ff; font-family: Arial, sans-serif;">NGC Bank</h1>
                    <div style="width: 90%;">    
                        <p style="font-size: 18px; color: #333;">
                            Obrigado por fazer parte da NGC Bank ${this.data.name}. <br> O codigo abaixo é de uso pessoal e não deve ser compartilhado com terceiros, esse codigo é valido somente para você.
                            <br><br>
                            Seu código de verificação é: <strong style="color: red;">${code}</strong>
                        </p>
                    </div>
                    <footer style="border-top: 1px solid purple;">
                        <p>Este é um email altomatico e não deve ser respondido. A equipe NGC Bank agradece</p>
                    </footer>
                `
              });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async verifyUser() {
        const userRepository = Connection.getRepository(Users);
        const userVerify = await userRepository.findOne({ where: {email: this.data.email }});

        if(userVerify?.email === this.data.email) {
            throw new Error('User already exists');
        }
        const code: string = this.createCode();
        await this.sendEmail(code);

        const criptoPassword = await bcrypt.hash(this.data.password, 10);

        const payload = {
            email: this.data.email,
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET as string,
            {
                expiresIn: '1d',
            }
        )
        const newUser = userRepository.create({
            nome: this.data.name,
            email: this.data.email,
            senha: criptoPassword,
            cpf: this.data.cpf,
            codigoVerificacao: code,
            verificado: false,
            token: token
        })
        await userRepository.save(newUser);

        return {
            token: token
        }
    }

}