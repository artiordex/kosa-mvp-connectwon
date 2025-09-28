/**
 * Description : core-types.ts - 📌 핵심 기능에서 공유하는 타입 정의
 * Author: Shiwoo Min
 * Date : 2025-09-10
 * 09-29 : schema.prisma / 20-ddl.sql 기준으로 Core 타입 동기화
 */

/**
 * @description 식별자 공통 타입
 */
export type Id = string;

/**
 * @description ISO 8601 날짜-시간 문자열 (예: 'YYYY-MM-DDTHH:mm:ss.sssZ')
 */
export type ISODateTime = string;

/**
 * @description ISO 8601 날짜 문자열 (예: 'YYYY-MM-DD')
 */
export type ISODateOnly = string;

/**
 * @description 임의의 JSON 객체
 */
export type JsonObject = Record<string, unknown>;

/**
 * @description 시스템 역할 플래그 (비즈니스 권한과 분리)
 */
export type Role = 'ADMIN' | 'CREATOR' | 'USER';

/**
 * @description 도메인별 식별자 별칭
 */
export type UserId = Id;
export type ProgramId = Id;
export type SessionId = Id;
export type RoomId = Id;
export type VenueId = Id;
export type ParticipantId = Id;
export type ReservationId = Id;
export type AIInteractionId = Id;

/**
 * @description 페이지네이션 결과 포맷 (페이지 기반)
 */
export interface Page<T> {
  items: T[];
  total: number;
  page: number; // 1-base
  pageSize: number;
}

/**
 * @description 커서 기반 페이지네이션 쿼리
 */
export interface CursorPaginationQuery {
  cursor?: string | null;
  limit?: number;
}

/**
 * @description 커서 기반 페이지네이션 응답
 */
export interface CursorPaginatedResponse<T> {
  items: T[];
  nextCursor: string | null;
  total?: number;
}

/**
 * @description 사용자 엔터티
 */
export interface User {
  id: Id;
  email?: string;
  name?: string;
  roleFlags: number;
  preferences: JsonObject;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
  lastLoginAt?: ISODateTime;
}

/**
 * @description 사용자 생성 입력
 */
export interface CreateUser {
  email?: string;
  name?: string;
  roleFlags?: number;
  preferences?: JsonObject;
}

/**
 * @description 사용자 수정 입력
 */
export interface UpdateUser {
  email?: string;
  name?: string;
  roleFlags?: number;
  lastLoginAt?: ISODateTime;
  preferences?: JsonObject;
}

/**
 * @description 인증 제공자 엔터티
 */
