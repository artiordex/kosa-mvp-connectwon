import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().nullable(),
  role: z.enum(['USER', 'CREATOR', 'ADMIN']),
  // Google OAuth 사용자를 위한 필드
  provider: z.literal('GOOGLE'),
  avatar: z.string().nullable(),
  preferences: z.object({
    categories: z.array(z.string()).optional(),
    notifications: z.boolean().optional(),
  }).nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const UpdateUserSchema = z.object({
  name: z.string().min(1).optional(),
  phone: z.string().optional(),
  preferences: z.object({
    categories: z.array(z.string()).optional(),
    notifications: z.boolean().optional(),
  }).optional(),
})

export const UserListResponseSchema = z.object({
  users: z.array(UserSchema),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    pages: z.number(),
  }),
})
