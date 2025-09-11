/**
 * Description : setup.ts - 📌 OpenAPI Setup
 * Author      : Shiwoo Min
 * Date        : 2025-09-11
 */
import type { OpenAPIV3 } from 'openapi-types';

/**
 * 안전 보조 유틸
 */
function ensure<T extends object>(obj: T | undefined, factory: () => T): T {
  return obj ?? factory();
}
function pushUnique<T>(arr: T[], pred: (x: T) => boolean, item: T) {
  if (!arr.some(pred)) arr.push(item);
}
function defined<T extends object>(obj: T): Partial<T> {
  // exactOptionalPropertyTypes 대응: undefined 값 키는 제거
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined) out[k] = v;
  }
  return out as Partial<T>;
}

/**
 * 메인 설정(네가 제공한 내용 반영)
 */
export const openApiConfig: OpenAPIV3.Document = {
  openapi: '3.0.3',
  info: {
    title: 'Program Management API',
    description: `
# Program Management API

A comprehensive API for managing educational programs, sessions, venues, and reservations.

## Features
- **User Management**: Google OAuth integration with role-based access
- **Program Management**: Create and manage educational programs
- **Session Management**: Schedule and manage program sessions
- **Venue & Room Management**: Manage venues and room reservations
- **Participant Management**: Handle program enrollments and attendance
- **Payment Processing**: Manage session fees and payments
- **AI Integration**: Track AI interactions and analytics

## Authentication
This API uses JWT Bearer tokens for authentication. Most endpoints require authentication.
Google OAuth 2.0 is also supported for user authentication.

## Rate Limiting
API requests are rate-limited per user. Check response headers for current limits.

## Error Handling
All errors follow RFC 7807 Problem Details format with consistent structure.
    `.trim(),
    version: '1.0.0',
    contact: {
      name: 'API Support Team',
      email: 'api-support@example.com',
      url: 'https://example.com/support',
    },
    license: {
      name: 'MIT License',
      url: 'https://opensource.org/licenses/MIT',
    },
    termsOfService: 'https://example.com/terms',
  },
  servers: [
    { url: 'http://localhost:3000/api/v1', description: 'Development server' },
    { url: 'https://api-staging.example.com/v1', description: 'Staging server' },
    { url: 'https://api.example.com/v1', description: 'Production server' },
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
      // Pagination
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
      // Time-range
      createdAfter: {
        name: 'created_after',
        in: 'query',
        description: 'Filter items created after this timestamp',
        schema: { type: 'string', format: 'date-time', example: '2024-01-01T00:00:00Z' },
      },
      createdBefore: {
        name: 'created_before',
        in: 'query',
        description: 'Filter items created before this timestamp',
        schema: { type: 'string', format: 'date-time', example: '2024-12-31T23:59:59Z' },
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
    // 참고: 여기서 schemas.ApiError 등 추가 정의가 필요하다면 이 파일이나 document에서 보강 가능
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
 * 공통 헤더/예시 (필요 시 응답/요청에 재사용)
 */
export const commonHeaders: Record<string, OpenAPIV3.HeaderObject> = {
  'X-API-Version': {
    description: 'API version used for this request',
    schema: { type: 'string', example: '1.0.0' },
  },
  'X-Request-ID': {
    description: 'Unique request identifier for debugging',
    schema: { type: 'string', format: 'uuid' },
  },
  'X-Rate-Limit-Remaining': {
    description: 'Number of requests remaining in current window',
    schema: { type: 'integer' },
  },
  'X-Rate-Limit-Reset': {
    description: 'Time when the rate limit window resets',
    schema: { type: 'integer', format: 'int64' },
  },
};

export const exampleResponses = {
  userExample: {
    id: '12345',
    email: 'user@example.com',
    name: 'John Doe',
    google_sub: 'google_sub_12345',
    last_login_at: '2024-01-01T12:00:00Z',
    role_flags: 1,
    preferences: { theme: 'dark', notifications: true },
    created_at: '2024-01-01T10:00:00Z',
    updated_at: '2024-01-01T12:00:00Z',
  },
  programExample: {
    id: '67890',
    created_by_user_id: '12345',
    type: 'seminar',
    title: 'Introduction to Machine Learning',
    description: 'A comprehensive course on ML fundamentals',
    ai_summary_tags: ['machine-learning', 'beginner', 'python'],
    is_active: true,
    created_at: '2024-01-01T10:00:00Z',
    updated_at: '2024-01-01T12:00:00Z',
  },
};

/**
 * 기존 document에 openApiConfig를 "덮어쓰지 않고" 병합 적용
 * 사용법:
 *   import { document } from './document.js';
 *   import { applyOpenApiSetup } from './setup.js';
 *   applyOpenApiSetup(document);
 */
export function applyOpenApiSetup(
  doc: OpenAPIV3.Document,
  cfg: OpenAPIV3.Document = openApiConfig,
) {
  // info: 부족한 필드만 보강
  doc.info = { ...(doc.info ?? {}), ...defined(cfg.info ?? ({} as OpenAPIV3.InfoObject)) };

  // servers
  if (cfg.servers?.length) {
    doc.servers = ensure(doc.servers, () => []);
    for (const s of cfg.servers) {
      pushUnique(doc.servers, x => x.url === s.url, s);
    }
  }

  // tags
  if (cfg.tags?.length) {
    doc.tags = ensure(doc.tags, () => []);
    for (const t of cfg.tags) {
      const name = (t as OpenAPIV3.TagObject).name ?? String(t);
      pushUnique(doc.tags, x => x.name === name, t as OpenAPIV3.TagObject);
    }
  }

  // security (전역)
  if (cfg.security?.length) {
    doc.security = ensure(doc.security, () => []);
    for (const s of cfg.security) {
      // 단순 푸시(보통 중복되지 않음)
      doc.security.push(s);
    }
  }

  // components
  if (cfg.components) {
    doc.components = ensure(doc.components, () => ({}));

    // securitySchemes
    if (cfg.components.securitySchemes) {
      doc.components.securitySchemes = ensure(doc.components.securitySchemes, () => ({}));
      Object.assign(doc.components.securitySchemes, cfg.components.securitySchemes);
    }
    // parameters
    if (cfg.components.parameters) {
      doc.components.parameters = ensure(doc.components.parameters, () => ({}));
      Object.assign(doc.components.parameters, cfg.components.parameters);
    }
    // responses
    if (cfg.components.responses) {
      doc.components.responses = ensure(doc.components.responses, () => ({}));
      Object.assign(doc.components.responses, cfg.components.responses);
    }
    // headers
    if (cfg.components.headers) {
      doc.components.headers = ensure(doc.components.headers, () => ({}));
      Object.assign(doc.components.headers, cfg.components.headers);
    }
    // schemas (여기선 ApiError 같은 공통 스키마가 별도 정의되어 있을 수 있음)
    if (cfg.components.schemas) {
      doc.components.schemas = ensure(doc.components.schemas, () => ({}));
      Object.assign(doc.components.schemas, cfg.components.schemas);
    }
  }

  // paths (여기선 비워뒀지만, cfg.paths에 초기 경로가 있으면 병합)
  if (cfg.paths && Object.keys(cfg.paths).length > 0) {
    doc.paths = ensure(doc.paths, () => ({}));
    for (const [p, item] of Object.entries(cfg.paths)) {
      doc.paths[p] = { ...(doc.paths[p] ?? {}), ...(item ?? {}) };
    }
  }

  return doc;
}
