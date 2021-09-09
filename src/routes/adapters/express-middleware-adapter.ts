import { NextFunction, Request, Response } from 'express';
import { Middleware } from '@/middlewares';

export function middlewareAdapter(middleware: Middleware) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const request = {
      accessToken: req.headers?.authorization,
      ...(req.headers || {})
    };
    const httpResponse = await middleware.handler(request);
    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body);
      next();
    } else {
      return res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      });
    }
  };
}
