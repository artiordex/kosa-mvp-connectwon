import { Request, Response, NextFunction } from 'express';
import { logger } from '@connectwon/logger';

interface CustomError extends Error {
  status?: number;
  statusCode?: number;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  logger.error('API Error:', {
    status,
    message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip
  });

  res.status(status).json({
    error: {
      status,
      message: process.env['NODE_ENV'] === 'production' ? 'Internal Server Error' : message,
    },
  });
};

// 404 에러 핸들러
export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    error: {
      status: 404,
      message: `Route ${req.method} ${req.path} not found`
    }
  });
};
