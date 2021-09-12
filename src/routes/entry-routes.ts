import { Router } from 'express';
import { CreateEntryController } from '@/controllers/implementations';
import { routerAdapter, middlewareAdapter } from '@/routes/adapters';
import { AuthUserMiddleware } from '@/middlewares/implementations';

export default (router: Router) => {
  router.post('/entry', middlewareAdapter(new AuthUserMiddleware()), routerAdapter(new CreateEntryController()));
};
