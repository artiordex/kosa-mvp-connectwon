/**
 * Description : program-prisma-adapter.ts - 📌 프로그램 저장소 어댑터 (Prisma/Postgres 기반)
 * Author : Shiwoo Min
 * Date : 2025-09-28
 */
import { PrismaClient } from '@prisma/client';

import type {
  CreateProgram,
  CursorPaginatedResponse,
  CursorPaginationQuery,
  Id,
  Program,
  ProgramWithCreator,
  UpdateProgram,
} from '../../../core/src/core-types.js';
import type { ProgramRepository } from '../../../core/src/ports/program.port.js';

import type {
  CreateProgram,
  CursorPaginatedResponse,
  CursorPaginationQuery,
  Id,
  Program,
  ProgramWithCreator,
  UpdateProgram,
} from '../../../core/src/core-types.js';
import type { ProgramRepository } from '../../../core/src/ports/program.port.js';

/**
 * @class ProgramPrismaAdapter
 * @description
 * Prisma(Postgres) 기반의 Program 저장소 어댑터 구현체.
 * 운영 환경에서 실제 DB와 연동하여 프로그램 데이터를 관리한다.
 *
 * @implements {ProgramRepository}
 */
export class ProgramPrismaAdapter implements ProgramRepository {
  constructor(private readonly prisma: PrismaClient) {}

  /**
   * ID로 프로그램 조회
   * @param {Id} id 조회할 프로그램 ID
   * @returns {Promise<Program | null>} 프로그램 객체 또는 null
   */
  async findById(id: Id): Promise<Program | null> {
    return this.prisma.program.findUnique({ where: { id } });
  }

  /**
   * 새로운 프로그램 생성
   * @param {CreateProgram} program 생성할 프로그램 데이터
   * @returns {Promise<Program>} 생성된 프로그램 객체
   */
  async create(program: CreateProgram): Promise<Program> {
    return this.prisma.program.create({
      data: {
        title: program.title,
        type: program.type,
        isActive: program.isActive ?? true,
        createdByUserId: program.createdByUserId,
        description: program.description,
      },
    });
  }

  /**
   * 프로그램 정보 업데이트
   * @param {Id} id 업데이트할 프로그램 ID
   * @param {UpdateProgram} updates 업데이트할 필드들
   * @returns {Promise<Program>} 업데이트된 프로그램 객체
   * @throws {Error} 해당 ID의 프로그램이 존재하지 않는 경우
   */
  async update(id: Id, updates: UpdateProgram): Promise<Program> {
    return this.prisma.program.update({
      where: { id },
      data: {
        title: updates.title,
        type: updates.type,
        isActive: updates.isActive,
        description: updates.description,
        aiSummary: updates.aiSummary,
        aiSummaryTags: updates.aiSummaryTags,
        updatedAt: new Date(),
      },
    });
  }

  /**
   * 프로그램 삭제
   * @param {Id} id 삭제할 프로그램 ID
   * @returns {Promise<void>}
   */
  async delete(id: Id): Promise<void> {
    await this.prisma.program.delete({ where: { id } });
  }

