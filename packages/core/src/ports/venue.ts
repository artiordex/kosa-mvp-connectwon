/**
 * Description : ports/venue.ts - 📌 장소 저장소 포트 인터페이스
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import type { CreateVenue, CursorPaginatedResponse, CursorPaginationQuery, Id, UpdateVenue, Venue } from '../../core-types.js';

/**
 * @description 장소 저장소 포트
 */
export interface VenueRepository {
  /**
   * @description ID로 장소 조회
   * @param {Id} id 장소 ID
   * @returns {Promise<Venue | null>}
   */
  findById(id: Id): Promise<Venue | null>;

  /**
   * @description 장소 생성
   * @param {CreateVenue} venue 생성 데이터
   * @returns {Promise<Venue>}
   */
  create(venue: CreateVenue): Promise<Venue>;

  /**
   * @description 장소 업데이트(부분 업데이트)
   * @param {Id} id 장소 ID
   * @param {UpdateVenue} updates 변경 필드
   * @returns {Promise<Venue>}
   */
  update(id: Id, updates: UpdateVenue): Promise<Venue>;

  /**
   * @description 장소 삭제
   * @param {Id} id 장소 ID
   * @returns {Promise<void>}
   */
  delete(id: Id): Promise<void>;

  /**
   * @description 페이징 목록 조회
   * @param {CursorPaginationQuery} query 커서/limit 등
   * @returns {Promise<CursorPaginatedResponse<Venue>>}
   */
  findMany(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Venue>>;

  /**
   * @description 텍스트 검색
   * @param {string} term 검색어
   * @param {CursorPaginationQuery} query 페이징
   * @returns {Promise<CursorPaginatedResponse<Venue>>}
   */
  search(term: string, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Venue>>;

  /**
   * @description 위치 기반 검색
   * @param {string} location 위치 문자열(도시/구 등)
   * @param {CursorPaginationQuery} query 페이징
   * @returns {Promise<CursorPaginatedResponse<Venue>>}
   */
  searchByLocation(
    location: string,
    query: CursorPaginationQuery,
  ): Promise<CursorPaginatedResponse<Venue>>;

  /**
   * @description 특정 시각에 영업 중인 장소 조회
   * @param {string} dateTime ISO-8601
   * @returns {Promise<Venue[]>}
   */
  findOpenVenues(dateTime: string): Promise<Venue[]>;

  /**
   * @description 영업시간 데이터가 설정된 장소 조회
   * @returns {Promise<Venue[]>}
   */
  findVenuesWithOpeningHours(): Promise<Venue[]>;

  /**
   * @description 기간 내 예약 가능 장소 조회
   * @param {string} startTime ISO-8601
   * @param {string} endTime ISO-8601
   * @returns {Promise<Venue[]>}
   */
  findAvailableVenues(startTime: string, endTime: string): Promise<Venue[]>;

  /**
   * @description 통계: 장소 수
   * @returns {Promise<number>}
   */
  count(): Promise<number>;

  /**
   * @description 존재 여부
   * @param {Id} id 장소 ID
   * @returns {Promise<boolean>}
   */
  exists(id: Id): Promise<boolean>;

  /**
   * @description 이름 중복 여부
   * @param {string} name 장소명
   * @returns {Promise<boolean>}
   */
  existsByName(name: string): Promise<boolean>;
}
