/**
 * Description : participants.ts - 📌 Participants 관련 타입정의
 * Author : Shiwoo Min
 * Date : 2025-09-11
 */
export type ParticipantRole = 'HOST' | 'ATTENDEE';
export type ParticipantStatus = 'APPLIED' | 'CONFIRMED' | 'CANCELLED' | 'NO_SHOW';

export interface ProgramParticipant {
  id: string;
  session_id: string;
  user_id: string;
  role: ParticipantRole;
  status: ParticipantStatus;
  joined_at: string;
}

export interface CreateParticipantRequest {
  session_id: string;
  user_id: string;
  role?: ParticipantRole;
  status?: ParticipantStatus;
}

export interface UpdateParticipantRequest {
  role?: ParticipantRole;
  status?: ParticipantStatus;
}

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

export interface ParticipantBulkUpdateRequest {
  participant_ids: string[];
  status: ParticipantStatus;
}

export interface ParticipantResponse {
  data: ProgramParticipant;
  message?: string;
}

export interface ParticipantsListResponse {
  data: ProgramParticipant[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ParticipantBulkUpdateResponse {
  updated_count: number;
  failed_updates?: {
    participant_id: string;
    error: string;
  }[];
  message?: string;
}

// Extended participant info with user and session details
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

export interface ParticipantsWithDetailsResponse {
  data: ParticipantWithDetails[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
