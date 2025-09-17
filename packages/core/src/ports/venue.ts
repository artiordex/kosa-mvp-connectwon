/**
 * Description : ports/venue.ts - 📌 장소 저장소 포트 인터페이스
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import type {
  CreateVenue,
  CursorPaginatedResponse,
  CursorPaginationQuery,
  Id,
  UpdateVenue,
  Venue,
} from '../../core-types.js';

// 장소 저장소 포트 인터페이스
export interface VenueRepository {
  // 기본 CRUD 작업
  findById(id: Id): Promise<Venue | null>;
  create(venue: CreateVenue): Promise<Venue>;
  update(id: Id, updates: UpdateVenue): Promise<Venue>;
  delete(id: Id): Promise<void>;

  // 목록 조회
  findMany(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Venue>>;

  // 검색
  search(term: string, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Venue>>;
  searchByLocation(
    location: string,
    query: CursorPaginationQuery,
  ): Promise<CursorPaginatedResponse<Venue>>;

  // 운영 시간 관련
  findOpenVenues(dateTime: string): Promise<Venue[]>;
  findVenuesWithOpeningHours(): Promise<Venue[]>;

  // 예약 가능성 확인
  findAvailableVenues(startTime: string, endTime: string): Promise<Venue[]>;

  // 통계
  count(): Promise<number>;

  // 존재 여부 확인
  exists(id: Id): Promise<boolean>;
  existsByName(name: string): Promise<boolean>;
}
