/**
 * Description : index.ts - 📌 인증 관련 런타임 헬퍼
 * Author : Shiwoo Min
 * Date : 2025-09-07
 */

import type { UserRole } from "@connectwon/types"

// 역할 비트 플래그
export const USER_ROLE_FLAGS: Record<UserRole, number> = {
  USER: 1 << 0,
  PROGRAM_CREATOR: 1 << 1,
  ADMIN: 1 << 2,
} as const

export type RoleKey = keyof typeof USER_ROLE_FLAGS

export const hasRole = (flags: number, role: RoleKey) =>
  (flags & USER_ROLE_FLAGS[role]) !== 0
export const addRole = (flags: number, role: RoleKey) =>
  flags | USER_ROLE_FLAGS[role]
export const removeRole = (flags: number, role: RoleKey) =>
  flags & ~USER_ROLE_FLAGS[role]
export const hasAnyRole = (f: number, roles: RoleKey[]) =>
  roles.some(r => hasRole(f, r))
export const hasAllRoles = (f: number, roles: RoleKey[]) =>
  roles.every(r => hasRole(f, r))
export const isAdmin = (f: number) => hasRole(f, "ADMIN")
export const canCreateProgram = (f: number) =>
  hasAnyRole(f, ["PROGRAM_CREATOR", "ADMIN"])
