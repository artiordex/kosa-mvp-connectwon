/**
 * Description : registry.ts - 📌 OpenAPI 헬퍼/유틸
 * Author      : Shiwoo Min
 * Date        : 2025-09-11
 */
import type { OpenAPIV3 } from 'openapi-types';

// ===== 레퍼런스 헬퍼 =====
export const ref = (name: string): OpenAPIV3.ReferenceObject => ({
  $ref: `#/components/schemas/${name}`,
});

export const respRef = (name: string): OpenAPIV3.ReferenceObject => ({
  $ref: `#/components/responses/${name}`,
});

export const paramRef = (name: string): OpenAPIV3.ReferenceObject => ({
  $ref: `#/components/parameters/${name}`,
});

// ===== 스키마 헬퍼 =====
export const stringEnum = (values: string[]): OpenAPIV3.SchemaObject => ({
  type: 'string',
  enum: values,
});

export const intEnum = (values: number[]): OpenAPIV3.SchemaObject => ({
  type: 'integer',
  enum: values,
});

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

// ===== Operation 헬퍼 =====
export function jsonBody(
  schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject,
): OpenAPIV3.RequestBodyObject {
  return {
    required: true,
    content: { 'application/json': { schema } },
  };
}

export function json200(
  schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject,
): OpenAPIV3.ResponsesObject {
  return {
    '200': { description: 'OK', content: { 'application/json': { schema } } },
  };
}
