/**
 * Description : session.adapter.ts - 📌 세션 저장소 어댑터 구현체
 * Author : Shiwoo Min
 * Date : 2025-09-28
 */
import type { CreateSession, CursorPaginatedResponse, CursorPaginationQuery, Id, Session, SessionRepository, SessionWithParticipants, SessionWithProgram, SessionWithProgramAndVenue, UpdateSession } from '../../../core/src/ports/session.port.js';
import { prisma } from '../lib/prisma';

export class SessionRepositoryAdapter implements SessionRepository {
  /** ID로 세션 조회 */
  async findById(id: Id): Promise<Session | null> {
    return prisma.session.findUnique({ where: { id } });
  }

  /** 프로그램 포함 세션 조회 */
  async findByIdWithProgram(id: Id): Promise<SessionWithProgram | null> {
    return prisma.session.findUnique({
      where: { id },
      include: { program: true },
    });
  }

  /** 프로그램 + 장소 + 방 포함 상세 조회 */
  async findByIdWithDetails(id: Id): Promise<SessionWithProgramAndVenue | null> {
    return prisma.session.findUnique({
      where: { id },
      include: {
        program: true,
        venue: true,
        room: true,
      },
    });
  }

  /** 참가자 포함 세션 조회 */
  async findByIdWithParticipants(id: Id): Promise<SessionWithParticipants | null> {
    return prisma.session.findUnique({
      where: { id },
      include: { participants: true },
    });
  }

  /** 세션 생성 */
  async create(session: CreateSession): Promise<Session> {
    return prisma.session.create({ data: session });
  }

  /** 세션 업데이트 */
  async update(id: Id, updates: UpdateSession): Promise<Session> {
    return prisma.session.update({ where: { id }, data: updates });
  }

  /** 세션 삭제 */
  async delete(id: Id): Promise<void> {
    await prisma.session.delete({ where: { id } });
  }

