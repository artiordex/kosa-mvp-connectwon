/**
 * Description : room.ts - 📌 방 저장소 포트 인터페이스
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import type { CreateRoom, CursorPaginatedResponse, CursorPaginationQuery, Id, Room, RoomReservation, RoomWithVenue, UpdateRoom } from '../../core-types.js';

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
  findAvailableRooms(
    venueId: Id,
    startTime: string,
    endTime: string,
    minCapacity?: number,
  ): Promise<Room[]>;

  /** @description 특정 방의 시간 충돌 여부 */
  checkRoomAvailability(roomId: Id, startTime: string, endTime: string): Promise<boolean>;

  /** @description 충돌하는 예약 목록 */
  findConflictingReservations(
    roomId: Id,
    startTime: string,
    endTime: string,
  ): Promise<RoomReservation[]>;

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
