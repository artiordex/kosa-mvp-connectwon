/**
 * Description : common.ts - 📌 공통 타입정의
 * Author : Shiwoo Min
 * Date : 2025-09-07
 */
import { z } from 'zod';

// 기본 응답 스키마
export const ErrorResponseSchema = z.object({
  error: z.string(),
  code: z.string().optional(),
  details: z.record(z.any()).optional(), // z.unknown()보다 구체적
});

export const SuccessResponseSchema = z.object({
  message: z.string(),
  data: z.unknown().optional(),
});

// 페이지네이션 스키마
// 실제 응답에서 사용될 페이지네이션 정보 (숫자 타입)
export const PaginationSchema = z.object({
  page: z.number().int().min(1),
  limit: z.number().int().min(1).max(100),
  total: z.number().int().min(0),
  pages: z.number().int().min(0),
});

// 커서 기반 페이지네이션 (무한 스크롤용)
export const CursorPaginationSchema = z.object({
  hasNext: z.boolean(),
  nextCursor: z.string().optional(),
  total: z.number().int().min(0).optional(),
});

// URL 파라미터용 (문자열)
export const IdParamSchema = z.object({
  id: z.string().min(1, 'ID가 필요합니다'),
});

// BigInt ID 파라미터 (문자열을 BigInt로 변환)
export const BigIntIdParamSchema = z.object({
  id: z
    .string()
    .min(1, 'ID가 필요합니다')
    .transform(val => {
      try {
        return BigInt(val);
      } catch {
        throw new Error('유효하지 않은 ID 형식입니다');
      }
    }),
});

// 원시 쿼리 파라미터 스키마 (실제 사용 전)
export const RawSearchQuerySchema = z.object({
  search: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

// 변환된 검색 쿼리 스키마 (실제 사용시)
export const SearchQuerySchema = z.object({
  search: z.string().optional(),
  page: z
    .string()
    .optional()
    .default('1')
    .transform(val => {
      const num = parseInt(val, 10);
      if (isNaN(num) || num < 1) {
        throw new Error('페이지는 1 이상의 정수여야 합니다');
      }
      return num;
    }),
  limit: z
    .string()
    .optional()
    .default('20')
    .transform(val => {
      const num = parseInt(val, 10);
      if (isNaN(num) || num < 1 || num > 100) {
        throw new Error('limit은 1-100 사이의 정수여야 합니다');
      }
      return num;
    }),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

// 필터링 스키마
export const DateRangeSchema = z
  .object({
    startDate: z
      .string()
      .optional()
      .transform(val => (val ? new Date(val) : undefined))
      .refine(date => !date || !isNaN(date.getTime()), '유효한 시작 날짜를 입력해주세요'),
    endDate: z
      .string()
      .optional()
      .transform(val => (val ? new Date(val) : undefined))
      .refine(date => !date || !isNaN(date.getTime()), '유효한 종료 날짜를 입력해주세요'),
  })
  .refine(
    data => {
      if (data.startDate && data.endDate) {
        return data.startDate <= data.endDate;
      }
      return true;
    },
    {
      message: '시작 날짜는 종료 날짜보다 이전이어야 합니다',
      path: ['startDate'],
    },
  );

// 기본 필터 스키마
export const BaseFilterSchema = z.intersection(
  SearchQuerySchema.extend({
    isActive: z
      .string()
      .optional()
      .transform(val => {
        if (val === undefined) return undefined;
        if (val === 'true') return true;
        if (val === 'false') return false;
        throw new Error('isActive는 true 또는 false여야 합니다');
      }),
  }),
  DateRangeSchema,
);

// 문자열을 숫자로 변환하는 스키마
export const StringToNumberSchema = z.string().transform(val => {
  const num = parseFloat(val);
  if (isNaN(num)) {
    throw new Error('유효한 숫자가 아닙니다');
  }
  return num;
});

// 문자열을 정수로 변환하는 스키마
export const StringToIntSchema = z.string().transform(val => {
  const num = parseInt(val, 10);
  if (isNaN(num)) {
    throw new Error('유효한 정수가 아닙니다');
  }
  return num;
});

// 문자열을 BigInt로 변환하는 스키마
export const StringToBigIntSchema = z.string().transform(val => {
  try {
    return BigInt(val);
  } catch {
    throw new Error('유효한 BigInt가 아닙니다');
  }
});

// 부울 값 변환 스키마
export const StringToBooleanSchema = z.string().transform(val => {
  if (val === 'true' || val === '1') return true;
  if (val === 'false' || val === '0') return false;
  throw new Error('부울 값은 true/false 또는 1/0이어야 합니다');
});

// 검증 헬퍼 함수
export function parseSearchQuery(query: Record<string, string | undefined>) {
  return SearchQuerySchema.parse(query);
}

// ID 파라미터 검증 헬퍼
export function parseIdParam(params: Record<string, string>) {
  return IdParamSchema.parse(params);
}

// BigInt ID 파라미터 검증 헬퍼
export function parseBigIntIdParam(params: Record<string, string>) {
  return BigIntIdParamSchema.parse(params);
}

// 타입 정의
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
export type SuccessResponse = z.infer<typeof SuccessResponseSchema>;
export type Pagination = z.infer<typeof PaginationSchema>;
export type CursorPagination = z.infer<typeof CursorPaginationSchema>;
export type IdParam = z.infer<typeof IdParamSchema>;
export type BigIntIdParam = z.infer<typeof BigIntIdParamSchema>;
export type SearchQuery = z.infer<typeof SearchQuerySchema>;
export type RawSearchQuery = z.infer<typeof RawSearchQuerySchema>;
export type DateRange = z.infer<typeof DateRangeSchema>;
export type BaseFilter = z.infer<typeof BaseFilterSchema>;

// 상수 정의
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;
export const DEFAULT_SORT_ORDER = 'desc' as const;

// 페이지네이션 헬퍼
export function createPaginationInfo(page: number, limit: number, total: number): Pagination {
  const pages = Math.ceil(total / limit);
  return {
    page,
    limit,
    total,
    pages,
  };
}

// 커서 페이지네이션 헬퍼
export function createCursorPagination(
  hasNext: boolean,
  nextCursor?: string,
  total?: number,
): CursorPagination {
  return {
    hasNext,
    nextCursor,
    total,
  };
}

// API 응답 헬퍼
export function createSuccessResponse(): { message: string };
export function createSuccessResponse<T>(data: T, message?: string): { message: string; data: T };
export function createSuccessResponse<T>(data?: T, message = '성공') {
  const base = { message };
  if (data === undefined) return base;
  return { ...base, data };
}

// 에러 클래스
export class ValidationError extends Error {
  constructor(
    message: string,
    public field?: string,
    public code: string = 'VALIDATION_ERROR',
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

// 파싱 에러 클래스
export class ParseError extends Error {
  constructor(
    message: string,
    public field?: string,
    public code: string = 'PARSE_ERROR',
  ) {
    super(message);
    this.name = 'ParseError';
  }
}
