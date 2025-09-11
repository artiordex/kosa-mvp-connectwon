/**
 * Description : client.ts - 📌 Typed fetch client for Program Management API
 * Author      : Shiwoo Min
 * Date        : 2025-09-11
 */

/////////////////////////
// 공통 타입 (로컬)    //
/////////////////////////

export interface ApiClientOptions {
  baseUrl?: string;
  token?: string | null;
  getToken?: () => Promise<string | null> | string | null;
  timeoutMs?: number;
  defaultHeaders?: Record<string, string | undefined>;
  fetchImpl?: typeof fetch;
  retry?: {
    maxAttempts?: number;
    baseDelayMs?: number;
    maxDelayMs?: number;
    retryOn?: Array<number>;
  };
  onRateLimit?: (info: RateLimitInfo) => void;
}

export interface RateLimitInfo {
  remaining: number | null;
  reset: number | null; // epoch seconds
  raw: Record<string, string | null>;
}

export type Problem = {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  [k: string]: unknown;
};

export class ApiError extends Error {
  public readonly status: number;
  public readonly problem?: Problem | unknown;
  public readonly headers: Headers;

  constructor(message: string, status: number, headers: Headers, problem?: Problem | unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.headers = headers;
    this.problem = problem;
  }
}

/////////////////////////
// 도메인 타입 (최소)  //
/////////////////////////

export interface User {
  id: string;
  email: string;
  name: string;
  roleFlags?: number;
  createdAt?: string;
  updatedAt?: string;
  lastLoginAt?: string;
}
export interface CreateUser {
  email: string;
  name: string;
  roleFlags?: number;
}

export type ProgramStatus = 'draft' | 'published' | 'archived';
export interface Program {
  id: string;
  ownerId?: string;
  title: string;
  description?: string;
  category?: string;
  tags?: string[];
  status?: ProgramStatus;
  createdAt?: string;
  updatedAt?: string;
}
export interface CreateProgram {
  title: string;
  description?: string;
  category?: string;
  tags?: string[];
  status?: ProgramStatus;
}
export type UpdateProgram = Partial<CreateProgram>;

export interface Session {
  id: string;
  programId: string;
  title: string;
  capacity: number;
  participants: string[];
  waitlist: string[];
  startsAt: string; // ISO
  endsAt: string; // ISO
  location?: string;
}
export interface CreateSession {
  programId: string;
  title: string;
  capacity: number;
  startsAt: string;
  endsAt: string;
  location?: string;
}
export type UpdateSession = Partial<CreateSession>;

export type BookStatus = 'booked' | 'overbooked' | 'waitlisted' | 'full';
export type CancelStatus = 'not_found' | 'cancelled' | 'cancelled_and_promoted';

export interface BookSessionResponse {
  status: BookStatus;
  session: Session;
}
export interface CancelSessionResponse {
  status: CancelStatus;
  session: Session;
}

export interface CursorPageMeta {
  nextCursor?: string | null;
  total?: number | null;
}

/////////////////////////
// 유틸                //
/////////////////////////

function omitUndefinedStrings<T extends Record<string, string | undefined> | undefined | null>(
  obj: T,
): Record<string, string> {
  const out: Record<string, string> = {};
  if (!obj) return out;
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'string') out[k] = v;
  }
  return out;
}

function buildQuery(query?: Record<string, unknown>): string {
  if (!query) return '';
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) {
    if (v === undefined || v === null) continue;
    if (Array.isArray(v)) {
      for (const item of v) q.append(k, String(item));
    } else {
      q.set(k, String(v));
    }
  }
  const s = q.toString();
  return s ? `?${s}` : '';
}

function sleep(ms: number) {
  return new Promise(res => setTimeout(res, ms));
}

