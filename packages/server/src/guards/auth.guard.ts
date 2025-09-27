/**
 * Description : auth.guard.ts - 📌 최소 통합 인증 가드 (@Public / @Roles 지원)
 * Author : Shiwoo Min
 * Date : 2025-09-12
 */
import { type CanActivate, type ExecutionContext, ForbiddenException, Injectable, SetMetadata, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { resolveUserFromRequest } from '../middleware/auth.middleware.js';
import { META_ROLES_KEY, type RequestWithUser, type SessionUser, type UserRole } from '../server-types.js';

// 공개 핸들러/컨트롤러 메타키
export const IS_PUBLIC_KEY = 'connectwon:isPublic' as const;
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

// 최소 통합 인증 가드
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. 공개 라우트면 패스
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
    if (isPublic) return true;

    // 2. req.user 없으면 해석/주입
    const req = context.switchToHttp().getRequest<RequestWithUser>();
    let user: SessionUser | undefined = req.user;

    if (!user) {
      user = (await resolveUserFromRequest(req)) ?? undefined;
      if (user) (req as any).user = user;
    }
    if (!user) throw new UnauthorizedException('Unauthorized');

    // 3. 역할 요구가 있으면 검사
    const required = this.reflector.getAllAndOverride<UserRole[] | undefined>(META_ROLES_KEY, [context.getHandler(), context.getClass()]);
    if (required && required.length) {
      const has = user.roles?.some(r => required.includes(r));
      if (!has) throw new ForbiddenException('Forbidden');
    }

    return true;
  }
}
