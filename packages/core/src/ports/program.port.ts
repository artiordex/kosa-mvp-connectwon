/**
 * Description : program.port.ts - 📌 프로그램 저장소 포트 인터페이스
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import type { CreateProgram, CursorPaginatedResponse, CursorPaginationQuery, Id, Program, ProgramWithCreator, UpdateProgram } from '../core-types.js';

/**
 * @description 프로그램 저장소 포트
 */
export interface ProgramRepository {
  /** @description ID로 조회 */
  findById(id: Id): Promise<Program | null>;

  /** @description 작성자 조인 포함 조회 */
  findByIdWithCreator(id: Id): Promise<ProgramWithCreator | null>;

  /** @description 생성 */
  create(program: CreateProgram): Promise<Program>;

  /** @description 부분 업데이트 */
  update(id: Id, updates: UpdateProgram): Promise<Program>;

  /** @description 삭제 */
  delete(id: Id): Promise<void>;

  /** @description 페이징 목록 */
  findMany(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Program>>;

  /** @description 페이징 목록(작성자 조인) */
  findManyWithCreator(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<ProgramWithCreator>>;

  /** @description 작성자별 목록 */
  findByCreatorId(creatorId: Id, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Program>>;

  /** @description 활성 프로그램 목록 */
  findActive(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Program>>;

  /** @description 타입별 목록 */
  findByType(type: string, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Program>>;

  /** @description 텍스트 검색 */
  search(term: string, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Program>>;

  /** @description 태그 기반 검색 */
  searchByTags(tags: string[], query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Program>>;

  /** @description 활성화 */
  activate(id: Id): Promise<void>;

  /** @description 비활성화 */
  deactivate(id: Id): Promise<void>;

  /** @description AI 태그 업데이트 */
  updateAISummaryTags(id: Id, tags: string[]): Promise<void>;

  /** @description 존재 여부 */
  exists(id: Id): Promise<boolean>;

  /** @description 통계 */
  count(): Promise<number>;
  countByCreator(creatorId: Id): Promise<number>;
  countByType(type: string): Promise<number>;
  countActive(): Promise<number>;
}
