/**
 * Description: common.contract.ts - 📌  Zod를 사용하여 데이터 구조를 검증하며, 프로그램 타입 및 인터페이스 계약
 * Author: Shiwoo Min
 * Date: 2025-09-24
 */
import { z } from 'zod';

/**
 * @description 사용자 역할 열거형
 * @returns 'USER', 'CREATOR', 'ADMIN' 중 하나의 문자열
 */
export const UserRoleSchema = z.enum(['USER', 'CREATOR', 'ADMIN']);
export type UserRole = z.infer<typeof UserRoleSchema>;

/**
 * @description 인증 제공자 열거형
 * @returns 'local', 'google', 'kakao', 'github' 중 하나의 문자열
 */
export const AuthProviderSchema = z.enum(['local', 'google', 'kakao', 'github']);
export type AuthProvider = z.infer<typeof AuthProviderSchema>;

/**
 * @description 세션 상태 열거형
 * @returns 'SCHEDULED', 'CONFIRMED', 'CANCELLED', 'COMPLETED' 중 하나의 문자열
 */
export const SessionStatusSchema = z.enum(['SCHEDULED', 'CONFIRMED', 'CANCELLED', 'COMPLETED']);
export type SessionStatus = z.infer<typeof SessionStatusSchema>;

/**
 * @description 정렬 순서 열거형
 * @returns 'asc', 'desc' 중 하나의 문자열
 */
export const SortOrderSchema = z.enum(['asc', 'desc']);
export type SortOrder = z.infer<typeof SortOrderSchema>;

/**
 * @description 알림 설정 옵션 열거형
 * @returns 'EMAIL', 'SMS', 'PUSH', 'NONE' 중 하나의 문자열
 */
export const NotificationPreferenceSchema = z.enum(['EMAIL', 'SMS', 'PUSH', 'NONE']);
export type NotificationPreference = z.infer<typeof NotificationPreferenceSchema>;

/**
 * @description 날짜 범위 쿼리 스키마
 * @returns 선택적 시작 날짜(start_date)와 종료 날짜(end_date) 필드를 포함하는 객체
 */
export const DateRangeSchema = z.object({
  start_date: z.coerce.date().optional(),
  end_date: z.coerce.date().optional(),
});
export type DateRangeQuery = z.infer<typeof DateRangeSchema>;

/**
 * @description 페이지네이션 정보 스키마
 * @returns 페이지 번호(page), 항목 수(limit), 전체 항목 수(total), 총 페이지 수(total_pages)를 포함하는 객체
 */
export const PaginationInfoSchema = z.object({
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
  total_pages: z.number().int().min(0),
});
export type PaginationInfo = z.infer<typeof PaginationInfoSchema>;

/**
 * @description 검색 쿼리 파라미터 스키마
 * @returns 검색어(search), 페이지(page), 항목 수(limit), 정렬 기준(sort_by), 정렬 순서(sort_order) 등을 포함하는 객체
 */
export const SearchQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .default('1')
    .transform(val => {
      const num = parseInt(val, 10);
      if (isNaN(num) || num < 1) return 1;
      return num;
    }),
  limit: z
    .string()
    .optional()
    .default('20')
    .transform(val => {
      const num = parseInt(val, 10);
      if (isNaN(num) || num < 1 || num > 100) return 20;
      return Math.min(100, Math.max(1, num));
    }),
  search: z.string().optional(),
  sort_by: z.string().optional(),
  sort_order: SortOrderSchema.optional().default('desc'),
});
export type SearchQuery = z.infer<typeof SearchQuerySchema>;

/**
 * @description 기본 에러 응답 스키마
 * @returns error, message, code, details를 포함하는 객체
 */
export const ErrorResponseSchema = z.object({
  error: z.string(),
  message: z.string(),
  code: z.string().optional(),
  details: z.record(z.any()).optional(),
});
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

/**
 * @description 기본 성공 응답 스키마
 * @returns 성공 메시지(message)와 선택적 데이터(data)를 포함하는 객체
 */
export const BaseResponseSchema = z.object({
  message: z.string(),
});
export type BaseResponse = z.infer<typeof BaseResponseSchema>;
