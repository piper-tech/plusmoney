import { Router } from 'express';
import userRoutes from './routes/user-routes';
import loginRoutes from './routes/login-routes';
import entryRoutes from './routes/entry-routes';
import categoryRoutes from './routes/category-routes';

const router = Router();

loginRoutes(router);
userRoutes(router);
entryRoutes(router);
categoryRoutes(router);

export { router };
