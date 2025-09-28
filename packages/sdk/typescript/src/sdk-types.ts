/**
 * Description : sdk-types.ts - 📌 SDK에서 노출하는 공용 타입 모음
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
export type ProblemDetails = {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  code?: string;
  [k: string]: unknown;
};

export type HeadersInitLike = Record<string, string> | Headers;

export type HttpContext = {
  attempt: number; // 현재 재시도 횟수(0-base)
  startedAt: number; // 최초 요청 시각 (ms)
  meta?: Record<string, unknown>;
};

export type HttpRequest = {
  url: string;
  method: string;
  headers?: HeadersInitLike;
  body?: BodyInit | null;
  signal?: AbortSignal;
};

export type HttpResponse = {
  status: number;
  headers: Headers;
  raw: Response;
};

export type Middleware = {
  onRequest?(req: HttpRequest, ctx: HttpContext): Promise<HttpRequest> | HttpRequest;
  onResponse?(res: HttpResponse, ctx: HttpContext): Promise<HttpResponse> | HttpResponse;
  onError?(err: unknown, ctx: HttpContext): Promise<void> | void;
};

export type RetryPolicy = {
  attempts: number; // 총 시도 횟수
  baseDelayMs: number; // 지수 백오프 시작 지연
  maxDelayMs: number; // 지연 상한
  retryOn?: (status: number) => boolean; // 기본: 429/5xx
};

export type ClientOptions = {
  baseUrl: string;
  headers?: Record<string, string>;
  timeoutMs?: number;
  retry?: Partial<RetryPolicy>; // 부분 지정 허용
  middlewares?: Middleware[];
  userAgent?: string;
};

export type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  query?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>;
  body?: unknown;
  signal?: AbortSignal;
};

// 페이징 유틸에서 쓰는 제너릭 타입
export type PageExtractor<T, J = any> = (json: J) => { items: T[]; nextCursor?: string | null };

export type OffsetExtractor<T, J = any> = (json: J) => { items: T[]; total?: number };
