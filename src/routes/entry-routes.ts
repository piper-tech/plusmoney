import { Router } from 'express';
import { CreateEntryController, GetEntryController } from '@/controllers/implementations';
import { routerAdapter, middlewareAdapter } from '@/routes/adapters';
import { AuthUserMiddleware } from '@/middlewares/implementations';

export default (router: Router) => {
  router.post('/entries', middlewareAdapter(new AuthUserMiddleware()), routerAdapter(new CreateEntryController()));
  router.get('/entries', middlewareAdapter(new AuthUserMiddleware()), routerAdapter(new GetEntryController()));
};
