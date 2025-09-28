/**
 * Description : auth.ts - 📌 API 키·베어러 인증 미들웨어
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
import type { Middleware } from './sdk-types.js';

/**
 * API 키 인증 미들웨어
 * @param headerName API 키를 설정할 헤더 이름 (기본값: 'x-api-key')
 * @param key 사용자가 제공하는 API 키. 없으면 미설정.
 * @param override 이미 존재하는 값 덮어쓸지 여부 (기본: true)
 */
export function apiKeyAuth(headerName = 'x-api-key', key?: string, override = true): Middleware {
  const normalized = headerName.toLowerCase();
  return {
    onRequest(req) {
      const h = new Headers(req.headers);
      if (key && (override || !h.has(normalized))) {
        h.set(normalized, key);
      }
      return { ...req, headers: h };
    },
  };
}

/**
 * Bearer 토큰 인증 미들웨어
 * @param getToken Bearer 토큰을 동적으로 반환하는 함수
 * @param headerName 토큰을 설정할 헤더 이름 (기본값: 'authorization')
 * @param override 이미 존재하는 값 덮어쓸지 여부 (기본: true)
 */
export function bearerAuth(getToken: () => string | Promise<string>, headerName = 'authorization', override = true): Middleware {
  const normalized = headerName.toLowerCase();
  return {
    async onRequest(req) {
      const token = await getToken();
      const h = new Headers(req.headers);
      if (token && (override || !h.has(normalized))) {
        h.set(normalized, `Bearer ${token}`);
      }
      return { ...req, headers: h };
    },
  };
}

/**
 * JSON 요청/응답 미들웨어
 * 요청 헤더에 `Content-Type: application/json`, `Accept: application/json`을 추가합니다.
 * 단, body 가 FormData / Blob / ArrayBuffer 인 경우 content-type 은 건드리지 않습니다.
 */
export const jsonHeaders: Middleware = {
  onRequest(req) {
    const h = new Headers(req.headers);

    // Accept 은 항상 JSON 요구
    if (!h.has('accept')) h.set('accept', 'application/json');

    // body 타입이 JSON 직렬화 대상일 때만 Content-Type 지정
    const body = (req as any).body;
    const isBinary = body instanceof FormData || body instanceof Blob || body instanceof ArrayBuffer;

    if (!isBinary && !h.has('content-type')) {
      h.set('content-type', 'application/json');
    }

    return { ...req, headers: h };
  },
};
