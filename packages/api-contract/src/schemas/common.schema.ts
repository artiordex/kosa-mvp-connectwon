/**
 * Description: common.schema.ts - 📌 common.contract.ts에서 정의된 Zod 스키마를 가져와서 DTO 대신 사용
 * Author: Shiwoo Min
 * Date: 2025-09-07
 */
import {
  BaseResponseSchema,
  DateRangeSchema,
  ErrorResponseSchema,
  NotificationPreferenceSchema,
  PaginationInfoSchema,
  SearchQuerySchema,
  SortOrderSchema,
} from '../contracts/common.contract.js';
import { z } from 'zod';

/**
 * @description 기본 에러 응답 타입
 * @returns error, message, code, details를 포함하는 객체
 */
export const ErrorResponse = ErrorResponseSchema;
export type ErrorResponse = z.infer<typeof ErrorResponse>;

/**
 * @description 기본 성공 응답 타입
 * @returns 성공 메시지(message)와 선택적 데이터(data)를 포함하는 객체
 */
export const BaseResponse = BaseResponseSchema;
export type BaseResponse = z.infer<typeof BaseResponse>;

/**
 * @description 페이지네이션 정보 타입
 * @returns page, limit, total, total_pages를 포함하는 객체
 */
export const PaginationInfo = PaginationInfoSchema;
export type PaginationInfo = z.infer<typeof PaginationInfo>;

/**
 * @description 검색 쿼리 파라미터 타입
 * @returns search, page, limit, sort_by, sort_order 등을 포함하는 객체
 */
export const SearchQuery = SearchQuerySchema;
export type SearchQuery = z.infer<typeof SearchQuery>;

/**
 * @description 날짜 범위 쿼리 타입
 * @returns start_date와 end_date를 포함하는 객체
 */
export const DateRangeQuery = DateRangeSchema;
export type DateRangeQuery = z.infer<typeof DateRangeQuery>;

/**
 * @description 정렬 순서 타입
 * @returns 'asc' 또는 'desc' 중 하나의 문자열
 */
export const SortOrder = SortOrderSchema;
export type SortOrder = z.infer<typeof SortOrder>;

/**
 * @description 알림 설정 옵션 타입
 * @returns 'EMAIL', 'SMS', 'PUSH', 'NONE' 중 하나의 문자열
 */
export const NotificationPreference = NotificationPreferenceSchema;
export type NotificationPreference = z.infer<typeof NotificationPreference>;
