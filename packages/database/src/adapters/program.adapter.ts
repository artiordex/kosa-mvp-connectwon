/**
 * Description : program.adapter.ts - 📌 Prisma 기반 프로그램 저장소 어댑터
 * Author : Shiwoo Min
 * Date : 2025-09-29
 */
import type { CreateProgram, CursorPaginatedResponse, CursorPaginationQuery, Id, Program } from '@connectwon/core/core-types';
import type { ProgramRepository } from '@connectwon/core/ports/program.port.js';
import { PrismaClient } from '@prisma/client';

/**
 * @description Prisma 기반 Program 저장소 구현체
 */
export class PrismaProgramRepository implements ProgramRepository {
  constructor(private readonly prisma: PrismaClient) {}

  /** ID로 조회 */
  async findById(id: Id): Promise<Program | null> {
    const program = await this.prisma.program.findUnique({
      where: { id: BigInt(id) },
    });
    return program ? this.toDomain(program) : null;
  }

  /** 생성 */
  async create(program: CreateProgram): Promise<Program> {
    const created = await this.prisma.program.create({
      data: {
        title: program.title,
        description: program.description ?? null,
        createdByUserId: program.createdByUserId ? BigInt(program.createdByUserId) : null,
        category: (program as any).category ?? null,
        meta: {},
      },
    });
    return this.toDomain(created);
  }

  /** 부분 업데이트 */
  async update(id: Id, updates: Partial<CreateProgram>): Promise<Program> {
    const updated = await this.prisma.program.update({
      where: { id: BigInt(id) },
      data: {
        ...(updates.title !== undefined && { title: updates.title }),
        ...(updates.description !== undefined && {
          description: updates.description ?? null,
        }),
        ...(updates.createdByUserId !== undefined && {
          createdByUserId: updates.createdByUserId ? BigInt(updates.createdByUserId) : null,
        }),
        ...((updates as any).category !== undefined && {
          category: (updates as any).category ?? null,
        }),
        updatedAt: new Date(),
      },
    });
    return this.toDomain(updated);
  }

  /** 삭제 */
  async delete(id: Id): Promise<void> {
    await this.prisma.program.delete({
      where: { id: BigInt(id) },
    });
  }

  /** 페이징 목록 */
  async findMany(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Program>> {
    const limit = query.limit ?? 10;
    const cursorObj = query.cursor ? { id: BigInt(query.cursor) } : undefined;

    const items = await this.prisma.program.findMany({
      take: limit,
      skip: cursorObj ? 1 : 0,
      ...(cursorObj && { cursor: cursorObj }),
      orderBy: { createdAt: 'desc' },
    });

    return {
      items: items.map(this.toDomain),
      nextCursor: items.length === limit ? String(items[items.length - 1]!.id) : null,
    };
  }

  /** 작성자별 목록 */
  async findByCreatorId(creatorId: Id, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Program>> {
    const limit = query.limit ?? 10;
    const cursorObj = query.cursor ? { id: BigInt(query.cursor) } : undefined;

    const items = await this.prisma.program.findMany({
      where: { createdByUserId: BigInt(creatorId) },
      take: limit,
      skip: cursorObj ? 1 : 0,
      ...(cursorObj && { cursor: cursorObj }),
      orderBy: { createdAt: 'desc' },
    });

    return {
      items: items.map(this.toDomain),
      nextCursor: items.length === limit ? String(items[items.length - 1]!.id) : null,
    };
  }

  /** 카테고리별 목록 */
  async findByCategory(category: string, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Program>> {
    const limit = query.limit ?? 10;
    const cursorObj = query.cursor ? { id: BigInt(query.cursor) } : undefined;

    const items = await this.prisma.program.findMany({
      where: { category },
      take: limit,
      skip: cursorObj ? 1 : 0,
      ...(cursorObj && { cursor: cursorObj }),
      orderBy: { createdAt: 'desc' },
    });

    return {
      items: items.map(this.toDomain),
      nextCursor: items.length === limit ? String(items[items.length - 1]!.id) : null,
    };
  }

  /** 텍스트 검색 */
  async search(term: string, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Program>> {
    const limit = query.limit ?? 10;
    const cursorObj = query.cursor ? { id: BigInt(query.cursor) } : undefined;

    const items = await this.prisma.program.findMany({
      where: {
        OR: [{ title: { contains: term, mode: 'insensitive' } }, { description: { contains: term, mode: 'insensitive' } }],
      },
      take: limit,
      skip: cursorObj ? 1 : 0,
      ...(cursorObj && { cursor: cursorObj }),
      orderBy: { createdAt: 'desc' },
    });

    return {
      items: items.map(this.toDomain),
      nextCursor: items.length === limit ? String(items[items.length - 1]!.id) : null,
    };
  }

  /** 존재 여부 */
  async exists(id: Id): Promise<boolean> {
    const count = await this.prisma.program.count({
      where: { id: BigInt(id) },
    });
    return count > 0;
  }

  /** 통계 */
  async count(): Promise<number> {
    return this.prisma.program.count();
  }

  async countByCreator(creatorId: Id): Promise<number> {
    return this.prisma.program.count({
      where: { createdByUserId: BigInt(creatorId) },
    });
  }

  async countByCategory(category: string): Promise<number> {
    return this.prisma.program.count({
      where: { category },
    });
  }

  /** Prisma → Domain 변환 */
  private toDomain(db: any): Program {
    return {
      id: String(db.id),
      title: db.title,
      description: db.description ?? undefined,
      createdByUserId: db.createdByUserId ? String(db.createdByUserId) : '',
      createdAt: db.createdAt.toISOString(),
      updatedAt: db.updatedAt.toISOString(),
      meta: db.meta ?? {},
    };
  }
}
