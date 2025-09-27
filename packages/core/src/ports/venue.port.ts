/**
 * Description : venue.port.ts - 📌 장소/방 저장소 포트 인터페이스
 * Author : Shiwoo Min
 * Date : 2025-09-27
 */
import type {
  CreateRoom,
  CreateVenue,
  CursorPaginatedResponse,
  CursorPaginationQuery,
  Id,
  // Room
  Room,
  RoomReservation,
  RoomWithVenue,
  UpdateRoom,
  UpdateVenue,
  // Venue
  Venue,
} from '../core-types.js';

/**
 * @description 장소 저장소 포트
 */
export interface VenueRepository {
  /** @description ID로 장소 조회 */
  findById(id: Id): Promise<Venue | null>;

  /** @description 장소 생성 */
  create(venue: CreateVenue): Promise<Venue>;

  /** @description 장소 업데이트(부분 업데이트) */
  update(id: Id, updates: UpdateVenue): Promise<Venue>;

  /** @description 장소 삭제 */
  delete(id: Id): Promise<void>;

  /** @description 페이징 목록 조회 */
  findMany(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Venue>>;

  /** @description 텍스트 검색 */
  search(term: string, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Venue>>;

  /** @description 위치 기반 검색 */
  searchByLocation(location: string, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Venue>>;

  /** @description 특정 시각에 영업 중인 장소 조회 */
  findOpenVenues(dateTime: string): Promise<Venue[]>;

  /** @description 영업시간 데이터가 설정된 장소 조회 */
  findVenuesWithOpeningHours(): Promise<Venue[]>;

  /** @description 기간 내 예약 가능 장소 조회 */
  findAvailableVenues(startTime: string, endTime: string): Promise<Venue[]>;

  /** @description 통계: 장소 수 */
  count(): Promise<number>;

  /** @description 존재 여부 */
  exists(id: Id): Promise<boolean>;

  /** @description 이름 중복 여부 */
  existsByName(name: string): Promise<boolean>;
}

/**
 * @description 방 저장소 포트
 */
export interface RoomRepository {
  /** @description ID로 조회 */
  findById(id: Id): Promise<Room | null>;
  /** @description 장소 조인 포함 조회 */
  findByIdWithVenue(id: Id): Promise<RoomWithVenue | null>;

  /** @description 생성 */
  create(room: CreateRoom): Promise<Room>;
  /** @description 갱신 */
  update(id: Id, updates: UpdateRoom): Promise<Room>;
  /** @description 삭제 */
  delete(id: Id): Promise<void>;

  /** @description 페이징 목록 */
  findMany(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Room>>;
  /** @description 페이징 목록(장소 조인) */
  findManyWithVenue(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<RoomWithVenue>>;

  /** @description 장소별 방 목록 */
  findByVenueId(venueId: Id, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Room>>;

  /** @description 상태별 목록 */
  findByStatus(status: string, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Room>>;

  /** @description 사용 가능한 방 검색 */
  findActiveRooms(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Room>>;

  /** @description 텍스트 검색 */
  search(term: string, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Room>>;

  /** @description 기간/수용인원 조건으로 가능한 방 목록 */
  findAvailableRooms(venueId: Id, startTime: string, endTime: string, minCapacity?: number): Promise<Room[]>;

  /** @description 특정 방의 시간 충돌 여부 */
  checkRoomAvailability(roomId: Id, startTime: string, endTime: string): Promise<boolean>;

  /** @description 충돌하는 예약 목록 */
  findConflictingReservations(roomId: Id, startTime: string, endTime: string): Promise<RoomReservation[]>;

  /** @description 최솟값 이상 수용 가능한 방 목록 */
  findByMinCapacity(minCapacity: number, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Room>>;

  /** @description 상태 갱신/전환 */
  updateStatus(id: Id, status: string): Promise<void>;
  activateRoom(id: Id): Promise<void>;
  deactivateRoom(id: Id): Promise<void>;
  setMaintenance(id: Id): Promise<void>;

  /** @description 존재 여부 */
  exists(id: Id): Promise<boolean>;
  /** @description 동일 장소 내 이름 중복 여부 */
  existsByName(venueId: Id, name: string): Promise<boolean>;

  /** @description 통계 */
  count(): Promise<number>;
  countByVenue(venueId: Id): Promise<number>;
  countByStatus(status: string): Promise<number>;
}
