import { Connection } from '../../database/database';
import { Users } from '../../models/userModel';
import bcrypt from 'bcrypt';

export class LoginService {
    private email: string;
    private password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    async getUser() {
        const userRepository = Connection.getRepository(Users);
        const user = await userRepository.findOne({ where: { email: this.email } });

        if(!user) {
            throw new Error('User not found.');
        }

        const realPassword = await bcrypt.compare(this.password, user.senha)

        if(!realPassword) {
            throw new Error ('Incorrect Password')
        }
        return {
            verify: user.verificado
        };
    }
}