function pickRateLimit(headers: Headers): RateLimitInfo {
  const remaining = headers.get('x-rate-limit-remaining');
  const reset = headers.get('x-rate-limit-reset');
  return {
    remaining: remaining != null ? Number(remaining) : null,
    reset: reset != null ? Number(reset) : null,
    raw: {
      'x-rate-limit-remaining': remaining,
      'x-rate-limit-reset': reset,
    },
  };
}

/////////////////////////
// 핵심 클라이언트     //
/////////////////////////

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  query?: Record<string, unknown>;
  body?: unknown;
  headers?: Record<string, string | undefined>;
  signal?: AbortSignal;
  retry?: Partial<NonNullable<ApiClientOptions['retry']>>;
  timeoutMs?: number;
  auth?: boolean; // false면 토큰 생략. 기본 true
}

export class ApiClient {
  private readonly baseUrl: string;
  private readonly token?: string | null;
  private readonly getToken?: ApiClientOptions['getToken'];
  private readonly timeoutMs: number;
  private readonly defaultHeaders: Record<string, string>;
  private readonly fetchImpl: typeof fetch;
  private readonly retry: Required<NonNullable<ApiClientOptions['retry']>>;
  private readonly onRateLimit?: ApiClientOptions['onRateLimit'];

  constructor(opts: ApiClientOptions = {}) {
    const guess =
      typeof window !== 'undefined'
        ? `${window.location.origin}/api/v1`
        : 'http://localhost:3000/api/v1';

    this.baseUrl = (opts.baseUrl ?? guess).replace(/\/+$/, '');
    this.token = opts.token ?? null;
    this.getToken = opts.getToken;
    this.timeoutMs = opts.timeoutMs ?? 15_000;
    this.defaultHeaders = {
      'content-type': 'application/json',
      ...omitUndefinedStrings(opts.defaultHeaders),
    };
    this.fetchImpl = opts.fetchImpl ?? fetch.bind(globalThis);
    this.retry = {
      maxAttempts: opts.retry?.maxAttempts ?? 2,
      baseDelayMs: opts.retry?.baseDelayMs ?? 300,
      maxDelayMs: opts.retry?.maxDelayMs ?? 5_000,
      retryOn: opts.retry?.retryOn ?? [429, 502, 503, 504],
    };
    this.onRateLimit = opts.onRateLimit;
  }

