/**
 * Description : venues.ts - 📌 Venues 관련 타입정의
 * Author : Shiwoo Min
 * Date : 2025-09-11
 */
// 장소 정보 인터페이스
export interface Venue {
  id: string;
  name: string;
  address: string | null;
  opening_hours: Record<string, any> | null;
  blackout_rules: Record<string, any> | null;
  created_at: string;
  updated_at: string;
}

// 장소 생성 요청 및 응답 인터페이스
export interface CreateVenueRequest {
  name: string;
  address?: string;
  opening_hours?: Record<string, any>;
  blackout_rules?: Record<string, any>;
}

// 장소 수정 요청 인터페이스
export interface UpdateVenueRequest {
  name?: string;
  address?: string;
  opening_hours?: Record<string, any>;
  blackout_rules?: Record<string, any>;
}

// 장소 목록 조회 쿼리 파라미터 인터페이스
export interface VenueListQuery {
  page?: number;
  limit?: number;
  name?: string;
  address?: string;
}

// API 응답 인터페이스
export interface VenueResponse {
  data: Venue;
  message?: string;
}

// 장소 목록 응답 인터페이스
export interface VenuesListResponse {
  data: Venue[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// 방 상태 타입 정의
export type RoomStatus = 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';

// 방 정보 인터페이스
export interface Room {
  id: string;
  venue_id: string;
  name: string;
  capacity: number | null;
  status: RoomStatus;
  created_at: string;
  updated_at: string;
}

// 방 생성 요청 및 응답 인터페이스
export interface CreateRoomRequest {
  venue_id: string;
  name: string;
  capacity?: number;
  status?: RoomStatus;
}

// 방 수정 요청 인터페이스
export interface UpdateRoomRequest {
  name?: string;
  capacity?: number;
  status?: RoomStatus;
}

// 방 목록 조회 쿼리 파라미터 인터페이스
export interface RoomListQuery {
  page?: number;
  limit?: number;
  venue_id?: string;
  name?: string;
  status?: RoomStatus;
}

// API 응답 인터페이스
export interface RoomResponse {
  data: Room;
  message?: string;
}

// 방 목록 응답 인터페이스
export interface RoomsListResponse {
  data: Room[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
