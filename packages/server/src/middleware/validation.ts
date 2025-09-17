/**
 * Description : validation.ts - 📌 유효성 검사 미들웨어
 * Author : Shiwoo Min
 * Date : 2025-09-11
 */
import { z } from 'zod';

// 범용 요청 인터페이스
interface GenericRequest {
  body?: any;
  query?: any;
  [key: string]: unknown;
}

// 범용 응답 인터페이스
interface GenericResponse {
  status(code: number): GenericResponse;
  json(data: any): void | GenericResponse;
  [key: string]: unknown;
}

// 타입 추출
type NextFunction = (err?: unknown) => void;
type Middleware = (req: GenericRequest, res: GenericResponse, next: NextFunction) => void;

// 바디 유효성 검사 미들웨어
export const validateBody = (schema: z.ZodSchema): Middleware => {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION',
            message: 'Validation error',
            details: error.errors,
          },
        });
      }
      next(error);
    }
  };
};

// 쿼리 유효성 검사 미들웨어
export const validateQuery = (schema: z.ZodSchema): Middleware => {
  return (req, res, next) => {
    try {
      req.query = schema.parse(req.query);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION',
            message: 'Query validation error',
            details: error.errors,
          },
        });
      }
      next(error);
    }
  };
};
