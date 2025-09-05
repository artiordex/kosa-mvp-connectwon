import { z } from 'zod'

export const SessionSchema = z.object({
  id: z.string(),
  programId: z.string(),
  startTime: z.date(),
  endTime: z.date(),
  roomId: z.string().nullable(),
  maxParticipants: z.number().nullable(),
  currentParticipants: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const CreateSessionSchema = z.object({
  programId: z.string().min(1, '프로그램을 선택해주세요'),
  startTime: z.string().datetime('올바른 날짜 형식이 아닙니다'),
  endTime: z.string().datetime('올바른 날짜 형식이 아닙니다'),
  roomId: z.string().optional(),
  maxParticipants: z.number().min(1).optional(),
})

export const ParticipantSchema = z.object({
  id: z.string(),
  userId: z.string(),
  sessionId: z.string(),
  status: z.enum(['CONFIRMED', 'CANCELLED', 'ATTENDED', 'NO_SHOW']),
  notes: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const CreateReservationSchema = z.object({
  sessionId: z.string().min(1, '세션을 선택해주세요'),
  notes: z.string().max(500, '메모는 500자를 초과할 수 없습니다').optional(),
})

export const ReservationResponseSchema = z.object({
  id: z.string(),
  session: SessionSchema,
  status: z.enum(['CONFIRMED', 'CANCELLED', 'ATTENDED', 'NO_SHOW']),
  notes: z.string().nullable(),
  createdAt: z.date(),
})
