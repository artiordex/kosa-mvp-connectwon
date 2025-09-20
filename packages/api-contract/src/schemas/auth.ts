/**
 * Description : auth.ts - 📌 인증 스키마 (Zod 기반, DTO 대체)
 * Author : Shiwoo Min
 * Date : 2025-09-16
 */
import { z } from 'zod';

/**
 * @description 사용자 인증 제공자 유형 열거형
 */
export const AuthProvider = z.enum(['LOCAL', 'GOOGLE']);

/**
 * @description 토큰 유형 열거형
 */
export const TokenType = z.enum(['ACCESS', 'REFRESH', 'RESET_PASSWORD']);

/**
 * @description 인증 오류 코드 열거형
 */
export const AuthErrorCode = z.enum(['UNAUTHORIZED', 'TOKEN_EXPIRED', 'INVALID_CREDENTIALS', 'ACCOUNT_LOCKED', 'EMAIL_NOT_VERIFIED']);

/**
 * @description 타입 추출
 */
export type AuthProvider = z.infer<typeof AuthProvider>;
export type TokenType = z.infer<typeof TokenType>;
export type AuthErrorCode = z.infer<typeof AuthErrorCode>;

/**
 * @description 토큰 기본 스키마 (액세스 토큰, 리프레시 토큰 포함)
 */
export const TokenSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  token_type: z.string().default('Bearer'),
  expires_in: z.number().int().min(0),
  expires_at: z.date(),
});

/**
 * @description 사용자 프로필 스키마
 */
export const UserProfileSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: z.enum(['USER', 'CREATOR', 'ADMIN']),
  provider: AuthProvider,
  avatar: z.string().url().nullable(),
  last_login_at: z.date().nullable(),
  created_at: z.date(),
});

/**
 * @description 로그인 요청 스키마
 */
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

/**
 * @description 회원가입 요청 스키마
 */
export const RegisterSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string().min(6),
});

/**
 * @description Google OAuth 인증 요청 스키마
 */
export const GoogleAuthSchema = z.object({
  code: z.string().min(1),
  redirect_uri: z.string().url().optional(),
});

/**
 * @description Google OAuth 토큰 응답 스키마
 */
export const GoogleTokenSchema = z.object({
  access_token: z.string().min(1),
  id_token: z.string().min(1),
});

/**
 * @description 리프레시 토큰 요청 스키마
 */
export const RefreshTokenSchema = z.object({
  refresh_token: z.string().min(1),
});

/**
 * @description 비밀번호 재설정 요청 스키마
 */
export const ResetPasswordSchema = z.object({
  email: z.string().email(),
});

/**
 * @description 비밀번호 재설정 확인 스키마
 */
export const ConfirmResetPasswordSchema = z.object({
  token: z.string().min(1),
  new_password: z.string().min(6),
});

/**
 * @description 비밀번호 변경 요청 스키마
 */
export const ChangePasswordSchema = z.object({
  current_password: z.string().min(1),
  new_password: z.string().min(6),
});

/**
 * @description 인증 응답 스키마
 */
export const AuthResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  token_type: z.string().default('Bearer'),
  expires_in: z.number().int().min(0),
  user: UserProfileSchema,
});

/**
 * @description Google 인증 및 사용자 정보 응답 스키마
 */
export const GoogleAuthUserSchema = z.object({
  token: z.string(),
  user: UserProfileSchema,
});

/**
 * @description 토큰 유효성 검사 응답 스키마
 */
export const TokenValidationResponseSchema = z.object({
  valid: z.boolean(),
  user_id: z.string().optional(),
  expires_at: z.number().optional(),
  permissions: z.array(z.string()).optional(),
});

/**
 * @description 로그아웃 응답 스키마
 */
export const LogoutResponseSchema = z.object({
  message: z.string(),
  success: z.boolean(),
});

/**
 * @description Google 사용자 정보 스키마
 */
export const GoogleUserInfoSchema = z.object({
  sub: z.string(),
  email: z.string().email(),
  email_verified: z.boolean(),
  name: z.string(),
  picture: z.string().url().optional(),
  locale: z.string().optional(),
  given_name: z.string().optional(),
  family_name: z.string().optional(),
});

/**
 * @description 인증 오류 응답 스키마
 */
