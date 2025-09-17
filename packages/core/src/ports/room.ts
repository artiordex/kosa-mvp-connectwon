/**
 * Description : room.ts - 📌 방 저장소 포트 인터페이스
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import type {
  CreateRoom,
  CursorPaginatedResponse,
  CursorPaginationQuery,
  Id,
  Room,
  RoomReservation,
  RoomWithVenue,
  UpdateRoom,
} from '../../core-types.js';

// 방 저장소 포트 인터페이스
export interface RoomRepository {
  // 기본 CRUD 작업
  findById(id: Id): Promise<Room | null>;
  findByIdWithVenue(id: Id): Promise<RoomWithVenue | null>;
  create(room: CreateRoom): Promise<Room>;
  update(id: Id, updates: UpdateRoom): Promise<Room>;
  delete(id: Id): Promise<void>;

  // 목록 조회
  findMany(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Room>>;
  findManyWithVenue(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<RoomWithVenue>>;

  // 장소별 방 조회
  findByVenueId(venueId: Id, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Room>>;

  // 상태별 방 조회
  findByStatus(
    status: string,
    query: CursorPaginationQuery,
  ): Promise<CursorPaginatedResponse<Room>>;
  findActiveRooms(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Room>>;

  // 검색
  search(term: string, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Room>>;

  // 예약 가능성 확인
  findAvailableRooms(
    venueId: Id,
    startTime: string,
    endTime: string,
    minCapacity?: number,
  ): Promise<Room[]>;

  // 시간 충돌 체크
  checkRoomAvailability(roomId: Id, startTime: string, endTime: string): Promise<boolean>;
  findConflictingReservations(
    roomId: Id,
    startTime: string,
    endTime: string,
  ): Promise<RoomReservation[]>;

  // 수용 인원 기준 검색
  findByMinCapacity(
    minCapacity: number,
    query: CursorPaginationQuery,
  ): Promise<CursorPaginatedResponse<Room>>;

  // 상태 변경
  updateStatus(id: Id, status: string): Promise<void>;
  activateRoom(id: Id): Promise<void>;
  deactivateRoom(id: Id): Promise<void>;
  setMaintenance(id: Id): Promise<void>;

  // 존재 여부 확인
  exists(id: Id): Promise<boolean>;
  existsByName(venueId: Id, name: string): Promise<boolean>;

  // 통계
  count(): Promise<number>;
  countByVenue(venueId: Id): Promise<number>;
  countByStatus(status: string): Promise<number>;
}
