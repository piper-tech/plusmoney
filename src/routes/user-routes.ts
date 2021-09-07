import { Router } from 'express';
import { CreateUserController } from '@/controllers/implementations';
import { routerAdapter } from '@/routes/adapters';

export default (router: Router) => {
  router.post('/users', routerAdapter(new CreateUserController()));
};