export const AuthErrorSchema = z.object({
  error: z.string(),
  code: AuthErrorCode.optional(),
  message: z.string().optional(),
  details: z.record(z.unknown()).optional(),
});

/**
 * @description 세션 및 토큰 관리 스키마
 */
export const SessionSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  access_token_hash: z.string(),
  refresh_token_hash: z.string(),
  expires_at: z.date(),
  last_used_at: z.date(),
  ip_address: z.string().nullable(),
  user_agent: z.string().nullable(),
  created_at: z.date(),
});

/**
 * @description 세션 생성 요청 스키마
 */
export const CreateSessionSchema = z.object({
  user_id: z.string(),
  ip_address: z.string().optional(),
  user_agent: z.string().optional(),
  expires_in: z.number().int().min(300).default(3600),
});

/**
 * @description 비밀번호 재설정 토큰 스키마
 */
export const PasswordResetTokenSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  token_hash: z.string(),
  expires_at: z.date(),
  used_at: z.date().nullable(),
  created_at: z.date(),
});

/**
 * @description 타입 추출
 */
export type Token = z.infer<typeof TokenSchema>;
export type UserProfile = z.infer<typeof UserProfileSchema>;
export type Login = z.infer<typeof LoginSchema>;
export type Register = z.infer<typeof RegisterSchema>;
export type GoogleAuth = z.infer<typeof GoogleAuthSchema>;
export type GoogleToken = z.infer<typeof GoogleTokenSchema>;
export type RefreshToken = z.infer<typeof RefreshTokenSchema>;
export type ResetPassword = z.infer<typeof ResetPasswordSchema>;
export type ConfirmResetPassword = z.infer<typeof ConfirmResetPasswordSchema>;
export type ChangePassword = z.infer<typeof ChangePasswordSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
export type GoogleAuthUser = z.infer<typeof GoogleAuthUserSchema>;
export type TokenValidationResponse = z.infer<typeof TokenValidationResponseSchema>;
export type LogoutResponse = z.infer<typeof LogoutResponseSchema>;
export type GoogleUserInfo = z.infer<typeof GoogleUserInfoSchema>;
export type AuthError = z.infer<typeof AuthErrorSchema>;
export type Session = z.infer<typeof SessionSchema>;
export type CreateSession = z.infer<typeof CreateSessionSchema>;
export type PasswordResetToken = z.infer<typeof PasswordResetTokenSchema>;

/**
 * @description 토큰 만료 여부 확인 함수
 * @param token 만료 일시를 포함한 토큰 객체
 * @returns 토큰이 만료되었으면 true, 그렇지 않으면 false
 */
export function isTokenExpired(token: { expires_at: Date }): boolean {
  return new Date() > token.expires_at;
}

/**
 * @description 세션 유효성 검사 함수
 * @param session 검사할 세션 객체
 * @returns 세션이 유효하면 true, 그렇지 않으면 false
 */
export function isSessionValid(session: Session): boolean {
  return !isTokenExpired(session) && session.last_used_at !== null;
}

/**
 * @description Google 사용자 여부 확인 함수
 * @param user 사용자 프로필 객체
 * @returns Google 사용자이면 true, 그렇지 않으면 false
 */
export function isGoogleUser(user: UserProfile): boolean {
  return user.provider === 'GOOGLE';
}

/**
 * @description 관리자 권한 확인 함수
 * @param user 사용자 프로필 객체
 * @returns 관리자 권한이 있으면 true, 그렇지 않으면 false
 */
export function hasAdminRole(user: UserProfile): boolean {
  return user.role === 'ADMIN';
}

/**
 * @description 사용자 관리 권한 확인 함수
 * @param user 사용자 프로필 객체
 * @returns 사용자 관리 권한이 있으면 true, 그렇지 않으면 false
 */
export function canManageUsers(user: UserProfile): boolean {
  return hasAdminRole(user);
}

/**
 * @description 토큰 만료 일시 계산 함수
 * @param expiresIn 만료 시간 (초 단위)
 * @returns 토큰 만료 일시
 */
export function getTokenExpiryDate(expiresIn: number): Date {
  return new Date(Date.now() + expiresIn * 1000);
}

/**
 * @description 인증 응답 생성 헬퍼 함수
 * @param user 사용자 프로필 객체
 * @param tokens 토큰 객체
 * @returns 인증 응답 객체
 */
