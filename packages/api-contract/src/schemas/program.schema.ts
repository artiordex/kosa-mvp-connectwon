/**
 * Description : program.schema.ts - 📌 프로그램 및 참가자 관련 타입 및 스키마
 * Author : Shiwoo Min
 * Date : 2025-09-24
 */
import {
  CreateParticipantRequestSchema,
  CreateProgramRequestSchema,
  ParticipantBulkUpdateRequestSchema,
  ParticipantBulkUpdateResponseSchema,
  ParticipantListQuerySchema,
  ParticipantResponseSchema,
  ParticipantRoleSchema,
  ParticipantsListResponseSchema,
  ParticipantStatusSchema,
  ParticipantsWithDetailsResponseSchema,
  ParticipantWithDetailsSchema,
  ProgramListQuerySchema,
  ProgramParticipantSchema,
  ProgramResponseSchema,
  ProgramSchema,
  ProgramsListResponseSchema,
  UpdateParticipantRequestSchema,
  UpdateProgramRequestSchema,
} from '../contracts/program.contract.js';
import { z } from 'zod';

/**
 * @description 프로그램 기본 정보
 * @typedef {Program}
 */
export const Program = ProgramSchema;
export type Program = z.infer<typeof Program>;

/**
 * @description 프로그램 생성 요청
 * @typedef {CreateProgramRequest}
 */
export const CreateProgramRequest = CreateProgramRequestSchema;
export type CreateProgramRequest = z.infer<typeof CreateProgramRequest>;

/**
 * @description 프로그램 수정 요청
 * @typedef {UpdateProgramRequest}
 */
export const UpdateProgramRequest = UpdateProgramRequestSchema;
export type UpdateProgramRequest = z.infer<typeof UpdateProgramRequest>;

/**
 * @description 프로그램 목록 조회 쿼리
 * @typedef {ProgramListQuery}
 */
export const ProgramListQuery = ProgramListQuerySchema;
export type ProgramListQuery = z.infer<typeof ProgramListQuery>;

/**
 * @description 단일 프로그램 응답
 * @typedef {ProgramResponse}
 */
export const ProgramResponse = ProgramResponseSchema;
export type ProgramResponse = z.infer<typeof ProgramResponse>;

/**
 * @description 프로그램 목록 응답 DTO
 * @typedef {ProgramsListResponse}
 */
export const ProgramsListResponse = ProgramsListResponseSchema;
export type ProgramsListResponse = z.infer<typeof ProgramsListResponse>;

/**
 * @description 참가자 역할
 * @typedef {ParticipantRole}
 */
export const ParticipantRole = ParticipantRoleSchema;
export type ParticipantRole = z.infer<typeof ParticipantRole>;

/**
 * @description 참가자 상태
 * @typedef {ParticipantStatus}
 */
export const ParticipantStatus = ParticipantStatusSchema;
export type ParticipantStatus = z.infer<typeof ParticipantStatus>;

/**
 * @description 프로그램 참가자 정보
 * @typedef {ProgramParticipant}
 */
export const ProgramParticipant = ProgramParticipantSchema;
export type ProgramParticipant = z.infer<typeof ProgramParticipant>;

/**
 * @description 참가자 생성 요청
 * @typedef {CreateParticipantRequest}
 */
export const CreateParticipantRequest = CreateParticipantRequestSchema;
export type CreateParticipantRequest = z.infer<typeof CreateParticipantRequest>;

/**
 * @description 참가자 수정 요청
 * @typedef {UpdateParticipantRequest}
 */
export const UpdateParticipantRequest = UpdateParticipantRequestSchema;
export type UpdateParticipantRequest = z.infer<typeof UpdateParticipantRequest>;

/**
 * @description 참가자 목록 조회 쿼리
 * @typedef {ParticipantListQuery}
 */
export const ParticipantListQuery = ParticipantListQuerySchema;
export type ParticipantListQuery = z.infer<typeof ParticipantListQuery>;

/**
 * @description 참가자 일괄 수정 요청
 * @typedef {ParticipantBulkUpdateRequest}
 */
export const ParticipantBulkUpdateRequest = ParticipantBulkUpdateRequestSchema;
export type ParticipantBulkUpdateRequest = z.infer<typeof ParticipantBulkUpdateRequest>;

/**
 * @description 단일 참가자 응답
 * @typedef {ParticipantResponse}
 */
export const ParticipantResponse = ParticipantResponseSchema;
export type ParticipantResponse = z.infer<typeof ParticipantResponse>;

/**
 * @description 참가자 목록 응답
 * @typedef {ParticipantsListResponse}
 */
export const ParticipantsListResponse = ParticipantsListResponseSchema;
export type ParticipantsListResponse = z.infer<typeof ParticipantsListResponse>;

/**
 * @description 참가자 일괄 수정 응답
 * @typedef {ParticipantBulkUpdateResponse}
 */
export const ParticipantBulkUpdateResponse = ParticipantBulkUpdateResponseSchema;
export type ParticipantBulkUpdateResponse = z.infer<typeof ParticipantBulkUpdateResponse>;

/**
 * @description 참가자 상세 정보
 * @typedef {ParticipantWithDetails}
 */
export const ParticipantWithDetails = ParticipantWithDetailsSchema;
export type ParticipantWithDetails = z.infer<typeof ParticipantWithDetails>;

/**
 * @description 참가자 상세 목록 응답
 * @typedef {ParticipantsWithDetailsResponse}
 */
export const ParticipantsWithDetailsResponse = ParticipantsWithDetailsResponseSchema;
export type ParticipantsWithDetailsResponse = z.infer<typeof ParticipantsWithDetailsResponse>;
