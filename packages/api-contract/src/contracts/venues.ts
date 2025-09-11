/**
 * Description : venues.ts - 📌 Venues 관련 타입정의
 * Author : Shiwoo Min
 * Date : 2025-09-11
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

export interface CreateVenueRequest {
  name: string;
  address?: string;
  opening_hours?: Record<string, any>;
  blackout_rules?: Record<string, any>;
}

export interface UpdateVenueRequest {
  name?: string;
  address?: string;
  opening_hours?: Record<string, any>;
  blackout_rules?: Record<string, any>;
}

export interface VenueListQuery {
  page?: number;
  limit?: number;
  name?: string;
  address?: string;
}

export interface VenueResponse {
  data: Venue;
  message?: string;
}

export interface VenuesListResponse {
  data: Venue[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Room entity contracts (rooms table references venues)
export type RoomStatus = 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';

export interface Room {
  id: string;
  venue_id: string;
  name: string;
  capacity: number | null;
  status: RoomStatus;
  created_at: string;
  updated_at: string;
}

export interface CreateRoomRequest {
  venue_id: string;
  name: string;
  capacity?: number;
  status?: RoomStatus;
}

export interface UpdateRoomRequest {
  name?: string;
  capacity?: number;
  status?: RoomStatus;
}

export interface RoomListQuery {
  page?: number;
  limit?: number;
  venue_id?: string;
  name?: string;
  status?: RoomStatus;
}

export interface RoomResponse {
  data: Room;
  message?: string;
}

export interface RoomsListResponse {
  data: Room[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