export function createAuthResponse(user: UserProfile, tokens: Token): AuthResponse {
  return {
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    token_type: tokens.token_type,
    expires_in: tokens.expires_in,
    user,
  };
}

/**
 * @description 이메일 마스킹 헬퍼 함수
 * @param email 마스킹할 이메일 주소
 * @returns 마스킹된 이메일 주소
 */
export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!local || !domain || local.length <= 2) return email;

  const maskedLocal = local[0] + '*'.repeat(local.length - 2) + local[local.length - 1];
  return `${maskedLocal}@${domain}`;
}

/**
 * @description 인증 오류 메시지 헬퍼 함수
 * @param code 인증 오류 코드
 * @returns 한국어 오류 메시지
 */
export function getAuthErrorMessage(code: AuthErrorCode): string {
  const messages = {
    UNAUTHORIZED: '인증이 필요합니다',
    TOKEN_EXPIRED: '토큰이 만료되었습니다',
    INVALID_CREDENTIALS: '이메일 또는 비밀번호가 올바르지 않습니다',
    ACCOUNT_LOCKED: '계정이 잠겨있습니다',
    EMAIL_NOT_VERIFIED: '이메일 인증이 필요합니다',
  };
  return messages[code] || '인증 오류가 발생했습니다';
}

/**
 * @description 비밀번호 보안 검사 함수
 * @param password 검사할 비밀번호
 * @returns 보안 요구사항을 만족하면 true, 그렇지 않으면 false
 */
export function isPasswordSecure(password: string): boolean {
  const hasMinLength = password.length >= 6;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  return hasMinLength && hasLetter && hasNumber;
}

/**
 * @description 토큰 갱신 필요 여부 확인 함수
 * @param token 검사할 토큰 객체
 * @param bufferMinutes 갱신 시점 버퍼 시간 (분, 기본값: 5분)
 * @returns 토큰 갱신이 필요하면 true, 그렇지 않으면 false
 */
export function shouldRefreshToken(token: { expires_at: Date }, bufferMinutes: number = 5): boolean {
  const now = new Date();
  const bufferTime = new Date(token.expires_at.getTime() - bufferMinutes * 60 * 1000);
  return now > bufferTime;
}

/**
 * @description 세션 갱신 필요 여부 확인 함수
 * @param session 검사할 세션 객체
 * @param bufferMinutes 갱신 시점 버퍼 시간 (분, 기본값: 10분)
 * @returns 세션 갱신이 필요하면 true, 그렇지 않으면 false
 */
export function isSessionExpiringSoon(session: Session, bufferMinutes: number = 10): boolean {
  return shouldRefreshToken(session, bufferMinutes);
}

/**
 * @description 세션 핑거프린트 생성 함수
 * @param userAgent 사용자 에이전트 문자열 (선택적)
 * @param ipAddress 클라이언트 IP 주소 (선택적)
 * @returns 16자리 세션 핑거프린트
 */
export function generateSessionFingerprint(userAgent?: string, ipAddress?: string): string {
  const ua = userAgent?.substring(0, 50) || 'unknown';
  const ip = ipAddress || 'unknown';
  // Node.js 환경에서 Base64 인코딩
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(`${ua}:${ip}`).toString('base64').substring(0, 16);
  }
  // 브라우저 환경 (fallback)
  if (typeof btoa !== 'undefined') {
    return btoa(`${ua}:${ip}`).substring(0, 16);
  }
  // 모두 실패한 경우 단순한 해시
  return `${ua.length}-${ip.length}`.padEnd(16, '0').substring(0, 16);
}

/**
 * @description 로그인 유효성 검사 함수
 * @param data 검사할 데이터
 * @returns Zod 파싱 결과
 */
export function validateLogin(data: unknown) {
  return LoginSchema.safeParse(data);
}

/**
 * @description 회원가입 유효성 검사 함수
 * @param data 검사할 데이터
 * @returns Zod 파싱 결과
 */
export function validateRegister(data: unknown) {
  return RegisterSchema.safeParse(data);
}

/**
 * @description Google 인증 유효성 검사 함수
 * @param data 검사할 데이터
 * @returns Zod 파싱 결과
 */
export function validateGoogleAuth(data: unknown) {
  return GoogleAuthSchema.safeParse(data);
}

