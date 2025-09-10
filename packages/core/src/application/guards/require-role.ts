/**
 * Description : require-role.ts - 📌 역할 데코레이터 + 권한 가드 (NestJS)
 * Author      : Shiwoo Min
 * Date        : 2025-09-10
 */
import { ForbiddenException, Injectable, SetMetadata } from '@nestjs/common';
// 타입 전용 import
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

/** 역할 타입 */
export type Role = 'ADMIN' | 'PROGRAM_CREATOR' | 'USER';

/** 메타데이터 키 */
export const ROLES_KEY = 'roles';

/** 컨트롤러/핸들러에 필요한 역할을 선언하는 데코레이터 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

/** 선언된 역할 메타데이터를 검사하는 가드 */
@Injectable()
export class RequireRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (!required || required.length === 0) return true;

    const req = ctx.switchToHttp().getRequest();
    const userRole: Role | undefined = req?.user?.role;

    if (!userRole || !required.includes(userRole)) {
      throw new ForbiddenException('권한이 없습니다.');
    }
    return true;
  }
}
