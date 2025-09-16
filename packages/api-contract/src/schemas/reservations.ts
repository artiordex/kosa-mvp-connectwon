/**
 * Description : reservations.ts - 📌 예약 관련 스키마 (Zod 기반, DTO 대체)
 * Author : Shiwoo Min
 * Date : 2025-09-16
 */
import { z } from 'zod';

// 예약 상태 정의
export const ReservationStatus = z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']);

// 참가자 상태 정의
export const ParticipantStatus = z.enum(['CONFIRMED', 'CANCELLED', 'ATTENDED', 'NO_SHOW']);

// 타입 추출
export type ReservationStatus = z.infer<typeof ReservationStatus>;
export type ParticipantStatus = z.infer<typeof ParticipantStatus>;

// 세션 스키마
export const SessionSchema = z.object({
  id: z.string(),
  program_id: z.string(),
  title: z.string(),
  starts_at: z.date(),
  ends_at: z.date(),
  room_id: z.string().nullable(),
  capacity: z.number().min(1).nullable(),
  current_participants: z.number().min(0).default(0),
  participant_fee: z.number().min(0).nullable(),
  status: ReservationStatus.default('PENDING'),
  created_at: z.date(),
  updated_at: z.date(),
});

// 룸 예약 스키마
export const RoomReservationSchema = z.object({
  id: z.string(),
  room_id: z.string(),
  user_id: z.string().nullable(),
  starts_at: z.date(),
  ends_at: z.date(),
  purpose: z.string().nullable(),
  status: ReservationStatus.default('PENDING'),
  meta: z.record(z.unknown()).nullable(),
  session_id: z.string().nullable(),
  created_at: z.date(),
  updated_at: z.date(),
});

// 참가자 스키마
export const ParticipantSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  session_id: z.string(),
  status: ParticipantStatus.default('CONFIRMED'),
  notes: z.string().nullable(),
  created_at: z.date(),
  updated_at: z.date(),
});

// 세션 생성 스키마
export const CreateSessionSchema = z.object({
  program_id: z.string().min(1),
  title: z.string().min(1),
  starts_at: z.string().datetime(),
  ends_at: z.string().datetime(),
  room_id: z.string().optional(),
  capacity: z.number().min(1).optional(),
  participant_fee: z.number().min(0).optional(),
});

// 세션 수정 스키마
export const UpdateSessionSchema = z.object({
  title: z.string().min(1).optional(),
  starts_at: z.string().datetime().optional(),
  ends_at: z.string().datetime().optional(),
  room_id: z.string().optional(),
  capacity: z.number().min(1).optional(),
  participant_fee: z.number().min(0).optional(),
  status: ReservationStatus.optional(),
});

// 룸 예약 생성 스키마
export const CreateRoomReservationSchema = z.object({
  room_id: z.string(),
  user_id: z.string().optional(),
  starts_at: z.string().datetime(),
  ends_at: z.string().datetime(),
  purpose: z.string().optional(),
  status: ReservationStatus.optional(),
  meta: z.record(z.unknown()).optional(),
  session_id: z.string().optional(),
});

// 룸 예약 수정 스키마
export const UpdateRoomReservationSchema = z.object({
  starts_at: z.string().datetime().optional(),
  ends_at: z.string().datetime().optional(),
  purpose: z.string().optional(),
  status: ReservationStatus.optional(),
  meta: z.record(z.unknown()).optional(),
});

// 참가자 생성 스키마
export const CreateParticipantSchema = z.object({
  session_id: z.string().min(1),
  notes: z.string().max(500).optional(),
});

// 참가자 수정 스키마
export const UpdateParticipantSchema = z.object({
  status: ParticipantStatus.optional(),
  notes: z.string().max(500).optional(),
});

