/**
 * Description : auth.ts - 📌 인증 미들웨어 + 토큰 파싱/검증
 * Author : Shiwoo Min
 * Date : 2025-09-12
 */
import type {
  HeadersLike,
  JwtClaims,
  RequestWithUser,
  SessionUser,
  UserRole,
} from '../../server-types.js';

type NextFn = (err?: unknown) => void;
type Middleware = (req: any, res: any, next: NextFn) => void | Promise<void>;
type VerifyFn = (token: string) => Promise<JwtClaims> | JwtClaims;

// 헤더에서 Bearer 토큰 추출
export function getBearerTokenFromHeaders(headers?: HeadersLike): string | null {
  const raw = headers?.['authorization'] ?? (headers as any)?.Authorization;
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (!value) return null;
  const [scheme, token] = value.split(' ');
  return scheme?.toLowerCase() === 'bearer' && token ? token : null;
}

// base64url → utf8
function base64UrlToUtf8(input: string): string {
  let s = input.replace(/-/g, '+').replace(/_/g, '/');
  const pad = s.length % 4;
  if (pad) s += '='.repeat(4 - pad);
  return Buffer.from(s, 'base64').toString('utf8');
}

// 서명 미검증 JWT 페이로드 디코드
function unsafeDecodeJwtPayload(token: string): any {
  const parts = token.split('.');
  const payloadPart = parts[1];
  if (!payloadPart) {
    throw new Error('Invalid JWT: missing payload part');
  }
  const json = base64UrlToUtf8(payloadPart);
  return JSON.parse(json);
}

// jsonwebtoken 시도
async function tryVerifyWithJsonWebToken(token: string): Promise<JwtClaims | null> {
  try {
    const modId = 'jsonwebtoken' as unknown as string;
    const mod: any = await import(modId).catch(() => null);
    if (!mod?.verify) return null;
    const secret = process.env['JWT_SECRET'] ?? 'dev-secret';
    const out = mod.verify(token, secret);
    return out as JwtClaims;
  } catch {
    return null;
  }
}

// 기본 토큰 검증 함수
export async function defaultVerify(token: string): Promise<JwtClaims> {
  const verified = await tryVerifyWithJsonWebToken(token);
  if (verified) return verified;
  // 폴백: 서명 미검증 (개발 편의용)
  return unsafeDecodeJwtPayload(token) as JwtClaims;
}

// JwtClaims → SessionUser 매핑
function claimsToSessionUser(claims: JwtClaims): SessionUser {
  const roles = Array.isArray(claims.roles) ? (claims.roles as UserRole[]) : [];

  const base = {
    id: String(claims.sub),
    email: String(claims.email ?? ''),
    roles,
    metadata: claims as Record<string, unknown>,
  } satisfies Omit<SessionUser, 'name' | 'pictureUrl' | 'tenantId' | 'locale' | 'metadata'> & {
    metadata: Record<string, unknown>;
  };

  return {
    ...base,
    ...(typeof claims.name === 'string' ? { name: claims.name } : {}),
    ...(typeof (claims as any).pictureUrl === 'string'
      ? { pictureUrl: (claims as any).pictureUrl }
      : {}),
    ...(typeof (claims as any).tenantId === 'string' ? { tenantId: (claims as any).tenantId } : {}),
    ...(typeof (claims as any).locale === 'string' ? { locale: (claims as any).locale } : {}),
  };
}

// Request에서 토큰 → 검증 → SessionUser 주입
export async function resolveUserFromRequest(
  req: RequestWithUser,
  verify: VerifyFn = defaultVerify,
): Promise<SessionUser | null> {
  // 이미 주입되어 있으면 그대로 사용
  if (req?.user) return req.user;

  const token = getBearerTokenFromHeaders(req?.headers);
  if (!token) return null;

  const claims = await verify(token);
  if (!claims?.sub) return null;

  const user = claimsToSessionUser(claims);
  (req as any).user = user;
  return user;
}

// 미들웨어
export function createAuthMiddleware(opts?: {
  verify?: VerifyFn;
  required?: boolean;
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
