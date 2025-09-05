import { z } from 'zod'

// Google OAuth 성공 후 프론트엔드로 전달되는 사용자 정보
export const GoogleAuthUserSchema = z.object({
  token: z.string(),
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    role: z.enum(['USER', 'CREATOR', 'ADMIN']),
    avatar: z.string().nullable(),
    provider: z.literal('GOOGLE'),
    createdAt: z.date(),
  }),
})

// 인증 관련 에러 (토큰 만료 등)
export const AuthErrorSchema = z.object({
  error: z.string(),
  code: z.enum(['UNAUTHORIZED', 'TOKEN_EXPIRED']).optional(),
})