/**
 * @description 리프레시 토큰 유효성 검사 함수
 * @param data 검사할 데이터
 * @returns Zod 파싱 결과
 */
export function validateRefreshToken(data: unknown) {
  return RefreshTokenSchema.safeParse(data);
}

/**
 * @description 비밀번호 재설정 요청 유효성 검사 함수
 * @param data 검사할 데이터
 * @returns Zod 파싱 결과
 */
export function validateResetPassword(data: unknown) {
  return ResetPasswordSchema.safeParse(data);
}

/**
 * @description 비밀번호 변경 유효성 검사 함수
 * @param data 검사할 데이터
 * @returns Zod 파싱 결과
 */
export function validateChangePassword(data: unknown) {
  return ChangePasswordSchema.safeParse(data);
}

/**
 * @description JWT 형식 검사 함수
 * @param token 검사할 JWT 토큰
 * @returns 유효한 JWT 형식이면 true, 그렇지 않으면 false
 */
export function isValidJWTFormat(token: string): boolean {
  return /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/.test(token);
}

/**
 * @description JWT 페이로드 파싱 함수
 * @param token JWT 토큰 문자열
 * @returns 파싱된 페이로드 객체 또는 null
 */
export function parseJWTPayload(token: string): Record<string, unknown> | null {
  try {
    // 형식이 올바르지 않으면 null 반환
    if (!isValidJWTFormat(token)) return null;
    const parts = token.split('.');

    // 페이로드 부분 디코딩
    if (parts.length !== 3) return null;
    const payload = parts[1];

    // Base64Url 디코딩
    if (!payload) return null;
    let decoded: string;

    // Node.js 환경
    if (typeof Buffer !== 'undefined') {
      decoded = Buffer.from(payload.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf-8');
    }
    // 브라우저 환경
    else if (typeof atob !== 'undefined') {
      decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    }
    // fallback
    else {
      return null;
    }

    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

/**
 * @description JWT 만료 일시 추출 함수
 * @param token JWT 토큰 문자열
 * @returns 만료 일시 또는 null
 */
export function getJWTExpiry(token: string): Date | null {
  const payload = parseJWTPayload(token);
  if (!payload || !payload['exp'] || typeof payload['exp'] !== 'number') {
    return null;
  }
  return new Date(payload['exp'] * 1000);
}

/**
 * @description 레이트 리밋 키 생성 함수
 * @param ip 클라이언트 IP 주소
 * @param identifier 식별자
 * @returns 레이트 리밋 키
 */
export function createRateLimitKey(ip: string, identifier: string): string {
  return `auth:${ip}:${identifier}`;
}

/**
 * @description 로그인 시도 레이트 리밋 키 생성 함수
 * @param email 이메일 주소
 * @param ip 클라이언트 IP 주소
 * @returns 로그인 시도 레이트 리밋 키
 */
export function getLoginAttemptKey(email: string, ip: string): string {
  return createRateLimitKey(ip, `login:${email}`);
}

/**
 * @description 비밀번호 재설정 시도 레이트 리밋 키 생성 함수
 * @param email 이메일 주소
 * @param ip 클라이언트 IP 주소
 * @returns 비밀번호 재설정 시도 레이트 리밋 키
 */
export function getPasswordResetAttemptKey(email: string, ip: string): string {
  return createRateLimitKey(ip, `reset:${email}`);
}

// 계정 잠금 레이트 리밋 키
export const TOKEN_EXPIRY = {
  ACCESS_TOKEN: 60 * 60, // 1시간
  REFRESH_TOKEN: 30 * 24 * 60 * 60, // 30일
  RESET_PASSWORD: 60 * 60, // 1시간
} as const;

// 레이트 리밋 설정
export const RATE_LIMITS = {
  LOGIN_ATTEMPTS: 5, // 5회 실패 시 잠금
  PASSWORD_RESET: 3, // 3회 시도 후 대기
  LOCKOUT_DURATION: 15 * 60, // 15분
} as const;

// 기본 인증 설정
export const DEFAULT_AUTH_SETTINGS = {
  token_type: 'Bearer',
  provider: 'LOCAL' as AuthProvider,
  role: 'USER' as const,
  expires_in: TOKEN_EXPIRY.ACCESS_TOKEN,
};
