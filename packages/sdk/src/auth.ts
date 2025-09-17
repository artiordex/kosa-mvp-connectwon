/**
 * Description : auth.ts - 📌 API 키·베어러 인증 미들웨어
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
import type { Middleware } from '../sdk-types.js';

// API 키 인증 미들웨어
export function apiKeyAuth(headerName = 'x-api-key', key?: string): Middleware {
  return {
    onRequest(req) {
      const h = new Headers(req.headers);
      if (key) h.set(headerName, key);
      return { ...req, headers: h };
    },
  };
}

// Bearer 토큰 인증 미들웨어
export function bearerAuth(
  getToken: () => string | Promise<string>,
  headerName = 'Authorization',
): Middleware {
  return {
    async onRequest(req) {
      const token = await getToken();
      const h = new Headers(req.headers);
      if (token) h.set(headerName, `Bearer ${token}`);
      return { ...req, headers: h };
    },
  };
}

// JSON 요청/응답 미들웨어
export const jsonHeaders: Middleware = {
  onRequest(req) {
    const h = new Headers(req.headers);
    if (!h.has('content-type')) h.set('content-type', 'application/json');
    if (!h.has('accept')) h.set('accept', 'application/json');
    return { ...req, headers: h };
  },
};