// 조회 쿼리 스키마
export const SessionQuerySchema = z.object({
  program_id: z.string().optional(),
  room_id: z.string().optional(),
  status: ReservationStatus.optional(),
  starts_after: z.string().datetime().optional(),
  starts_before: z.string().datetime().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

// 룸 예약 조회 쿼리 스키마
export const RoomReservationQuerySchema = z.object({
  room_id: z.string().optional(),
  user_id: z.string().optional(),
  status: ReservationStatus.optional(),
  starts_after: z.string().datetime().optional(),
  starts_before: z.string().datetime().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

// 가용성 체크 스키마
export const CheckAvailabilitySchema = z.object({
  room_id: z.string(),
  starts_at: z.string().datetime(),
  ends_at: z.string().datetime(),
  exclude_reservation_id: z.string().optional(),
});

// 가용성 응답 스키마
export const AvailabilityResponseSchema = z.object({
  available: z.boolean(),
  message: z.string(),
  conflicts: z
    .array(
      z.object({
        id: z.string(),
        starts_at: z.string().datetime(),
        ends_at: z.string().datetime(),
        purpose: z.string().nullable(),
      }),
    )
    .optional(),
});

// 특정 날짜의 가용 슬롯 찾기 스키마
export const FindAvailableSlotsSchema = z.object({
  room_id: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
  duration_hours: z.number().int().min(1),
  start_time: z
    .string()
    .regex(/^\d{2}:\d{2}$/)
    .default('09:00'), // HH:mm
  end_time: z
    .string()
    .regex(/^\d{2}:\d{2}$/)
    .default('18:00'),
});

// 가용 슬롯 응답 스키마
export const AvailableSlotsResponseSchema = z.object({
  date: z.string(),
  room_id: z.string(),
  available_slots: z.array(
    z.object({
      starts_at: z.string().datetime(),
      ends_at: z.string().datetime(),
    }),
  ),
});

// 세션과 함께 예약 생성 스키마
export const CreateReservationWithSessionSchema = z.object({
  room_reservation: CreateRoomReservationSchema,
  session_info: z.object({
    program_id: z.string(),
    title: z.string(),
    capacity: z.number().min(1).optional(),
    participant_fee: z.number().min(0).optional(),
  }),
});

// 예약 취소 및 일정 변경 스키마
export const CancelReservationSchema = z.object({
  reason: z.string().min(1),
  request_refund: z.boolean().default(false),
});

// 일정 변경 스키마
export const RescheduleReservationSchema = z.object({
  new_starts_at: z.string().datetime(),
  new_ends_at: z.string().datetime(),
  reason: z.string().min(1),
});

// 페이지네이션 스키마
export const PaginationSchema = z.object({
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
  pages: z.number().int().min(0),
});

// 리스트 응답 스키마
export const SessionListResponseSchema = z.object({
  sessions: z.array(SessionSchema),
  pagination: PaginationSchema,
});

// 룸 예약 리스트 응답 스키마
export const RoomReservationListResponseSchema = z.object({
  reservations: z.array(RoomReservationSchema),
  pagination: PaginationSchema,
});

// 참가자 리스트 응답 스키마
export const ParticipantListResponseSchema = z.object({
  participants: z.array(ParticipantSchema),
  pagination: PaginationSchema,
});

// 세션 상세 정보 스키마
export const SessionWithDetailsSchema = SessionSchema.extend({
  room: z
    .object({
      id: z.string(),
      name: z.string(),
      capacity: z.number().nullable(),
      status: z.string(),
    })
    .nullable(),
  program: z.object({
    id: z.string(),
    title: z.string(),
    category: z.string().nullable(),
  }),
  participants: z.array(
    z.object({
      id: z.string(),
      user_id: z.string(),
      status: ParticipantStatus,
    }),
  ),
});

// 룸 예약 상세 정보 스키마
export const RoomReservationWithDetailsSchema = RoomReservationSchema.extend({
  room: z.object({
    id: z.string(),
    venue_id: z.string(),
    name: z.string(),
    capacity: z.number().nullable(),
    status: z.string(),
  }),
  user: z
    .object({
      id: z.string(),
      email: z.string(),
      name: z.string(),
    })
    .nullable(),
  session: z
    .object({
      id: z.string(),
      program_id: z.string(),
      title: z.string(),
      status: ReservationStatus,
    })
    .nullable(),
});

// 예약 통계 스키마
export const ReservationStatsSchema = z.object({
  room_id: z.string(),
  period: z.string(), // YYYY-MM
  total_reservations: z.number().int().min(0),
  confirmed_reservations: z.number().int().min(0),
  cancelled_reservations: z.number().int().min(0),
  occupancy_rate: z.number().min(0).max(100),
  total_hours_used: z.number().min(0),
  average_duration: z.number().min(0),
});

// 타입 추출
export type Session = z.infer<typeof SessionSchema>;
export type RoomReservation = z.infer<typeof RoomReservationSchema>;
export type Participant = z.infer<typeof ParticipantSchema>;
export type CreateSession = z.infer<typeof CreateSessionSchema>;
export type UpdateSession = z.infer<typeof UpdateSessionSchema>;
export type CreateRoomReservation = z.infer<typeof CreateRoomReservationSchema>;
export type UpdateRoomReservation = z.infer<typeof UpdateRoomReservationSchema>;
export type CreateParticipant = z.infer<typeof CreateParticipantSchema>;
export type UpdateParticipant = z.infer<typeof UpdateParticipantSchema>;
export type SessionQuery = z.infer<typeof SessionQuerySchema>;
export type RoomReservationQuery = z.infer<typeof RoomReservationQuerySchema>;
export type CheckAvailability = z.infer<typeof CheckAvailabilitySchema>;
export type AvailabilityResponse = z.infer<typeof AvailabilityResponseSchema>;
export type FindAvailableSlots = z.infer<typeof FindAvailableSlotsSchema>;
export type AvailableSlotsResponse = z.infer<typeof AvailableSlotsResponseSchema>;
export type CreateReservationWithSession = z.infer<typeof CreateReservationWithSessionSchema>;
export type CancelReservation = z.infer<typeof CancelReservationSchema>;
export type RescheduleReservation = z.infer<typeof RescheduleReservationSchema>;
export type SessionListResponse = z.infer<typeof SessionListResponseSchema>;
export type RoomReservationListResponse = z.infer<typeof RoomReservationListResponseSchema>;
export type ParticipantListResponse = z.infer<typeof ParticipantListResponseSchema>;
export type SessionWithDetails = z.infer<typeof SessionWithDetailsSchema>;
export type RoomReservationWithDetails = z.infer<typeof RoomReservationWithDetailsSchema>;
export type ReservationStats = z.infer<typeof ReservationStatsSchema>;
export type Pagination = z.infer<typeof PaginationSchema>;

// 예약 활성화 여부
export function isActiveReservation(reservation: RoomReservation): boolean {
  return reservation.status === 'CONFIRMED' || reservation.status === 'PENDING';
}

// 세션이 가득 찼는지 여부
export function isSessionFull(session: Session): boolean {
  return session.capacity !== null && session.current_participants >= session.capacity;
}

// 예약 취소 가능 여부
export function canCancelReservation(reservation: RoomReservation): boolean {
  return reservation.status === 'PENDING' || reservation.status === 'CONFIRMED';
}

// 세션 기간 계산
export function getSessionDurationHours(session: Session): number {
  const start = new Date(session.starts_at);
  const end = new Date(session.ends_at);
  return (end.getTime() - start.getTime()) / (1000 * 60 * 60);
}

// 세션 생성 유효성 검사
export function validateCreateSession(data: unknown) {
  return CreateSessionSchema.safeParse(data);
}

// 룸 예약 생성 유효성 검사
export function validateCreateRoomReservation(data: unknown) {
  return CreateRoomReservationSchema.safeParse(data);
}

// 가능 시간 체크 유효성 검사
export function validateCheckAvailability(data: unknown) {
  return CheckAvailabilitySchema.safeParse(data);
}

// 시간 겹침 여부 체크
export function isTimeSlotOverlapping(start1: Date, end1: Date, start2: Date, end2: Date): boolean {
  return start1 < end2 && start2 < end1;
}

// 시간 슬롯 포맷팅
export function formatTimeSlot(starts_at: Date, ends_at: Date): string {
  const start = starts_at.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  const end = ends_at.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  return `${start} - ${end}`;
}
