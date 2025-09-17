/**
 * Description : program.ts - 프로그램 접근 제어 데코레이터
 * Author : Shiwoo Min
 * Date : 2025-09-12
 */
import { SetMetadata } from '@nestjs/common';

// 프로그램 관련 메타데이터 키 및 타입 정의
export const PROGRAM_ACCESS_KEY = 'acl:program:access' as const;
export const PROGRAM_ENROLLMENT_KEY = 'acl:program:enrollment' as const;
export const PROGRAM_STATUS_KEY = 'acl:program:status' as const;

// 프로그램 접근 레벨 및 상태 타입 정의
export type ProgramAccessLevel = 'creator' | 'instructor' | 'assistant' | 'participant' | 'viewer';

// 프로그램 상태 및 등록 상태 타입 정의
export type ProgramStatus =
  | 'draft'
  | 'published'
  | 'active'
  | 'completed'
  | 'cancelled'
  | 'archived';
export type EnrollmentStatus = 'enrolled' | 'waitlist' | 'completed' | 'cancelled';

// 데코레이터 함수 정의
export const ProgramAccess = (...levels: ProgramAccessLevel[]) =>
  SetMetadata(PROGRAM_ACCESS_KEY, levels);

// 프로그램 등록 상태 및 프로그램 상태 데코레이터 함수 정의
export const ProgramEnrollment = (...statuses: EnrollmentStatus[]) =>
  SetMetadata(PROGRAM_ENROLLMENT_KEY, statuses);

// 프로그램 상태 데코레이터 함수 정의
export const ProgramStatusReq = (...statuses: ProgramStatus[]) =>
  SetMetadata(PROGRAM_STATUS_KEY, statuses);

// 자주 쓰이는 조합 데코레이터 함수 정의
export const ProgramCreatorOnly = () => ProgramAccess('creator');
export const ProgramManagerAccess = () => ProgramAccess('creator', 'instructor');
export const ProgramStaffAccess = () => ProgramAccess('creator', 'instructor', 'assistant');
export const ProgramParticipantOrAbove = () =>
  ProgramAccess('creator', 'instructor', 'assistant', 'participant');

// 복합 조건 데코레이터 함수 정의
export const PROGRAM_COMPLEX_KEY = 'acl:program:complex' as const;
export interface ComplexProgramAccessOptions {
  access?: ProgramAccessLevel[];
  enrollment?: EnrollmentStatus[];
  status?: ProgramStatus[];
  requireAll?: boolean; // 기본 false
}
export const ComplexProgramAccess = (opts: ComplexProgramAccessOptions) =>
  SetMetadata(PROGRAM_COMPLEX_KEY, opts);
