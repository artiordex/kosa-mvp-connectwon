/**
 * Description : user.ts - 📌 사용자 저장소 포트 인터페이스
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import type { CreateUser, CursorPaginatedResponse, CursorPaginationQuery, Id, UpdateUser, User } from '../../core-types.js';

/**
 * @description 사용자 저장소 포트
 */
export interface UserRepository {
  /**
   * @description ID로 사용자 조회
   * @param {Id} id 사용자 ID
   * @returns {Promise<User | null>}
   */
  findById(id: Id): Promise<User | null>;

  /**
   * @description 이메일로 사용자 조회
   * @param {string} email 이메일
   * @returns {Promise<User | null>}
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * @description Google Sub로 사용자 조회
   * @param {string} googleSub Google OAuth sub
   * @returns {Promise<User | null>}
   */
  findByGoogleSub(googleSub: string): Promise<User | null>;

  /**
   * @description 사용자 생성
   * @param {CreateUser} user 생성 데이터
   * @returns {Promise<User>}
   */
  create(user: CreateUser): Promise<User>;

  /**
   * @description 사용자 업데이트(부분 업데이트)
   * @param {Id} id 사용자 ID
   * @param {UpdateUser} updates 변경 필드
   * @returns {Promise<User>}
   */
  update(id: Id, updates: UpdateUser): Promise<User>;

  /**
   * @description 사용자 삭제(소프트/하드 삭제는 구현체 정책)
   * @param {Id} id 사용자 ID
   * @returns {Promise<boolean>} 삭제 성공 여부
   */
  delete(id: Id): Promise<boolean>;

  /**
   * @description 페이징 목록 조회
   * @param {CursorPaginationQuery} query 커서/limit 등
   * @returns {Promise<CursorPaginatedResponse<User>>}
   */
  findMany(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<User>>;

  /**
   * @description 텍스트 검색 + 정렬/옵션
   * @param {string} term 검색어
   * @param {CursorPaginationQuery & {orderBy?: 'createdAt'|'name'|'email'; orderDir?: 'asc'|'desc'}} query 페이징/정렬
   * @returns {Promise<CursorPaginatedResponse<User>>}
   */
  search(
    term: string,
    query: CursorPaginationQuery & {
      orderBy?: 'createdAt' | 'name' | 'email';
      orderDir?: 'asc' | 'desc';
    },
  ): Promise<CursorPaginatedResponse<User>>;

  /**
   * @description 역할 플래그로 조회
   * @param {number} roleFlags 역할 비트마스크
   * @param {CursorPaginationQuery} query 페이징
   * @returns {Promise<CursorPaginatedResponse<User>>}
   */
  findByRoleFlags(
    roleFlags: number,
    query: CursorPaginationQuery,
  ): Promise<CursorPaginatedResponse<User>>;

  /**
   * @description 마지막 로그인 시각 갱신
   * @param {Id} id 사용자 ID
   * @param {string} atISO ISO 날짜/시간
   * @returns {Promise<void>}
   */
  updateLastLoginAt(id: Id, atISO: string): Promise<void>;

  /**
   * @description 사용자 존재 여부
   * @param {Id} id 사용자 ID
   * @returns {Promise<boolean>}
   */
  exists(id: Id): Promise<boolean>;

  /**
   * @description 이메일 중복 여부
   * @param {string} email 이메일
   * @returns {Promise<boolean>}
   */
  existsByEmail(email: string): Promise<boolean>;

  /**
   * @description Google Sub 중복 여부
   * @param {string} googleSub Google OAuth sub
   * @returns {Promise<boolean>}
   */
  existsByGoogleSub(googleSub: string): Promise<boolean>;

  /**
   * @description 통계: 전체 사용자 수
   * @returns {Promise<number>}
   */
  count(): Promise<number>;

  /**
   * @description 통계: 특정 역할 플래그 사용자 수
   * @param {number} roleFlags 역할 비트마스크
   * @returns {Promise<number>}
   */
  countByRoleFlags(roleFlags: number): Promise<number>;
}