  // ----- 저수준 요청기 -----
  async request<T = unknown>(path: string, options: RequestOptions = {}): Promise<T> {
    const url = `${this.baseUrl}${path}${buildQuery(options.query)}`;
    const method = options.method ?? (options.body ? 'POST' : 'GET');

    // 헤더 구성
    const headers: Record<string, string> = {
      ...this.defaultHeaders,
      ...omitUndefinedStrings(options.headers),
    };

    // 인증
    const useAuth = options.auth !== false;
    let token: string | null | undefined = null;
    if (useAuth) {
      token = this.token ?? (this.getToken ? await this.getToken() : null);
      if (token) headers['authorization'] = `Bearer ${token}`;
    }

    // 바디 (RequestInit.body는 BodyInit | null 이어야 함)
    let bodyInit: BodyInit | null = null;
    if (options.body !== undefined && options.body !== null) {
      if (typeof FormData !== 'undefined' && options.body instanceof FormData) {
        delete headers['content-type']; // boundary 자동
        bodyInit = options.body as any;
      } else if (
        (typeof Blob !== 'undefined' && options.body instanceof Blob) ||
        (typeof ArrayBuffer !== 'undefined' && options.body instanceof ArrayBuffer)
      ) {
        bodyInit = options.body as any;
      } else {
        bodyInit = JSON.stringify(options.body);
      }
    }

    // 타임아웃 & Abort
    const timeoutMs = options.timeoutMs ?? this.timeoutMs;
    const timeoutCtrl = new AbortController();
    const timeoutId = setTimeout(
      () => timeoutCtrl.abort(new DOMException('Timeout', 'TimeoutError')),
      timeoutMs,
    );

    const combined = new AbortController();
    const onAbort = () => combined.abort(options.signal?.reason);
    options.signal?.addEventListener?.('abort', onAbort, { once: true });
    timeoutCtrl.signal.addEventListener('abort', () => combined.abort(timeoutCtrl.signal.reason), {
      once: true,
    });

    // 재시도 설정
    const retryCfg = {
      maxAttempts: options.retry?.maxAttempts ?? this.retry.maxAttempts,
      baseDelayMs: options.retry?.baseDelayMs ?? this.retry.baseDelayMs,
      maxDelayMs: options.retry?.maxDelayMs ?? this.retry.maxDelayMs,
      retryOn: options.retry?.retryOn ?? this.retry.retryOn,
    };
    let attempt = 0;

    try {
      for (;;) {
        attempt++;
        try {
          const res = await this.fetchImpl(url, {
            method,
            headers,
            ...(bodyInit !== null ? { body: bodyInit } : {}), // undefined로 넣지 않음
            signal: combined.signal,
          });

          // 레이트리밋 헤더 콜백
          const rl = pickRateLimit(res.headers);
          this.onRateLimit?.(rl);

          if (res.ok) {
            if (res.status === 204) return undefined as T;
            const ct = res.headers.get('content-type') || '';
            if (ct.includes('application/json')) {
              return (await res.json()) as T;
            }
            return (await res.text()) as unknown as T;
          }

          const isJson = (res.headers.get('content-type') || '').includes('application/json');
          let problem: unknown = undefined;
          if (isJson) {
            try {
              problem = await res.json();
            } catch {
              /* ignore */
            }
          } else {
            const text = await res.text().catch(() => '');
            if (text) problem = { title: text, status: res.status };
          }

          if (retryCfg.retryOn.includes(res.status) && attempt <= retryCfg.maxAttempts + 1) {
            const delay = Math.min(
              retryCfg.maxAttempts === 0
                ? 0
                : Math.round(retryCfg.baseDelayMs * Math.pow(2, attempt - 2)),
              retryCfg.maxDelayMs,
            );
            if (delay > 0) await sleep(delay);
            continue;
          }

          const msg =
            problem &&
            typeof problem === 'object' &&
            'title' in problem &&
            typeof (problem as any).title === 'string'
              ? (problem as any).title
              : `HTTP ${res.status}`;
          throw new ApiError(msg, res.status, res.headers, problem);
        } catch (err: unknown) {
          if (err instanceof DOMException && err.name === 'AbortError') throw err;
          if (attempt <= retryCfg.maxAttempts + 1) {
            const delay = Math.min(
              retryCfg.maxAttempts === 0
                ? 0
                : Math.round(retryCfg.baseDelayMs * Math.pow(2, attempt - 2)),
              retryCfg.maxDelayMs,
            );
            if (delay > 0) await sleep(delay);
            continue;
          }
          throw err;
        }
      }
    } finally {
      clearTimeout(timeoutId);
      options.signal?.removeEventListener?.('abort', onAbort as any);
    }
  }

  /////////////////////////////
  // 리소스별 편의 메서드群  //
  /////////////////////////////

  // --- Auth ---
  auth = {
    login: (params: { email: string; password: string }) =>
      this.request<{
        user: User;
        tokens: { accessToken: string; refreshToken?: string; expiresAt: string };
      }>('/auth/login', { method: 'POST', body: params, auth: false }),

    refresh: (params: { refreshToken: string }) =>
      this.request<{ accessToken: string; refreshToken?: string; expiresAt: string }>(
        '/auth/refresh',
        { method: 'POST', body: params, auth: false },
      ),

    logout: () => this.request<void>('/auth/logout', { method: 'POST' }),
  };

  // --- Users ---
  users = {
    list: (query?: {
      page?: number;
      limit?: number;
      sort_by?: string;
      sort_order?: 'asc' | 'desc';
      created_after?: string;
      created_before?: string;
    }) =>
      this.request<{ items: User[]; meta?: CursorPageMeta }>('/users', {
        method: 'GET',
        ...(query ? { query } : {}),
      }),

    create: (data: CreateUser) => this.request<User>('/users', { method: 'POST', body: data }),
  };

