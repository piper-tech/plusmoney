import { Router } from 'express';
import { CreateCategoryController, DeleteCategoryController, GetCategoryController, UpdateCategoryController } from '@/controllers/implementations';
import { routerAdapter, middlewareAdapter } from '@/routes/adapters';
import { AuthUserMiddleware } from '@/middlewares/implementations';

export default (router: Router) => {
  router.post('/categories', middlewareAdapter(new AuthUserMiddleware()), routerAdapter(new CreateCategoryController()));
  router.get('/categories', middlewareAdapter(new AuthUserMiddleware()), routerAdapter(new GetCategoryController()));
  router.put('/categories/:id', middlewareAdapter(new AuthUserMiddleware()), routerAdapter(new UpdateCategoryController()));
  router.delete('/categories/:id', middlewareAdapter(new AuthUserMiddleware()), routerAdapter(new DeleteCategoryController()));
};
