/**
 * Description : permissions.ts - 📌 권한 기반 접근 제어 데코레이터
 * Author : Shiwoo Min
 * Date : 2025-09-12
 */
import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'acl:permissions' as const;
export type PermissionMode = 'all' | 'any';

// 권한 카탈로그
export const PERMISSIONS = {
  USER: {
    CREATE: 'user:create',
    READ: 'user:read',
    UPDATE: 'user:update',
    DELETE: 'user:delete',
    LIST: 'user:list',
  },
  VENUE: {
    CREATE: 'venue:create',
    READ: 'venue:read',
    UPDATE: 'venue:update',
    DELETE: 'venue:delete',
    LIST: 'venue:list',
    MANAGE: 'venue:manage',
  },
  PROGRAM: {
    CREATE: 'program:create',
    READ: 'program:read',
    UPDATE: 'program:update',
    DELETE: 'program:delete',
    LIST: 'program:list',
    MANAGE: 'program:manage',
  },
  RESERVATION: {
    CREATE: 'reservation:create',
    READ: 'reservation:read',
    UPDATE: 'reservation:update',
    DELETE: 'reservation:delete',
    LIST: 'reservation:list',
    APPROVE: 'reservation:approve',
    CANCEL: 'reservation:cancel',
  },
  PAYMENT: {
    READ: 'payment:read',
    PROCESS: 'payment:process',
    REFUND: 'payment:refund',
    LIST: 'payment:list',
  },
  ADMIN: {
    ALL: 'admin:all',
    DASHBOARD: 'admin:dashboard',
    SETTINGS: 'admin:settings',
    ANALYTICS: 'admin:analytics',
  },
} as const;

// 안전한 값 합집합 유틸
type ValueOf<T> = T[keyof T];

// PERMISSIONS의 각 그룹을 순회하며 값들의 합집합을 만듦
type Permission = {
  [K in keyof typeof PERMISSIONS]: ValueOf<(typeof PERMISSIONS)[K]>;
}[keyof typeof PERMISSIONS];

export interface PermissionsConfig {
  permissions: Permission[];
  mode?: PermissionMode; // 기본 'all'
}

// 기본 데코레이터: 권한 배열 + 모드(all/any)
export const Permissions = (perms: Permission | Permission[], mode: PermissionMode = 'all') =>
  SetMetadata(PERMISSIONS_KEY, {
    permissions: Array.isArray(perms) ? perms : [perms],
    mode,
  } satisfies PermissionsConfig);

// 슈가
export const RequireAll = (...perms: Permission[]) => Permissions(perms, 'all');
export const RequireAny = (...perms: Permission[]) => Permissions(perms, 'any');

// 자주 쓰는 도메인 별 슈가(최소만 유지)
export const AdminOnly = () => RequireAny(PERMISSIONS.ADMIN.ALL);
export const VenueManager = () => RequireAny(PERMISSIONS.VENUE.MANAGE, PERMISSIONS.ADMIN.ALL);
export const ProgramManager = () =>
  RequireAny(PERMISSIONS.PROGRAM.MANAGE, PERMISSIONS.VENUE.MANAGE, PERMISSIONS.ADMIN.ALL);
export const ReservationApprover = () =>
  RequireAny(PERMISSIONS.RESERVATION.APPROVE, PERMISSIONS.VENUE.MANAGE, PERMISSIONS.ADMIN.ALL);
export const PaymentViewer = () =>
  RequireAny(PERMISSIONS.PAYMENT.READ, PERMISSIONS.VENUE.MANAGE, PERMISSIONS.ADMIN.ALL);

// 유틸 (가드/서비스 공용)
export const PermissionUtils = {
  has(userPerms: string[], need: Permission) {
    return userPerms.includes(need) || userPerms.includes(PERMISSIONS.ADMIN.ALL);
  },
  hasAll(userPerms: string[], needs: Permission[]) {
    if (userPerms.includes(PERMISSIONS.ADMIN.ALL)) return true;
    return needs.every(p => userPerms.includes(p));
  },
  hasAny(userPerms: string[], needs: Permission[]) {
    if (userPerms.includes(PERMISSIONS.ADMIN.ALL)) return true;
    return needs.some(p => userPerms.includes(p));
  },
} as const;

// 권한 계층 구조 (상속 관계)
export const PERMISSION_HIERARCHY: Partial<Record<Permission, Permission[]>> = {
  [PERMISSIONS.ADMIN.ALL]: Object.values(PERMISSIONS).flatMap(g => Object.values(g)),
  [PERMISSIONS.VENUE.MANAGE]: [
    PERMISSIONS.VENUE.READ,
    PERMISSIONS.VENUE.UPDATE,
    PERMISSIONS.PROGRAM.CREATE,
    PERMISSIONS.PROGRAM.READ,
    PERMISSIONS.PROGRAM.UPDATE,
    PERMISSIONS.PROGRAM.DELETE,
    PERMISSIONS.RESERVATION.READ,
    PERMISSIONS.RESERVATION.APPROVE,
    PERMISSIONS.RESERVATION.CANCEL,
  ],
  [PERMISSIONS.PROGRAM.MANAGE]: [
    PERMISSIONS.PROGRAM.READ,
    PERMISSIONS.PROGRAM.UPDATE,
    PERMISSIONS.PROGRAM.DELETE,
  ],
} as const;
