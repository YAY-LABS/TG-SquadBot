import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import api from './routers';
import * as middlewares from './middlewares';
import connectDatabase from './lib/mongoose';
import { executeBots } from './modules/Bot';

dotenv.config();

const app = express();

const SECRET_TOKENS = [
  process.env.TELEGRAM_BOT_TOKEN as string,
  process.env.TELEGRAM_BOT_TOKEN_2 as string,
];

SECRET_TOKENS.forEach(async (token: string) => {
  const dbName = token.split(':')[0];
  await connectDatabase(dbName);
});

app.use(cors());
app.use(express.json());
// executeBots();
app.use(middlewares.tokenFilterMiddleware);
app.use('/', api);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
