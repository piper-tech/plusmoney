import express from 'express';
import { router } from './routes';
import cors from 'cors';
import { serve, setup } from 'swagger-ui-express';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/docs', serve, setup());
app.use(router);

export { app };
