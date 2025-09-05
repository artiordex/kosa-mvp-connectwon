import { z } from 'zod'

export const ProgramSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  venueId: z.string(),
  creatorId: z.string(),
  maxParticipants: z.number(),
  price: z.number(),
  tags: z.array(z.string()),
  imageUrl: z.string().nullable(),
  aiSummary: z.string().nullable(),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED']),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const CreateProgramSchema = z.object({
  title: z.string().min(1, '프로그램 제목을 입력해주세요'),
  description: z.string().min(10, '프로그램 설명은 10자 이상이어야 합니다'),
  category: z.string().min(1, '카테고리를 선택해주세요'),
  venueId: z.string().min(1, '지점을 선택해주세요'),
  maxParticipants: z.number().min(1).max(100, '최대 참여자 수는 100명을 초과할 수 없습니다'),
  price: z.number().min(0, '가격은 0원 이상이어야 합니다'),
  tags: z.array(z.string()).optional(),
  imageUrl: z.string().url().optional(),
})

export const UpdateProgramSchema = CreateProgramSchema.partial()

export const ProgramListResponseSchema = z.object({
  programs: z.array(ProgramSchema),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    pages: z.number(),
  }),
})
