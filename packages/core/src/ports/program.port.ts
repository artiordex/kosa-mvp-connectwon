/**
 * Description : program.port.ts - 📌 프로그램 저장소 포트 인터페이스
 * Author : Shiwoo Min
 * Date : 2025-09-29
 */
import type { CreateProgram, CursorPaginatedResponse, CursorPaginationQuery, Id, Program } from '@connectwon/core/core-types';

/**
 * @description 프로그램 저장소 포트
 */
export interface ProgramRepository {
  /** @description ID로 조회 */
  findById(id: Id): Promise<Program | null>;

  /** @description 생성 */
  create(program: CreateProgram): Promise<Program>;

  /** @description 부분 업데이트 */
  update(id: Id, updates: Partial<CreateProgram>): Promise<Program>;

  /** @description 삭제 */
  delete(id: Id): Promise<void>;

  /** @description 페이징 목록 */
  findMany(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Program>>;

  /** @description 작성자별 목록 */
  findByCreatorId(creatorId: Id, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Program>>;

  /** @description 카테고리별 목록 */
  findByCategory(category: string, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Program>>;

  /** @description 텍스트 검색 (title, description) */
  search(term: string, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Program>>;

  /** @description 존재 여부 */
  exists(id: Id): Promise<boolean>;

  /** @description 통계 */
  count(): Promise<number>;
  countByCreator(creatorId: Id): Promise<number>;
  countByCategory(category: string): Promise<number>;
}
