/**
 * Description : setup.ts - 📌 OpenAPI Setup
 * Author : Shiwoo Min
 * Date : 2025-09-11
 * 09-21 - 주석 보강
 */
import type { OpenAPIV3 } from 'openapi-types';

/**
 * @description 객체가 없으면 팩토리로 새 객체 생성하는 유틸 함수
 * @param obj 기존 객체 또는 undefined
 * @param factory 객체 생성 팩토리 함수
 * @returns 기존 객체 또는 새로 생성한 객체
 */
function ensure<T extends object>(obj: T | undefined, factory: () => T): T {
  return obj ?? factory();
}

/**
 * @description 배열에 중복을 검사하여 조건에 맞는 아이템이 없으면 추가하는 유틸
 * @param arr 대상 배열
 * @param pred 중복 검사 함수
 * @param item 추가할 아이템
 */
function pushUnique<T>(arr: T[], pred: (x: T) => boolean, item: T) {
  if (!arr.some(pred)) arr.push(item);
}

/**
 * @description 객체에서 undefined인 키를 필터링하여 제거한 새 객체 반환
 * @param obj 원본 객체
 * @returns undefined 값이 제거된 부분 객체
 */
function defined<T extends object>(obj: T): Partial<T> {
  // exactOptionalPropertyTypes 대응: undefined 값 키는 제거
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined) out[k] = v;
  }
  return out as Partial<T>;
}

/**
 * @description OpenAPI 기본 설정 문서
 */
