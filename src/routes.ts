import { Router } from 'express';
import userRoutes from './routes/user-routes';
import loginRoutes from './routes/login-routes';
import entryRoutes from './routes/entry-routes';

const router = Router();

loginRoutes(router);
userRoutes(router);
entryRoutes(router);

export { router };
