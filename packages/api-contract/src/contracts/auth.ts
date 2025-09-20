/**
 * Description : auth.ts - 📌 인증 관련 API 계약 및 스키마 정의
 * Author : Shiwoo Min
 * Date : 2025-09-11
 * 09-21 - 주석 보강
 */
import { z } from 'zod';

/**
 * @description 일반 로그인 요청 스키마
 * @returns 이메일, 비밀번호, 선택적 로그인 유지 정보 포함
 */
export const LoginRequestSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
  rememberMe: z.boolean().optional().default(false),
});

/**
 * @description 소셜 로그인 요청 스키마
 * @returns OAuth provider 정보와 인증 코드 등 포함
 */
export const SocialLoginRequestSchema = z.object({
  provider: z.enum(['GOOGLE', 'KAKAO', 'NAVER']),
  code: z.string(),
  redirectUri: z.string().url(),
  state: z.string().optional(),
});

/**
 * @description 로그인 응답 스키마
 * @returns 액세스 토큰, 리프레시 토큰, 사용자 정보 및 토큰 만료 시간 포함
 */
export const LoginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: z.object({
    id: z.string(),
    email: z.string(),
    name: z.string(),
    role: z.enum(['USER', 'ADMIN', 'INSTRUCTOR']),
    avatar: z.string().url().optional(),
    provider: z.enum(['EMAIL', 'GOOGLE', 'KAKAO', 'NAVER']).default('EMAIL'),
  }),
  expiresAt: z.string().datetime(),
});

/**
 * @description 일반 회원가입 요청 스키마
 * @returns 이메일, 비밀번호, 개인정보 동의 등 포함
 */
export const RegisterRequestSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다'),
  passwordConfirm: z.string(),
  name: z.string().min(2, '이름은 최소 2자 이상이어야 합니다'),
  termsAccepted: z.boolean().refine(val => val === true, '이용약관에 동의해주세요'),
  privacyAccepted: z.boolean().refine(val => val === true, '개인정보처리방침에 동의해주세요'),
}).refine(data => data.password === data.passwordConfirm, {
  message: '비밀번호가 일치하지 않습니다',
  path: ['passwordConfirm'],
});

/**
 * @description 토큰 갱신 요청 스키마
 * @returns 리프레시 토큰 문자열
 */
export const RefreshTokenRequestSchema = z.object({
  refreshToken: z.string(),
});

/**
 * @description 비밀번호 재설정 요청 스키마
 * @returns 이메일 주소 포함
 */
export const ForgotPasswordRequestSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요'),
});

/**
 * @description 비밀번호 재설정 스키마
 * @returns 토큰과 새로운 비밀번호, 비밀번호 확인 포함
 */
export const ResetPasswordRequestSchema = z.object({
  token: z.string(),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다'),
  passwordConfirm: z.string(),
}).refine(data => data.password === data.passwordConfirm, {
  message: '비밀번호가 일치하지 않습니다',
  path: ['passwordConfirm'],
});

/**
 * @description 이메일 인증 요청 스키마
 * @returns 이메일 인증 토큰 포함
 */
export const EmailVerificationRequestSchema = z.object({
  token: z.string(),
});

/**
 * @description JWT 인증된 사용자 정보 타입
 * @returns 사용자의 기본 정보와 역할 플래그 포함
 */
export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role_flags: number;
};

/**
 * @description Google OAuth 페이로드 타입
 * @returns Google에서 제공하는 사용자 정보 포함
 */
export type GoogleOAuthPayload = {
  sub: string;
  email: string;
  name: string;
  picture?: string;
};

// 타입 추출
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type SocialLoginRequest = z.infer<typeof SocialLoginRequestSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;
export type RefreshTokenRequest = z.infer<typeof RefreshTokenRequestSchema>;
export type ForgotPasswordRequest = z.infer<typeof ForgotPasswordRequestSchema>;
export type ResetPasswordRequest = z.infer<typeof ResetPasswordRequestSchema>;
export type EmailVerificationRequest = z.infer<typeof EmailVerificationRequestSchema>;