  /**
   * 프로그램 목록 조회 (페이지네이션)
   * @param {CursorPaginationQuery} query 페이지네이션 옵션
   * @returns {Promise<CursorPaginatedResponse<Program>>} 프로그램 목록
   */
  async findMany(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Program>> {
    const limit = query.limit ?? 20;
    const items = await this.prisma.program.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
    const total = await this.prisma.program.count();
    return { items, nextCursor: items.length === limit ? items[items.length - 1]?.id || null : null, total };
  }

  /**
   * ID로 프로그램과 작성자 정보 함께 조회
   * @param {Id} id 조회할 프로그램 ID
   * @returns {Promise<ProgramWithCreator | null>} 작성자 포함 프로그램 객체
   */
  async findByIdWithCreator(id: Id): Promise<ProgramWithCreator | null> {
    return this.prisma.program.findUnique({
      where: { id },
      include: { creator: true }, // Prisma schema에 relation 필요
    }) as unknown as ProgramWithCreator | null;
  }

  /**
   * 프로그램 목록과 작성자 정보 함께 조회
   * @param {CursorPaginationQuery} query 페이지네이션 옵션
   * @returns {Promise<CursorPaginatedResponse<ProgramWithCreator>>} 작성자 포함 프로그램 목록
   */
  async findManyWithCreator(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<ProgramWithCreator>> {
    const limit = query.limit ?? 20;
    const items = await this.prisma.program.findMany({
      take: limit,
      include: { creator: true },
      orderBy: { createdAt: 'desc' },
    });
    const total = await this.prisma.program.count();
    return { items: items as ProgramWithCreator[], nextCursor: items.length === limit ? items[items.length - 1]?.id || null : null, total };
  }

  /**
   * 특정 작성자의 프로그램 목록 조회
   * @param {Id} creatorId 작성자 ID
   * @param {CursorPaginationQuery} query 페이지네이션 옵션
   */
  async findByCreatorId(creatorId: Id, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Program>> {
    const limit = query.limit ?? 20;
    const items = await this.prisma.program.findMany({
      where: { createdByUserId: creatorId },
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
    const total = await this.prisma.program.count({ where: { createdByUserId: creatorId } });
    return { items, nextCursor: items.length === limit ? items[items.length - 1]?.id || null : null, total };
  }

  /**
   * 활성 프로그램 목록 조회
   */
  async findActive(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Program>> {
    const limit = query.limit ?? 20;
    const items = await this.prisma.program.findMany({
      where: { isActive: true },
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
    const total = await this.prisma.program.count({ where: { isActive: true } });
    return { items, nextCursor: items.length === limit ? items[items.length - 1]?.id || null : null, total };
  }

  /**
   * 특정 타입의 프로그램 목록 조회
   */
  async findByType(type: string, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Program>> {
    const limit = query.limit ?? 20;
    const items = await this.prisma.program.findMany({
      where: { type },
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
    const total = await this.prisma.program.count({ where: { type } });
    return { items, nextCursor: items.length === limit ? items[items.length - 1]?.id || null : null, total };
  }

  /**
   * 제목/설명 텍스트 검색
   */
  async search(term: string, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Program>> {
    const limit = query.limit ?? 20;
    const items = await this.prisma.program.findMany({
      where: {
        OR: [{ title: { contains: term, mode: 'insensitive' } }, { description: { contains: term, mode: 'insensitive' } }],
      },
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
    const total = await this.prisma.program.count({
      where: {
        OR: [{ title: { contains: term, mode: 'insensitive' } }, { description: { contains: term, mode: 'insensitive' } }],
      },
    });
    return { items, nextCursor: items.length === limit ? items[items.length - 1]?.id || null : null, total };
  }

  /**
   * AI 태그 기반 검색
   */
  async searchByTags(tags: string[], query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Program>> {
    const limit = query.limit ?? 20;
    const items = await this.prisma.program.findMany({
      where: { aiSummaryTags: { hasSome: tags } },
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
    const total = await this.prisma.program.count({ where: { aiSummaryTags: { hasSome: tags } } });
    return { items, nextCursor: items.length === limit ? items[items.length - 1]?.id || null : null, total };
  }

  /** 프로그램 활성화 */
  async activate(id: Id): Promise<void> {
    await this.prisma.program.update({ where: { id }, data: { isActive: true } });
  }

  /** 프로그램 비활성화 */
  async deactivate(id: Id): Promise<void> {
    await this.prisma.program.update({ where: { id }, data: { isActive: false } });
  }

  /** AI 태그 업데이트 */
  async updateAISummaryTags(id: Id, tags: string[]): Promise<void> {
    await this.prisma.program.update({ where: { id }, data: { aiSummaryTags: tags } });
  }

  /** 프로그램 존재 여부 확인 */
  async exists(id: Id): Promise<boolean> {
    const count = await this.prisma.program.count({ where: { id } });
    return count > 0;
  }

  /** 전체 프로그램 개수 */
  async count(): Promise<number> {
    return this.prisma.program.count();
  }

  /** 특정 작성자의 프로그램 개수 */
  async countByCreator(creatorId: Id): Promise<number> {
    return this.prisma.program.count({ where: { createdByUserId: creatorId } });
  }

  /** 특정 타입의 프로그램 개수 */
  async countByType(type: string): Promise<number> {
    return this.prisma.program.count({ where: { type } });
  }

  /** 활성 프로그램 개수 */
  async countActive(): Promise<number> {
    return this.prisma.program.count({ where: { isActive: true } });
  }
}
