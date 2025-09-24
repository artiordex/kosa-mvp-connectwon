/**
 * Description: auth.contract.ts - 📌 Zod를 사용하여 데이터 구조를 검증하며, 인증에 필요한 스키마를 정의
 * Author: Shiwoo Min
 * Date: 2025-09-07
 */
import { PaginationInfoSchema } from './common.contract';
import { z } from 'zod';

/**
 * @description 사용자 기본 스키마 (DDL 호환)
 * @typedef {Object} User
 * @property {string} id - 사용자 ID
 * @property {string} email - 이메일 주소
 * @property {string} name - 사용자 이름
 * @property {Date} [last_login_at] - 마지막 로그인 시간
 * @property {number} role_flags - 역할 플래그 (비트 마스크)
 * @property {Object} preferences - 사용자 설정 (JSON)
 * @property {Date} created_at - 생성 시간
 * @property {Date} updated_at - 수정 시간
 */
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  last_login_at: z.string().datetime().nullable(),
  role_flags: z.number().int().default(0),
  preferences: z.record(z.any()).default({}),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});
export type User = z.infer<typeof UserSchema>;

/**
 * @description 사용자 생성 요청 스키마
 * @typedef {Object} CreateUserRequest
 * @property {string} email - 이메일 주소
 * @property {string} name - 사용자 이름
 * @property {string} password - 비밀번호 (최소 6자)
 * @property {number} [role_flags=0] - 역할 플래그
 */
export const CreateUserRequestSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요'),
  name: z.string().min(1, '이름을 입력해주세요'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
  role_flags: z.number().int().default(0),
});
export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>;

/**
 * @description 사용자 수정 요청 스키마
 * @typedef {Object} UpdateUserRequest
 * @property {string} [name] - 사용자 이름
 * @property {number} [role_flags] - 역할 플래그
 * @property {Object} [preferences] - 사용자 설정
 */
export const UpdateUserRequestSchema = z.object({
  name: z.string().min(1).optional(),
  role_flags: z.number().int().optional(),
  preferences: z.record(z.any()).optional(),
});
export type UpdateUserRequest = z.infer<typeof UpdateUserRequestSchema>;

/**
 * @description 사용자 목록 응답 스키마
 * @typedef {Object} UserListResponse
 * @property {User[]} data - 사용자 목록
 * @property {PaginationInfo} pagination - 페이지네이션 정보
 */
export const UserListResponseSchema = z.object({
  data: z.array(UserSchema),
  pagination: PaginationInfoSchema,
});
export type UserListResponse = z.infer<typeof UserListResponseSchema>;

/**
 * @description 인증 제공자 스키마 (로그인 및 인증 관련)
 * @typedef {Object} AuthProviderRecord
 * @property {string} id - 인증 제공자 ID
 * @property {string} user_id - 사용자 ID
 * @property {string} provider - 제공자 ('local', 'google', 'kakao', 'github')
 * @property {string} [provider_sub] - 외부 인증 식별자
 * @property {string} [password_hash] - 비밀번호 해시 (로컬 인증용)
 * @property {Object} meta - 메타데이터
 * @property {Date} created_at - 생성 시간
 * @property {Date} updated_at - 수정 시간
 */
export const AuthProviderRecordSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  provider: z.enum(['local', 'google', 'kakao', 'github']),
  provider_sub: z.string().nullable(),
  password_hash: z.string().nullable(),
  meta: z.record(z.any()).default({}),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});
export type AuthProviderRecord = z.infer<typeof AuthProviderRecordSchema>;

/**
 * @description 로그인 요청 스키마 (통합)
 * @typedef {Object} LoginRequest
 * @property {string} type - 로그인 타입 ('google' 또는 'local')
 * @property {string} google_token - 구글 로그인 시 필요한 토큰
 * @property {string} email - 이메일 (로컬 로그인 시)
 * @property {string} password - 비밀번호 (로컬 로그인 시)
 */
export const LoginRequestSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('google'),
    google_token: z.string().min(1, '구글 토큰이 필요합니다'),
  }),
  z.object({
    type: z.literal('local'),
    email: z.string().email('유효한 이메일을 입력해주세요'),
    password: z.string().min(1, '비밀번호를 입력해주세요'),
  }),
]);
export type LoginRequest = z.infer<typeof LoginRequestSchema>;

/**
 * @description 로그인 응답 스키마
 * @typedef {Object} LoginResponse
 * @property {string} access_token - 액세스 토큰
 * @property {string} refresh_token - 리프레시 토큰
 * @property {string} token_type - 토큰 타입
 * @property {number} expires_in - 만료 시간 (초)
 * @property {User} user - 사용자 정보
 */
export const LoginResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  token_type: z.string().default('Bearer'),
  expires_in: z.number().int().min(0),
  user: UserSchema,
});
export type LoginResponse = z.infer<typeof LoginResponseSchema>;

/**
 * @description 리프레시 토큰 요청 스키마
 * @typedef {Object} RefreshTokenRequest
 * @property {string} refresh_token - 리프레시 토큰
 */
export const RefreshTokenRequestSchema = z.object({
  refresh_token: z.string().min(1, '리프레시 토큰이 필요합니다'),
});
export type RefreshTokenRequest = z.infer<typeof RefreshTokenRequestSchema>;

/**
 * @description 비밀번호 재설정 요청 스키마
 * @typedef {Object} ResetPasswordRequest
 * @property {string} email - 이메일 주소
 */
export const ResetPasswordRequestSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요'),
});
export type ResetPasswordRequest = z.infer<typeof ResetPasswordRequestSchema>;

/**
 * @description 비밀번호 재설정 확인 스키마
 * @typedef {Object} ConfirmResetPasswordRequest
 * @property {string} token - 재설정 토큰
 * @property {string} new_password - 새 비밀번호
 */
export const ConfirmResetPasswordRequestSchema = z.object({
  token: z.string().min(1, '재설정 토큰이 필요합니다'),
  new_password: z.string().min(6, '새 비밀번호는 최소 6자 이상이어야 합니다'),
});
export type ConfirmResetPasswordRequest = z.infer<typeof ConfirmResetPasswordRequestSchema>;

/**
 * @description 비밀번호 변경 요청 스키마
 * @typedef {Object} ChangePasswordRequest
 * @property {string} current_password - 현재 비밀번호
 * @property {string} new_password - 새 비밀번호
 */
export const ChangePasswordRequestSchema = z.object({
  current_password: z.string().min(1, '현재 비밀번호를 입력해주세요'),
  new_password: z.string().min(6, '새 비밀번호는 최소 6자 이상이어야 합니다'),
});
export type ChangePasswordRequest = z.infer<typeof ChangePasswordRequestSchema>;

/**
 * @description 인증 관련 모든 스키마 내보내기
 * @namespace AuthSchemas
 */
export const AuthSchemas = {
  UserSchema,
  CreateUserRequestSchema,
  UpdateUserRequestSchema,
  AuthProviderRecordSchema,
  LoginRequestSchema,
  LoginResponseSchema,
  RefreshTokenRequestSchema,
  ResetPasswordRequestSchema,
  ConfirmResetPasswordRequestSchema,
  ChangePasswordRequestSchema,
};
