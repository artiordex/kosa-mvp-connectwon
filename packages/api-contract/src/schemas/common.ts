/**
 * Description : common.ts - 📌 공통 타입정의
 * Author : Shiwoo Min
 * Date : 2025-09-07
 */
import { z } from 'zod';

/**
 * @description 기본 에러 응답 스키마
 */
export const ErrorResponseSchema = z.object({
  error: z.string(),
  code: z.string().optional(),
  details: z.record(z.any()).optional(), // 구체적 오류 정보
});

/**
 * @description 기본 성공 응답 스키마
 */
export const SuccessResponseSchema = z.object({
  message: z.string(),
  data: z.unknown().optional(),
});

/**
 * @description 페이지네이션 정보 스키마 (숫자 타입)
 */
export const PaginationSchema = z.object({
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
  pages: z.number().int().min(0),
});

/**
 * @description 커서 기반 페이지네이션 스키마 (무한 스크롤용)
 */
export const CursorPaginationSchema = z.object({
  hasNext: z.boolean(),
  nextCursor: z.string().optional(),
  total: z.number().int().optional(),
});

/**
 * @description URL 파라미터용 기본 ID 스키마 (문자열)
 */
export const IdParamSchema = z.object({
  id: z.string().min(1, "ID가 필요합니다"),
});

/**
 * @description URL 파라미터용 BigInt 변환 ID 스키마
 */
export const BigIntIdParamSchema = z.object({
  id: z.string()
    .min(1, "ID가 필요합니다")
    .transform(val => {
      try {
        return BigInt(val);
      } catch {
        throw new Error("유효하지 않은 ID 형식입니다");
      }
    }),
});

/**
 * @description 원시 쿼리 파라미터 스키마 (전환 전)
 */
export const RawSearchQuerySchema = z.object({
  search: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

/**
 * @description 필드 변환 후 쿼리 파라미터 스키마
 */
export const SearchQuerySchema = z.object({
  search: z.string().optional(),
  page: z.string()
    .optional()
    .default("1")
    .transform(val => {
      const num = parseInt(val, 10);
      if (isNaN(num) || num < 1)
        throw new Error("페이지는 1 이상의 정수여야 합니다");
      return num;
    }),
  limit: z.string()
    .optional()
    .default("20")
    .transform(val => {
      const num = parseInt(val, 10);
      if (isNaN(num) || num < 1 || num > 100)
        throw new Error("limit은 1-100 사이의 정수여야 합니다");
      return num;
    }),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
});

/**
 * @description 날짜 범위 필터 스키마
 */
export const DateRangeSchema = z.object({
  startDate: z.string()
    .optional()
    .transform(val => val ? new Date(val) : undefined)
    .refine(date => !date || !isNaN(date.getTime()), "유효한 시작 날짜를 입력해주세요"),
  endDate: z.string()
    .optional()
    .transform(val => val ? new Date(val) : undefined)
    .refine(date => !date || !isNaN(date.getTime()), "유효한 종료 날짜를 입력해주세요"),
}).refine(
  data => {
    if (data.startDate && data.endDate) {
      return data.startDate <= data.endDate;
    }
    return true;
  },
  {
    message: "시작 날짜는 종료 날짜보다 이전이어야 합니다",
    path: ["startDate"],
  }
);

/**
 * @description 기본 필터 스키마 (검색, 상태 등 포함)
 */
export const BaseFilterSchema = z.intersection(
  SearchQuerySchema.extend({
    isActive: z.string()
      .optional()
      .transform(val => {
        if (val === undefined) return undefined;
        if (val === "true") return true;
        if (val === "false") return false;
        throw new Error("isActive는 true 또는 false여야 합니다");
      }),
  }),
  DateRangeSchema,
);

/**
 * @description 문자 -> 숫자 변환 스키마
 */
export const StringToNumberSchema = z.string().transform(val => {
  const num = parseFloat(val);
  if (isNaN(num)) throw new Error("유효한 숫자가 아닙니다");
  return num;
});

/**
 * @description 문자 -> 정수 변환 스키마
 */
export const StringToIntSchema = z.string().transform(val => {
  const num = parseInt(val, 10);
  if (isNaN(num)) throw new Error("유효한 정수가 아닙니다");
  return num;
});

/**
 * @description 문자 -> 부울 변환 스키마
 */
export const StringToBooleanSchema = z.string().transform(val => {
  if (val === "true" || val === "1") return true;
  if (val === "false" || val === "0") return false;
  throw new Error("부울 값은 true/false 또는 1/0이어야 합니다");
});

/**
 * @description 파싱 전 원시 쿼리 파라미터를 SearchQuerySchema를 통해 검증
 * @param query 원시 쿼리 파라미터 객체
 * @returns 검증 후 타입 변환된 파라미터 객체
 */
export function parseQueryParams(query: Record<string, string | undefined>) {
  return SearchQuerySchema.parse(query);
}

/**
 * @description ID 파라미터 검증 함수
 */
export function parseIdParam(params: Record<string, string>) {
  return IdParamSchema.parse(params);
}

/**
 * @description BigInt ID 파라미터 검증 함수
 */
export function parseBigIntIdParam(params: Record<string, string>) {
  return BigIntIdParamSchema.parse(params);
}

/**
 * @description 기본 상수값들
 */
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;
export const DEFAULT_SORT_ORDER = "desc";

/**
 * @description 페이지네이션 정보 생성 함수
 */
export function createPaginationInfo(page: number, limit: number, total: number) {
  const pages = Math.ceil(total / limit);
  return {
    page,
    limit,
    total,
    pages,
  };
}

/**
 * @description 커서 기반 페이지네이션 생성 함수
 */
export function createCursorPagination(hasNext: boolean, nextCursor?: string, total?: number) {
  return {
    hasNext,
    nextCursor,
    total,
  };
}

/**
 * @description 간단 성공 응답 생성 함수
 */
export function createSuccessResponse<T>(data?: T, message = "성공") {
  const base = { message };
  if (data === undefined) return base as { message: string };
  return { ...base, data } as { message: string; data: T };
}

/**
 * @class ValidationError
 * @extends Error
 * @description Validation 오류를 나타내는 커스텀 에러 클래스
 */
export class ValidationError extends Error {
  public field?: string | undefined;
  public code: string;

  constructor(message: string, field?: string, code = "VALIDATION_ERROR") {
    super(message);
    this.field = field;
    this.code = code;
    this.name = "ValidationError";
  }
}

/**
 * @class ParseError
 * @extends Error
 * @description 파싱 중 발생하는 오류를 나타내는 커스텀 에러 클래스
 */
export class ParseError extends Error {
  public field?: string | undefined;
  public code: string;

  constructor(message: string, field?: string, code = 'PARSE_ERROR') {
    super(message);
    this.field = field;
    this.code = code;
    this.name = 'ParseError';
  }
}
