import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { VerifyCodeDTO } from "../../dtos/login/VerifyCode";
import { VerifyService } from "../../services/LoginUserService/VerifyService";

export class VerifyController {
    async handleController(req: Request, res: Response) {
        const dto = plainToInstance(VerifyCodeDTO, req.body);
        const errors = await validate(dto);

        if (errors.length > 0) {
            const messages = errors.map(err => Object.values(err.constraints || {})).flat();
            return res.status(400).json({ error: messages});
        }

        try {
            const data: VerifyCodeDTO = req.body;
            const verifyService = new VerifyService(data.code);
            const user = await verifyService.verify();

            if(!user.success) {
                return res.status(400).json({ error: user.message });
            }

            return res.status(200).json({ success: user.success });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}