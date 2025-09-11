/**
 * Description : user.ts - 📌 사용자 저장소 포트 인터페이스
 * Author      : Shiwoo Min
 * Date        : 2025-09-10
 */
import type {
  CreateUser,
  CursorPaginatedResponse,
  CursorPaginationQuery,
  Id,
  UpdateUser,
  User,
} from '../../core-types.js';

export interface UserRepository {
  // === 기본 조회 ===
  findById(id: Id): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByGoogleSub(googleSub: string): Promise<User | null>;

  // === 생성/수정 ===
  create(user: CreateUser): Promise<User>;
  update(id: Id, updates: UpdateUser): Promise<User>;

  // 선택: 이미 있으면 갱신, 없으면 생성 (필요 없으면 제거)
  upsert(user: CreateUser & { id?: Id }): Promise<User>;

  // === 삭제 ===
  // true: 삭제됨, false: 대상 없음(멱등)
  delete(id: Id): Promise<boolean>;

  // === 목록/검색 ===
  findMany(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<User>>;
  search(
    term: string,
    query: CursorPaginationQuery & {
      orderBy?: 'createdAt' | 'name' | 'email';
      orderDir?: 'asc' | 'desc';
      // 필요 시 도메인 필터 추가 (예: verifiedOnly?: boolean)
    },
  ): Promise<CursorPaginatedResponse<User>>;

  // === 역할/권한 ===
  // roleFlags: 비트마스크 (예: 1=ADMIN, 2=PROGRAM_CREATOR, 4=USER …)
  findByRoleFlags(
    roleFlags: number,
    query: CursorPaginationQuery,
  ): Promise<CursorPaginatedResponse<User>>;

  // === 상태 갱신 ===
  updateLastLoginAt(id: Id, atISO: string): Promise<void>;

  // === 존재 여부 ===
  exists(id: Id): Promise<boolean>;
  existsByEmail(email: string): Promise<boolean>;
  existsByGoogleSub(googleSub: string): Promise<boolean>;

  // === 통계 ===
  count(): Promise<number>;
  countByRoleFlags(roleFlags: number): Promise<number>;
}
