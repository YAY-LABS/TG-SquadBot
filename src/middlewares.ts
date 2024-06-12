import { NextFunction, Request, Response } from 'express';
import ErrorResponse from './interfaces/ErrorResponse';

require('dotenv').config();

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}

const SECRET_TOKENS = Object.keys(process.env)
  .filter((key) => key.startsWith('TELEGRAM_BOT_TOKEN'))
  .map((key) => process.env[key] as string);

export function tokenFilterMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token: string | undefined = req.headers.authorization;
  if (!token || !SECRET_TOKENS.includes(token)) {
    return res.status(401).send('Access Denied: Invalid Token');
  }

  next();
}
