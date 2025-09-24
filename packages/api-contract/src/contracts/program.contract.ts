/**
 * Description : program.contract.ts - 📌 Zod를 사용하여 프로그램 및 참가자 관련 타입 및 인터페이스 계약 정의
 * Author : Shiwoo Min
 * Date : 2025-09-24
 */
import { PaginationInfoSchema } from './common.contract.js';
import { z } from 'zod';

/**
 * @description 프로그램 기본 정보
 * @typedef {Object} Program
 * @property {string} id - 프로그램 ID
 * @property {string} created_by_user_id - 생성자 사용자 ID
 * @property {string|null} type - 프로그램 유형
 * @property {string} title - 프로그램 제목
 * @property {string|null} description - 프로그램 설명
 * @property {string[]} ai_summary_tags - AI 요약 태그 목록
 * @property {boolean} is_active - 활성화 여부
 * @property {string} created_at - 생성 시간
 * @property {string} updated_at - 수정 시간
 */
export const ProgramSchema = z.object({
  id: z.string(),
  created_by_user_id: z.string(),
  type: z.string().nullable(),
  title: z.string(),
  description: z.string().nullable(),
  ai_summary_tags: z.array(z.string()),
  is_active: z.boolean(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});
export type Program = z.infer<typeof ProgramSchema>;

/**
 * @description 프로그램 생성 요청
 * @typedef {Object} CreateProgramRequest
 */
export const CreateProgramRequestSchema = z.object({
  type: z.string().optional(),
  title: z.string().min(1, '제목을 입력해주세요'),
  description: z.string().optional(),
  ai_summary_tags: z.array(z.string()).optional(),
  is_active: z.boolean().optional(),
});
export type CreateProgramRequest = z.infer<typeof CreateProgramRequestSchema>;

/**
 * @description 프로그램 수정 요청
 * @typedef {Object} UpdateProgramRequest
 */
export const UpdateProgramRequestSchema = z.object({
  type: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  ai_summary_tags: z.array(z.string()).optional(),
  is_active: z.boolean().optional(),
});
export type UpdateProgramRequest = z.infer<typeof UpdateProgramRequestSchema>;

/**
 * @description 프로그램 목록 조회 쿼리
 * @typedef {Object} ProgramListQuery
 */
export const ProgramListQuerySchema = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
  created_by_user_id: z.string().optional(),
  type: z.string().optional(),
  is_active: z.boolean().optional(),
  title: z.string().optional(),
  created_after: z.string().optional(),
  created_before: z.string().optional(),
});
export type ProgramListQuery = z.infer<typeof ProgramListQuerySchema>;

/**
 * @description 단일 프로그램 응답
 * @typedef {Object} ProgramResponse
 */
export const ProgramResponseSchema = z.object({
  data: ProgramSchema,
  message: z.string().optional(),
});
export type ProgramResponse = z.infer<typeof ProgramResponseSchema>;

/**
 * @description 프로그램 목록 응답
 * @typedef {Object} ProgramsListResponse
 */
export const ProgramsListResponseSchema = z.object({
  data: z.array(ProgramSchema),
  pagination: PaginationInfoSchema,
});
export type ProgramsListResponse = z.infer<typeof ProgramsListResponseSchema>;

//
// 참가자 관련 스키마
//

/**
 * @description 참가자 역할
 * @typedef {'HOST' | 'ATTENDEE'} ParticipantRole
 */
export const ParticipantRoleSchema = z.enum(['HOST', 'ATTENDEE']);
export type ParticipantRole = z.infer<typeof ParticipantRoleSchema>;

/**
 * @description 참가자 상태
 * @typedef {'APPLIED' | 'CONFIRMED' | 'CANCELLED' | 'NO_SHOW'} ParticipantStatus
 */
export const ParticipantStatusSchema = z.enum(['APPLIED', 'CONFIRMED', 'CANCELLED', 'NO_SHOW']);
export type ParticipantStatus = z.infer<typeof ParticipantStatusSchema>;

/**
 * @description 프로그램 참가자 정보
 * @typedef {Object} ProgramParticipant
 */
