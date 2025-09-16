/**
 * Description : auth.ts - 📌 인증 스키마 (Zod 기반, DTO 대체)
 * Author : Shiwoo Min
 * Date : 2025-09-16
 */
import { z } from 'zod';

// 사용자 인증 제공자
export const AuthProvider = z.enum(['LOCAL', 'GOOGLE']);
// 토큰 유형
export const TokenType = z.enum(['ACCESS', 'REFRESH', 'RESET_PASSWORD']);
// 인증 오류 코드
export const AuthErrorCode = z.enum([
  'UNAUTHORIZED',
  'TOKEN_EXPIRED',
  'INVALID_CREDENTIALS',
  'ACCOUNT_LOCKED',
  'EMAIL_NOT_VERIFIED',
]);

// 타입 추출
export type AuthProvider = z.infer<typeof AuthProvider>;
export type TokenType = z.infer<typeof TokenType>;
export type AuthErrorCode = z.infer<typeof AuthErrorCode>;

// 기본 데이터 스키마
export const TokenSchema = z.object({
  // 액세스 토큰 (JWT)
  access_token: z.string(),
  // 리프레시 토큰 (JWT)
  refresh_token: z.string(),
  // 토큰 유형
  token_type: z.string().default('Bearer'),
  // 만료 시간 (초)
  expires_in: z.number().int().min(0),
  // 만료 일시 (RFC3339)
  expires_at: z.date(),
});

// 사용자 프로필 스키마
export const UserProfileSchema = z.object({
  // 사용자 고유 ID
  id: z.string(),
  // 사용자 이메일
  email: z.string().email(),
  // 사용자 이름
  name: z.string(),
  // 사용자 권한
  role: z.enum(['USER', 'CREATOR', 'ADMIN']),
  // 인증 제공자
  provider: AuthProvider,
  // 프로필 사진 URL
  avatar: z.string().url().nullable(),
  // 마지막 로그인 일시
  last_login_at: z.date().nullable(),
  // 계정 생성 일시
  created_at: z.date(),
});

// 기본 로그인 스키마
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// 회원가입 요청 스키마
export const RegisterSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string().min(6),
});

// Google OAuth 인증 요청 스키마
export const GoogleAuthSchema = z.object({
  code: z.string().min(1),
  redirect_uri: z.string().url().optional(),
});

// Google OAuth 토큰 응답 스키마
export const GoogleTokenSchema = z.object({
  access_token: z.string().min(1),
  id_token: z.string().min(1), // JWT format
});

// 리프레시 토큰 요청 스키마
export const RefreshTokenSchema = z.object({
  refresh_token: z.string().min(1), // JWT format
});

// 비밀번호 재설정 요청 스키마
export const ResetPasswordSchema = z.object({
  email: z.string().email(),
});

// 비밀번호 재설정 확인 스키마
export const ConfirmResetPasswordSchema = z.object({
  token: z.string().min(1),
  new_password: z.string().min(6),
});

// 비밀번호 변경 스키마
export const ChangePasswordSchema = z.object({
  current_password: z.string().min(1),
  new_password: z.string().min(6),
});

// 인증 응답 스키마
export const AuthResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  token_type: z.string().default('Bearer'),
  expires_in: z.number().int().min(0),
  user: UserProfileSchema,
});

// Google 인증 및 사용자 정보 응답 스키마
export const GoogleAuthUserSchema = z.object({
  token: z.string(),
  user: UserProfileSchema,
});

// 토큰 유효성 검사 응답 스키마
export const TokenValidationResponseSchema = z.object({
  valid: z.boolean(),
  user_id: z.string().optional(),
  expires_at: z.number().optional(), // Unix timestamp
  permissions: z.array(z.string()).optional(),
});

// 로그아웃 응답 스키마
export const LogoutResponseSchema = z.object({
  message: z.string(),
  success: z.boolean(),
});

// Google 사용자 정보 스키마
export const GoogleUserInfoSchema = z.object({
  sub: z.string(), // Google unique ID
  email: z.string().email(),
  email_verified: z.boolean(),
  name: z.string(),
  picture: z.string().url().optional(),
  locale: z.string().optional(),
  given_name: z.string().optional(),
  family_name: z.string().optional(),
});

// 인증 오류 스키마
export const AuthErrorSchema = z.object({
  error: z.string(),
  code: AuthErrorCode.optional(),
  message: z.string().optional(),
  details: z.record(z.unknown()).optional(),
});

// 세션/토큰 관리 스키마
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

