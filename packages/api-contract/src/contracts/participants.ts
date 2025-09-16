/**
 * Description : participants.ts - 📌 Participants 관련 타입정의
 * Author : Shiwoo Min
 * Date : 2025-09-11
 */
// 프로그램 참가자 역할 및 상태 타입
export type ParticipantRole = 'HOST' | 'ATTENDEE';

// 프로그램 참가자 상태 타입
export type ParticipantStatus = 'APPLIED' | 'CONFIRMED' | 'CANCELLED' | 'NO_SHOW';

// 프로그램 참가자 인터페이스
export interface ProgramParticipant {
  id: string;
  session_id: string;
  user_id: string;
  role: ParticipantRole;
  status: ParticipantStatus;
  joined_at: string;
}

// 프로그램 참가자 생성 요청 및 응답 인터페이스
export interface CreateParticipantRequest {
  session_id: string;
  user_id: string;
  role?: ParticipantRole;
  status?: ParticipantStatus;
}

// 프로그램 참가자 수정 요청 인터페이스
export interface UpdateParticipantRequest {
  role?: ParticipantRole;
  status?: ParticipantStatus;
}

// 프로그램 참가자 목록 조회 쿼리 파라미터 인터페이스
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

// 프로그램 참가자 일괄 수정 요청 인터페이스
export interface ParticipantBulkUpdateRequest {
  participant_ids: string[];
  status: ParticipantStatus;
}

// API 응답 인터페이스
export interface ParticipantResponse {
  data: ProgramParticipant;
  message?: string;
}

// 프로그램 참가자 목록 응답 인터페이스
export interface ParticipantsListResponse {
  data: ProgramParticipant[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// 프로그램 참가자 일괄 수정 응답 인터페이스
export interface ParticipantBulkUpdateResponse {
  updated_count: number;
  failed_updates?: {
    participant_id: string;
    error: string;
  }[];
  message?: string;
}

// 프로그램 참가자 상세 정보 인터페이스
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

// 프로그램 참가자 상세 정보 응답 인터페이스
export interface ParticipantsWithDetailsResponse {
  data: ParticipantWithDetails[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
