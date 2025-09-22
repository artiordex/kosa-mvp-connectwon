/**
 * Description : session.ts - 📌 세션 저장소 포트 인터페이스
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import type { CreateSession, CursorPaginatedResponse, CursorPaginationQuery, Id, Session, SessionWithParticipants, SessionWithProgram, SessionWithProgramAndVenue, UpdateSession } from '../../core-types.js';

/**
 * @description 세션 저장소 포트
 */
export interface SessionRepository {
  /** @description ID로 조회 */
  findById(id: Id): Promise<Session | null>;

  /** @description 프로그램 조인 포함 조회 */
  findByIdWithProgram(id: Id): Promise<SessionWithProgram | null>;

  /** @description 프로그램/장소/방 등 상세 조인 조회 */
  findByIdWithDetails(id: Id): Promise<SessionWithProgramAndVenue | null>;

  /** @description 참가자 조인 포함 조회 */
  findByIdWithParticipants(id: Id): Promise<SessionWithParticipants | null>;

  /** @description 생성/갱신/삭제 */
  create(session: CreateSession): Promise<Session>;
  update(id: Id, updates: UpdateSession): Promise<Session>;
  delete(id: Id): Promise<void>;

  /** @description 페이징 목록 */
  findMany(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Session>>;

  /** @description 페이징 목록(프로그램 조인) */
  findManyWithProgram(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<SessionWithProgram>>;

  /** @description 프로그램별 목록 */
  findByProgramId(programId: Id, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Session>>;

  /** @description 상태별 목록 */
  findByStatus(status: string, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Session>>;

  /** @description 날짜 범위별 목록 */
  findByDateRange(
    startDate: string,
    endDate: string,
    query: CursorPaginationQuery,
  ): Promise<CursorPaginatedResponse<Session>>;

  /** @description 예정(Upcoming) 세션 목록 */
  findUpcoming(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<SessionWithProgram>>;

  /** @description 완료 세션 목록 */
  findCompleted(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<SessionWithProgram>>;

  /** @description 취소 세션 목록 */
  findCancelled(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<SessionWithProgram>>;

  /** @description 방 예약 ID로 세션 조회 */
  findByRoomReservationId(roomReservationId: Id): Promise<Session | null>;

  /** @description 세션 상태 변경 */
  updateStatus(id: Id, status: string): Promise<void>;

  /** @description 방 예약과 링크/해제 */
  linkRoomReservation(sessionId: Id, roomReservationId: Id): Promise<void>;
  unlinkRoomReservation(sessionId: Id): Promise<void>;

  /** @description 시간 충돌 체크(예: 동일 시간대) */
  checkTimeConflict(startsAt: string, endsAt: string, excludeSessionId?: Id): Promise<Session[]>;

  /** @description 리마인더 대상 세션 조회 */
  findForReminder(beforeMinutes: number): Promise<SessionWithProgramAndVenue[]>;

  /** @description 존재 여부 */
  exists(id: Id): Promise<boolean>;

  /** @description 통계 */
  count(): Promise<number>;
  countByProgram(programId: Id): Promise<number>;
  countByStatus(status: string): Promise<number>;
  countUpcoming(): Promise<number>;
}
