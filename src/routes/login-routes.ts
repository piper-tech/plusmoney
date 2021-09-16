import { Router } from 'express';
import { LoginController, LogupController } from '@/controllers/implementations';
import { routerAdapter } from '@/routes/adapters';

export default (router: Router) => {
  router.post('/login', routerAdapter(new LoginController()));
  router.post('/logup', routerAdapter(new LogupController()));
};
