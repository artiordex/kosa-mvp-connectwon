/**
 * Description : auth.middleware.ts - 📌 인증 미들웨어 + 토큰 파싱/검증
 * Author      : Shiwoo Min
 * Date        : 2025-09-12
 */
import type { NestMiddleware } from '@nestjs/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import type { HeadersLike, JwtClaims, SessionUser, UserRole } from '../server-types.js';
import type { NextFunction, Request, Response } from 'express';

/**
 * @description Express Request 확장 (req.user 지원)
 */
export interface RequestWithUser extends Request {
  user?: SessionUser;
}

type VerifyFn = (token: string) => Promise<JwtClaims> | JwtClaims;

/**
 * @description 헤더에서 Bearer 토큰 추출
 */
export function getBearerTokenFromHeaders(headers?: HeadersLike): string | null {
  const raw = headers?.['authorization'] ?? (headers as any)?.Authorization;
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (!value) return null;
  const [scheme, token] = value.split(' ');
  return scheme?.toLowerCase() === 'bearer' && token ? token : null;
}

/**
 * @description base64url → utf8 변환
 */
function base64UrlToUtf8(input: string): string {
  let s = input.replace(/-/g, '+').replace(/_/g, '/');
  const pad = s.length % 4;
  if (pad) s += '='.repeat(4 - pad);
  return Buffer.from(s, 'base64').toString('utf8');
}

/**
 * @description JWT Payload 디코딩 (서명 검증 X, 개발 편의용)
 */
function unsafeDecodeJwtPayload(token: string): any {
  const parts = token.split('.');
  const payloadPart = parts[1];
  if (!payloadPart) {
    throw new Error('Invalid JWT: missing payload part');
  }
  const json = base64UrlToUtf8(payloadPart);
  return JSON.parse(json);
}

/**
 * @description jsonwebtoken 모듈을 통한 검증 시도
 */
async function tryVerifyWithJsonWebToken(token: string): Promise<JwtClaims | null> {
  try {
    const mod: any = await import('jsonwebtoken').catch(() => null);
    if (!mod?.verify) return null;

    const secret = process.env['JWT_SECRET'] ?? 'dev-secret';
    return mod.verify(token, secret) as JwtClaims;
  } catch {
    return null;
  }
}

/**
 * @description 기본 토큰 검증 함수 (jsonwebtoken → fallback)
 */
export async function defaultVerify(token: string): Promise<JwtClaims> {
  const verified = await tryVerifyWithJsonWebToken(token);
  if (verified) return verified;

  // 폴백: 서명 미검증
  return unsafeDecodeJwtPayload(token) as JwtClaims;
}

/**
 * @description JwtClaims → SessionUser 매핑
 */
function claimsToSessionUser(claims: JwtClaims): SessionUser {
  const roles = Array.isArray(claims.roles) ? (claims.roles as UserRole[]) : [];

  return {
    id: String(claims.sub),
    email: String(claims.email ?? ''),
    roles,
    metadata: claims as Record<string, unknown>,
    ...(typeof claims.name === 'string' ? { name: claims.name } : {}),
    ...(typeof (claims as any).pictureUrl === 'string' ? { pictureUrl: (claims as any).pictureUrl } : {}),
    ...(typeof (claims as any).tenantId === 'string' ? { tenantId: (claims as any).tenantId } : {}),
    ...(typeof (claims as any).locale === 'string' ? { locale: (claims as any).locale } : {}),
  };
}

/**
 * @description Request에서 JWT 토큰 파싱 → 검증 → SessionUser 주입
 */
export async function resolveUserFromRequest(req: RequestWithUser, verify: VerifyFn = defaultVerify): Promise<SessionUser | null> {
  if (req?.user) return req.user; // 이미 주입된 경우

  const token = getBearerTokenFromHeaders(req?.headers);
  if (!token) return null;

  const claims = await verify(token);
  if (!claims?.sub) return null;

  const user = claimsToSessionUser(claims);
  req.user = user;
  return user;
}

/**
 * @description NestJS에서 사용할 인증 미들웨어 클래스
 * @example
 * consumer.apply(AuthMiddleware).forRoutes('*');
 */
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly opts?: {
      verify?: VerifyFn;
      required?: boolean;
      onResolved?: (user: SessionUser | null, req: RequestWithUser) => void;
    },
  ) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    try {
      const user = await resolveUserFromRequest(req as unknown as RequestWithUser, this.opts?.verify);
      if (user) (req as RequestWithUser).user = user;

      this.opts?.onResolved?.(user ?? null, req as RequestWithUser);

      if (this.opts?.required && !user) {
        throw new UnauthorizedException({
          code: 'UNAUTHORIZED',
          message: 'Authentication required',
        });
      }

      return next();
    } catch (e) {
      if (this.opts?.required) {
        return next(
          new UnauthorizedException({
            code: 'UNAUTHORIZED',
            message: 'Authentication failed',
            details: (e as any)?.message,
          }),
        );
      }
      return next();
    }
  }
}
