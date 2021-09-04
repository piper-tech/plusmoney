import { Router, Request, Response } from "express";
import { CreateUserController } from "../controllers/implementations/create-user-controller";
import { Controller } from "../controllers/controller";

function routerAdapter(controller: Controller) {
    return async (req: Request, res: Response) => {
        const request = {
            ...(req.body || {}),
            ...(req.params || {}),
        }
        const httpResponse = await controller.handler(request);
        if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
            return res.status(httpResponse.statusCode).json(httpResponse.body);
        }
        return res.status(httpResponse.statusCode).json({error: httpResponse.body.message});
    }
}

export default (router: Router) => {
    router.post('/users', routerAdapter(new CreateUserController()));
}
