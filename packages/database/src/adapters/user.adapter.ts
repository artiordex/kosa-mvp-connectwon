/**
 * Description : program-adapter.ts - 📌 프로그램 저장소 어댑터 (Prisma/Drizzle 구현)
 * Author : Shiwoo Min
 * Date : 2025-09-28
 */
import type {
  CreateProgram,
  CursorPaginatedResponse,
  CursorPaginationQuery,
  Id,
  ISODateTime,
  Program,
  ProgramWithCreator,
  UpdateProgram,
  User,
} from '../../../core/src/core-types.js';
import type { ProgramRepository } from '../../../core/src/ports/program.port.js';

/**
 * @description 데이터베이스 연결 인터페이스 (추상화)
 */
interface DatabaseConnection {
  programs: any;
  users: any;
}

/**
 * @description 프로그램 저장소 어댑터 구현
 */
export class ProgramAdapter implements ProgramRepository {
  constructor(private readonly db: DatabaseConnection) {}

  /**
   * @description ID로 프로그램 조회
   */
  async findById(id: Id): Promise<Program | null> {
    try {
      const result = await this.db.programs.findUnique({
        where: { id },
      });

      return result ? this.mapToProgram(result) : null;
    } catch (error) {
      throw new Error(`Failed to find program by id: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * @description 작성자 포함 프로그램 조회
   */
  async findByIdWithCreator(id: Id): Promise<ProgramWithCreator | null> {
    try {
      const result = await this.db.programs.findUnique({
        where: { id },
        include: { creator: true },
      });

      return result ? this.mapToProgramWithCreator(result) : null;
    } catch (error) {
      throw new Error(`Failed to find program with creator: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * @description 프로그램 생성
   */
  async create(program: CreateProgram): Promise<Program> {
    try {
      const now = new Date().toISOString() as ISODateTime;
      const result = await this.db.programs.create({
        data: {
          title: program.title,
          description: program.description,
          type: program.type,
          isActive: program.isActive ?? true,
          createdByUserId: program.createdByUserId,
          createdAt: now,
          updatedAt: now,
        },
      });

      return this.mapToProgram(result);
    } catch (error) {
      throw new Error(`Failed to create program: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * @description 프로그램 업데이트
   */
  async update(id: Id, updates: UpdateProgram): Promise<Program> {
    try {
      const now = new Date().toISOString() as ISODateTime;
      const result = await this.db.programs.update({
        where: { id },
        data: {
          ...updates,
          updatedAt: now,
        },
      });

      return this.mapToProgram(result);
    } catch (error) {
      throw new Error(`Failed to update program: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * @description 프로그램 삭제
   */
  async delete(id: Id): Promise<void> {
    try {
      await this.db.programs.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Failed to delete program: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * @description 페이징 목록 조회
   */
  async findMany(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Program>> {
    try {
      const limit = query.limit ?? 20;
      const where = query.cursor ? { id: { gt: query.cursor } } : {};

      const [items, total] = await Promise.all([
        this.db.programs.findMany({
          where,
          take: limit + 1, // +1 for nextCursor check
          orderBy: { id: 'asc' },
        }),
        this.db.programs.count(),
      ]);

      const hasMore = items.length > limit;
      const resultItems = hasMore ? items.slice(0, -1) : items;
      const nextCursor = hasMore ? items[items.length - 2]?.id : null;

      return {
        items: resultItems.map(this.mapToProgram),
        nextCursor,
        total,
      };
    } catch (error) {
      throw new Error(`Failed to find programs: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * @description 작성자 포함 페이징 목록
   */
  async findManyWithCreator(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<ProgramWithCreator>> {
    try {
      const limit = query.limit ?? 20;
      const where = query.cursor ? { id: { gt: query.cursor } } : {};

      const [items, total] = await Promise.all([
        this.db.programs.findMany({
          where,
          include: { creator: true },
          take: limit + 1,
          orderBy: { id: 'asc' },
        }),
        this.db.programs.count(),
      ]);

      const hasMore = items.length > limit;
      const resultItems = hasMore ? items.slice(0, -1) : items;
      const nextCursor = hasMore ? items[items.length - 2]?.id : null;

      return {
        items: resultItems.map(this.mapToProgramWithCreator),
        nextCursor,
        total,
      };
    } catch (error) {
      throw new Error(`Failed to find programs with creator: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * @description 작성자별 프로그램 목록
   */
  async findByCreatorId(creatorId: Id, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Program>> {
    try {
      const limit = query.limit ?? 20;
      const where = {
        createdByUserId: creatorId,
        ...(query.cursor ? { id: { gt: query.cursor } } : {}),
      };

      const [items, total] = await Promise.all([
        this.db.programs.findMany({
          where,
          take: limit + 1,
          orderBy: { id: 'asc' },
        }),
        this.db.programs.count({ where: { createdByUserId: creatorId } }),
      ]);

      const hasMore = items.length > limit;
      const resultItems = hasMore ? items.slice(0, -1) : items;
      const nextCursor = hasMore ? items[items.length - 2]?.id : null;

      return {
        items: resultItems.map(this.mapToProgram),
        nextCursor,
        total,
      };
    } catch (error) {
      throw new Error(`Failed to find programs by creator: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * @description 활성 프로그램 목록
   */
  async findActive(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Program>> {
    try {
      const limit = query.limit ?? 20;
      const where = {
        isActive: true,
        ...(query.cursor ? { id: { gt: query.cursor } } : {}),
      };

      const [items, total] = await Promise.all([
        this.db.programs.findMany({
          where,
          take: limit + 1,
          orderBy: { id: 'asc' },
        }),
        this.db.programs.count({ where: { isActive: true } }),
      ]);

      const hasMore = items.length > limit;
      const resultItems = hasMore ? items.slice(0, -1) : items;
      const nextCursor = hasMore ? items[items.length - 2]?.id : null;

      return {
        items: resultItems.map(this.mapToProgram),
        nextCursor,
        total,
      };
    } catch (error) {
      throw new Error(`Failed to find active programs: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * @description 타입별 프로그램 목록
   */
  async findByType(type: string, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Program>> {
    try {
      const limit = query.limit ?? 20;
      const where = {
        type,
        ...(query.cursor ? { id: { gt: query.cursor } } : {}),
      };

      const [items, total] = await Promise.all([
        this.db.programs.findMany({
          where,
          take: limit + 1,
          orderBy: { id: 'asc' },
        }),
        this.db.programs.count({ where: { type } }),
      ]);

      const hasMore = items.length > limit;
      const resultItems = hasMore ? items.slice(0, -1) : items;
      const nextCursor = hasMore ? items[items.length - 2]?.id : null;

      return {
        items: resultItems.map(this.mapToProgram),
        nextCursor,
        total,
      };
    } catch (error) {
      throw new Error(`Failed to find programs by type: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * @description 텍스트 검색
   */
  async search(term: string, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Program>> {
    try {
      const limit = query.limit ?? 20;
      const searchWhere = {
        OR: [{ title: { contains: term, mode: 'insensitive' } }, { description: { contains: term, mode: 'insensitive' } }],
      };
      const where = {
        ...searchWhere,
        ...(query.cursor ? { id: { gt: query.cursor } } : {}),
      };

      const [items, total] = await Promise.all([
        this.db.programs.findMany({
          where,
          take: limit + 1,
          orderBy: { id: 'asc' },
        }),
        this.db.programs.count({ where: searchWhere }),
      ]);

      const hasMore = items.length > limit;
      const resultItems = hasMore ? items.slice(0, -1) : items;
      const nextCursor = hasMore ? items[items.length - 2]?.id : null;

      return {
        items: resultItems.map(this.mapToProgram),
        nextCursor,
        total,
      };
    } catch (error) {
      throw new Error(`Failed to search programs: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * @description 태그 기반 검색
   */
  async searchByTags(tags: string[], query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Program>> {
    try {
      const limit = query.limit ?? 20;
      const searchWhere = {
        aiSummaryTags: {
          hasSome: tags,
        },
      };
      const where = {
        ...searchWhere,
        ...(query.cursor ? { id: { gt: query.cursor } } : {}),
      };

      const [items, total] = await Promise.all([
        this.db.programs.findMany({
          where,
          take: limit + 1,
          orderBy: { id: 'asc' },
        }),
        this.db.programs.count({ where: searchWhere }),
      ]);

      const hasMore = items.length > limit;
      const resultItems = hasMore ? items.slice(0, -1) : items;
      const nextCursor = hasMore ? items[items.length - 2]?.id : null;

      return {
        items: resultItems.map(this.mapToProgram),
        nextCursor,
        total,
      };
    } catch (error) {
      throw new Error(`Failed to search programs by tags: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * @description 프로그램 활성화
   */
  async activate(id: Id): Promise<void> {
    try {
      await this.db.programs.update({
        where: { id },
        data: { isActive: true, updatedAt: new Date().toISOString() },
      });
    } catch (error) {
      throw new Error(`Failed to activate program: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * @description 프로그램 비활성화
   */
  async deactivate(id: Id): Promise<void> {
    try {
      await this.db.programs.update({
        where: { id },
        data: { isActive: false, updatedAt: new Date().toISOString() },
      });
    } catch (error) {
      throw new Error(`Failed to deactivate program: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * @description AI 요약 태그 업데이트
   */
  async updateAISummaryTags(id: Id, tags: string[]): Promise<void> {
    try {
      await this.db.programs.update({
        where: { id },
        data: {
          aiSummaryTags: tags,
          updatedAt: new Date().toISOString(),
        },
      });
    } catch (error) {
      throw new Error(`Failed to update AI summary tags: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * @description 프로그램 존재 여부 확인
   */
  async exists(id: Id): Promise<boolean> {
    try {
      const count = await this.db.programs.count({
        where: { id },
      });
      return count > 0;
    } catch (error) {
      throw new Error(`Failed to check program existence: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * @description 전체 프로그램 수
   */
  async count(): Promise<number> {
    try {
      return await this.db.programs.count();
    } catch (error) {
      throw new Error(`Failed to count programs: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * @description 작성자별 프로그램 수
   */
  async countByCreator(creatorId: Id): Promise<number> {
    try {
      return await this.db.programs.count({
        where: { createdByUserId: creatorId },
      });
    } catch (error) {
      throw new Error(`Failed to count programs by creator: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * @description 타입별 프로그램 수
   */
  async countByType(type: string): Promise<number> {
    try {
      return await this.db.programs.count({
        where: { type },
      });
    } catch (error) {
      throw new Error(`Failed to count programs by type: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * @description 활성 프로그램 수
   */
  async countActive(): Promise<number> {
    try {
      return await this.db.programs.count({
        where: { isActive: true },
      });
    } catch (error) {
      throw new Error(`Failed to count active programs: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * @description 데이터베이스 결과를 Program 타입으로 매핑
   */
  private mapToProgram(dbProgram: any): Program {
    return {
      id: dbProgram.id,
      title: dbProgram.title,
      description: dbProgram.description,
      type: dbProgram.type,
      isActive: dbProgram.isActive,
      createdByUserId: dbProgram.createdByUserId,
      aiSummary: dbProgram.aiSummary,
      aiSummaryTags: dbProgram.aiSummaryTags || [],
      createdAt: dbProgram.createdAt,
      updatedAt: dbProgram.updatedAt,
    };
  }

  /**
   * @description 데이터베이스 결과를 ProgramWithCreator 타입으로 매핑
   */
  private mapToProgramWithCreator(dbProgram: any): ProgramWithCreator {
    const program = this.mapToProgram(dbProgram);
    const creator: User = {
      id: dbProgram.creator.id,
      email: dbProgram.creator.email,
      name: dbProgram.creator.name,
      googleSub: dbProgram.creator.googleSub,
      roleFlags: dbProgram.creator.roleFlags,
      createdAt: dbProgram.creator.createdAt,
      updatedAt: dbProgram.creator.updatedAt,
      lastLoginAt: dbProgram.creator.lastLoginAt,
    };

    return {
      ...program,
      creator,
    };
  }
}

/**
 * @description 팩토리 함수 - Prisma 클라이언트용
 */
export function createProgramAdapter(prismaClient: any): ProgramRepository {
  return new ProgramAdapter(prismaClient);
}

/**
 * @description 메모리 기반 프로그램 어댑터 (테스트용)
 */
export class InMemoryProgramAdapter implements ProgramRepository {
  private programs: Program[] = [];
  private users: User[] = [];
  private idCounter = 1;

  constructor(initialPrograms: Program[] = [], initialUsers: User[] = []) {
    this.programs = [...initialPrograms];
    this.users = [...initialUsers];
  }

  async findById(id: Id): Promise<Program | null> {
    return this.programs.find(p => p.id === id) || null;
  }

  async findByIdWithCreator(id: Id): Promise<ProgramWithCreator | null> {
    const program = await this.findById(id);
    if (!program) return null;

    const creator = this.users.find(u => u.id === program.createdByUserId);
    if (!creator) return null;

    return { ...program, creator };
  }

  async create(program: CreateProgram): Promise<Program> {
    const now = new Date().toISOString() as ISODateTime;
    const newProgram: Program = {
      id: `program_${this.idCounter++}`,
      title: program.title,
      description: program.description,
      type: program.type,
      isActive: program.isActive ?? true,
      createdByUserId: program.createdByUserId,
      aiSummary: undefined,
      aiSummaryTags: [],
      createdAt: now,
      updatedAt: now,
    };

    this.programs.push(newProgram);
    return newProgram;
  }

  async update(id: Id, updates: UpdateProgram): Promise<Program> {
    const index = this.programs.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error(`Program with id ${id} not found`);
    }

    const updated = {
      ...this.programs[index],
      ...updates,
      updatedAt: new Date().toISOString() as ISODateTime,
    };

    this.programs[index] = updated;
    return updated;
  }

  async delete(id: Id): Promise<void> {
    const index = this.programs.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error(`Program with id ${id} not found`);
    }
    this.programs.splice(index, 1);
  }

  async findMany(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Program>> {
    const limit = query.limit ?? 20;
    let filtered = this.programs;

    if (query.cursor) {
      const cursorIndex = filtered.findIndex(p => p.id === query.cursor);
      if (cursorIndex !== -1) {
        filtered = filtered.slice(cursorIndex + 1);
      }
    }

    const items = filtered.slice(0, limit);
    const nextCursor = items.length === limit && filtered.length > limit ? items[items.length - 1].id : null;

    return {
      items,
      nextCursor,
      total: this.programs.length,
    };
  }

  async findManyWithCreator(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<ProgramWithCreator>> {
    const response = await this.findMany(query);
    const itemsWithCreator: ProgramWithCreator[] = [];

    for (const program of response.items) {
      const creator = this.users.find(u => u.id === program.createdByUserId);
      if (creator) {
        itemsWithCreator.push({ ...program, creator });
      }
    }

    return {
      ...response,
      items: itemsWithCreator,
    };
  }

  async findByCreatorId(creatorId: Id, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Program>> {
    const filtered = this.programs.filter(p => p.createdByUserId === creatorId);
    const limit = query.limit ?? 20;

    let startIndex = 0;
    if (query.cursor) {
      const cursorIndex = filtered.findIndex(p => p.id === query.cursor);
      if (cursorIndex !== -1) {
        startIndex = cursorIndex + 1;
      }
    }

    const items = filtered.slice(startIndex, startIndex + limit);
    const nextCursor = items.length === limit && filtered.length > startIndex + limit ? items[items.length - 1].id : null;

    return {
      items,
      nextCursor,
      total: filtered.length,
    };
  }

  async findActive(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Program>> {
    const filtered = this.programs.filter(p => p.isActive);
    const limit = query.limit ?? 20;

    let startIndex = 0;
    if (query.cursor) {
      const cursorIndex = filtered.findIndex(p => p.id === query.cursor);
      if (cursorIndex !== -1) {
        startIndex = cursorIndex + 1;
      }
    }

    const items = filtered.slice(startIndex, startIndex + limit);
    const nextCursor = items.length === limit && filtered.length > startIndex + limit ? items[items.length - 1].id : null;

    return {
      items,
      nextCursor,
      total: filtered.length,
    };
  }

  async findByType(type: string, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Program>> {
    const filtered = this.programs.filter(p => p.type === type);
    const limit = query.limit ?? 20;

    let startIndex = 0;
    if (query.cursor) {
      const cursorIndex = filtered.findIndex(p => p.id === query.cursor);
      if (cursorIndex !== -1) {
        startIndex = cursorIndex + 1;
      }
    }

    const items = filtered.slice(startIndex, startIndex + limit);
    const nextCursor = items.length === limit && filtered.length > startIndex + limit ? items[items.length - 1].id : null;

    return {
      items,
      nextCursor,
      total: filtered.length,
    };
  }

  async search(term: string, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Program>> {
    const lowerTerm = term.toLowerCase();
    const filtered = this.programs.filter(
      p => p.title.toLowerCase().includes(lowerTerm) || (p.description && p.description.toLowerCase().includes(lowerTerm)),
    );

    const limit = query.limit ?? 20;
    let startIndex = 0;
    if (query.cursor) {
      const cursorIndex = filtered.findIndex(p => p.id === query.cursor);
      if (cursorIndex !== -1) {
        startIndex = cursorIndex + 1;
      }
    }

    const items = filtered.slice(startIndex, startIndex + limit);
    const nextCursor = items.length === limit && filtered.length > startIndex + limit ? items[items.length - 1].id : null;

    return {
      items,
      nextCursor,
      total: filtered.length,
    };
  }

  async searchByTags(tags: string[], query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Program>> {
    const filtered = this.programs.filter(p => p.aiSummaryTags && p.aiSummaryTags.some(tag => tags.includes(tag)));

    const limit = query.limit ?? 20;
    let startIndex = 0;
    if (query.cursor) {
      const cursorIndex = filtered.findIndex(p => p.id === query.cursor);
      if (cursorIndex !== -1) {
        startIndex = cursorIndex + 1;
      }
    }

    const items = filtered.slice(startIndex, startIndex + limit);
    const nextCursor = items.length === limit && filtered.length > startIndex + limit ? items[items.length - 1].id : null;

    return {
      items,
      nextCursor,
      total: filtered.length,
    };
  }

  async activate(id: Id): Promise<void> {
    await this.update(id, { isActive: true });
  }

  async deactivate(id: Id): Promise<void> {
    await this.update(id, { isActive: false });
  }

  async updateAISummaryTags(id: Id, tags: string[]): Promise<void> {
    await this.update(id, { aiSummaryTags: tags });
  }

  async exists(id: Id): Promise<boolean> {
    return this.programs.some(p => p.id === id);
  }

  async count(): Promise<number> {
    return this.programs.length;
  }

  async countByCreator(creatorId: Id): Promise<number> {
    return this.programs.filter(p => p.createdByUserId === creatorId).length;
  }

  async countByType(type: string): Promise<number> {
    return this.programs.filter(p => p.type === type).length;
  }

  async countActive(): Promise<number> {
    return this.programs.filter(p => p.isActive).length;
  }
}
