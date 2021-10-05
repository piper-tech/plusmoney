import { Router } from 'express';
import { GetUserController, MeUserController } from '@/controllers/implementations';
import { routerAdapter, middlewareAdapter } from '@/routes/adapters';
import { AuthUserMiddleware } from '@/middlewares/implementations';

export default (router: Router) => {
  router.get('/me', middlewareAdapter(new AuthUserMiddleware()), routerAdapter(new MeUserController()));
  router.get('/users', middlewareAdapter(new AuthUserMiddleware()), routerAdapter(new GetUserController()));
};
