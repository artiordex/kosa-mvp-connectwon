import { z } from 'zod'

export const ErrorResponseSchema = z.object({
  error: z.string(),
  code: z.string().optional(),
  details: z.unknown().optional(),
})

export const SuccessResponseSchema = z.object({
  message: z.string(),
  data: z.unknown().optional(),
})

export const PaginationSchema = z.object({
  page: z.number().min(1),
  limit: z.number().min(1).max(100),
  total: z.number(),
  pages: z.number(),
})

export const IdParamSchema = z.object({
  id: z.string().min(1, 'ID가 필요합니다'),
})

export const SearchQuerySchema = z.object({
  search: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
})