export const openApiConfig: OpenAPIV3.Document = {
  openapi: '3.0.3',
  info: {
    title: 'ConnectWon OpenAPI API 문서',
    description: `
# 커넥트원 API

프로그램, 세션, 장소, 예약 등을 관리하는 API입니다.

## 주요 기능
- 사용자 관리: Google OAuth 기반의 역할별 접근 제어
- 프로그램 관리: 교육 프로그램 생성 및 관리
- 세션 관리: 프로그램 세션 일정 관리
- 장소 및 공간 관리: 시설 예약 관리
- 참가자 관리: 등록 및 참석 처리
- 결제 처리: 수수료 및 결제 관리
- AI 통합: AI 사용 기록 및 분석

## API 규약
- 인증: JWT Bearer 토큰 및 Google OAuth 2.0 지원
- 오류: RFC 7807 표준 Problem Details 형식 준수
- 요청 제한: 사용자별 요청 제한 (응답 헤더에서 확인)
    `.trim(),
    version: '1.0.0',
    contact: {
      name: process.env['CONTACT_NAME'] || 'API Support',
      email: process.env['CONTACT_EMAIL'] || 'api-support@example.com',
      url: process.env['CONTACT_URL'] || 'https://example.com/support',
    },
    license: {
      name: 'MIT License',
      url: 'https://opensource.org/licenses/MIT',
    },
    termsOfService: 'https://example.com/terms',
  },
  servers: [
    {
      url: process.env['DEV_SERVER_URL'] || 'http://localhost:3000/api/v1',
      description: 'Development server',
    },
    {
      url: process.env['STAGING_SERVER_URL'] || 'https://api-staging.example.com/v1',
      description: 'Staging server',
    },
    {
      url: process.env['PROD_SERVER_URL'] || 'https://api.example.com/v1',
      description: 'Production server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'JWT Bearer token for API authentication',
      },
      googleOAuth: {
        type: 'oauth2',
        description: 'Google OAuth 2.0 for user authentication',
        flows: {
          authorizationCode: {
            authorizationUrl: 'https://accounts.google.com/o/oauth2/auth',
            tokenUrl: 'https://oauth2.googleapis.com/token',
            scopes: {
              openid: 'OpenID Connect authentication',
              email: 'Access to user email address',
              profile: 'Access to user profile information',
            },
          },
        },
      },
    },
    parameters: {
      page: {
        name: 'page',
        in: 'query',
        description: 'Page number for pagination (1-based indexing)',
        schema: { type: 'integer', minimum: 1, default: 1, example: 1 },
      },
      limit: {
        name: 'limit',
        in: 'query',
        description: 'Maximum number of items per page',
        schema: { type: 'integer', minimum: 1, maximum: 100, default: 20, example: 20 },
      },
      sortBy: {
        name: 'sort_by',
        in: 'query',
        description: 'Field name to sort results by',
        schema: { type: 'string', example: 'created_at' },
      },
      sortOrder: {
        name: 'sort_order',
        in: 'query',
        description: 'Sort direction for results',
        schema: { type: 'string', enum: ['asc', 'desc'], default: 'desc', example: 'desc' },
      },
      createdBefore: {
        name: 'created_before',
        in: 'query',
        description: 'Filter items created before this timestamp',
        schema: { type: 'string', format: 'date-time', example: '2024-12-31T23:59:59Z' },
      },
      createdAfter: {
        name: 'created_after',
        in: 'query',
        description: 'Filter items created after this timestamp',
        schema: { type: 'string', format: 'date-time', example: '2024-01-01T00:00:00Z' },
      },
    },
    responses: {
      BadRequest: {
        description: 'Bad request - invalid input parameters',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ApiError' },
            example: {
              error: 'VALIDATION_ERROR',
              message: 'Invalid request parameters',
              status_code: 400,
              details: { field: 'email', reason: 'Invalid email format' },
              timestamp: '2024-01-01T12:00:00Z',
            },
          },
        },
      },
      Unauthorized: {
        description: 'Unauthorized - authentication required',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ApiError' },
            example: {
              error: 'UNAUTHORIZED',
              message: 'Authentication token required',
              status_code: 401,
              timestamp: '2024-01-01T12:00:00Z',
            },
          },
        },
      },
      Forbidden: {
        description: 'Forbidden - insufficient permissions',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ApiError' },
            example: {
              error: 'FORBIDDEN',
              message: 'Insufficient permissions to access this resource',
              status_code: 403,
              timestamp: '2024-01-01T12:00:00Z',
            },
          },
        },
      },
      NotFound: {
        description: 'Resource not found',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ApiError' },
            example: {
              error: 'NOT_FOUND',
              message: 'Requested resource not found',
              status_code: 404,
              timestamp: '2024-01-01T12:00:00Z',
            },
          },
        },
      },
      Conflict: {
        description: 'Conflict - resource already exists or constraint violation',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ApiError' },
            example: {
              error: 'CONFLICT',
              message: 'Resource already exists or constraint violation',
              status_code: 409,
              details: { constraint: 'unique_email', value: 'user@example.com' },
              timestamp: '2024-01-01T12:00:00Z',
            },
          },
        },
      },
      UnprocessableEntity: {
        description: 'Unprocessable entity - validation error',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ApiError' },
            example: {
              error: 'VALIDATION_ERROR',
              message: 'Request validation failed',
              status_code: 422,
              details: {
                errors: [{ field: 'ends_at', message: 'End time must be after start time' }],
              },
              timestamp: '2024-01-01T12:00:00Z',
            },
          },
        },
      },
      TooManyRequests: {
        description: 'Too many requests - rate limit exceeded',
        headers: {
          'X-Rate-Limit-Remaining': {
            description: 'Number of requests remaining in current window',
            schema: { type: 'integer' },
          },
          'X-Rate-Limit-Reset': {
            description: 'Time when the rate limit window resets',
            schema: { type: 'integer', format: 'int64' },
          },
        },
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ApiError' },
            example: {
              error: 'RATE_LIMIT_EXCEEDED',
              message: 'Too many requests, please try again later',
              status_code: 429,
              timestamp: '2024-01-01T12:00:00Z',
            },
          },
        },
      },
      InternalServerError: {
        description: 'Internal server error',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ApiError' },
            example: {
              error: 'INTERNAL_SERVER_ERROR',
              message: 'An unexpected error occurred',
              status_code: 500,
              timestamp: '2024-01-01T12:00:00Z',
            },
          },
        },
      },
    },
    headers: {
      'X-API-Version': {
        description: 'API version used for this request',
        schema: { type: 'string', example: '1.0.0' },
      },
      'X-Request-ID': {
        description: 'Unique identifier for this request',
        schema: { type: 'string', format: 'uuid', example: '550e8400-e29b-41d4-a716-446655440000' },
      },
      'X-Rate-Limit-Remaining': {
        description: 'Number of requests remaining in current rate limit window',
        schema: { type: 'integer', example: 99 },
      },
      'X-Rate-Limit-Reset': {
        description: 'Unix timestamp when the rate limit window resets',
        schema: { type: 'integer', format: 'int64', example: 1640995200 },
      },
    },
  },
  security: [{ bearerAuth: [] }],
  paths: {},
  tags: [
    { name: 'System', description: 'System health and utility endpoints' },
    { name: 'Authentication', description: 'User authentication and session management' },
    { name: 'Users', description: 'User profile and account management' },
    { name: 'Programs', description: 'Educational program management' },
    { name: 'Sessions', description: 'Program session scheduling and management' },
    { name: 'Venues', description: 'Venue and facility management' },
    { name: 'Rooms', description: 'Room management within venues' },
    { name: 'Reservations', description: 'Room reservation and booking management' },
    { name: 'Participants', description: 'Program participant and enrollment management' },
    { name: 'Payments', description: 'Payment processing and transaction management' },
    { name: 'AI Interactions', description: 'AI service usage tracking and analytics' },
  ],
};

