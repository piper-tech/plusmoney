import express from 'express';
import { router } from './routes';
import cors from 'cors';
import { serve, setup } from 'swagger-ui-express';
import swaggerConfig from '@/docs';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/docs', serve, setup(swaggerConfig));
app.use(router);

export { app };
