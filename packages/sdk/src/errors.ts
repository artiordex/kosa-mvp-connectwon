/**
 * Description : errors.ts - 📌 SDK 공통 에러와 재시도 규칙
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
import type { ProblemDetails } from '../sdk-types.js';

// API 오류 표준 클래스
export class ApiError extends Error {
  override name = 'ApiError' as const;
  readonly status: number;
  readonly requestId?: string;
  readonly details?: ProblemDetails;

  constructor(
    message: string,
    status: number,
    opts: { requestId?: string; details?: ProblemDetails } = {},
  ) {
    super(message);
    // Error 상속 시 instanceof/프로토타입 정정
    Object.setPrototypeOf(this, new.target.prototype);

    this.status = status;
    // exactOptionalPropertyTypes 대응: 값이 있을 때만 대입
    if (opts.requestId !== undefined) this.requestId = opts.requestId;
    if (opts.details !== undefined) this.details = opts.details;
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

// 네트워크 타임아웃 오류
export class TimeoutError extends Error {
  override name = 'TimeoutError' as const;
  constructor(message = 'Request timed out') {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// 네트워크 일반 오류
export class NetworkError extends Error {
  override name = 'NetworkError' as const;
  constructor(message = 'Network error') {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// 429/5xx 재시도 대상
export function isRetryableStatus(status: number) {
  return status === 429 || (status >= 500 && status < 600);
}
