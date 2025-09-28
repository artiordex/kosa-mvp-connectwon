/**
 * Description : venue.port.ts - 📌 장소 저장소 포트 인터페이스
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
 * @description 장소 저장소 포트
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

  /** 특정 시간에 열려 있는 장소 조회 */
  findOpenAt(dateTime: ISODateTime): Promise<Venue[]>;

  /** 운영 시간 데이터가 있는 장소 조회 */
  findWithOpeningHours(): Promise<Venue[]>;

  /** 예약 가능한 장소 조회 */
  findAvailable(startTime: ISODateTime, endTime: ISODateTime): Promise<Venue[]>;

  /** 총 개수 */
  count(): Promise<number>;

  /** 존재 여부 */
  exists(id: Id): Promise<boolean>;
  existsByName(name: string): Promise<boolean>;
}
