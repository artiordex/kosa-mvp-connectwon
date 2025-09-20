/**
 * Description : venues.ts - 📌 Venues 관련 타입정의
 * Author : Shiwoo Min
 * Date : 2025-09-11
 * 09-21 - 주석 보강
 */
/**
 * @description 장소 정보 인터페이스
 * @returns 장소에 대한 기본 정보와 상태를 포함하는 객체
 */
export interface Venue {
  id: string;
  name: string;
  address: string | null;
  opening_hours: Record<string, any> | null;
  blackout_rules: Record<string, any> | null;
  created_at: string;
  updated_at: string;
}

/**
 * @description 장소 생성 요청 인터페이스
 * @returns 장소 생성에 필요한 필드들
 */
export interface CreateVenueRequest {
  name: string;
  address?: string;
  opening_hours?: Record<string, any>;
  blackout_rules?: Record<string, any>;
}

/**
 * @description 장소 수정 요청 인터페이스
 * @returns 장소 정보 수정에 사용할 수 있는 선택적 필드들
 */
export interface UpdateVenueRequest {
  name?: string;
  address?: string;
  opening_hours?: Record<string, any>;
  blackout_rules?: Record<string, any>;
}

/**
 * @description 장소 목록 조회 쿼리 파라미터 인터페이스
 * @returns 장소 목록 필터링 및 페이징에 사용
 */
export interface VenueListQuery {
  page?: number;
  limit?: number;
  name?: string;
  address?: string;
}

/**
 * @description 단일 장소 API 응답 인터페이스
 * @returns 장소 데이터와 선택적 메시지 포함
 */
export interface VenueResponse {
  data: Venue;
  message?: string;
}

/**
 * @description 장소 목록 API 응답 인터페이스
 * @returns 장소 배열과 페이지네이션 정보 포함
 */
export interface VenuesListResponse {
  data: Venue[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * @description 방 상태 타입 정의
 * @returns 방의 상태를 나타내는 문자열
 */
export type RoomStatus = 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';

/**
 * @description 방 정보 인터페이스
 * @returns 방의 상세 정보를 포함하는 객체
 */
export interface Room {
  id: string;
  venue_id: string;
  name: string;
  capacity: number | null;
  status: RoomStatus;
  created_at: string;
  updated_at: string;
}

/**
 * @description 방 생성 요청 인터페이스
 * @returns 방 생성에 필요한 필드들
 */
export interface CreateRoomRequest {
  venue_id: string;
  name: string;
  capacity?: number;
  status?: RoomStatus;
}

/**
 * @description 방 수정 요청 인터페이스
 * @returns 방 정보 수정에 사용할 수 있는 선택적 필드들
 */
export interface UpdateRoomRequest {
  name?: string;
  capacity?: number;
  status?: RoomStatus;
}

/**
 * @description 방 목록 조회 쿼리 파라미터 인터페이스
 * @returns 방 목록 필터링 및 페이징에 사용
 */
export interface RoomListQuery {
  page?: number;
  limit?: number;
  venue_id?: string;
  name?: string;
  status?: RoomStatus;
}

/**
 * @description 단일 방 API 응답 인터페이스
 * @returns 방 데이터와 선택적 메시지 포함
 */
export interface RoomResponse {
  data: Room;
  message?: string;
}

/**
 * @description 방 목록 API 응답 인터페이스
 * @returns 방 배열과 페이지네이션 정보 포함
 */
export interface RoomsListResponse {
  data: Room[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