export const ProgramParticipantSchema = z.object({
  id: z.string(),
  session_id: z.string(),
  user_id: z.string(),
  role: ParticipantRoleSchema,
  status: ParticipantStatusSchema,
  joined_at: z.string().datetime(),
});
export type ProgramParticipant = z.infer<typeof ProgramParticipantSchema>;

/**
 * @description 참가자 생성 요청
 * @typedef {Object} CreateParticipantRequest
 */
export const CreateParticipantRequestSchema = z.object({
  session_id: z.string(),
  user_id: z.string(),
  role: ParticipantRoleSchema.optional(),
  status: ParticipantStatusSchema.optional(),
});
export type CreateParticipantRequest = z.infer<typeof CreateParticipantRequestSchema>;

/**
 * @description 참가자 수정 요청
 * @typedef {Object} UpdateParticipantRequest
 */
export const UpdateParticipantRequestSchema = z.object({
  role: ParticipantRoleSchema.optional(),
  status: ParticipantStatusSchema.optional(),
});
export type UpdateParticipantRequest = z.infer<typeof UpdateParticipantRequestSchema>;

/**
 * @description 참가자 목록 조회 쿼리
 * @typedef {Object} ParticipantListQuery
 */
export const ParticipantListQuerySchema = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
  session_id: z.string().optional(),
  user_id: z.string().optional(),
  role: ParticipantRoleSchema.optional(),
  status: ParticipantStatusSchema.optional(),
  joined_after: z.string().optional(),
  joined_before: z.string().optional(),
});
export type ParticipantListQuery = z.infer<typeof ParticipantListQuerySchema>;

/**
 * @description 참가자 일괄 수정 요청
 * @typedef {Object} ParticipantBulkUpdateRequest
 */
export const ParticipantBulkUpdateRequestSchema = z.object({
  participant_ids: z.array(z.string()),
  status: ParticipantStatusSchema,
});
export type ParticipantBulkUpdateRequest = z.infer<typeof ParticipantBulkUpdateRequestSchema>;

/**
 * @description 단일 참가자 응답
 * @typedef {Object} ParticipantResponse
 */
export const ParticipantResponseSchema = z.object({
  data: ProgramParticipantSchema,
  message: z.string().optional(),
});
export type ParticipantResponse = z.infer<typeof ParticipantResponseSchema>;

/**
 * @description 참가자 목록 응답
 * @typedef {Object} ParticipantsListResponse
 */
export const ParticipantsListResponseSchema = z.object({
  data: z.array(ProgramParticipantSchema),
  pagination: PaginationInfoSchema,
});
export type ParticipantsListResponse = z.infer<typeof ParticipantsListResponseSchema>;

/**
 * @description 참가자 일괄 수정 응답
 * @typedef {Object} ParticipantBulkUpdateResponse
 */
export const ParticipantBulkUpdateResponseSchema = z.object({
  updated_count: z.number(),
  failed_updates: z
    .array(
      z.object({
        participant_id: z.string(),
        error: z.string(),
      }),
    )
    .optional(),
  message: z.string().optional(),
});
export type ParticipantBulkUpdateResponse = z.infer<typeof ParticipantBulkUpdateResponseSchema>;

/**
 * @description 참가자 상세 정보
 * @typedef {Object} ParticipantWithDetails
 */
export const ParticipantWithDetailsSchema = ProgramParticipantSchema.extend({
  user: z.object({
    id: z.string(),
    name: z.string().nullable(),
    email: z.string().nullable(),
  }),
  session: z.object({
    id: z.string(),
    title: z.string(),
    starts_at: z.string().datetime(),
    ends_at: z.string().datetime(),
  }),
});
export type ParticipantWithDetails = z.infer<typeof ParticipantWithDetailsSchema>;

/**
 * @description 참가자 상세 목록 응답
 * @typedef {Object} ParticipantsWithDetailsResponse
 */
export const ParticipantsWithDetailsResponseSchema = z.object({
  data: z.array(ParticipantWithDetailsSchema),
  pagination: PaginationInfoSchema,
});
export type ParticipantsWithDetailsResponse = z.infer<typeof ParticipantsWithDetailsResponseSchema>;
