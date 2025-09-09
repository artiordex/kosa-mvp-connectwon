/**
 * Description : auth.ts - 📌 API 키·베어러 인증 미들웨어
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
import type { Middleware } from '../sdk-types.js';

// 단순 API 키 (예: x-api-key)
export function apiKeyAuth(headerName = 'x-api-key', key?: string): Middleware {
  return {
    onRequest(req) {
      const h = new Headers(req.headers as any);
      if (key) h.set(headerName, key);
      return { ...req, headers: h };
    },
  };
}

// Bearer 토큰 (동적 제공자)
export function bearerAuth(
  getToken: () => string | Promise<string>,
  headerName = 'Authorization',
): Middleware {
  return {
    async onRequest(req) {
      const token = await getToken();
      const h = new Headers(req.headers as any);
      if (token) h.set(headerName, `Bearer ${token}`);
      return { ...req, headers: h };
    },
  };
}

// JSON 기본 헤더 부착
export const jsonHeaders: Middleware = {
  onRequest(req) {
    const h = new Headers(req.headers as any);
    if (!h.has('content-type')) h.set('content-type', 'application/json');
    if (!h.has('accept')) h.set('accept', 'application/json');
    return { ...req, headers: h };
  },
};
