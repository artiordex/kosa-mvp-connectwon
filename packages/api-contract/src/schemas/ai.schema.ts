/**
 * Description : ai.schema.ts - 📌 ai.contract.ts에서 정의된 Zod 스키마를 가져와 DTO 대신 사용
 * Author : Shiwoo Min
 * Date : 2025-09-24
 */
import { AIInteractionKindSchema, AIInteractionListQuerySchema, AIInteractionResponseSchema, AIInteractionSchema, AIInteractionsListResponseSchema, AIInteractionStatsQuerySchema, AIInteractionStatsResponseSchema, AIInteractionStatsSchema, AIInteractionStatusSchema, CreateAIInteractionRequestSchema, UpdateAIInteractionRequestSchema } from '../contracts/ai.contract.js';
import { z } from 'zod';

/**
 * @description AI 상호작용 성공/실패 상태 타입
 * @returns 'OK' 또는 'ERROR' 상태 문자열
 */
export const AIInteractionStatus = AIInteractionStatusSchema;
export type AIInteractionStatus = z.infer<typeof AIInteractionStatus>;

/**
 * @description AI 상호작용 종류 타입
 * @returns 상호작용의 구체적 종류 (e.g., 'chat', 'embed', 'completion', 'image', 'audio')
 */
export const AIInteractionKind = AIInteractionKindSchema;
export type AIInteractionKind = z.infer<typeof AIInteractionKind>;

/**
 * @description AI 상호작용 상세정보
 * @returns AI 상호작용에 관한 상세 데이터 구조
 */
export const AIInteraction = AIInteractionSchema;
export type AIInteraction = z.infer<typeof AIInteraction>;

/**
 * @description AI 상호작용 생성 요청
 * @returns 생성 요청 시 필요한 데이터 구조
 */
export const CreateAIInteractionRequest = CreateAIInteractionRequestSchema;
export type CreateAIInteractionRequest = z.infer<typeof CreateAIInteractionRequest>;

/**
 * @description AI 상호작용 업데이트 요청
 * @returns 업데이트 시 사용 가능한 필드들
 */
export const UpdateAIInteractionRequest = UpdateAIInteractionRequestSchema;
export type UpdateAIInteractionRequest = z.infer<typeof UpdateAIInteractionRequest>;

/**
 * @description AI 상호작용 목록 조회 쿼리
 * @returns 목록 조회에 사용할 필터 및 페이징 정보
 */
export const AIInteractionListQuery = AIInteractionListQuerySchema;
export type AIInteractionListQuery = z.infer<typeof AIInteractionListQuery>;

/**
 * @description AI 상호작용 통계 조회 쿼리
 * @returns 통계 조회를 위한 필터 조건
 */
export const AIInteractionStatsQuery = AIInteractionStatsQuerySchema;
export type AIInteractionStatsQuery = z.infer<typeof AIInteractionStatsQuery>;

/**
 * @description AI 상호작용 통계 응답
 * @returns 상호작용 통계 데이터
 */
export const AIInteractionStats = AIInteractionStatsSchema;
export type AIInteractionStats = z.infer<typeof AIInteractionStats>;

/**
 * @description AI 상호작용 응답
 * @returns AI 상호작용 단일 데이터 및 선택적 메시지 포함
 */
export const AIInteractionResponse = AIInteractionResponseSchema;
export type AIInteractionResponse = z.infer<typeof AIInteractionResponse>;

/**
 * @description AI 상호작용 목록 응답
 * @returns 데이터 배열과 페이지네이션 정보 포함
 */
export const AIInteractionsListResponse = AIInteractionsListResponseSchema;
export type AIInteractionsListResponse = z.infer<typeof AIInteractionsListResponse>;

/**
 * @description AI 상호작용 통계 응답
 * @returns 통계 데이터 및 쿼리 기간 포함
 */
export const AIInteractionStatsResponse = AIInteractionStatsResponseSchema;
export type AIInteractionStatsResponse = z.infer<typeof AIInteractionStatsResponse>;
