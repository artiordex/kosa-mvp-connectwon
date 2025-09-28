/**
 * Description : venue.port.ts - 📌 장소 저장소 포트 인터페이스 (MVP 최소 버전)
 * Author : Shiwoo Min
 * Date : 2025-09-30
 */
import type { CursorPaginatedResponse, CursorPaginationQuery, Id, ISODateTime, JsonObject } from '@connectwon/core/core-types';

/**
 * @description 장소 엔터티
 */
export interface Venue {
  id: Id;
  name: string;
  address?: string;
  openingHours?: JsonObject; // JSONB
  blackoutRules?: JsonObject; // JSONB
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

/**
 * @description 장소 생성 입력
 */
export interface CreateVenue {
  name: string;
  address?: string;
  openingHours?: JsonObject;
  blackoutRules?: JsonObject;
}

/**
 * @description 장소 수정 입력
 */
export interface UpdateVenue {
  name?: string;
  address?: string;
  openingHours?: JsonObject;
  blackoutRules?: JsonObject;
}

/**
 * @description 장소 저장소 포트 (MVP용 최소 기능)
 */
export interface VenueRepository {
  /** ID로 조회 */
  findById(id: Id): Promise<Venue | null>;

  /** 이름으로 조회 */
  findByName(name: string): Promise<Venue | null>;

  /** 신규 생성 */
  create(data: CreateVenue): Promise<Venue>;

  /** 수정 */
  update(id: Id, updates: UpdateVenue): Promise<Venue>;

  /** 삭제 */
  delete(id: Id): Promise<void>;

  /** 페이지네이션 목록 조회 */
  findMany(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Venue>>;

  /** 이름 검색 */
  searchByName(term: string, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Venue>>;
}
