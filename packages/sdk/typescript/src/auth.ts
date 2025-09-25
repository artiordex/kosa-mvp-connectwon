/**
 * Description : auth.ts - 📌 API 키·베어러 인증 미들웨어
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
import type { Middleware } from '../../sdk-types.js';

/**
 * API 키 인증 미들웨어
 * @param {string} [headerName='x-api-key'] - API 키를 설정할 헤더 이름 (기본값: 'x-api-key')
 * @param {string} [key] - 사용자가 제공하는 API 키. 없으면 기본값 사용.
 * @returns {Middleware} - 요청 헤더에 API 키를 추가하는 미들웨어
 * @description 이 미들웨어는 요청 헤더에 API 키를 설정합니다. `key`가 제공되면 해당 값으로 설정되며, 기본값은 'x-api-key'로 설정됩니다.
 */
export function apiKeyAuth(headerName = 'x-api-key', key?: string): Middleware {
  return {
    onRequest(req) {
      const h = new Headers(req.headers);
      if (key) h.set(headerName, key);
      return { ...req, headers: h };
    },
  };
}

/**
 * Bearer 토큰 인증 미들웨어
 * @param {Function} getToken - Bearer 토큰을 동적으로 반환하는 함수
 * @param {string} [headerName='Authorization'] - 토큰을 설정할 헤더 이름 (기본값: 'Authorization')
 * @returns {Middleware} - 요청 헤더에 Bearer 토큰을 추가하는 미들웨어
 * @description 이 미들웨어는 요청 헤더에 Bearer 인증 토큰을 설정합니다. `getToken` 함수는 토큰을 반환하는 비동기 함수입니다.
 */
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

/**
 * JSON 요청/응답 미들웨어
 * @description 요청 헤더에 `Content-Type: application/json`과 `Accept: application/json`을 추가하는 미들웨어.
 * @returns {Middleware} - JSON 요청 및 응답을 위한 헤더를 추가하는 미들웨어
 * @note 이 미들웨어는 모든 요청에 대해 JSON 형식을 요구합니다.
 */
export const jsonHeaders: Middleware = {
  onRequest(req) {
    const h = new Headers(req.headers);
    if (!h.has('content-type')) h.set('content-type', 'application/json');
    if (!h.has('accept')) h.set('accept', 'application/json');
    return { ...req, headers: h };
  },
};
