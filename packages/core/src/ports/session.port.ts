/**
 * Description : session.port.ts - 📌 세션(프로그램 일정) 저장소 포트 인터페이스
 * Author : Shiwoo Min
 * Date : 2025-09-30
 */
import type { CursorPaginatedResponse, CursorPaginationQuery, Id, ISODateTime } from '../core-types.js';

/**
 * @description 세션 상태
 */
export type SessionStatus = 'SCHEDULED' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

/**
 * @description 세션 엔터티
 */
export interface Session {
  id: Id;
  programId: Id;
  startsAt: ISODateTime;
  endsAt: ISODateTime;
  capacity?: number;
  participantFee?: number;
  status: SessionStatus;
  roomReservationId?: Id;
  locationText?: string;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

/**
 * @description 세션 생성 입력
 */
export interface CreateSession {
  programId: Id;
  startsAt: ISODateTime;
  endsAt: ISODateTime;
  capacity?: number;
  participantFee?: number;
  locationText?: string;
  roomReservationId?: Id;
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
  locationText?: string;
  roomReservationId?: Id;
}

/**
 * @description 세션 저장소 포트
 */
export interface SessionRepository {
  /** ID로 조회 */
  findById(id: Id): Promise<Session | null>;

  /** 프로그램 기준 조회 */
  findByProgramId(programId: Id, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Session>>;

  /** 생성 */
  create(data: CreateSession): Promise<Session>;

  /** 수정 */
  update(id: Id, updates: UpdateSession): Promise<Session>;

  /** 삭제 */
  delete(id: Id): Promise<void>;

  /** 페이징 목록 조회 */
  findMany(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Session>>;

  /** 상태별 조회 */
  findByStatus(status: SessionStatus, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Session>>;

  /** 기간 내 조회 */
  findInRange(startTime: ISODateTime, endTime: ISODateTime, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Session>>;

  /** 활성 세션(시작/종료 기준) */
  findActive(at: ISODateTime): Promise<Session[]>;

  /** 총 개수 */
  count(): Promise<number>;

  /** 존재 여부 */
  exists(id: Id): Promise<boolean>;
}
