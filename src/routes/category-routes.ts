import { Router } from 'express';
import { CreateCategoryController } from '@/controllers/implementations';
import { routerAdapter, middlewareAdapter } from '@/routes/adapters';
import { AuthUserMiddleware } from '@/middlewares/implementations';

export default (router: Router) => {
  router.post('/categories', middlewareAdapter(new AuthUserMiddleware()), routerAdapter(new CreateCategoryController()));
};
