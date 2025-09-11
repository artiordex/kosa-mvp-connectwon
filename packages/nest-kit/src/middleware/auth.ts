/**
 * Description : auth.ts - 📌 Express/Next 호환 인증 미들웨어
 * Usage       : app.use(createAuthMiddleware({ required: true }))
 */
import type { SessionUser } from '../../nest-types.js';
import { resolveUserFromRequest } from '../server/auth.js';

type NextFn = (err?: unknown) => void;

/** Express 스타일 시그니처 (프레임워크 비의존) */
export type Middleware = (req: any, res: any, next: NextFn) => void | Promise<void>;

export function createAuthMiddleware(opts?: {
  /** 커스텀 토큰 검증기(없으면 기본 verify 사용) */
  verify?: (token: string) => Promise<any> | any;
  /** true면 사용자 없을 때 401을 next로 넘김 */
  required?: boolean;
  /** 유저가 해석되면 호출(로깅/트레이싱 등에 사용) */
  onResolved?: (user: SessionUser | null, req: any) => void;
}): Middleware {
  return async (req, _res, next) => {
    try {
      const user = await resolveUserFromRequest(req, opts?.verify);
      if (user) (req as any).user = user;
      opts?.onResolved?.(user ?? null, req);
      if (opts?.required && !user) {
        const err: any = new Error('Unauthorized');
        err.status = 401;
        err.code = 'UNAUTHORIZED';
        return next(err);
      }
      return next();
    } catch (e: any) {
      if (opts?.required) {
        e ??= new Error('Unauthorized');
        e.status ??= 401;
        e.code ??= 'UNAUTHORIZED';
        return next(e);
      }
      return next();
    }
  };
}
