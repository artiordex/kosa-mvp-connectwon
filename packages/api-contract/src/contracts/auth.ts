/**
 * Description : auth.ts - 📌 인증 관련 API 계약 및 스키마 정의
 * Author : Shiwoo Min
 * Date : 2025-09-11
 */
import { z } from 'zod';

// 일반 로그인 요청 스키마
export const LoginRequestSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
  rememberMe: z.boolean().optional().default(false),
});

// 소셜 로그인 요청 스키마
export const SocialLoginRequestSchema = z.object({
  provider: z.enum(['GOOGLE', 'KAKAO', 'NAVER']),
  code: z.string(),
  redirectUri: z.string().url(),
  state: z.string().optional(), // CSRF 방지용
});

// 공통 응답 스키마
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
export const SocialLoginResponseSchema = LoginResponseSchema;

// 소셜 로그인 콜백 쿼리 파라미터 스키마
export const SocialCallbackQuerySchema = z.object({
  code: z.string(),
  state: z.string().optional(),
  error: z.string().optional(),
  error_description: z.string().optional(),
});

// 타입 추출
export type SocialLoginRequest = z.infer<typeof SocialLoginRequestSchema>;
export type SocialLoginResponse = z.infer<typeof SocialLoginResponseSchema>;
export type SocialCallbackQuery = z.infer<typeof SocialCallbackQuerySchema>;

// 소셜 계정 연결 요청 스키마
export const LinkSocialAccountRequestSchema = z.object({
  provider: z.enum(['GOOGLE', 'KAKAO', 'NAVER']),
  code: z.string(),
  redirectUri: z.string().url(),
});

// 소셜 계정 연결 응답 스키마
export const LinkSocialAccountResponseSchema = z.object({
  message: z.string(),
  linkedAccounts: z.array(
    z.object({
      provider: z.enum(['GOOGLE', 'KAKAO', 'NAVER']),
      providerId: z.string(),
      email: z.string().email(),
      linkedAt: z.string().datetime(),
    }),
  ),
});

// 소셜 계정 연결 해제 요청 스키마
export const UnlinkSocialAccountRequestSchema = z.object({
  provider: z.enum(['GOOGLE', 'KAKAO', 'NAVER']),
});

// 소셜 계정 연결 해제 응답 스키마
export const UnlinkSocialAccountResponseSchema = z.object({
  message: z.string(),
});

// 타입 추출
export type LinkSocialAccountRequest = z.infer<typeof LinkSocialAccountRequestSchema>;
export type LinkSocialAccountResponse = z.infer<typeof LinkSocialAccountResponseSchema>;
export type UnlinkSocialAccountRequest = z.infer<typeof UnlinkSocialAccountRequestSchema>;
export type UnlinkSocialAccountResponse = z.infer<typeof UnlinkSocialAccountResponseSchema>;

// 일반 회원가입
export const RegisterRequestSchema = z
  .object({
    email: z.string().email('유효한 이메일을 입력해주세요'),
    password: z
      .string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, '영문 대소문자와 숫자를 포함해야 합니다'),
    passwordConfirm: z.string(),
    name: z.string().min(2, '이름은 최소 2자 이상이어야 합니다'),
    phone: z.string().regex(/^01[0-9]-\d{4}-\d{4}$/, '올바른 휴대폰 번호를 입력해주세요'),
    birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD 형식으로 입력해주세요'),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
    termsAccepted: z.boolean().refine(val => val === true, '이용약관에 동의해주세요'),
    privacyAccepted: z.boolean().refine(val => val === true, '개인정보처리방침에 동의해주세요'),
    marketingAccepted: z.boolean().optional().default(false),
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'],
  });

