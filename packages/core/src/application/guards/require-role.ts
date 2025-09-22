/**
 * Description : require-role.ts - 📌 역할 데코레이터 + 권한 가드 (NestJS)
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */

import { ForbiddenException, Injectable, SetMetadata } from '@nestjs/common';
// 타입 전용 import
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
 * @param roles 필요한 역할 목록
 * @returns 메타데이터 데코레이터
 * @example
 * ```typescript
 * @Roles('ADMIN', 'PROGRAM_CREATOR')
 * @Get('/admin-only')
 * adminOnlyEndpoint() { }
 * ```
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

/**
 * @description 선언된 역할 메타데이터를 검사하는 가드
 * @summary 요청한 사용자의 역할이 필요 역할에 포함되는지 검증
 */
@Injectable()
export class RequireRoleGuard implements CanActivate {
  /**
   * @description RequireRoleGuard 생성자
   * @param reflector NestJS Reflector 인스턴스
   */
  constructor(private readonly reflector: Reflector) {}

  /**
   * @description 권한 검사 실행
   * @param ctx 실행 컨텍스트
   * @returns 접근 허용 여부
   * @throws {ForbiddenException} 권한이 없는 경우
   */
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
