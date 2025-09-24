/**
 * Description: auth.schema.ts - 📌 auth.contract.ts에서 정의된 Zod 스키마를 가져와 사용자, 인증 제공자, 토큰 및 세션 관련 스키마를 처리
 * Author: Shiwoo Min
 * Date: 2025-09-07
 *
 * 이 파일은 auth.contract.ts에서 정의된 **Zod 스키마**를 가져와
 * 사용자, 인증 제공자, 토큰 및 세션 관련 스키마를 처리합니다.
 */
import { AuthProviderRecordSchema, ChangePasswordRequestSchema, ConfirmResetPasswordRequestSchema, CreateUserRequestSchema, LoginRequestSchema, LoginResponseSchema, RefreshTokenRequestSchema, ResetPasswordRequestSchema, UpdateUserRequestSchema, UserSchema } from '../contracts/auth.contract.js';
import { z } from 'zod';

/**
 * @description 사용자 기본 스키마 (DDL 호환)
 * @returns 사용자 정보 객체
 */
export const User = UserSchema;
export type User = z.infer<typeof User>;

/**
 * @description 사용자 생성 요청
 * @returns 사용자 생성에 필요한 데이터 구조
 */
export const CreateUserRequest = CreateUserRequestSchema;
export type CreateUserRequest = z.infer<typeof CreateUserRequest>;

/**
 * @description 사용자 수정 요청
 * @returns 사용자 수정에 사용할 수 있는 필드들
 */
export const UpdateUserRequest = UpdateUserRequestSchema;
export type UpdateUserRequest = z.infer<typeof UpdateUserRequest>;

/**
 * @description 인증 제공자 레코드 스키마
 * @returns 인증 제공자 관련 데이터 구조
 */
export const AuthProviderRecord = AuthProviderRecordSchema;
export type AuthProviderRecord = z.infer<typeof AuthProviderRecord>;

/**
 * @description 로그인 요청
 * @returns 로그인 요청에 필요한 필드들
 */
export const LoginRequest = LoginRequestSchema;
export type LoginRequest = z.infer<typeof LoginRequest>;

/**
 * @description 로그인 응답
 * @returns 로그인 시 반환되는 데이터
 */
export const LoginResponse = LoginResponseSchema;
export type LoginResponse = z.infer<typeof LoginResponse>;

/**
 * @description 리프레시 토큰 요청
 * @returns 리프레시 토큰을 포함하는 요청 데이터
 */
export const RefreshTokenRequest = RefreshTokenRequestSchema;
export type RefreshTokenRequest = z.infer<typeof RefreshTokenRequest>;

/**
 * @description 비밀번호 재설정 요청
 * @returns 비밀번호 재설정 요청에 필요한 필드들
 */
export const ResetPasswordRequest = ResetPasswordRequestSchema;
export type ResetPasswordRequest = z.infer<typeof ResetPasswordRequest>;

/**
 * @description 비밀번호 재설정 확인
 * @returns 비밀번호 재설정 확인을 위한 데이터 구조
 */
export const ConfirmResetPasswordRequest = ConfirmResetPasswordRequestSchema;
export type ConfirmResetPasswordRequest = z.infer<typeof ConfirmResetPasswordRequest>;

/**
 * @description 비밀번호 변경 요청
 * @returns 비밀번호 변경을 위한 필드들
 */
export const ChangePasswordRequest = ChangePasswordRequestSchema;
export type ChangePasswordRequest = z.infer<typeof ChangePasswordRequest>;
