import { Router } from 'express';
import userRoutes from './routes/user-routes';
import loginRoutes from './routes/login-routes';

const router = Router();

loginRoutes(router);
userRoutes(router);

export { router };
