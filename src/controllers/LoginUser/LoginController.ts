import { Request, Response } from "express";
import { LoginService } from "../../services/LoginUserService/LoginService";

export class LoginController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;
        try {
            const service = new LoginService(email, password);
            const user = await service.getUser();
            return res.status(200).json({
                verify: user.verify,
            });
        } catch (error: any) {
            return res.status(400).json({
                error: error.message
            });
        }
    }
}