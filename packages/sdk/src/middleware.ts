/**
 * Description : middleware.ts - 📌 미들웨어 인터페이스·컴포저
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
import type { HttpContext, HttpRequest, HttpResponse, Middleware } from './sdk-types.js';

/**
 * 미들웨어 배열을 단일 체인 함수로 합성
 * @param mw 미들웨어 배열
 * @returns 합성된 미들웨어 실행기
 */
export function composeMiddlewares(
  mw: Middleware[],
): (req: HttpRequest, ctx: HttpContext, next: (req: HttpRequest) => Promise<HttpResponse>) => Promise<HttpResponse> {
  return async (req, ctx, next) => {
    let index = -1;

    const run = async (i: number, r: HttpRequest): Promise<HttpResponse> => {
      if (i <= index) {
        throw new Error('composeMiddlewares: next() called multiple times');
      }
      index = i;

      const m = mw[i];
      if (!m) return next(r);

      try {
        // onRequest 실행
        const nextReq = (m.onRequest ? await m.onRequest(r, ctx) : r) ?? r;

        // 다음 미들웨어로 진행
        const res = await run(i + 1, nextReq);

        // onResponse 실행
        return (m.onResponse ? await m.onResponse(res, ctx) : res) ?? res;
      } catch (err) {
        // onError 실행 후 에러 다시 throw
        if (m.onError) {
          try {
            await m.onError(err, ctx);
          } catch (innerErr) {
            // onError에서 에러가 또 나면 원래 에러 대신 이걸 던짐
            throw innerErr;
          }
        }
        throw err;
      }
    };
    return run(0, req);
  };
}