// 소셜 회원가입
export const SocialRegisterRequestSchema = z.object({
  // OAuth에서 받아온 정보 (숨겨진 필드)
  provider: z.enum(['GOOGLE', 'KAKAO', 'NAVER']),
  providerId: z.string(),
  providerEmail: z.string().email(), // 소셜에서 가져온 이메일 (수정 가능)

  // 사용자가 입력하는 추가 정보
  name: z.string().min(2, '이름은 최소 2자 이상이어야 합니다'),
  phone: z.string().regex(/^01[0-9]-\d{4}-\d{4}$/, '올바른 휴대폰 번호를 입력해주세요'),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD 형식으로 입력해주세요'),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
  termsAccepted: z.boolean().refine(val => val === true, '이용약관에 동의해주세요'),
  privacyAccepted: z.boolean().refine(val => val === true, '개인정보처리방침에 동의해주세요'),
  marketingAccepted: z.boolean().optional().default(false),
});

// 응답 스키마
export const RegisterResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  message: z.string(),
});

// 타입 추출
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;
export type SocialRegisterRequest = z.infer<typeof SocialRegisterRequestSchema>;
export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;

// 토큰 갱신 스키마
export const RefreshTokenRequestSchema = z.object({
  refreshToken: z.string(),
});

// 응답 스키마는 로그인과 동일
export const RefreshTokenResponseSchema = LoginResponseSchema;
export type RefreshTokenRequest = z.infer<typeof RefreshTokenRequestSchema>;
export type RefreshTokenResponse = z.infer<typeof RefreshTokenResponseSchema>;

// 비밀번호 재설정 요청
export const ForgotPasswordRequestSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요'),
});

// 비밀번호 재설정 응답
export const ForgotPasswordResponseSchema = z.object({
  message: z.string(),
});

// 비밀번호 재설정
export const ResetPasswordRequestSchema = z
  .object({
    token: z.string(),
    password: z
      .string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, '영문 대소문자와 숫자를 포함해야 합니다'),
    passwordConfirm: z.string(),
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'],
  });

// 비밀번호 재설정 응답
export const ResetPasswordResponseSchema = z.object({
  message: z.string(),
});

// 타입 추출
export type ForgotPasswordRequest = z.infer<typeof ForgotPasswordRequestSchema>;
export type ForgotPasswordResponse = z.infer<typeof ForgotPasswordResponseSchema>;
export type ResetPasswordRequest = z.infer<typeof ResetPasswordRequestSchema>;
export type ResetPasswordResponse = z.infer<typeof ResetPasswordResponseSchema>;

// 이메일 인증
export const EmailVerificationRequestSchema = z.object({
  token: z.string(),
});

// 이메일 인증 응답
export const EmailVerificationResponseSchema = z.object({
  message: z.string(),
  verified: z.boolean(),
});

// 재전송 이메일 인증
export const ResendVerificationEmailRequestSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요'),
});

// 재전송 이메일 인증 응답
export const ResendVerificationEmailResponseSchema = z.object({
  message: z.string(),
});

// 타입 추출
export type EmailVerificationRequest = z.infer<typeof EmailVerificationRequestSchema>;
export type EmailVerificationResponse = z.infer<typeof EmailVerificationResponseSchema>;
export type ResendVerificationEmailRequest = z.infer<typeof ResendVerificationEmailRequestSchema>;
export type ResendVerificationEmailResponse = z.infer<typeof ResendVerificationEmailResponseSchema>;

// 로그아웃
export const LogoutResponseSchema = z.object({
  message: z.string(),
});
export type LogoutResponse = z.infer<typeof LogoutResponseSchema>;

// 현재 사용자 정보
export const CurrentUserResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  role: z.enum(['USER', 'ADMIN', 'INSTRUCTOR']),
  avatar: z.string().url().optional(),
  provider: z.enum(['GOOGLE']),
  isEmailVerified: z.boolean(),
  linkedAccounts: z.array(
    z.object({
      provider: z.enum(['GOOGLE']),
      providerId: z.string(),
      email: z.string().email(),
      linkedAt: z.string().datetime(),
    }),
  ),
  createdAt: z.string().datetime(),
  lastLoginAt: z.string().datetime().optional(),
});
export type CurrentUserResponse = z.infer<typeof CurrentUserResponseSchema>;