/**
 * @description OpenAPI 문서에 기본 설정을 병합 적용하는 함수
 * @param doc 대상 OpenAPI 문서
 * @param cfg 기본 설정 문서 (기본값: openApiConfig)
 * @returns 병합 후 OpenAPI 문서 반환
 */
export function applyOpenApiSetup(doc: OpenAPIV3.Document, cfg: OpenAPIV3.Document = openApiConfig) {
  doc.info = { ...(doc.info ?? {}), ...defined(cfg.info ?? ({} as OpenAPIV3.InfoObject)) };

  if (cfg.servers?.length) {
    doc.servers = ensure(doc.servers, () => []);
    for (const s of cfg.servers) {
      pushUnique(doc.servers, x => x.url === s.url, s);
    }
  }

  if (cfg.tags?.length) {
    doc.tags = ensure(doc.tags, () => []);
    for (const t of cfg.tags) {
      const name = (t as OpenAPIV3.TagObject).name ?? String(t);
      pushUnique(doc.tags, x => x.name === name, t as OpenAPIV3.TagObject);
    }
  }

  if (cfg.security?.length) {
    doc.security = ensure(doc.security, () => []);
    for (const s of cfg.security) {
      doc.security.push(s);
    }
  }

  if (cfg.components) {
    doc.components = ensure(doc.components, () => ({}));

    if (cfg.components.securitySchemes) {
      doc.components.securitySchemes = ensure(doc.components.securitySchemes, () => ({}));
      Object.assign(doc.components.securitySchemes, cfg.components.securitySchemes);
    }
    if (cfg.components.parameters) {
      doc.components.parameters = ensure(doc.components.parameters, () => ({}));
      Object.assign(doc.components.parameters, cfg.components.parameters);
    }
    if (cfg.components.responses) {
      doc.components.responses = ensure(doc.components.responses, () => ({}));
      Object.assign(doc.components.responses, cfg.components.responses);
    }
    if (cfg.components.headers) {
      doc.components.headers = ensure(doc.components.headers, () => ({}));
      Object.assign(doc.components.headers, cfg.components.headers);
    }
    if (cfg.components.schemas) {
      doc.components.schemas = ensure(doc.components.schemas, () => ({}));
      Object.assign(doc.components.schemas, cfg.components.schemas);
    }
  }

  if (cfg.paths && Object.keys(cfg.paths).length > 0) {
    doc.paths = ensure(doc.paths, () => ({}));
    for (const [p, item] of Object.entries(cfg.paths)) {
      doc.paths[p] = { ...(doc.paths[p] ?? {}), ...(item ?? {}) };
    }
  }

  return doc;
}
