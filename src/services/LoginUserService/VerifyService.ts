import { Connection } from "../../database/database";
import { Users } from "../../models/userModel";

export class VerifyService {
    private code: string;

    constructor(code: string) {
        this.code = code;
    };

    async verify() {
        const userRepository =  Connection.getRepository(Users);
        const user = await userRepository.findOne({ where: {codigoVerificacao: this.code} });

        if (!user) {
            return {
                success: false,
                message: 'User not found'
            };
        }

        if(user?.verificado) {
            return {
                success: false,
                message: 'User already verified'
            };
        }

        if(user?.codigoVerificacao === this.code) {
            user.verificado = true;
            await userRepository.save(user);
            return { success: true };
        }

        return { success: false, message: 'Invalid code' };
    }
}