// 세션 생성 요청 스키마
export const CreateSessionSchema = z.object({
  user_id: z.string(),
  ip_address: z.string().optional(),
  user_agent: z.string().optional(),
  expires_in: z.number().int().min(300).default(3600), // 5분 ~ 기본 1시간
});

// 비밀번호 재설정 토큰 스키마
export const PasswordResetTokenSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  token_hash: z.string(),
  expires_at: z.date(),
  used_at: z.date().nullable(),
  created_at: z.date(),
});

// 타입 추출
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

// 토큰 만료 여부 확인
export function isTokenExpired(token: { expires_at: Date }): boolean {
  return new Date() > token.expires_at;
}

// 세션 유효성 검사
export function isSessionValid(session: Session): boolean {
  return !isTokenExpired(session) && session.last_used_at !== null;
}

// 인증 제공자 확인
export function isGoogleUser(user: UserProfile): boolean {
  return user.provider === 'GOOGLE';
}

// 권한 확인 헬퍼
export function hasAdminRole(user: UserProfile): boolean {
  return user.role === 'ADMIN';
}

// 사용자 관리 권한 확인
export function canManageUsers(user: UserProfile): boolean {
  return hasAdminRole(user);
}

// 토큰 만료 일시 계산
export function getTokenExpiryDate(expiresIn: number): Date {
  return new Date(Date.now() + expiresIn * 1000);
}

// 인증 응답 생성 헬퍼
export function createAuthResponse(user: UserProfile, tokens: Token): AuthResponse {
  return {
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    token_type: tokens.token_type,
    expires_in: tokens.expires_in,
    user,
  };
}

// 이메일 마스킹 헬퍼
export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!local || !domain || local.length <= 2) return email;

  const maskedLocal = local[0] + '*'.repeat(local.length - 2) + local[local.length - 1];
  return `${maskedLocal}@${domain}`;
}

// 인증 오류 메시지 헬퍼
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

// 비밀번호 보안 검사
export function isPasswordSecure(password: string): boolean {
  const hasMinLength = password.length >= 6;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  return hasMinLength && hasLetter && hasNumber;
}

// 토큰 갱신 필요 여부 확인
export function shouldRefreshToken(
  token: { expires_at: Date },
  bufferMinutes: number = 5,
): boolean {
  const now = new Date();
  const bufferTime = new Date(token.expires_at.getTime() - bufferMinutes * 60 * 1000);
  return now > bufferTime;
}

// 세션 갱신 필요 여부 확인
export function isSessionExpiringSoon(session: Session, bufferMinutes: number = 10): boolean {
  return shouldRefreshToken(session, bufferMinutes);
}

// 세션 핑거프린트 생성
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

// 로그인 유효성 검사 함수
export function validateLogin(data: unknown) {
  return LoginSchema.safeParse(data);
}

// 회원가입 유효성 검사 함수
export function validateRegister(data: unknown) {
  return RegisterSchema.safeParse(data);
}

// Google 인증 유효성 검사 함수
export function validateGoogleAuth(data: unknown) {
  return GoogleAuthSchema.safeParse(data);
}

// 리프레시 토큰 유효성 검사 함수
export function validateRefreshToken(data: unknown) {
  return RefreshTokenSchema.safeParse(data);
}

// 비밀번호 재설정 요청 유효성 검사 함수
export function validateResetPassword(data: unknown) {
  return ResetPasswordSchema.safeParse(data);
}

// 비밀번호 재설정 확인 유효성 검사 함수
export function validateChangePassword(data: unknown) {
  return ChangePasswordSchema.safeParse(data);
}

// JWT 형식 검사
export function isValidJWTFormat(token: string): boolean {
  return /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/.test(token);
}

// JWT 페이로드 파싱
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
      decoded = Buffer.from(payload.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString(
        'utf-8',
      );
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

// JWT 만료 일시 추출
export function getJWTExpiry(token: string): Date | null {
  const payload = parseJWTPayload(token);
  if (!payload || !payload['exp'] || typeof payload['exp'] !== 'number') {
    return null;
  }
  return new Date(payload['exp'] * 1000);
}

// 레이트 리밋 키 생성
export function createRateLimitKey(ip: string, identifier: string): string {
  return `auth:${ip}:${identifier}`;
}

// 로그인 시도 레이트 리밋 키
export function getLoginAttemptKey(email: string, ip: string): string {
  return createRateLimitKey(ip, `login:${email}`);
}

// 비밀번호 재설정 시도 레이트 리밋 키
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
