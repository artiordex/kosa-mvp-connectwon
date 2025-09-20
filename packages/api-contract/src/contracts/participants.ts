/**
 * Description : participants.ts - 📌 Participants 관련 타입정의
 * Author : Shiwoo Min
 * Date : 2025-09-11
 * 09-21 - 주석 보강
 */
/**
 * @description 프로그램 참가자 역할 타입
 * @returns 참가자의 역할 문자열
 */
export type ParticipantRole = 'HOST' | 'ATTENDEE';

/**
 * @description 프로그램 참가자 상태 타입
 * @returns 참가자의 상태를 나타내는 문자열
 */
export type ParticipantStatus = 'APPLIED' | 'CONFIRMED' | 'CANCELLED' | 'NO_SHOW';

/**
 * @description 프로그램 참가자 인터페이스
 * @returns 참가자의 기본 정보와 상태를 포함하는 객체
 */
export interface ProgramParticipant {
  id: string;
  session_id: string;
  user_id: string;
  role: ParticipantRole;
  status: ParticipantStatus;
  joined_at: string;
}

/**
 * @description 프로그램 참가자 생성 요청 인터페이스
 * @returns 참가자 생성에 필요한 데이터 구조
 */
export interface CreateParticipantRequest {
  session_id: string;
  user_id: string;
  role?: ParticipantRole;
  status?: ParticipantStatus;
}

/**
 * @description 프로그램 참가자 수정 요청 인터페이스
 * @returns 참가자 정보 수정에 사용 가능한 필드들
 */
export interface UpdateParticipantRequest {
  role?: ParticipantRole;
  status?: ParticipantStatus;
}

/**
 * @description 프로그램 참가자 목록 조회 쿼리 파라미터 인터페이스
 * @returns 필터와 페이징 정보를 포함하여 참가자 목록 검색에 사용
 */
export interface ParticipantListQuery {
  page?: number;
  limit?: number;
  session_id?: string;
  user_id?: string;
  role?: ParticipantRole;
  status?: ParticipantStatus;
  joined_after?: string;
  joined_before?: string;
}

/**
 * @description 프로그램 참가자 일괄 수정 요청 인터페이스
 * @returns 여러 참가자의 상태를 일괄적으로 수정하는 데 필요한 데이터
 */
export interface ParticipantBulkUpdateRequest {
  participant_ids: string[];
  status: ParticipantStatus;
}

/**
 * @description 프로그램 참가자 단일 응답 인터페이스
 * @returns 단일 참가자 데이터와 선택적 메시지 포함
 */
export interface ParticipantResponse {
  data: ProgramParticipant;
  message?: string;
}

/**
 * @description 프로그램 참가자 목록 응답 인터페이스
 * @returns 참가자 배열과 페이지네이션 정보 포함
 */
export interface ParticipantsListResponse {
  data: ProgramParticipant[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * @description 프로그램 참가자 일괄 수정 응답 인터페이스
 * @returns 수정 성공 개수, 실패 내역 및 선택적 메시지 포함
 */
export interface ParticipantBulkUpdateResponse {
  updated_count: number;
  failed_updates?: {
    participant_id: string;
    error: string;
  }[];
  message?: string;
}

/**
 * @description 프로그램 참가자 상세 정보 인터페이스
 * @returns 참가자 본인 정보와 소속 세션 정보 포함
 */
export interface ParticipantWithDetails extends ProgramParticipant {
  user: {
    id: string;
    name: string | null;
    email: string | null;
  };
  session: {
    id: string;
    title: string;
    starts_at: string;
    ends_at: string;
  };
}

/**
 * @description 프로그램 참가자 상세 정보 목록 응답 인터페이스
 * @returns 상세 참가자 배열과 페이지네이션 포함
 */
export interface ParticipantsWithDetailsResponse {
  data: ParticipantWithDetails[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
