/**
 * Description : sessions.ts - 📌 Sessions 관련 타입정의
 * Author : Shiwoo Min
 * Date : 2025-09-11
 */
/**
 * @description 세션 상태 타입
 * @returns 예약 상태를 나타내는 문자열
 */
export type SessionStatus = 'SCHEDULED' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

/**
 * @description 세션 인터페이스
 * @returns 세션의 상세 정보를 포함하는 객체
 */
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

/**
 * @description 세션 생성 요청 및 응답 인터페이스
 * @returns 세션 생성에 필요한 데이터 및 선택적 필드 포함
 */
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

/**
 * @description 세션 수정 요청 인터페이스
 * @returns 세션 수정에 사용할 수 있는 선택적 필드들
 */
export interface UpdateSessionRequest {
  starts_at?: string;
  ends_at?: string;
  capacity?: number;
  participant_fee?: number;
  status?: SessionStatus;
  room_reservation_id?: string;
  location_text?: string;
}

/**
 * @description 세션 목록 조회 쿼리 파라미터 인터페이스
 * @returns 세션 목록을 필터링하고 페이징하는 데 사용
 */
export interface SessionListQuery {
  page?: number;
  limit?: number;
  program_id?: string;
  status?: SessionStatus;
  starts_after?: string;
  starts_before?: string;
  location_text?: string;
}

/**
 * @description 단일 세션 API 응답 인터페이스
 * @returns 세션 데이터와 선택적 메시지 포함
 */
export interface SessionResponse {
  data: Session;
  message?: string;
}

/**
 * @description 세션 목록 API 응답 인터페이스
 * @returns 세션 배열과 페이지네이션 정보 포함
 */
export interface SessionsListResponse {
  data: Session[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
