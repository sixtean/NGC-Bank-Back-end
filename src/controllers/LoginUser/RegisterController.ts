import { Response, Request } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { RegisterUser } from "../../services/LoginUserService/RegisterService";
import { RegisterUserDTO } from "../../dtos/login/RegisterUserDTO";

export class RegisterControler {
    async handle(req: Request, res: Response) {
        const dto = plainToInstance(RegisterUserDTO, req.body);
        const errors = await validate(dto);

        if (errors.length > 0) {
            const messages = errors.map(err => Object.values(err.constraints || {})).flat();
            return res.status(400).json({ error: messages})
        }
        try{
            const data: RegisterUserDTO = req.body;
            const registerService = new RegisterUser(data);
            const user = await registerService.verifyUser();
            return res.status(200).json({
                token: user.token,
            });
        } catch (error: any) {
            return res.status(400).json({
                error: error.message
            });
        }
    }
}