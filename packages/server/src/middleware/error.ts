/**
 * Description : error.ts - 📌 에러 클래스 + Express 에러 핸들러
 * Author : Shiwoo Min
 * Date : 2025-09-11
 */
import type { ErrorBody, ErrorCode } from '../../server-types.js';

// 범용 요청 인터페이스
interface GenericRequest {
  url?: string;
  method?: string;
  ip?: string;
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

// 애플리케이션 표준 에러 클래스
export class AppError extends Error {
  status: number;
  code: ErrorCode;
  details?: unknown;
  constructor(message: string, status = 400, code: ErrorCode = 'BAD_REQUEST', details?: unknown) {
    super(message);
    this.name = 'AppError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

// AppError 단언 헬퍼
export function isAppError(e: unknown): e is AppError {
  return e instanceof AppError;
}

// HTTP 상태 코드를 에러 코드로 매핑
export function mapStatusToCode(status: number): ErrorCode {
  if (status === 400) return 'BAD_REQUEST';
  if (status === 401) return 'UNAUTHORIZED';
  if (status === 403) return 'FORBIDDEN';
  if (status === 404) return 'NOT_FOUND';
  if (status === 409) return 'CONFLICT';
  if (status === 422) return 'VALIDATION';
  if (status === 429) return 'RATE_LIMITED';
  return 'INTERNAL';
}

// 임의의 에러를 AppError로 승격
export function toAppError(err: unknown, fallbackStatus = 500): AppError {
  if (isAppError(err)) return err;
  const any = err as any;
  const status: number =
    typeof any?.status === 'number'
      ? any.status
      : typeof any?.statusCode === 'number'
        ? any.statusCode
        : fallbackStatus;
  const message = typeof any?.message === 'string' ? any.message : 'Internal Error';
  const code: ErrorCode = (any?.code as ErrorCode) ?? mapStatusToCode(status);
  const details = any?.details;
  return new AppError(message, status, code, details);
}

// 표준 ErrorBody로 변환
export function toErrorBody(err: unknown): ErrorBody {
  const a = toAppError(err);
  return { code: a.code, message: a.message, details: a.details };
}

// 단언 헬퍼
export function invariant(
  cond: unknown,
  message = 'Invariant failed',
  status = 400,
  code: ErrorCode = 'BAD_REQUEST',
): asserts cond {
  if (!cond) throw new AppError(message, status, code);
}

// 단순 assert 별칭
export const assert = (cond: unknown, message = 'Assertion failed'): asserts cond => {
  if (!cond) throw new AppError(message, 400, 'BAD_REQUEST');
};

// Express 호환 에러 핸들러 미들웨어
interface CustomError extends Error {
  status?: number;
  statusCode?: number;
}

// 에러 핸들러 미들웨어
export const errorHandler = (
  err: CustomError,
  req: GenericRequest,
  res: GenericResponse,
  _next: NextFunction,
): void => {
  const appError = toAppError(err);

  // 로깅 (logger가 있다면)
  console.error('API Error:', {
    status: appError.status,
    message: appError.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
  });
  res.status(appError.status).json({
    success: false,
    error: {
      code: appError.code,
      message:
        process.env['NODE_ENV'] === 'production' ? 'Internal Server Error' : appError.message,
      ...(appError.details ? { details: appError.details } : {}),
    },
  });
};

// 404 에러 핸들러
export const notFoundHandler = (req: GenericRequest, res: GenericResponse) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req['path'] || req.url} not found`,
    },
  });
};
