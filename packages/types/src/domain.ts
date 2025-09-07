/**
 * Description : domain.ts - 📌 DB 도메인 타입정의
 * Author : Shiwoo Min
 * Date : 2025-09-07
 */

/**
 * 사용자 역할(UserRole)
 * - 'USER'            : 일반 사용자
 * - 'PROGRAM_CREATOR' : 프로그램 개설자
 * - 'ADMIN'           : 시스템 관리자
 */
export type UserRole =
  | 'USER'
  | 'PROGRAM_CREATOR'
  | 'ADMIN'

/**
 * 세션 상태(SessionStatus)
 * - SCHEDULED  : 예정됨
 * - CONFIRMED  : 확정됨
 * - CANCELLED  : 취소됨
 * - COMPLETED  : 완료됨
 */
export type SessionStatus =
  | 'SCHEDULED'
  | 'CONFIRMED'
  | 'CANCELLED'
  | 'COMPLETED'

/**
 * 룸 상태(RoomStatus)
 * - ACTIVE       : 정상 운영 예약/배정 가능
 * - INACTIVE     : 운영 일시 중단, 시스템적으로 예약 차단
 * - MAINTENANCE  : 점검/보수
 */
export type RoomStatus =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'MAINTENANCE'

/**
 * 예약 상태(ReservationStatus)
 * - PENDING    : 대기(결제/승인 전)
 * - CONFIRMED  : 확정(결제완료 또는 관리 승인 완료)
 * - CANCELLED  : 취소(사용자/관리자/시스템)
 * - COMPLETED  : 이용 완료(체크아웃/수업 종료 이후 확정)
 */
export type ReservationStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'CANCELLED'
  | 'COMPLETED'

/**
 * 참가자 역할(ParticipantRole)
 * - HOST     : 진행자/강사/주최자
 * - ATTENDEE : 수강생/참가자
 */
export type ParticipantRole =
  | 'HOST'
  | 'ATTENDEE'

/**
 * 참가자 상태(ParticipantStatus)
 * - APPLIED    : 신청 완료(승인/결제 전)
 * - CONFIRMED  : 참가 확정(결제/승인 완료)
 * - CANCELLED  : 참가 취소(개인 사유/운영 취소 포함)
 * - NO_SHOW    : 무단 불참(출석관리/패널티 산정 근거)
 */
export type ParticipantStatus =
  | 'APPLIED'
  | 'CONFIRMED'
  | 'CANCELLED'
  | 'NO_SHOW'

/**
 * AI 상호작용 상태
 * - OK    : 성공
 * - ERROR : 실패
 */
export type AiStatus = 'OK' | 'ERROR'

/**
 * 역할 비트 플래그 유틸 (런타임)
 * - USER_ROLE_FLAGS: 각 역할을 2진 비트로 표현 (1,2,4,8,...)
 * - hasRole/addRole/removeRole: 비트 연산으로 권한 체크/추가/제거
 */
export const USER_ROLE_FLAGS: Record<UserRole, number> = {
  USER: 1 << 0,           // 1
  PROGRAM_CREATOR: 1 << 1, // 2
  ADMIN: 1 << 2,          // 4
} as const

export type RoleKey = keyof typeof USER_ROLE_FLAGS

// 해당 역할 비트를 보유하는지 확인
export function hasRole(roleFlags: number, role: RoleKey): boolean {
  return (roleFlags & USER_ROLE_FLAGS[role]) !== 0
}

// 역할 비트를 추가(켜기)
export function addRole(roleFlags: number, role: RoleKey): number {
  return roleFlags | USER_ROLE_FLAGS[role]
}

// 역할 비트를 제거(끄기)
export function removeRole(roleFlags: number, role: RoleKey): number {
  return roleFlags & ~USER_ROLE_FLAGS[role]
}

// 여러 역할 중 하나라도 가지고 있는지 확인
export function hasAnyRole(flags: number, roles: RoleKey[]): boolean {
  return roles.some((r) => hasRole(flags, r))
}

// 모든 역할을 가지고 있는지 확인
export function hasAllRoles(flags: number, roles: RoleKey[]): boolean {
  return roles.every((r) => hasRole(flags, r))
}

// 관리자 권한 체크 헬퍼
export function isAdmin(roleFlags: number): boolean {
  return hasRole(roleFlags, 'ADMIN')
}

 // 프로그램 생성 권한 체크 헬퍼
export function canCreateProgram(roleFlags: number): boolean {
  return hasAnyRole(roleFlags, ['PROGRAM_CREATOR', 'ADMIN'])
}

// API 응답 타입
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// 무한 스크롤용 응답 타입
export interface InfiniteResponse<T> {
  data: T[]
  hasNext: boolean
  nextCursor?: string | number
}