  // --- Programs ---
  programs = {
    list: (query?: {
      page?: number;
      limit?: number;
      sort_by?: string;
      sort_order?: 'asc' | 'desc';
      created_after?: string;
      created_before?: string;
    }) =>
      this.request<{ items: Program[]; meta?: CursorPageMeta }>('/programs', {
        method: 'GET',
        ...(query ? { query } : {}),
      }),

    create: (data: CreateProgram) =>
      this.request<Program>('/programs', { method: 'POST', body: data }),

    get: (programId: string) =>
      this.request<Program>(`/programs/${encodeURIComponent(programId)}`, { method: 'GET' }),

    update: (programId: string, patch: UpdateProgram) =>
      this.request<Program>(`/programs/${encodeURIComponent(programId)}`, {
        method: 'PATCH',
        body: patch,
      }),

    archive: (programId: string) =>
      this.request<void>(`/programs/${encodeURIComponent(programId)}`, { method: 'DELETE' }),
  };

  // --- Sessions ---
  sessions = {
    list: (query?: {
      page?: number;
      limit?: number;
      sort_by?: string;
      sort_order?: 'asc' | 'desc';
      programId?: string;
      from?: string;
      to?: string;
    }) =>
      this.request<{ items: Session[]; meta?: CursorPageMeta }>('/sessions', {
        method: 'GET',
        ...(query ? { query } : {}),
      }),

    create: (data: CreateSession) =>
      this.request<Session>('/sessions', { method: 'POST', body: data }),

    get: (sessionId: string) =>
      this.request<Session>(`/sessions/${encodeURIComponent(sessionId)}`, { method: 'GET' }),

    update: (sessionId: string, patch: UpdateSession) =>
      this.request<Session>(`/sessions/${encodeURIComponent(sessionId)}`, {
        method: 'PATCH',
        body: patch,
      }),

    delete: (sessionId: string) =>
      this.request<void>(`/sessions/${encodeURIComponent(sessionId)}`, { method: 'DELETE' }),
  };

  // --- Reservations (flows on sessions) ---
  reservations = {
    book: (sessionId: string, data: { userId: string }) =>
      this.request<BookSessionResponse>(`/sessions/${encodeURIComponent(sessionId)}/book`, {
        method: 'POST',
        body: data,
      }),

    cancel: (sessionId: string, data: { userId: string }) =>
      this.request<CancelSessionResponse>(`/sessions/${encodeURIComponent(sessionId)}/cancel`, {
        method: 'POST',
        body: data,
      }),
  };
}

/////////////////////////
// 팩토리 & 헬퍼       //
/////////////////////////

export function createApiClient(options: ApiClientOptions = {}) {
  return new ApiClient(options);
}

/** 내부용: cursor/page가 있을 수도 있는 쿼리 */
type AnyQuery = Record<string, unknown> & { cursor?: string | null; page?: number };

/**
 * 페이지네이션 도우미: 다음 페이지 호출 래퍼
 * - page 기반: page+1
 * - cursor 기반: meta.nextCursor 사용
 */
export async function nextPage<
  Q extends AnyQuery,
  T extends { items: unknown[]; meta?: CursorPageMeta },
>(listFn: (q?: Q) => Promise<T>, prev: T, baseQuery?: Q): Promise<T | null> {
  const base: AnyQuery = { ...(baseQuery ?? {}) };

  if (typeof base.page === 'number') {
    const next = { ...base, page: base.page + 1 } as Q;
    return listFn(next);
  }

  const cursor = prev.meta?.nextCursor ?? null;
  if (!cursor) return null;

  const withCursor = { ...base, cursor } as Q;
  return listFn(withCursor);
}
