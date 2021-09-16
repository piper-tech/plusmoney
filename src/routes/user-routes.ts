import { Router } from 'express';
import { GetUserController } from '@/controllers/implementations';
import { routerAdapter } from '@/routes/adapters';

export default (router: Router) => {
  router.get('/users', routerAdapter(new GetUserController()));
};
