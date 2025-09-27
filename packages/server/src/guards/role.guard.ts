/**
 * Description : role.guard.ts - 📌 역할 데코레이터 + 권한 가드 (NestJS)
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import { ForbiddenException, Injectable, SetMetadata } from '@nestjs/common';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { META_ROLES_KEY, type UserRole } from '../server-types.js';

/**
 * @description 컨트롤러/핸들러에 필요한 역할을 선언하는 데코레이터
 */
export const Roles = (...roles: UserRole[]) => SetMetadata(META_ROLES_KEY, roles);

/**
 * @description 역할 기반 접근 제어 가드
 */
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(META_ROLES_KEY, [ctx.getHandler(), ctx.getClass()]);

    if (!requiredRoles || requiredRoles.length === 0) return true;

    const req = ctx.switchToHttp().getRequest<{ user?: { roles?: UserRole[] } }>();
    const userRoles: UserRole[] | undefined = req?.user?.roles;

    if (!userRoles || !userRoles.some(r => requiredRoles.includes(r))) {
      throw new ForbiddenException('권한이 없습니다.');
    }

    return true;
  }
}
