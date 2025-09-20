/**
 * Description : reservations.ts - 📌 예약 관련 스키마 (Zod 기반, DTO 대체)
 * Author : Shiwoo Min
 * Date : 2025-09-16
 */
import { z } from 'zod';

/**
 * @description 예약 상태 열거형
 */
export const ReservationStatus = z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']);

/**
 * @description 참가자 상태 열거형
 */
export const ParticipantStatus = z.enum(['CONFIRMED', 'CANCELLED', 'ATTENDED', 'NO_SHOW']);

/**
 * @description 예약 상태 타입
 */
export type ReservationStatus = z.infer<typeof ReservationStatus>;

/**
 * @description 참가자 상태 타입
 */
export type ParticipantStatus = z.infer<typeof ParticipantStatus>;

/**
 * @description 세션 기본 스키마
 */
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

/**
 * @description 룸 예약 기본 스키마
 */
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

/**
 * @description 참가자 기본 스키마
 */
export const ParticipantSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  session_id: z.string(),
  status: ParticipantStatus.default('CONFIRMED'),
  notes: z.string().nullable(),
  created_at: z.date(),
  updated_at: z.date(),
});

/**
 * @description 세션 생성 요청 스키마
 */
export const CreateSessionSchema = z.object({
  program_id: z.string().min(1),
  title: z.string().min(1),
  starts_at: z.string().datetime(),
  ends_at: z.string().datetime(),
  room_id: z.string().optional(),
  capacity: z.number().min(1).optional(),
  participant_fee: z.number().min(0).optional(),
});

/**
 * @description 세션 수정 요청 스키마
 */
export const UpdateSessionSchema = z.object({
  title: z.string().min(1).optional(),
  starts_at: z.string().datetime().optional(),
  ends_at: z.string().datetime().optional(),
  room_id: z.string().optional(),
  capacity: z.number().min(1).optional(),
  participant_fee: z.number().min(0).optional(),
  status: ReservationStatus.optional(),
});

/**
 * @description 룸 예약 생성 요청 스키마
 */
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

/**
 * @description 룸 예약 수정 요청 스키마
 */
export const UpdateRoomReservationSchema = z.object({
  starts_at: z.string().datetime().optional(),
  ends_at: z.string().datetime().optional(),
  purpose: z.string().optional(),
  status: ReservationStatus.optional(),
  meta: z.record(z.unknown()).optional(),
});

/**
 * @description 참가자 생성 요청 스키마
 */
export const CreateParticipantSchema = z.object({
  session_id: z.string().min(1),
  notes: z.string().max(500).optional(),
});

/**
 * @description 참가자 수정 요청 스키마
 */
export const UpdateParticipantSchema = z.object({
  status: ParticipantStatus.optional(),
  notes: z.string().max(500).optional(),
});

/**
 * @description 세션 목록 조회 쿼리 스키마
 */
