/**
 * Description : programs.ts - 📌 Programs 관련 타입정의
 * Author : Shiwoo Min
 * Date : 2025-09-11
 */
export interface Program {
  id: string;
  created_by_user_id: string;
  type: string | null;
  title: string;
  description: string | null;
  ai_summary_tags: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateProgramRequest {
  type?: string;
  title: string;
  description?: string;
  ai_summary_tags?: string[];
  is_active?: boolean;
}

export interface UpdateProgramRequest {
  type?: string;
  title?: string;
  description?: string;
  ai_summary_tags?: string[];
  is_active?: boolean;
}

export interface ProgramListQuery {
  page?: number;
  limit?: number;
  created_by_user_id?: string;
  type?: string;
  is_active?: boolean;
  title?: string;
  created_after?: string;
  created_before?: string;
}

export interface ProgramResponse {
  data: Program;
  message?: string;
}

export interface ProgramsListResponse {
  data: Program[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
