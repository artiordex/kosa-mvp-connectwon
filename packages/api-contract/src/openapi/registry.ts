/**
 * Description : registry.ts - 📌 OpenAPI 헬퍼/유틸
 * Author : Shiwoo Min
 * Date : 2025-09-11
 */
import type { OpenAPIV3 } from 'openapi-types';

// 레퍼런스 헬퍼
export const ref = (name: string): OpenAPIV3.ReferenceObject => ({
  $ref: `#/components/schemas/${name}`,
});

// 스키마 레퍼런스 헬퍼
export const respRef = (name: string): OpenAPIV3.ReferenceObject => ({
  $ref: `#/components/responses/${name}`,
});

// 파라미터 레퍼런스 헬퍼
export const paramRef = (name: string): OpenAPIV3.ReferenceObject => ({
  $ref: `#/components/parameters/${name}`,
});

// 문자열 열거형 스키마 헬퍼
export const stringEnum = (values: string[]): OpenAPIV3.SchemaObject => ({
  type: 'string',
  enum: values,
});

// 정수 열거형 스키마 헬퍼
export const intEnum = (values: number[]): OpenAPIV3.SchemaObject => ({
  type: 'integer',
  enum: values,
});

// 페이지네이션 스키마 헬퍼
export const cursorPage = (
  itemSchema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject,
): OpenAPIV3.SchemaObject => ({
  type: 'object',
  properties: {
    items: { type: 'array', items: itemSchema },
    meta: {
      type: 'object',
      properties: {
        nextCursor: { type: 'string', nullable: true },
        total: { type: 'integer', nullable: true },
      },
    },
  },
});

// JSON 요청 바디 헬퍼
export function jsonBody(
  schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject,
): OpenAPIV3.RequestBodyObject {
  return {
    required: true,
    content: { 'application/json': { schema } },
  };
}

// 200 응답 헬퍼
export function json200(
  schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject,
): OpenAPIV3.ResponsesObject {
  return {
    '200': { description: 'OK', content: { 'application/json': { schema } } },
  };
}
