/**
 * Description : user.ts - 📌 사용자 저장소 포트 인터페이스
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import type {
  CreateUser,
  CursorPaginatedResponse,
  CursorPaginationQuery,
  Id,
  UpdateUser,
  User,
} from '../../core-types.js';
// 사용자 저장소 포트 인터페이스
export interface UserRepository {
  // === 기본 조회 ===
  findById(id: Id): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByGoogleSub(googleSub: string): Promise<User | null>;

  // 생성/수정
  create(user: CreateUser): Promise<User>;
  update(id: Id, updates: UpdateUser): Promise<User>;

  // 삭제
  delete(id: Id): Promise<boolean>;

  // 목록
  findMany(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<User>>;

  // 검색
  search(
    term: string,
    query: CursorPaginationQuery & {
      orderBy?: 'createdAt' | 'name' | 'email';
      orderDir?: 'asc' | 'desc';
      // 필요 시 도메인 필터 추가 (예: verifiedOnly?: boolean)
    },
  ): Promise<CursorPaginatedResponse<User>>;

  // 역할/권한별 조회
  findByRoleFlags(
    roleFlags: number,
    query: CursorPaginationQuery,
  ): Promise<CursorPaginatedResponse<User>>;

  // 상태 갱신
  updateLastLoginAt(id: Id, atISO: string): Promise<void>;

  // 존재 여부
  exists(id: Id): Promise<boolean>;
  existsByEmail(email: string): Promise<boolean>;
  existsByGoogleSub(googleSub: string): Promise<boolean>;

  // 통계
  count(): Promise<number>;
  countByRoleFlags(roleFlags: number): Promise<number>;
}
