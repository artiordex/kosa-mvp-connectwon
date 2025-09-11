/**
 * Description : sessions.ts - 📌 Sessions 관련 타입정의
 * Author : Shiwoo Min
 * Date : 2025-09-11
 */
export type SessionStatus = 'SCHEDULED' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export interface Session {
  id: string;
  program_id: string;
  starts_at: string;
  ends_at: string;
  capacity: number | null;
  participant_fee: number | null;
  status: SessionStatus;
  room_reservation_id: string | null;
  location_text: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateSessionRequest {
  program_id: string;
  starts_at: string;
  ends_at: string;
  capacity?: number;
  participant_fee?: number;
  status?: SessionStatus;
  room_reservation_id?: string;
  location_text?: string;
}

export interface UpdateSessionRequest {
  starts_at?: string;
  ends_at?: string;
  capacity?: number;
  participant_fee?: number;
  status?: SessionStatus;
  room_reservation_id?: string;
  location_text?: string;
}

export interface SessionListQuery {
  page?: number;
  limit?: number;
  program_id?: string;
  status?: SessionStatus;
  starts_after?: string;
  starts_before?: string;
  location_text?: string;
}

export interface SessionResponse {
  data: Session;
  message?: string;
}

export interface SessionsListResponse {
  data: Session[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
