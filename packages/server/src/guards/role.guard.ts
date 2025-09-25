/**
 * Description : role.guard.ts - 📌 역할 데코레이터 + 권한 가드 (NestJS)
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import { ForbiddenException, Injectable, SetMetadata } from '@nestjs/common';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

/**
 * @description 사용자 역할 타입 정의
 */
export type Role = 'ADMIN' | 'PROGRAM_CREATOR' | 'USER';

/**
 * @description 역할 메타데이터 키
 */
export const ROLES_KEY = 'roles';

/**
 * @description 컨트롤러/핸들러에 필요한 역할을 선언하는 데코레이터
 * @example
 * ```ts
 * @Roles('ADMIN', 'PROGRAM_CREATOR')
 * @Get('/admin-only')
 * adminOnlyEndpoint() {}
 * ```
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

/**
 * @description 역할 기반 접근 제어 가드
 */
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [ctx.getHandler(), ctx.getClass()]);

    if (!requiredRoles || requiredRoles.length === 0) return true;

    const req = ctx.switchToHttp().getRequest();
    const userRole: Role | undefined = req?.user?.role;

    if (!userRole || !requiredRoles.includes(userRole)) {
      throw new ForbiddenException('권한이 없습니다.');
    }

    return true;
  }
}
