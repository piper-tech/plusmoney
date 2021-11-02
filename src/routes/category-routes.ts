import { Router } from 'express';
import { CreateCategoryController, GetCategoryController } from '@/controllers/implementations';
import { routerAdapter, middlewareAdapter } from '@/routes/adapters';
import { AuthUserMiddleware } from '@/middlewares/implementations';
import { UpdateCategoryController } from '@/controllers/implementations/update-category-controller';

export default (router: Router) => {
  router.post('/categories', middlewareAdapter(new AuthUserMiddleware()), routerAdapter(new CreateCategoryController()));
  router.get('/categories', middlewareAdapter(new AuthUserMiddleware()), routerAdapter(new GetCategoryController()));
  router.put('/categories/:id', middlewareAdapter(new AuthUserMiddleware()), routerAdapter(new UpdateCategoryController()));
};
