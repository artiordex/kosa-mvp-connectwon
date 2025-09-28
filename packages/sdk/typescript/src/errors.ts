/**
 * Description : errors.ts - 📌 SDK 공통 에러와 재시도 규칙
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
import type { ProblemDetails } from './sdk-types.js';

/**
 * API 오류 표준 클래스
 */
export class ApiError extends Error {
  override name = 'ApiError' as const;
  readonly status: number;
  readonly requestId?: string;
  readonly details?: ProblemDetails | unknown;
  readonly response?: Response;

  constructor(message: string, status: number, opts: { requestId?: string; details?: ProblemDetails | unknown; response?: Response } = {}) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.status = status;
    if (opts.requestId !== undefined) this.requestId = opts.requestId;
    if (opts.details !== undefined) this.details = opts.details;
    if (opts.response !== undefined) this.response = opts.response;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      ...(this.requestId !== undefined ? { requestId: this.requestId } : {}),
      ...(this.details !== undefined ? { details: this.details } : {}),
    };
  }
}

/**
 * 네트워크 타임아웃 오류
 */
export class TimeoutError extends Error {
  override name = 'TimeoutError' as const;
  constructor(message = 'Request timed out') {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * 네트워크 일반 오류
 */
export class NetworkError extends Error {
  override name = 'NetworkError' as const;
  constructor(message = 'Network error') {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * 재시도 대상 확인 유틸
 * - 429 (Rate Limit)
 * - 5xx 서버 오류
 * - NetworkError, TimeoutError
 */
export function isRetryableError(err: unknown): boolean {
  if (err instanceof NetworkError || err instanceof TimeoutError) return true;
  if (err instanceof ApiError) {
    return err.status === 429 || (err.status >= 500 && err.status < 600);
  }
  return false;
}