export const SessionQuerySchema = z.object({
  program_id: z.string().optional(),
  room_id: z.string().optional(),
  status: ReservationStatus.optional(),
  starts_after: z.string().datetime().optional(),
  starts_before: z.string().datetime().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

/**
 * @description 룸 예약 목록 조회 쿼리 스키마
 */
export const RoomReservationQuerySchema = z.object({
  room_id: z.string().optional(),
  user_id: z.string().optional(),
  status: ReservationStatus.optional(),
  starts_after: z.string().datetime().optional(),
  starts_before: z.string().datetime().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

/**
 * @description 룸 가용성 체크 요청 스키마
 */
export const CheckAvailabilitySchema = z.object({
  room_id: z.string(),
  starts_at: z.string().datetime(),
  ends_at: z.string().datetime(),
  exclude_reservation_id: z.string().optional(),
});

/**
 * @description 룸 가용성 체크 응답 스키마
 */
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

/**
 * @description 특정 날짜의 가용 슬롯 찾기 요청 스키마
 */
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

/**
 * @description 가용 슬롯 응답 스키마
 */
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

/**
 * @description 세션과 함께 예약 생성 요청 스키마
 */
export const CreateReservationWithSessionSchema = z.object({
  room_reservation: CreateRoomReservationSchema,
  session_info: z.object({
    program_id: z.string(),
    title: z.string(),
    capacity: z.number().min(1).optional(),
    participant_fee: z.number().min(0).optional(),
  }),
});

/**
 * @description 예약 취소 요청 스키마
 */
export const CancelReservationSchema = z.object({
  reason: z.string().min(1),
  request_refund: z.boolean().default(false),
});

/**
 * @description 예약 일정 변경 요청 스키마
 */
export const RescheduleReservationSchema = z.object({
  new_starts_at: z.string().datetime(),
  new_ends_at: z.string().datetime(),
  reason: z.string().min(1),
});

/**
 * @description 페이지네이션 스키마
 */
export const PaginationSchema = z.object({
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
  pages: z.number().int().min(0),
});

/**
 * @description 세션 목록 응답 스키마
 */
export const SessionListResponseSchema = z.object({
  sessions: z.array(SessionSchema),
  pagination: PaginationSchema,
});

/**
 * @description 룸 예약 목록 응답 스키마
 */
export const RoomReservationListResponseSchema = z.object({
  reservations: z.array(RoomReservationSchema),
  pagination: PaginationSchema,
});

/**
 * @description 참가자 목록 응답 스키마
 */
export const ParticipantListResponseSchema = z.object({
  participants: z.array(ParticipantSchema),
  pagination: PaginationSchema,
});

/**
 * @description 세션 상세 정보 스키마
 */
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

/**
 * @description 룸 예약 상세 정보 스키마
 */
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

/**
 * @description 예약 통계 스키마
 */
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

/**
 * @description 세션 기본 타입
 */
export type Session = z.infer<typeof SessionSchema>;

/**
 * @description 룸 예약 기본 타입
 */
export type RoomReservation = z.infer<typeof RoomReservationSchema>;

/**
 * @description 참가자 기본 타입
 */
export type Participant = z.infer<typeof ParticipantSchema>;

/**
 * @description 세션 생성 요청 타입
 */
export type CreateSession = z.infer<typeof CreateSessionSchema>;

/**
 * @description 세션 수정 요청 타입
 */
export type UpdateSession = z.infer<typeof UpdateSessionSchema>;

/**
 * @description 룸 예약 생성 요청 타입
 */
export type CreateRoomReservation = z.infer<typeof CreateRoomReservationSchema>;

/**
 * @description 룸 예약 수정 요청 타입
 */
export type UpdateRoomReservation = z.infer<typeof UpdateRoomReservationSchema>;

/**
 * @description 참가자 생성 요청 타입
 */
export type CreateParticipant = z.infer<typeof CreateParticipantSchema>;

/**
 * @description 참가자 수정 요청 타입
 */
export type UpdateParticipant = z.infer<typeof UpdateParticipantSchema>;

/**
 * @description 세션 목록 조회 쿼리 타입
 */
export type SessionQuery = z.infer<typeof SessionQuerySchema>;

/**
 * @description 룸 예약 목록 조회 쿼리 타입
 */
export type RoomReservationQuery = z.infer<typeof RoomReservationQuerySchema>;

/**
 * @description 룸 가용성 체크 요청 타입
 */
export type CheckAvailability = z.infer<typeof CheckAvailabilitySchema>;

/**
 * @description 룸 가용성 체크 응답 타입
 */
export type AvailabilityResponse = z.infer<typeof AvailabilityResponseSchema>;

/**
 * @description 가용 슬롯 찾기 요청 타입
 */
export type FindAvailableSlots = z.infer<typeof FindAvailableSlotsSchema>;

/**
 * @description 가용 슬롯 응답 타입
 */
export type AvailableSlotsResponse = z.infer<typeof AvailableSlotsResponseSchema>;

/**
 * @description 세션과 함께 예약 생성 요청 타입
 */
export type CreateReservationWithSession = z.infer<typeof CreateReservationWithSessionSchema>;

/**
 * @description 예약 취소 요청 타입
 */
export type CancelReservation = z.infer<typeof CancelReservationSchema>;

/**
 * @description 예약 일정 변경 요청 타입
 */
export type RescheduleReservation = z.infer<typeof RescheduleReservationSchema>;

/**
 * @description 세션 목록 응답 타입
 */
export type SessionListResponse = z.infer<typeof SessionListResponseSchema>;

/**
 * @description 룸 예약 목록 응답 타입
 */
export type RoomReservationListResponse = z.infer<typeof RoomReservationListResponseSchema>;

/**
 * @description 참가자 목록 응답 타입
 */
export type ParticipantListResponse = z.infer<typeof ParticipantListResponseSchema>;

/**
 * @description 세션 상세 정보 타입
 */
export type SessionWithDetails = z.infer<typeof SessionWithDetailsSchema>;

/**
 * @description 룸 예약 상세 정보 타입
 */
export type RoomReservationWithDetails = z.infer<typeof RoomReservationWithDetailsSchema>;

/**
 * @description 예약 통계 타입
 */
export type ReservationStats = z.infer<typeof ReservationStatsSchema>;

/**
 * @description 페이지네이션 타입
 */
export type Pagination = z.infer<typeof PaginationSchema>;

/**
 * @description 예약 활성 상태 여부 확인 함수
 * @param reservation 확인할 룸 예약 객체
 * @returns 예약이 확정되거나 대기 상태이면 true, 그렇지 않으면 false
 */
export function isActiveReservation(reservation: RoomReservation): boolean {
  return reservation.status === 'CONFIRMED' || reservation.status === 'PENDING';
}

/**
 * @description 세션 정원 초과 여부 확인 함수
 * @param session 확인할 세션 객체
 * @returns 정원이 가득 찼으면 true, 그렇지 않으면 false
 */
export function isSessionFull(session: Session): boolean {
  return session.capacity !== null && session.current_participants >= session.capacity;
}

/**
 * @description 예약 취소 가능 여부 확인 함수
 * @param reservation 확인할 룸 예약 객체
 * @returns 취소 가능한 상태이면 true, 그렇지 않으면 false
 */
export function canCancelReservation(reservation: RoomReservation): boolean {
  return reservation.status === 'PENDING' || reservation.status === 'CONFIRMED';
}

/**
 * @description 세션 진행 시간 계산 함수 (시간 단위)
 * @param session 계산할 세션 객체
 * @returns 세션 진행 시간 (시간 단위)
 */
export function getSessionDurationHours(session: Session): number {
  const start = new Date(session.starts_at);
  const end = new Date(session.ends_at);
  return (end.getTime() - start.getTime()) / (1000 * 60 * 60);
}

/**
 * @description 세션 생성 데이터 유효성 검사 함수
 * @param data 검사할 데이터
 * @returns Zod 파싱 결과
 */
export function validateCreateSession(data: unknown) {
  return CreateSessionSchema.safeParse(data);
}

/**
 * @description 룸 예약 생성 데이터 유효성 검사 함수
 * @param data 검사할 데이터
 * @returns Zod 파싱 결과
 */
export function validateCreateRoomReservation(data: unknown) {
  return CreateRoomReservationSchema.safeParse(data);
}

/**
 * @description 룸 가용성 체크 데이터 유효성 검사 함수
 * @param data 검사할 데이터
 * @returns Zod 파싱 결과
 */
export function validateCheckAvailability(data: unknown) {
  return CheckAvailabilitySchema.safeParse(data);
}

/**
 * @description 시간 슬롯 겹침 여부 확인 함수
 * @param start1 첫 번째 시간 슬롯 시작 시간
 * @param end1 첫 번째 시간 슬롯 종료 시간
 * @param start2 두 번째 시간 슬롯 시작 시간
 * @param end2 두 번째 시간 슬롯 종료 시간
 * @returns 시간 슬롯이 겹치면 true, 그렇지 않으면 false
 */
export function isTimeSlotOverlapping(start1: Date, end1: Date, start2: Date, end2: Date): boolean {
  return start1 < end2 && start2 < end1;
}

/**
 * @description 시간 슬롯 한국어 포맷팅 함수
 * @param starts_at 시작 시간
 * @param ends_at 종료 시간
 * @returns 포맷된 시간 문자열 (예: "09:00 - 11:00")
 */
export function formatTimeSlot(starts_at: Date, ends_at: Date): string {
  const start = starts_at.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  const end = ends_at.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  return `${start} - ${end}`;
}
