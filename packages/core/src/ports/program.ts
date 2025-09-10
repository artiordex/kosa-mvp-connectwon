/**
 * Description : ports/program-repository.ts - 📌 프로그램 저장소 포트 인터페이스
 * Author      : Shiwoo Min
 * Date        : 2025-09-10
 */
import type {
  CreateProgram,
  CursorPaginatedResponse,
  CursorPaginationQuery,
  Id,
  Program,
  ProgramWithCreator,
  UpdateProgram,
} from '../../core-types.js';

// ============== 프로그램 저장소 포트 ==============

export interface ProgramRepository {
  // 기본 CRUD 작업
  findById(id: Id): Promise<Program | null>;
  findByIdWithCreator(id: Id): Promise<ProgramWithCreator | null>;
  create(program: CreateProgram): Promise<Program>;
  update(id: Id, updates: UpdateProgram): Promise<Program>;
  delete(id: Id): Promise<void>;

  // 목록 조회
  findMany(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Program>>;
  findManyWithCreator(
    query: CursorPaginationQuery,
  ): Promise<CursorPaginatedResponse<ProgramWithCreator>>;

  // 사용자별 프로그램
  findByCreatorId(
    creatorId: Id,
    query: CursorPaginationQuery,
  ): Promise<CursorPaginatedResponse<Program>>;

  // 활성 프로그램
  findActive(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Program>>;

  // 타입별 프로그램
  findByType(type: string, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Program>>;

  // 검색
  search(term: string, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Program>>;
  searchByTags(
    tags: string[],
    query: CursorPaginationQuery,
  ): Promise<CursorPaginatedResponse<Program>>;

  // 상태 변경
  activate(id: Id): Promise<void>;
  deactivate(id: Id): Promise<void>;

  // AI 태그 업데이트
  updateAISummaryTags(id: Id, tags: string[]): Promise<void>;

  // 존재 여부 확인
  exists(id: Id): Promise<boolean>;

  // 통계
  count(): Promise<number>;
  countByCreator(creatorId: Id): Promise<number>;
  countByType(type: string): Promise<number>;
  countActive(): Promise<number>;
}
