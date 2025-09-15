/**
 * Description : auth.ts - 📌 인증 스키마 (Zod 기반, DTO 대체)
 * Author : Shiwoo Min
 * Date : 2025-09-16
 */
import { z } from 'zod';

// Enums
export const AuthProvider = z.enum(['LOCAL', 'GOOGLE']);
export const TokenType = z.enum(['ACCESS', 'REFRESH', 'RESET_PASSWORD']);
export const AuthErrorCode = z.enum([
  'UNAUTHORIZED',
  'TOKEN_EXPIRED',
  'INVALID_CREDENTIALS',
  'ACCOUNT_LOCKED',
  'EMAIL_NOT_VERIFIED',
]);

export type AuthProvider = z.infer<typeof AuthProvider>;
export type TokenType = z.infer<typeof TokenType>;
export type AuthErrorCode = z.infer<typeof AuthErrorCode>;

// Base Schemas
export const TokenSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  token_type: z.string().default('Bearer'),
  expires_in: z.number().int().min(0),
  expires_at: z.date(),
});

export const UserProfileSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: z.enum(['USER', 'CREATOR', 'ADMIN', 'SUPER_ADMIN']),
  provider: AuthProvider,
  avatar: z.string().url().nullable(),
  last_login_at: z.date().nullable(),
  created_at: z.date(),
});

// Auth Request Schemas
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string().min(6),
});

export const GoogleAuthSchema = z.object({
  code: z.string().min(1),
  redirect_uri: z.string().url().optional(),
});

export const GoogleTokenSchema = z.object({
  access_token: z.string().min(1),
  id_token: z.string().min(1), // JWT format
});

export const RefreshTokenSchema = z.object({
  refresh_token: z.string().min(1), // JWT format
});

export const ResetPasswordSchema = z.object({
  email: z.string().email(),
});

export const ConfirmResetPasswordSchema = z.object({
  token: z.string().min(1),
  new_password: z.string().min(6),
});

export const ChangePasswordSchema = z.object({
  current_password: z.string().min(1),
  new_password: z.string().min(6),
});

// Response Schemas
export const AuthResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  token_type: z.string().default('Bearer'),
  expires_in: z.number().int().min(0),
  user: UserProfileSchema,
});

export const GoogleAuthUserSchema = z.object({
  token: z.string(),
  user: UserProfileSchema,
});

export const TokenValidationResponseSchema = z.object({
  valid: z.boolean(),
  user_id: z.string().optional(),
  expires_at: z.number().optional(), // Unix timestamp
  permissions: z.array(z.string()).optional(),
});

export const LogoutResponseSchema = z.object({
  message: z.string(),
  success: z.boolean(),
});

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

// Error Schemas
export const AuthErrorSchema = z.object({
  error: z.string(),
  code: AuthErrorCode.optional(),
  message: z.string().optional(),
  details: z.record(z.unknown()).optional(),
});

// Session/Token Management Schemas
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

export const CreateSessionSchema = z.object({
  user_id: z.string(),
  ip_address: z.string().optional(),
  user_agent: z.string().optional(),
  expires_in: z.number().int().min(300).default(3600), // 5분 ~ 기본 1시간
});

// Password Reset Token Schema
export const PasswordResetTokenSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  token_hash: z.string(),
  expires_at: z.date(),
  used_at: z.date().nullable(),
  created_at: z.date(),
});

// Type Exports
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

// Helper Functions
export function isTokenExpired(token: { expires_at: Date }): boolean {
  return new Date() > token.expires_at;
}

export function isSessionValid(session: Session): boolean {
  return !isTokenExpired(session) && session.last_used_at !== null;
}

export function isGoogleUser(user: UserProfile): boolean {
  return user.provider === 'GOOGLE';
}

export function hasAdminRole(user: UserProfile): boolean {
  return user.role === 'ADMIN' || user.role === 'SUPER_ADMIN';
}

export function canManageUsers(user: UserProfile): boolean {
  return hasAdminRole(user);
}

export function getTokenExpiryDate(expiresIn: number): Date {
  return new Date(Date.now() + expiresIn * 1000);
}

export function createAuthResponse(user: UserProfile, tokens: Token): AuthResponse {
  return {
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    token_type: tokens.token_type,
    expires_in: tokens.expires_in,
    user,
  };
}

export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!local || !domain || local.length <= 2) return email;

  const maskedLocal = local[0] + '*'.repeat(local.length - 2) + local[local.length - 1];
  return `${maskedLocal}@${domain}`;
}

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

export function isPasswordSecure(password: string): boolean {
  // 최소 6자, 문자와 숫자 포함
  const hasMinLength = password.length >= 6;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);

  return hasMinLength && hasLetter && hasNumber;
}

// Session Management Helpers
export function shouldRefreshToken(
  token: { expires_at: Date },
  bufferMinutes: number = 5,
): boolean {
  const now = new Date();
  const bufferTime = new Date(token.expires_at.getTime() - bufferMinutes * 60 * 1000);
  return now > bufferTime;
}

export function isSessionExpiringSoon(session: Session, bufferMinutes: number = 10): boolean {
  return shouldRefreshToken(session, bufferMinutes);
}

export function generateSessionFingerprint(userAgent?: string, ipAddress?: string): string {
  // 간단한 세션 핑거프린트 생성
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

// Validation Helpers
export function validateLogin(data: unknown) {
  return LoginSchema.safeParse(data);
}

export function validateRegister(data: unknown) {
  return RegisterSchema.safeParse(data);
}

export function validateGoogleAuth(data: unknown) {
  return GoogleAuthSchema.safeParse(data);
}

export function validateRefreshToken(data: unknown) {
  return RefreshTokenSchema.safeParse(data);
}

export function validateResetPassword(data: unknown) {
  return ResetPasswordSchema.safeParse(data);
}

export function validateChangePassword(data: unknown) {
  return ChangePasswordSchema.safeParse(data);
}

// JWT Helpers (타입 체크용)
export function isValidJWTFormat(token: string): boolean {
  return /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/.test(token);
}

export function parseJWTPayload(token: string): Record<string, unknown> | null {
  try {
    if (!isValidJWTFormat(token)) return null;

    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = parts[1];
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

export function getJWTExpiry(token: string): Date | null {
  const payload = parseJWTPayload(token);
  if (!payload || !payload['exp'] || typeof payload['exp'] !== 'number') {
    return null;
  }

  return new Date(payload['exp'] * 1000);
}

// Rate Limiting Helpers
export function createRateLimitKey(ip: string, identifier: string): string {
  return `auth:${ip}:${identifier}`;
}

export function getLoginAttemptKey(email: string, ip: string): string {
  return createRateLimitKey(ip, `login:${email}`);
}

export function getPasswordResetAttemptKey(email: string, ip: string): string {
  return createRateLimitKey(ip, `reset:${email}`);
}

// Constants
export const TOKEN_EXPIRY = {
  ACCESS_TOKEN: 60 * 60, // 1시간
  REFRESH_TOKEN: 30 * 24 * 60 * 60, // 30일
  RESET_PASSWORD: 60 * 60, // 1시간
} as const;

export const RATE_LIMITS = {
  LOGIN_ATTEMPTS: 5, // 5회 실패 시 잠금
  PASSWORD_RESET: 3, // 3회 시도 후 대기
  LOCKOUT_DURATION: 15 * 60, // 15분
} as const;

export const DEFAULT_AUTH_SETTINGS = {
  token_type: 'Bearer',
  provider: 'LOCAL' as AuthProvider,
  role: 'USER' as const,
  expires_in: TOKEN_EXPIRY.ACCESS_TOKEN,
};
