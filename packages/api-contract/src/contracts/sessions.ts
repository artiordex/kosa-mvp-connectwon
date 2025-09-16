/**
 * Description : sessions.ts - 📌 Sessions 관련 타입정의
 * Author : Shiwoo Min
 * Date : 2025-09-11
 */
// 세션 상태 타입
export type SessionStatus = 'SCHEDULED' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

// 세션 인터페이스
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

// 세션 생성 요청 및 응답 인터페이스
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

// 세션 수정 요청 인터페이스
export interface UpdateSessionRequest {
  starts_at?: string;
  ends_at?: string;
  capacity?: number;
  participant_fee?: number;
  status?: SessionStatus;
  room_reservation_id?: string;
  location_text?: string;
}

// 세션 목록 조회 쿼리 파라미터 인터페이스
export interface SessionListQuery {
  page?: number;
  limit?: number;
  program_id?: string;
  status?: SessionStatus;
  starts_after?: string;
  starts_before?: string;
  location_text?: string;
}

// API 응답 인터페이스
export interface SessionResponse {
  data: Session;
  message?: string;
}

// 세션 목록 응답 인터페이스
export interface SessionsListResponse {
  data: Session[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