export interface AuthProvider {
  id: Id;
  userId: UserId;
  provider: string;
  providerSub?: string;
  passwordHash?: string;
  meta: JsonObject;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

/**
 * @description 프로그램 엔터티
 */
export interface Program {
  id: ProgramId;
  title: string;
  description?: string;
  createdByUserId?: UserId;
  category?: string;
  meta: JsonObject;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

/**
 * @description 프로그램 생성 입력
 */
export interface CreateProgram {
  title: string;
  description?: string;
  createdByUserId?: UserId;
  category?: string;
  meta?: JsonObject;
}

/**
 * @description 프로그램 수정 입력
 */
export interface UpdateProgram {
  title?: string;
  description?: string;
  category?: string;
  meta?: JsonObject;
}

/**
 * @description 작성자 정보를 포함한 프로그램
 */
export interface ProgramWithCreator extends Program {
  creator?: User;
}

/**
 * @description 세션 상태 (DDL 기준)
 */
export type SessionStatus = 'SCHEDULED' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

/**
 * @description 세션 엔터티
 */
export interface Session {
  id: SessionId;
  programId: ProgramId;
  startsAt: ISODateTime;
  endsAt: ISODateTime;
  capacity?: number;
  participantFee?: number;
  status: SessionStatus;
  roomReservationId?: ReservationId;
  locationText?: string;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

/**
 * @description 세션 생성 입력
 */
export interface CreateSession {
  programId: ProgramId;
  startsAt: ISODateTime;
  endsAt: ISODateTime;
  capacity?: number;
  participantFee?: number;
  status?: SessionStatus;
  roomReservationId?: ReservationId;
  locationText?: string;
}

/**
 * @description 세션 수정 입력
 */
export interface UpdateSession {
  startsAt?: ISODateTime;
  endsAt?: ISODateTime;
  capacity?: number;
  participantFee?: number;
  status?: SessionStatus;
  roomReservationId?: ReservationId;
  locationText?: string;
}

/**
 * @description 시설(베뉴) 엔터티
 */
export interface Venue {
  id: VenueId;
  name: string;
  address?: string;
  openingHours?: JsonObject;
  blackoutRules?: JsonObject;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

/**
 * @description 방(공간) 엔터티
 */
export interface Room {
  id: RoomId;
  venueId: VenueId;
  name: string;
  capacity?: number;
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

/**
 * @description 예약 상태 (DDL 기준)
 */
export type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

/**
 * @description 방 예약 엔터티
 */
export interface RoomReservation {
  id: ReservationId;
  roomId: RoomId;
  userId?: UserId;
  sessionId?: SessionId;
  purpose?: string;
  status: ReservationStatus;
  startsAt: ISODateTime;
  endsAt: ISODateTime;
  meta: JsonObject;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

/**
 * @description 세션 참가자 역할
 */
export type ParticipantRole = 'HOST' | 'ATTENDEE';

/**
 * @description 세션 참가자 상태
 */
export type ParticipantStatus = 'APPLIED' | 'CONFIRMED' | 'CANCELLED' | 'NO_SHOW';

/**
 * @description 세션 참가자 엔터티
 */
export interface ProgramParticipant {
  id: ParticipantId;
  sessionId: SessionId;
  userId: UserId;
  role: ParticipantRole;
  status: ParticipantStatus;
  joinedAt?: ISODateTime;
}

/**
 * @description 장비 엔터티
 */
export interface Device {
  id: Id;
  name: string;
  type?: string;
  specs: JsonObject;
  status: 'AVAILABLE' | 'IN_USE' | 'MAINTENANCE' | 'RETIRED';
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

/**
 * @description 장비 대여 엔터티
 */
export interface DeviceRental {
  id: Id;
  deviceId: Id;
  userId: UserId;
  startsAt: ISODateTime;
  endsAt: ISODateTime;
  status: 'PENDING' | 'APPROVED' | 'RETURNED' | 'CANCELLED';
  meta: JsonObject;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

/**
 * @description AI 상호작용 엔터티
 */
export interface AIInteraction {
  id: AIInteractionId;
  userId?: UserId;
  programId?: ProgramId;
  sessionId?: SessionId;
  provider: string;
  model: string;
  kind: string;
  promptTokens: number;
  completionTokens: number;
  cost: number;
  status: 'OK' | 'ERROR';
  traceId?: string;
  meta: JsonObject;
  createdAt: ISODateTime;
}

/**
 * @description 사용자 활동 로그
 */
export interface UserActivity {
  id: Id;
  userId?: UserId;
  action: string;
  entityType?: string;
  entityId?: Id;
  meta: JsonObject;
  createdAt: ISODateTime;
}

/**
 * @description 리뷰 엔터티
 */
export interface Review {
  id: Id;
  userId: UserId;
  targetType: string;
  targetId: Id;
  rating: number;
  comment?: string;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

/**
 * @description 알림 엔터티
 */
export interface Notification {
  id: Id;
  userId: UserId;
  type: string;
  title: string;
  message?: string;
  isRead: boolean;
  createdAt: ISODateTime;
}

/**
 * @description 초과 예약 모드 타입
 * - disallow: 초과 예약 불가
 * - percent : 정원의 일정 %까지 초과 허용
 * - fixed   : 정원 외 고정된 인원 수까지 초과 허용
 */
export type OverbookingMode = 'disallow' | 'percent' | 'fixed';

/**
 * @description 초과 예약 정책 옵션
 * - value: percent 모드일 경우 % 값, fixed 모드일 경우 초과 인원 수
 */
export interface OverbookingPolicyOptions {
  mode: OverbookingMode;
  value?: number;
}

/**
 * @description 대기열 정책 옵션 인터페이스
 */
export interface WaitlistPolicyOptions {
  /** @description 대기열 최대 인원(기본 10명) */
  maxWaitlist?: number;
  /** @description 중복 가입 허용 여부(기본 false) */
  allowDuplicates?: boolean;
}

/**
 * @description 스케줄링된 세션
 */
export interface ScheduledSession {
  id: string;
  programId: string;
  date: string; // ISODateOnly
  capacity: number;
  participants: string[]; // UserId[]
  waitlist: string[]; // UserId[]
}
