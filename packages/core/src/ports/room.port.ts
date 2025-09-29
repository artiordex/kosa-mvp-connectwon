/**
 * Description : room.port.ts - 📌 방/예약 저장소 포트 인터페이스
 * Author : Shiwoo Min
 * Date : 2025-09-30
 */
import type { CursorPaginatedResponse, CursorPaginationQuery, Id, ISODateTime, JsonObject } from '../core-types.js';

/**
 * @description 방 상태
 */
export type RoomStatus = 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';

/**
 * @description 방 엔터티
 */
export interface Room {
  id: Id;
  venueId: Id;
  name: string;
  capacity?: number;
  status: RoomStatus;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

/**
 * @description 방 생성 입력
 */
export interface CreateRoom {
  venueId: Id;
  name: string;
  capacity?: number;
  status?: RoomStatus;
}

/**
 * @description 방 수정 입력
 */
export interface UpdateRoom {
  name?: string;
  capacity?: number;
  status?: RoomStatus;
}

/**
 * @description 방 예약 상태
 */
export type RoomReservationStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

/**
 * @description 방 예약 엔터티
 */
export interface RoomReservation {
  id: Id;
  roomId: Id;
  userId?: Id;
  sessionId?: Id;
  startsAt: ISODateTime;
  endsAt: ISODateTime;
  purpose?: string;
  status: RoomReservationStatus;
  meta?: JsonObject;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

/**
 * @description 방 예약 생성 입력
 */
export interface CreateRoomReservation {
  roomId: Id;
  userId?: Id;
  sessionId?: Id;
  startsAt: ISODateTime;
  endsAt: ISODateTime;
  purpose?: string;
  meta?: JsonObject;
}

/**
 * @description 방 예약 수정 입력
 */
export interface UpdateRoomReservation {
  startsAt?: ISODateTime;
  endsAt?: ISODateTime;
  purpose?: string;
  status?: RoomReservationStatus;
  meta?: JsonObject;
}

/**
 * @description 방 저장소 포트
 */
export interface RoomRepository {
  /** ID로 조회 */
  findById(id: Id): Promise<Room | null>;

  /** 장소별 방 조회 */
  findByVenueId(venueId: Id, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Room>>;

  /** 방 생성 */
  create(data: CreateRoom): Promise<Room>;

  /** 방 수정 */
  update(id: Id, updates: UpdateRoom): Promise<Room>;

  /** 방 삭제 */
  delete(id: Id): Promise<void>;

  /** 상태별 조회 */
  findByStatus(status: RoomStatus, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Room>>;

  /** 전체 개수 */
  count(): Promise<number>;
  /** 특정 장소 내 방 개수 */
  countByVenue(venueId: Id): Promise<number>;

  /** 존재 여부 */
  exists(id: Id): Promise<boolean>;
  existsByName(venueId: Id, name: string): Promise<boolean>;
}

/**
 * @description 방 예약 저장소 포트
 */
export interface RoomReservationRepository {
  /** ID로 조회 */
  findById(id: Id): Promise<RoomReservation | null>;

  /** 방 ID 기준 예약 조회 */
  findByRoomId(roomId: Id, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<RoomReservation>>;

  /** 사용자 기준 예약 조회 */
  findByUserId(userId: Id, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<RoomReservation>>;

  /** 세션 기준 예약 조회 */
  findBySessionId(sessionId: Id): Promise<RoomReservation | null>;

  /** 예약 생성 */
  create(data: CreateRoomReservation): Promise<RoomReservation>;

  /** 예약 수정 */
  update(id: Id, updates: UpdateRoomReservation): Promise<RoomReservation>;

  /** 예약 취소 */
  cancel(id: Id): Promise<void>;

  /** 예약 삭제 */
  delete(id: Id): Promise<void>;

  /** 특정 시간대 예약 충돌 여부 */
  hasConflict(roomId: Id, startsAt: ISODateTime, endsAt: ISODateTime): Promise<boolean>;

  /** 특정 시간대 충돌 예약 목록 */
  findConflicts(roomId: Id, startsAt: ISODateTime, endsAt: ISODateTime): Promise<RoomReservation[]>;

  /** 상태별 예약 조회 */
  findByStatus(status: RoomReservationStatus, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<RoomReservation>>;

  /** 전체 개수 */
  count(): Promise<number>;
  /** 방별 예약 개수 */
  countByRoom(roomId: Id): Promise<number>;

  /** 존재 여부 */
  exists(id: Id): Promise<boolean>;
}
