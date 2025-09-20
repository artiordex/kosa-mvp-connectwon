/**
 * Description : registry.ts - 📌 OpenAPI 헬퍼/유틸
 * Author : Shiwoo Min
 * Date : 2025-09-11
 */
import type { OpenAPIV3 } from 'openapi-types';

/**
 * @description OpenAPI 컴포넌트 스키마 레퍼런스 생성 헬퍼
 * @param name 스키마 이름
 * @returns OpenAPI ReferenceObject
 */
export const ref = (name: string): OpenAPIV3.ReferenceObject => ({
  $ref: `#/components/schemas/${name}`,
});

/**
 * @description OpenAPI 컴포넌트 응답 레퍼런스 생성 헬퍼
 * @param name 응답 이름
 * @returns OpenAPI ReferenceObject
 */
export const respRef = (name: string): OpenAPIV3.ReferenceObject => ({
  $ref: `#/components/responses/${name}`,
});

/**
 * @description OpenAPI 컴포넌트 파라미터 레퍼런스 생성 헬퍼
 * @param name 파라미터 이름
 * @returns OpenAPI ReferenceObject
 */
export const paramRef = (name: string): OpenAPIV3.ReferenceObject => ({
  $ref: `#/components/parameters/${name}`,
});

/**
 * @description 문자열 열거형 스키마 생성 헬퍼
 * @param values 문자열 enum 값 배열
 * @returns OpenAPI SchemaObject
 */
export const stringEnum = (values: string[]): OpenAPIV3.SchemaObject => ({
  type: 'string',
  enum: values,
});

/**
 * @description 정수 열거형 스키마 생성 헬퍼
 * @param values 정수 enum 값 배열
 * @returns OpenAPI SchemaObject
 */
export const intEnum = (values: number[]): OpenAPIV3.SchemaObject => ({
  type: 'integer',
  enum: values,
});

/**
 * @description 커서기반 페이지네이션 스키마 생성 헬퍼
 * @param itemSchema 페이지네이션 대상 아이템 스키마
 * @returns OpenAPI SchemaObject
 */
export const cursorPage = (itemSchema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject): OpenAPIV3.SchemaObject => ({
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

/**
 * @description JSON 요청 바디 스키마 생성 헬퍼
 * @param schema 요청 바디 스키마
 * @returns OpenAPI RequestBodyObject
 */
export function jsonBody(schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject): OpenAPIV3.RequestBodyObject {
  return {
    required: true,
    content: { 'application/json': { schema } },
  };
}

/**
 * @description 200 OK 응답 스키마 생성 헬퍼
 * @param schema 응답 스키마
 * @returns OpenAPI ResponsesObject
 */
export function json200(schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject): OpenAPIV3.ResponsesObject {
  return {
    '200': { description: 'OK', content: { 'application/json': { schema } } },
  };
}
