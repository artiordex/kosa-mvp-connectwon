/**
 * Description : middleware.ts - 📌 미들웨어 인터페이스·컴포저
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
import type { HttpContext, HttpRequest, HttpResponse, Middleware } from '../../sdk-types.js';

// 미들웨어 배열을 단일 함수로 합성
export function composeMiddlewares(
  mw: Middleware[],
): (
  req: HttpRequest,
  ctx: HttpContext,
  next: (req: HttpRequest) => Promise<HttpResponse>,
) => Promise<HttpResponse> {
  return async (req, ctx, next) => {
    let i = -1;
    const run = async (idx: number, r: HttpRequest): Promise<HttpResponse> => {
      if (idx <= i) throw new Error('next() called multiple times');
      i = idx;
      const m = mw[idx];
      if (!m) return next(r);
      const r2 = m.onRequest ? await m.onRequest(r, ctx) : r;
      try {
        const res = await run(idx + 1, r2);
        return m.onResponse ? await m.onResponse(res, ctx) : res;
      } catch (err) {
        if (m.onError) await m.onError(err, ctx);
        throw err;
      }
    };
    return run(0, req);
  };
}
