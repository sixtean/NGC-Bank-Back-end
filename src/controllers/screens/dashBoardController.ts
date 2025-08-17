import { Request, Response } from "express";
import { dashboardService } from "../../services/screens/DashboardService";

export class dashboardController {
    async handleController(req: Request, res: Response) {
        try {
            const tokenHeader = req.headers.authorization;
            if(!tokenHeader) {
                throw new Error("Token not found.");
            }

            if(typeof tokenHeader !== 'string') {
                throw new Error('Invalid token format.');
            }
            const token = tokenHeader.replace("Bearer ", "").trim();
            const service = new dashboardService(token);
            const user = await service.getUser();

            if (token !== user?.token) {
                throw new Error('Invalid Token.');
            }

            return res.status(200).json({
                userName: user.nome,
                role: user.role,
                verify: user.verificado,
                notify: user.notificacoes,
                bank: user.bankData
            });

        } catch (error: any) {
            return res.status(500).send('Internal error in server');
        }
    }
}