  /** 페이징 목록 조회 */
  async findMany(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Session>> {
    const items = await prisma.session.findMany({
      take: query.limit,
      skip: query.cursor ? 1 : 0,
      cursor: query.cursor ? { id: query.cursor } : undefined,
      orderBy: { startsAt: 'asc' },
    });
    const nextCursor = items.length > 0 ? items[items.length - 1].id : null;
    return { items, nextCursor };
  }

  /** 프로그램 포함 페이징 목록 조회 */
  async findManyWithProgram(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<SessionWithProgram>> {
    const items = await prisma.session.findMany({
      take: query.limit,
      skip: query.cursor ? 1 : 0,
      cursor: query.cursor ? { id: query.cursor } : undefined,
      orderBy: { startsAt: 'asc' },
      include: { program: true },
    });
    const nextCursor = items.length > 0 ? items[items.length - 1].id : null;
    return { items, nextCursor };
  }

  /** 특정 프로그램의 세션 목록 조회 */
  async findByProgramId(programId: Id, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Session>> {
    const items = await prisma.session.findMany({
      where: { programId },
      take: query.limit,
      skip: query.cursor ? 1 : 0,
      cursor: query.cursor ? { id: query.cursor } : undefined,
      orderBy: { startsAt: 'asc' },
    });
    const nextCursor = items.length > 0 ? items[items.length - 1].id : null;
    return { items, nextCursor };
  }

  /** 상태별 세션 목록 조회 */
  async findByStatus(status: string, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Session>> {
    const items = await prisma.session.findMany({
      where: { status },
      take: query.limit,
      skip: query.cursor ? 1 : 0,
      cursor: query.cursor ? { id: query.cursor } : undefined,
      orderBy: { startsAt: 'asc' },
    });
    const nextCursor = items.length > 0 ? items[items.length - 1].id : null;
    return { items, nextCursor };
  }

  /** 날짜 범위 내 세션 목록 조회 */
  async findByDateRange(startDate: string, endDate: string, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Session>> {
    const items = await prisma.session.findMany({
      where: {
        startsAt: { gte: new Date(startDate) },
        endsAt: { lte: new Date(endDate) },
      },
      take: query.limit,
      skip: query.cursor ? 1 : 0,
      cursor: query.cursor ? { id: query.cursor } : undefined,
      orderBy: { startsAt: 'asc' },
    });
    const nextCursor = items.length > 0 ? items[items.length - 1].id : null;
    return { items, nextCursor };
  }

  /** 예정된 세션 목록 조회 */
  async findUpcoming(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<SessionWithProgram>> {
    const now = new Date();
    const items = await prisma.session.findMany({
      where: { startsAt: { gt: now } },
      take: query.limit,
      skip: query.cursor ? 1 : 0,
      cursor: query.cursor ? { id: query.cursor } : undefined,
      orderBy: { startsAt: 'asc' },
      include: { program: true },
    });
    const nextCursor = items.length > 0 ? items[items.length - 1].id : null;
    return { items, nextCursor };
  }

  /** 완료된 세션 목록 조회 */
  async findCompleted(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<SessionWithProgram>> {
    const now = new Date();
    const items = await prisma.session.findMany({
      where: { endsAt: { lt: now }, status: 'completed' },
      take: query.limit,
      skip: query.cursor ? 1 : 0,
      cursor: query.cursor ? { id: query.cursor } : undefined,
      orderBy: { endsAt: 'desc' },
      include: { program: true },
    });
    const nextCursor = items.length > 0 ? items[items.length - 1].id : null;
    return { items, nextCursor };
  }

  /** 취소된 세션 목록 조회 */
  async findCancelled(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<SessionWithProgram>> {
    const items = await prisma.session.findMany({
      where: { status: 'cancelled' },
      take: query.limit,
      skip: query.cursor ? 1 : 0,
      cursor: query.cursor ? { id: query.cursor } : undefined,
      orderBy: { startsAt: 'desc' },
      include: { program: true },
    });
    const nextCursor = items.length > 0 ? items[items.length - 1].id : null;
    return { items, nextCursor };
  }

  /** 방 예약 ID로 세션 조회 */
  async findByRoomReservationId(roomReservationId: Id): Promise<Session | null> {
    return prisma.session.findFirst({ where: { roomReservationId } });
  }

  /** 세션 상태 변경 */
  async updateStatus(id: Id, status: string): Promise<void> {
    await prisma.session.update({ where: { id }, data: { status } });
  }

  /** 방 예약 연결 */
  async linkRoomReservation(sessionId: Id, roomReservationId: Id): Promise<void> {
    await prisma.session.update({ where: { id: sessionId }, data: { roomReservationId } });
  }

  /** 방 예약 해제 */
  async unlinkRoomReservation(sessionId: Id): Promise<void> {
    await prisma.session.update({ where: { id: sessionId }, data: { roomReservationId: null } });
  }

  /** 시간 충돌 체크 */
  async checkTimeConflict(startsAt: string, endsAt: string, excludeSessionId?: Id): Promise<Session[]> {
    return prisma.session.findMany({
      where: {
        startsAt: { lt: new Date(endsAt) },
        endsAt: { gt: new Date(startsAt) },
        ...(excludeSessionId ? { NOT: { id: excludeSessionId } } : {}),
      },
    });
  }

  /** 리마인더 대상 세션 조회 */
  async findForReminder(beforeMinutes: number): Promise<SessionWithProgramAndVenue[]> {
    const now = new Date();
    const targetTime = new Date(now.getTime() + beforeMinutes * 60000);
    return prisma.session.findMany({
      where: {
        startsAt: {
          lte: targetTime,
          gte: now,
        },
      },
      include: {
        program: true,
        venue: true,
      },
    });
  }

/**
   * 세션 존재 여부 확인
   * @param id 세션 ID
   * @returns 존재 여부 (true/false)
   */
  async exists(id: Id): Promise<boolean> {
    const count = await prisma.session.count({ where: { id } });
    return count > 0;
  }

  /**
   * 전체 세션 수 조회
   * @returns 세션 총 개수
   */
  async count(): Promise<number> {
    return prisma.session.count();
  }

  /**
   * 특정 프로그램의 세션 수 조회
   * @param programId 프로그램 ID
   * @returns 해당 프로그램의 세션 개수
   */
  async countByProgram(programId: Id): Promise<number> {
    return prisma.session.count({ where: { programId } });
  }

  /**
   * 특정 상태의 세션 수 조회
   * @param status 세션 상태 (예: 'completed', 'cancelled')
   * @returns 해당 상태의 세션 개수
   */
  async countByStatus(status: string): Promise<number> {
    return prisma.session.count({ where: { status } });
  }

  /**
   * 예정된 세션 수 조회
   * @returns 현재 이후로 예정된 세션 개수
   */
  async countUpcoming(): Promise<number> {
    const now = new Date();
    return prisma.session.count({ where: { startsAt: { gt: now } } });
  }
}
