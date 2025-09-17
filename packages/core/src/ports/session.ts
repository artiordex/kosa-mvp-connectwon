/**
 * Description : session.ts - 📌 세션 저장소 포트 인터페이스
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import type {
  CreateSession,
  CursorPaginatedResponse,
  CursorPaginationQuery,
  Id,
  Session,
  SessionWithParticipants,
  SessionWithProgram,
  SessionWithProgramAndVenue,
  UpdateSession,
} from '../../core-types.js';

// 세션 저장소 포트 인터페이스
export interface SessionRepository {
  // 기본 CRUD 작업
  findById(id: Id): Promise<Session | null>;
  findByIdWithProgram(id: Id): Promise<SessionWithProgram | null>;
  findByIdWithDetails(id: Id): Promise<SessionWithProgramAndVenue | null>;
  findByIdWithParticipants(id: Id): Promise<SessionWithParticipants | null>;
  create(session: CreateSession): Promise<Session>;
  update(id: Id, updates: UpdateSession): Promise<Session>;
  delete(id: Id): Promise<void>;

  // 목록 조회
  findMany(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Session>>;
  findManyWithProgram(
    query: CursorPaginationQuery,
  ): Promise<CursorPaginatedResponse<SessionWithProgram>>;

  // 프로그램별 세션
  findByProgramId(
    programId: Id,
    query: CursorPaginationQuery,
  ): Promise<CursorPaginatedResponse<Session>>;

  // 상태별 세션
  findByStatus(
    status: string,
    query: CursorPaginationQuery,
  ): Promise<CursorPaginatedResponse<Session>>;

  // 날짜 범위별 세션
  findByDateRange(
    startDate: string,
    endDate: string,
    query: CursorPaginationQuery,
  ): Promise<CursorPaginatedResponse<Session>>;

  // 예정된 세션
  findUpcoming(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<SessionWithProgram>>;

  // 완료된 세션
  findCompleted(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<SessionWithProgram>>;

  // 취소된 세션
  findCancelled(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<SessionWithProgram>>;

  // 방 예약과 연결된 세션
  findByRoomReservationId(roomReservationId: Id): Promise<Session | null>;

  // 세션 상태 변경
  updateStatus(id: Id, status: string): Promise<void>;

  // 방 예약 연결
  linkRoomReservation(sessionId: Id, roomReservationId: Id): Promise<void>;
  unlinkRoomReservation(sessionId: Id): Promise<void>;

  // 시간 충돌 체크
  checkTimeConflict(startsAt: string, endsAt: string, excludeSessionId?: Id): Promise<Session[]>;

  // 리마인더 대상 세션
  findForReminder(beforeMinutes: number): Promise<SessionWithProgramAndVenue[]>;

  // 존재 여부 확인
  exists(id: Id): Promise<boolean>;

  // 통계
  count(): Promise<number>;
  countByProgram(programId: Id): Promise<number>;
  countByStatus(status: string): Promise<number>;
  countUpcoming(): Promise<number>;
}
