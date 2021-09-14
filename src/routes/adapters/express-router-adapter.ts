import { Request, Response } from 'express';
import { Controller } from '@/controllers';

export function routerAdapter(controller: Controller) {
  return async (req: Request, res: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
      ...(req.query || {})
    };
    const httpResponse = await controller.handler(request);
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      return res.status(httpResponse.statusCode).json(httpResponse.body);
    }
    return res.status(httpResponse.statusCode).json({ error: httpResponse.body.message });
  };
}
