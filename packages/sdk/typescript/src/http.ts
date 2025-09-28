/**
 * Description : http.ts - 📌 fetch 기반 HttpClient (타임아웃·재시도 지원)
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
import { ApiError, isRetryableError, NetworkError, TimeoutError } from './errors.js';
import { composeMiddlewares } from './middleware.js';
import type { ClientOptions, HttpContext, HttpRequest, HttpResponse, Middleware, RequestOptions, RetryPolicy } from './sdk-types.js';

// URL 빌더
function buildUrl(base: string, path: string, query?: RequestOptions['query']) {
  const url = new URL(path, base);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined) url.searchParams.set(k, String(v));
    }
  }
  return url.toString();
}

// 지연 + 지터
function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms));
}
function jitter(ms: number) {
  return Math.min(ms * (0.5 + Math.random()), ms * 1.5);
}

/**
 * @description fetch 기반 HTTP 클라이언트
 */
export class HttpClient {
  private readonly baseUrl: string;
  private readonly timeoutMs: number;
  private readonly retry: RetryPolicy;
  private readonly handler: ReturnType<typeof composeMiddlewares>;

  constructor(opts: ClientOptions) {
    this.baseUrl = opts.baseUrl.replace(/\/+$/, '') + '/';
    this.timeoutMs = opts.timeoutMs ?? 10_000;
    this.retry = {
      attempts: opts.retry?.attempts ?? 3,
      baseDelayMs: opts.retry?.baseDelayMs ?? 300,
      maxDelayMs: opts.retry?.maxDelayMs ?? 3000,
      retryOn: opts.retry?.retryOn ?? ((s: number) => s === 429 || (s >= 500 && s < 600)),
    };

    // 기본 헤더 주입 미들웨어
    const defaultHeaders: Middleware = {
      onRequest: req => {
        const h = new Headers(req.headers as any);
        if (opts.userAgent && !h.has('user-agent')) h.set('user-agent', opts.userAgent);
        for (const [k, v] of Object.entries(opts.headers ?? {})) {
          if (!h.has(k)) h.set(k, v);
        }
        return { ...req, headers: h };
      },
    };

    this.handler = composeMiddlewares([defaultHeaders, ...(opts.middlewares ?? [])]);
  }

  /**
   * @description 실제 요청 처리 (재시도·타임아웃 지원)
   */
  async request<T = unknown>(path: string, options: RequestOptions = {}): Promise<{ data: T; response: Response }> {
    const url = buildUrl(this.baseUrl, path.replace(/^\/+/, ''), options.query);
    const method = options.method ?? (options.body ? 'POST' : 'GET');

    const headers = new Headers(options.headers);
    let body: BodyInit | null = null;

    if (options.body !== undefined) {
      if (options.body instanceof FormData || options.body instanceof Blob) {
        body = options.body as any;
      } else {
        if (!headers.has('content-type')) headers.set('content-type', 'application/json');
        body = JSON.stringify(options.body);
      }
    }

    const attemptOnce = async (attempt: number): Promise<{ data: T; response: Response }> => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), this.timeoutMs);

      const ctx: HttpContext = { attempt, startedAt: Date.now() };
      const req: HttpRequest = {
        url,
        method,
        headers,
        body,
        signal: options.signal ?? controller.signal,
      };

      const send = async (r: HttpRequest) => {
        try {
          const resp = await fetch(r.url, {
            method: r.method,
            headers: r.headers as any,
            body: r.body ?? null,
            signal: r.signal ?? null,
          });
          const httpRes: HttpResponse = { status: resp.status, headers: resp.headers, raw: resp };
          return httpRes;
        } catch (e) {
          throw new NetworkError((e as Error)?.message || 'Network error');
        } finally {
          clearTimeout(timer);
        }
      };

      // 미들웨어 실행
      const res = await this.handler(req, ctx, send);

      // 정상 응답
      if (res.status >= 200 && res.status < 300) {
        const ct = res.headers.get('content-type') || '';
        const data = ct.includes('application/json') ? await res.raw.json() : await res.raw.text();
        return { data: data as T, response: res.raw };
      }

      // 에러 응답 처리
      let details: any;
      try {
        const ct = res.headers.get('content-type') || '';
        details = ct.includes('application/json') ? await res.raw.json() : await res.raw.text();
      } catch {
        /* ignore */
      }

      const requestId = res.headers.get('x-request-id') ?? res.headers.get('x-correlation-id') ?? undefined;

      throw new ApiError(`HTTP ${res.status}`, res.status, {
        ...(requestId !== undefined ? { requestId } : {}),
        ...(details !== undefined ? { details } : {}),
        response: res.raw,
      });
    };

    // 재시도 루프
    let lastErr: unknown;
    for (let a = 0; a < this.retry.attempts; a++) {
      try {
        return await attemptOnce(a);
      } catch (err) {
        lastErr = err;
        if (a < this.retry.attempts - 1 && isRetryableError(err)) {
          const delay = Math.min(this.retry.baseDelayMs * 2 ** a, this.retry.maxDelayMs);
          await sleep(jitter(delay));
          continue;
        }
        throw err;
      }
    }
    throw lastErr ?? new TimeoutError();
  }

  // 편의 메서드
  get<T = unknown>(path: string, opts?: Omit<RequestOptions, 'method'>) {
    return this.request<T>(path, { ...opts, method: 'GET' });
  }
  post<T = unknown>(path: string, body?: unknown, opts?: Omit<RequestOptions, 'method' | 'body'>) {
    return this.request<T>(path, { ...opts, method: 'POST', body });
  }
  put<T = unknown>(path: string, body?: unknown, opts?: Omit<RequestOptions, 'method' | 'body'>) {
    return this.request<T>(path, { ...opts, method: 'PUT', body });
  }
  patch<T = unknown>(path: string, body?: unknown, opts?: Omit<RequestOptions, 'method' | 'body'>) {
    return this.request<T>(path, { ...opts, method: 'PATCH', body });
  }
  delete<T = unknown>(path: string, opts?: Omit<RequestOptions, 'method'>) {
    return this.request<T>(path, { ...opts, method: 'DELETE' });
  }
}
