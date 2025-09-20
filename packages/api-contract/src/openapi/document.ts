/**
 * Description : document.ts - 📌 OpenAPI 문서화 관련 타입정의
 * Author : Shiwoo Min
 * Date : 2025-09-11
 * 09-21 - 주석 보강
 */
import { OpenAPIV3 } from 'openapi-types';

/**
 * @description OpenAPI 문서 객체 - API 명세의 기본 구조
 * @returns {OpenAPIV3.Document} 완전한 OpenAPI 문서 객체
 */
export const document: OpenAPIV3.Document = {
  openapi: '3.0.3',
  info: { title: 'Connectwon API', version: '1.0.0' },
  paths: {},
  components: { schemas: {} },
  tags: [],
};

/**
 * @description OpenAPI 경로 객체 - 모든 API 엔드포인트 정의
 * @returns {OpenAPIV3.PathsObject} API 경로들의 완전한 정의
 */
export const paths: OpenAPIV3.PathsObject = {
  // 시스템 헬스체크 엔드포인트
  '/health': {
    get: {
      tags: ['System'],
      summary: 'System health check',
      description: 'Check the health status of the API and its dependencies',
      operationId: 'getHealth',
      security: [],
      responses: {
        '200': {
          description: 'System health status',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/HealthCheckResponse' },
            },
          },
        },
        '503': {
          description: 'Service unavailable',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/HealthCheckResponse' },
            },
          },
        },
      },
    },
  },

  // 사용자 로그인 및 인증 관련 엔드포인트
  '/auth/login': {
    post: {
      tags: ['Authentication'],
      summary: 'User authentication',
      description: 'Authenticate user with Google OAuth or email/password credentials',
      operationId: 'login',
      security: [],
      requestBody: {
        required: true,
        description: 'Authentication credentials',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/LoginRequest' },
            examples: {
              google_auth: {
                summary: 'Google OAuth login',
                value: {
                  google_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjE2NzAyN...',
                },
              },
              email_password: {
                summary: 'Email/password login',
                value: {
                  email: 'user@example.com',
                  password: 'securePassword123',
                },
              },
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Login successful',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LoginResponse' },
            },
          },
        },
        '400': { $ref: '#/components/responses/BadRequest' },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '429': { $ref: '#/components/responses/TooManyRequests' },
      },
    },
  },

  // 토큰 리프레시
  '/auth/refresh': {
    post: {
      tags: ['Authentication'],
      summary: 'Refresh access token',
      description: 'Get a new access token using a valid refresh token',
      operationId: 'refreshToken',
      security: [],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/RefreshTokenRequest' },
          },
        },
      },
      responses: {
        '200': {
          description: 'Token refreshed successfully',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LoginResponse' },
            },
          },
        },
        '400': { $ref: '#/components/responses/BadRequest' },
        '401': { $ref: '#/components/responses/Unauthorized' },
      },
    },
  },

  // 사용자 로그아웃
  '/auth/logout': {
    post: {
      tags: ['Authentication'],
      summary: 'User logout',
      description: 'Logout user and invalidate all tokens',
      operationId: 'logout',
      responses: {
        '200': {
          description: 'Logout successful',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string', example: 'Logged out successfully' },
                },
              },
            },
          },
        },
        '401': { $ref: '#/components/responses/Unauthorized' },
      },
    },
  },

  // 사용자 프로필 조회
  '/auth/profile': {
    get: {
      tags: ['Authentication'],
      summary: 'Get current user profile',
      description: "Retrieve the authenticated user's profile information",
      operationId: 'getProfile',
      responses: {
        '200': {
          description: 'User profile retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/User' },
                  message: { type: 'string' },
                },
              },
            },
          },
        },
        '401': { $ref: '#/components/responses/Unauthorized' },
      },
    },
  },

  // 사용자 관리 관련 엔드포인트
  '/users': {
    get: {
      tags: ['Users'],
      summary: 'List users',
      description: 'Get a paginated list of users with optional filtering',
      operationId: 'getUsers',
      parameters: [
        { $ref: '#/components/parameters/page' },
        { $ref: '#/components/parameters/limit' },
        { $ref: '#/components/parameters/sortBy' },
        { $ref: '#/components/parameters/sortOrder' },
        {
          name: 'email',
          in: 'query',
          description: 'Filter by email address',
          schema: { type: 'string', format: 'email' },
        },
        {
          name: 'role_flags',
          in: 'query',
          description: 'Filter by role flags (bitmask)',
          schema: { type: 'integer', minimum: 0 },
        },
        {
          name: 'name',
          in: 'query',
          description: 'Filter by name (partial match)',
          schema: { type: 'string' },
        },
        { $ref: '#/components/parameters/createdAfter' },
        { $ref: '#/components/parameters/createdBefore' },
      ],
      responses: {
        '200': {
          description: 'Users retrieved successfully',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UsersListResponse' },
            },
          },
        },
        '400': { $ref: '#/components/responses/BadRequest' },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '403': { $ref: '#/components/responses/Forbidden' },
      },
    },
    post: {
      tags: ['Users'],
      summary: 'Create user',
      description: 'Create a new user account',
      operationId: 'createUser',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateUserRequest' },
          },
        },
      },
      responses: {
        '201': {
          description: 'User created successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/User' },
                  message: { type: 'string', example: 'User created successfully' },
                },
              },
            },
          },
        },
        '400': { $ref: '#/components/responses/BadRequest' },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '403': { $ref: '#/components/responses/Forbidden' },
        '409': { $ref: '#/components/responses/Conflict' },
      },
    },
  },

  // 사용자 개별 관리 엔드포인트
  '/users/{id}': {
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        description: 'User identifier',
        schema: { type: 'string' },
        example: '12345',
      },
    ],
    get: {
      tags: ['Users'],
      summary: 'Get user by ID',
      description: 'Retrieve a specific user by their ID',
      operationId: 'getUser',
      responses: {
        '200': {
          description: 'User retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/User' },
                  message: { type: 'string' },
                },
              },
            },
          },
        },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '403': { $ref: '#/components/responses/Forbidden' },
        '404': { $ref: '#/components/responses/NotFound' },
      },
    },
    put: {
      tags: ['Users'],
      summary: 'Update user',
      description: "Update a user's information",
      operationId: 'updateUser',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/UpdateUserRequest' },
          },
        },
      },
      responses: {
        '200': {
          description: 'User updated successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/User' },
                  message: { type: 'string', example: 'User updated successfully' },
                },
              },
            },
          },
        },
        '400': { $ref: '#/components/responses/BadRequest' },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '403': { $ref: '#/components/responses/Forbidden' },
        '404': { $ref: '#/components/responses/NotFound' },
        '409': { $ref: '#/components/responses/Conflict' },
      },
    },
    delete: {
      tags: ['Users'],
      summary: 'Delete user',
      description: 'Delete a user account (admin only)',
      operationId: 'deleteUser',
      responses: {
        '204': { description: 'User deleted successfully' },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '403': { $ref: '#/components/responses/Forbidden' },
        '404': { $ref: '#/components/responses/NotFound' },
      },
    },
  },

  // 프로그램 관리 관련 엔드포인트
  '/programs': {
    get: {
      tags: ['Programs'],
      summary: 'List programs',
      description: 'Get a paginated list of programs with filtering options',
      operationId: 'getPrograms',
      parameters: [
        { $ref: '#/components/parameters/page' },
        { $ref: '#/components/parameters/limit' },
        { $ref: '#/components/parameters/sortBy' },
        { $ref: '#/components/parameters/sortOrder' },
        {
          name: 'created_by_user_id',
          in: 'query',
          description: 'Filter by creator user ID',
          schema: { type: 'string' },
        },
        {
          name: 'type',
          in: 'query',
          description: 'Filter by program type',
          schema: { type: 'string' },
        },
        {
          name: 'is_active',
          in: 'query',
          description: 'Filter by active status',
          schema: { type: 'boolean' },
        },
        {
          name: 'title',
          in: 'query',
          description: 'Search by title (partial match)',
          schema: { type: 'string' },
        },
        {
          name: 'tags',
          in: 'query',
          description: 'Filter by AI summary tags (comma-separated)',
          schema: { type: 'string' },
        },
        { $ref: '#/components/parameters/createdAfter' },
        { $ref: '#/components/parameters/createdBefore' },
      ],
      responses: {
        '200': {
          description: 'Programs retrieved successfully',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ProgramsListResponse' },
            },
          },
        },
        '400': { $ref: '#/components/responses/BadRequest' },
        '401': { $ref: '#/components/responses/Unauthorized' },
      },
    },
    post: {
      tags: ['Programs'],
      summary: 'Create program',
      description: 'Create a new educational program',
      operationId: 'createProgram',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateProgramRequest' },
          },
        },
      },
      responses: {
        '201': {
          description: 'Program created successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/Program' },
                  message: { type: 'string', example: 'Program created successfully' },
                },
              },
            },
          },
        },
        '400': { $ref: '#/components/responses/BadRequest' },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '403': { $ref: '#/components/responses/Forbidden' },
      },
    },
  },

  // 개별 프로그램 관리 엔드포인트
  '/programs/{id}': {
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        description: 'Program identifier',
        schema: { type: 'string' },
      },
    ],
    get: {
      tags: ['Programs'],
      summary: 'Get program by ID',
      description: 'Retrieve a specific program by its ID',
      operationId: 'getProgram',
      responses: {
        '200': {
          description: 'Program retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/Program' },
                  message: { type: 'string' },
                },
              },
            },
          },
        },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '404': { $ref: '#/components/responses/NotFound' },
      },
    },
    put: {
      tags: ['Programs'],
      summary: 'Update program',
      description: "Update a program's information",
      operationId: 'updateProgram',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/UpdateProgramRequest' },
          },
        },
      },
      responses: {
        '200': {
          description: 'Program updated successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/Program' },
                  message: { type: 'string', example: 'Program updated successfully' },
                },
              },
            },
          },
        },
        '400': { $ref: '#/components/responses/BadRequest' },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '403': { $ref: '#/components/responses/Forbidden' },
        '404': { $ref: '#/components/responses/NotFound' },
      },
    },
    delete: {
      tags: ['Programs'],
      summary: 'Delete program',
      description: 'Delete a program (only if no sessions exist)',
      operationId: 'deleteProgram',
      responses: {
        '204': { description: 'Program deleted successfully' },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '403': { $ref: '#/components/responses/Forbidden' },
        '404': { $ref: '#/components/responses/NotFound' },
        '409': { $ref: '#/components/responses/Conflict' },
      },
    },
  },

  // 프로그램 내 세션 관리 엔드포인트
  '/programs/{id}/sessions': {
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        description: 'Program identifier',
        schema: { type: 'string' },
      },
    ],
    get: {
      tags: ['Programs'],
      summary: 'Get program sessions',
      description: 'List all sessions for a specific program',
      operationId: 'getProgramSessions',
      parameters: [
        { $ref: '#/components/parameters/page' },
        { $ref: '#/components/parameters/limit' },
        {
          name: 'status',
          in: 'query',
          description: 'Filter by session status',
          schema: { $ref: '#/components/schemas/SessionStatus' },
        },
      ],
      responses: {
        '200': {
          description: 'Program sessions retrieved successfully',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/SessionsListResponse' },
            },
          },
        },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '404': { $ref: '#/components/responses/NotFound' },
      },
    },
  },

  // 세션 관리 관련 엔드포인트
  '/sessions': {
    get: {
      tags: ['Sessions'],
      summary: 'List sessions',
      description: 'Get a paginated list of sessions with filtering options',
      operationId: 'getSessions',
      parameters: [
        { $ref: '#/components/parameters/page' },
        { $ref: '#/components/parameters/limit' },
        { $ref: '#/components/parameters/sortBy' },
        { $ref: '#/components/parameters/sortOrder' },
        {
          name: 'program_id',
          in: 'query',
          description: 'Filter by program ID',
          schema: { type: 'string' },
        },
        {
          name: 'status',
          in: 'query',
          description: 'Filter by session status',
          schema: { $ref: '#/components/schemas/SessionStatus' },
        },
        {
          name: 'starts_after',
          in: 'query',
          description: 'Filter sessions starting after this time',
          schema: { type: 'string', format: 'date-time' },
        },
        {
          name: 'starts_before',
          in: 'query',
          description: 'Filter sessions starting before this time',
          schema: { type: 'string', format: 'date-time' },
        },
        {
          name: 'location_text',
          in: 'query',
          description: 'Filter by location text (partial match)',
          schema: { type: 'string' },
        },
      ],
      responses: {
        '200': {
          description: 'Sessions retrieved successfully',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/SessionsListResponse' },
            },
          },
        },
        '400': { $ref: '#/components/responses/BadRequest' },
        '401': { $ref: '#/components/responses/Unauthorized' },
      },
    },
    post: {
      tags: ['Sessions'],
      summary: 'Create session',
      description: 'Create a new program session',
      operationId: 'createSession',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateSessionRequest' },
          },
        },
      },
      responses: {
        '201': {
          description: 'Session created successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/Session' },
                  message: { type: 'string', example: 'Session created successfully' },
                },
              },
            },
          },
        },
        '400': { $ref: '#/components/responses/BadRequest' },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '403': { $ref: '#/components/responses/Forbidden' },
        '422': { $ref: '#/components/responses/UnprocessableEntity' },
      },
    },
  },

  // 개별 세션 관리 엔드포인트
  '/sessions/{id}': {
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        description: 'Session identifier',
        schema: { type: 'string' },
      },
    ],
    get: {
      tags: ['Sessions'],
      summary: 'Get session by ID',
      description: 'Retrieve a specific session by its ID',
      operationId: 'getSession',
      responses: {
        '200': {
          description: 'Session retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/Session' },
                  message: { type: 'string' },
                },
              },
            },
          },
        },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '404': { $ref: '#/components/responses/NotFound' },
      },
    },
    put: {
      tags: ['Sessions'],
      summary: 'Update session',
      description: "Update a session's information",
      operationId: 'updateSession',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/UpdateSessionRequest' },
          },
        },
      },
      responses: {
        '200': {
          description: 'Session updated successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/Session' },
                  message: { type: 'string', example: 'Session updated successfully' },
                },
              },
            },
          },
        },
        '400': { $ref: '#/components/responses/BadRequest' },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '403': { $ref: '#/components/responses/Forbidden' },
        '404': { $ref: '#/components/responses/NotFound' },
        '422': { $ref: '#/components/responses/UnprocessableEntity' },
      },
    },
    delete: {
      tags: ['Sessions'],
      summary: 'Delete session',
      description: 'Delete a session (only if no participants)',
      operationId: 'deleteSession',
      responses: {
        '204': { description: 'Session deleted successfully' },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '403': { $ref: '#/components/responses/Forbidden' },
        '404': { $ref: '#/components/responses/NotFound' },
        '409': { $ref: '#/components/responses/Conflict' },
      },
    },
  },

  // 세션 참가자 관리 엔드포인트
  '/sessions/{id}/participants': {
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        description: 'Session identifier',
        schema: { type: 'string' },
      },
    ],
    get: {
      tags: ['Sessions'],
      summary: 'Get session participants',
      description: 'List all participants in a session',
      operationId: 'getSessionParticipants',
      parameters: [
        { $ref: '#/components/parameters/page' },
        { $ref: '#/components/parameters/limit' },
        {
          name: 'role',
          in: 'query',
          description: 'Filter by participant role',
          schema: { $ref: '#/components/schemas/ParticipantRole' },
        },
        {
          name: 'status',
          in: 'query',
          description: 'Filter by participant status',
          schema: { $ref: '#/components/schemas/ParticipantStatus' },
        },
      ],
      responses: {
        '200': {
          description: 'Session participants retrieved successfully',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ParticipantsListResponse' },
            },
          },
        },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '404': { $ref: '#/components/responses/NotFound' },
      },
    },
  },

  // 장소 관리 관련 엔드포인트
  '/venues': {
    get: {
      tags: ['Venues'],
      summary: 'List venues',
      description: 'Get a paginated list of venues with filtering options',
      operationId: 'getVenues',
      parameters: [
        { $ref: '#/components/parameters/page' },
        { $ref: '#/components/parameters/limit' },
        { $ref: '#/components/parameters/sortBy' },
        { $ref: '#/components/parameters/sortOrder' },
        {
          name: 'name',
          in: 'query',
          description: 'Filter by venue name (partial match)',
          schema: { type: 'string' },
        },
        {
          name: 'address',
          in: 'query',
          description: 'Filter by address (partial match)',
          schema: { type: 'string' },
        },
      ],
      responses: {
        '200': {
          description: 'Venues retrieved successfully',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/VenuesListResponse' },
            },
          },
        },
        '400': { $ref: '#/components/responses/BadRequest' },
        '401': { $ref: '#/components/responses/Unauthorized' },
      },
    },
    post: {
      tags: ['Venues'],
      summary: 'Create venue',
      description: 'Create a new venue',
      operationId: 'createVenue',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateVenueRequest' },
          },
        },
      },
      responses: {
        '201': {
          description: 'Venue created successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/Venue' },
                  message: { type: 'string', example: 'Venue created successfully' },
                },
              },
            },
          },
        },
        '400': { $ref: '#/components/responses/BadRequest' },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '403': { $ref: '#/components/responses/Forbidden' },
      },
    },
  },

  // 개별 장소 관리 엔드포인트
  '/venues/{id}': {
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        description: 'Venue identifier',
        schema: { type: 'string' },
      },
    ],
    get: {
      tags: ['Venues'],
      summary: 'Get venue by ID',
      description: 'Retrieve a specific venue by its ID',
      operationId: 'getVenue',
      responses: {
        '200': {
          description: 'Venue retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/Venue' },
                  message: { type: 'string' },
                },
              },
            },
          },
        },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '404': { $ref: '#/components/responses/NotFound' },
      },
    },
    put: {
      tags: ['Venues'],
      summary: 'Update venue',
      description: "Update a venue's information",
      operationId: 'updateVenue',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/UpdateVenueRequest' },
          },
        },
      },
      responses: {
        '200': {
          description: 'Venue updated successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/Venue' },
                  message: { type: 'string', example: 'Venue updated successfully' },
                },
              },
            },
          },
        },
        '400': { $ref: '#/components/responses/BadRequest' },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '403': { $ref: '#/components/responses/Forbidden' },
        '404': { $ref: '#/components/responses/NotFound' },
      },
    },
    delete: {
      tags: ['Venues'],
      summary: 'Delete venue',
      description: 'Delete a venue (only if no rooms exist)',
      operationId: 'deleteVenue',
      responses: {
        '204': { description: 'Venue deleted successfully' },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '403': { $ref: '#/components/responses/Forbidden' },
        '404': { $ref: '#/components/responses/NotFound' },
        '409': { $ref: '#/components/responses/Conflict' },
      },
    },
  },

  // 장소 내 방 관리 엔드포인트
  '/venues/{id}/rooms': {
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        description: 'Venue identifier',
        schema: { type: 'string' },
      },
    ],
    get: {
      tags: ['Rooms'],
      summary: 'List rooms in venue',
      description: 'Get all rooms in a specific venue',
      operationId: 'getVenueRooms',
      parameters: [
        { $ref: '#/components/parameters/page' },
        { $ref: '#/components/parameters/limit' },
        {
          name: 'status',
          in: 'query',
          description: 'Filter by room status',
          schema: { $ref: '#/components/schemas/RoomStatus' },
        },
        {
          name: 'name',
          in: 'query',
          description: 'Filter by room name (partial match)',
          schema: { type: 'string' },
        },
      ],
      responses: {
        '200': {
          description: 'Venue rooms retrieved successfully',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/RoomsListResponse' },
            },
          },
        },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '404': { $ref: '#/components/responses/NotFound' },
      },
    },
    post: {
      tags: ['Rooms'],
      summary: 'Create room in venue',
      description: 'Create a new room in the specified venue',
      operationId: 'createRoom',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateRoomRequest' },
          },
        },
      },
      responses: {
        '201': {
          description: 'Room created successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/Room' },
                  message: { type: 'string', example: 'Room created successfully' },
                },
              },
            },
          },
        },
        '400': { $ref: '#/components/responses/BadRequest' },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '403': { $ref: '#/components/responses/Forbidden' },
        '404': { $ref: '#/components/responses/NotFound' },
        '409': { $ref: '#/components/responses/Conflict' },
      },
    },
  },

  // 방 개별 관리 엔드포인트
  '/rooms/{id}': {
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        description: 'Room identifier',
        schema: { type: 'string' },
      },
    ],
    get: {
      tags: ['Rooms'],
      summary: 'Get room by ID',
      description: 'Retrieve a specific room by its ID',
      operationId: 'getRoom',
      responses: {
        '200': {
          description: 'Room retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/Room' },
                  message: { type: 'string' },
                },
              },
            },
          },
        },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '404': { $ref: '#/components/responses/NotFound' },
      },
    },
    put: {
      tags: ['Rooms'],
      summary: 'Update room',
      description: "Update a room's information",
      operationId: 'updateRoom',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/UpdateRoomRequest' },
          },
        },
      },
      responses: {
        '200': {
          description: 'Room updated successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/Room' },
                  message: { type: 'string', example: 'Room updated successfully' },
                },
              },
            },
          },
        },
        '400': { $ref: '#/components/responses/BadRequest' },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '403': { $ref: '#/components/responses/Forbidden' },
        '404': { $ref: '#/components/responses/NotFound' },
        '409': { $ref: '#/components/responses/Conflict' },
      },
    },
    delete: {
      tags: ['Rooms'],
      summary: 'Delete room',
      description: 'Delete a room (only if no reservations exist)',
      operationId: 'deleteRoom',
      responses: {
        '204': { description: 'Room deleted successfully' },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '403': { $ref: '#/components/responses/Forbidden' },
        '404': { $ref: '#/components/responses/NotFound' },
        '409': { $ref: '#/components/responses/Conflict' },
      },
    },
  },

  // 방 개별 관리 엔드포인트
  '/rooms/{id}/availability': {
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        description: 'Room identifier',
        schema: { type: 'string' },
      },
    ],
    get: {
      tags: ['Rooms'],
      summary: 'Get room availability',
      description: 'Check available time slots for a room on a specific date',
      operationId: 'getRoomAvailability',
      parameters: [
        {
          name: 'date',
          in: 'query',
          required: true,
          description: 'Date to check availability (YYYY-MM-DD)',
          schema: { type: 'string', format: 'date' },
          example: '2024-02-15',
        },
        {
          name: 'duration',
          in: 'query',
          description: 'Minimum duration needed in minutes',
          schema: { type: 'integer', minimum: 15, default: 60 },
        },
      ],
      responses: {
        '200': {
          description: 'Room availability retrieved successfully',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ReservationAvailabilityResponse' },
            },
          },
        },
        '400': { $ref: '#/components/responses/BadRequest' },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '404': { $ref: '#/components/responses/NotFound' },
      },
    },
  },

  // 예약 관리 관련 엔드포인트
  '/reservations': {
    get: {
      tags: ['Reservations'],
      summary: 'List reservations',
      description: 'Get a paginated list of room reservations with filtering',
      operationId: 'getReservations',
      parameters: [
        { $ref: '#/components/parameters/page' },
        { $ref: '#/components/parameters/limit' },
        { $ref: '#/components/parameters/sortBy' },
        { $ref: '#/components/parameters/sortOrder' },
        {
          name: 'room_id',
          in: 'query',
          description: 'Filter by room ID',
          schema: { type: 'string' },
        },
        {
          name: 'user_id',
          in: 'query',
          description: 'Filter by user ID',
          schema: { type: 'string' },
        },
        {
          name: 'status',
          in: 'query',
          description: 'Filter by reservation status',
          schema: { $ref: '#/components/schemas/ReservationStatus' },
        },
        {
          name: 'starts_after',
          in: 'query',
          description: 'Filter reservations starting after this time',
          schema: { type: 'string', format: 'date-time' },
        },
        {
          name: 'starts_before',
          in: 'query',
          description: 'Filter reservations starting before this time',
          schema: { type: 'string', format: 'date-time' },
        },
        {
          name: 'purpose',
          in: 'query',
          description: 'Filter by purpose (partial match)',
          schema: { type: 'string' },
        },
      ],
      responses: {
        '200': {
          description: 'Reservations retrieved successfully',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ReservationsListResponse' },
            },
          },
        },
        '400': { $ref: '#/components/responses/BadRequest' },
        '401': { $ref: '#/components/responses/Unauthorized' },
      },
    },
    post: {
      tags: ['Reservations'],
      summary: 'Create reservation',
      description: 'Create a new room reservation',
      operationId: 'createReservation',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateReservationRequest' },
          },
        },
      },
      responses: {
        '201': {
          description: 'Reservation created successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/RoomReservation' },
                  message: { type: 'string', example: 'Reservation created successfully' },
                },
              },
            },
          },
        },
        '400': { $ref: '#/components/responses/BadRequest' },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '409': { $ref: '#/components/responses/Conflict' },
        '422': { $ref: '#/components/responses/UnprocessableEntity' },
      },
    },
  },

  // 개별 예약 관리 엔드포인트
  '/reservations/{id}': {
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        description: 'Reservation identifier',
        schema: { type: 'string' },
      },
    ],
    get: {
      tags: ['Reservations'],
      summary: 'Get reservation by ID',
      description: 'Retrieve a specific reservation by its ID',
      operationId: 'getReservation',
      responses: {
        '200': {
          description: 'Reservation retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/RoomReservation' },
                  message: { type: 'string' },
                },
              },
            },
          },
        },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '404': { $ref: '#/components/responses/NotFound' },
      },
    },
    put: {
      tags: ['Reservations'],
      summary: 'Update reservation',
      description: "Update a reservation's information",
      operationId: 'updateReservation',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/UpdateReservationRequest' },
          },
        },
      },
      responses: {
        '200': {
          description: 'Reservation updated successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/RoomReservation' },
                  message: { type: 'string', example: 'Reservation updated successfully' },
                },
              },
            },
          },
        },
        '400': { $ref: '#/components/responses/BadRequest' },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '403': { $ref: '#/components/responses/Forbidden' },
        '404': { $ref: '#/components/responses/NotFound' },
        '409': { $ref: '#/components/responses/Conflict' },
        '422': { $ref: '#/components/responses/UnprocessableEntity' },
      },
    },
    delete: {
      tags: ['Reservations'],
      summary: 'Cancel reservation',
      description: 'Cancel a reservation (sets status to CANCELLED)',
      operationId: 'cancelReservation',
      responses: {
        '200': {
          description: 'Reservation cancelled successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/RoomReservation' },
                  message: { type: 'string', example: 'Reservation cancelled successfully' },
                },
              },
            },
          },
        },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '403': { $ref: '#/components/responses/Forbidden' },
        '404': { $ref: '#/components/responses/NotFound' },
      },
    },
  },

  // 참가 관리 관련 엔드포인트
  '/participants': {
    get: {
      tags: ['Participants'],
      summary: 'List participants',
      description: 'Get a paginated list of program participants',
      operationId: 'getParticipants',
      parameters: [
        { $ref: '#/components/parameters/page' },
        { $ref: '#/components/parameters/limit' },
        { $ref: '#/components/parameters/sortBy' },
        { $ref: '#/components/parameters/sortOrder' },
        {
          name: 'session_id',
          in: 'query',
          description: 'Filter by session ID',
          schema: { type: 'string' },
        },
        {
          name: 'user_id',
          in: 'query',
          description: 'Filter by user ID',
          schema: { type: 'string' },
        },
        {
          name: 'role',
          in: 'query',
          description: 'Filter by participant role',
          schema: { $ref: '#/components/schemas/ParticipantRole' },
        },
        {
          name: 'status',
          in: 'query',
          description: 'Filter by participant status',
          schema: { $ref: '#/components/schemas/ParticipantStatus' },
        },
      ],
      responses: {
        '200': {
          description: 'Participants retrieved successfully',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ParticipantsListResponse' },
            },
          },
        },
        '400': { $ref: '#/components/responses/BadRequest' },
        '401': { $ref: '#/components/responses/Unauthorized' },
      },
    },
    post: {
      tags: ['Participants'],
      summary: 'Create participant',
      description: 'Add a participant to a session',
      operationId: 'createParticipant',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateParticipantRequest' },
          },
        },
      },
      responses: {
        '201': {
          description: 'Participant added successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/ProgramParticipant' },
                  message: { type: 'string', example: 'Participant added successfully' },
                },
              },
            },
          },
        },
        '400': { $ref: '#/components/responses/BadRequest' },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '409': { $ref: '#/components/responses/Conflict' },
      },
    },
  },

  // 개별 참가자 관리 엔드포인트
  '/participants/{id}': {
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        description: 'Participant identifier',
        schema: { type: 'string' },
      },
    ],
    get: {
      tags: ['Participants'],
      summary: 'Get participant by ID',
      description: 'Retrieve a specific participant by their ID',
      operationId: 'getParticipant',
      responses: {
        '200': {
          description: 'Participant retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/ProgramParticipant' },
                  message: { type: 'string' },
                },
              },
            },
          },
        },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '404': { $ref: '#/components/responses/NotFound' },
      },
    },
    put: {
      tags: ['Participants'],
      summary: 'Update participant',
      description: "Update a participant's role or status",
      operationId: 'updateParticipant',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/UpdateParticipantRequest' },
          },
        },
      },
      responses: {
        '200': {
          description: 'Participant updated successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/ProgramParticipant' },
                  message: { type: 'string', example: 'Participant updated successfully' },
                },
              },
            },
          },
        },
        '400': { $ref: '#/components/responses/BadRequest' },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '403': { $ref: '#/components/responses/Forbidden' },
        '404': { $ref: '#/components/responses/NotFound' },
      },
    },
    delete: {
      tags: ['Participants'],
      summary: 'Remove participant',
      description: 'Remove a participant from a session',
      operationId: 'deleteParticipant',
      responses: {
        '204': { description: 'Participant removed successfully' },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '403': { $ref: '#/components/responses/Forbidden' },
        '404': { $ref: '#/components/responses/NotFound' },
      },
    },
  },

  // 결제 관리 관련 엔드포인트
  '/payments': {
    get: {
      tags: ['Payments'],
      summary: 'List payments',
      description: 'Get a paginated list of payments with filtering options',
      operationId: 'getPayments',
      parameters: [
        { $ref: '#/components/parameters/page' },
        { $ref: '#/components/parameters/limit' },
        { $ref: '#/components/parameters/sortBy' },
        { $ref: '#/components/parameters/sortOrder' },
        {
          name: 'session_id',
          in: 'query',
          description: 'Filter by session ID',
          schema: { type: 'string' },
        },
        {
          name: 'user_id',
          in: 'query',
          description: 'Filter by user ID',
          schema: { type: 'string' },
        },
        {
          name: 'status',
          in: 'query',
          description: 'Filter by payment status',
          schema: { $ref: '#/components/schemas/PaymentStatus' },
        },
        {
          name: 'payment_method',
          in: 'query',
          description: 'Filter by payment method',
          schema: { $ref: '#/components/schemas/PaymentMethod' },
        },
      ],
      responses: {
        '200': {
          description: 'Payments retrieved successfully',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/PaymentsListResponse' },
            },
          },
        },
        '400': { $ref: '#/components/responses/BadRequest' },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '403': { $ref: '#/components/responses/Forbidden' },
      },
    },
    post: {
      tags: ['Payments'],
      summary: 'Create payment',
      description: 'Create a new payment record for a session',
      operationId: 'createPayment',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreatePaymentRequest' },
          },
        },
      },
      responses: {
        '201': {
          description: 'Payment created successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/Payment' },
                  message: { type: 'string', example: 'Payment created successfully' },
                },
              },
            },
          },
        },
        '400': { $ref: '#/components/responses/BadRequest' },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '403': { $ref: '#/components/responses/Forbidden' },
      },
    },
  },

  // 개별 결제 관리 엔드포인트
  '/payments/{id}': {
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        description: 'Payment identifier',
        schema: { type: 'string' },
      },
    ],
    get: {
      tags: ['Payments'],
      summary: 'Get payment by ID',
      description: 'Retrieve a specific payment by its ID',
      operationId: 'getPayment',
      responses: {
        '200': {
          description: 'Payment retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/Payment' },
                  message: { type: 'string' },
                },
              },
            },
          },
        },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '403': { $ref: '#/components/responses/Forbidden' },
        '404': { $ref: '#/components/responses/NotFound' },
      },
    },
    put: {
      tags: ['Payments'],
      summary: 'Update payment',
      description: 'Update payment status and details',
      operationId: 'updatePayment',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/UpdatePaymentRequest' },
          },
        },
      },
      responses: {
        '200': {
          description: 'Payment updated successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/Payment' },
                  message: { type: 'string', example: 'Payment updated successfully' },
                },
              },
            },
          },
        },
        '400': { $ref: '#/components/responses/BadRequest' },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '403': { $ref: '#/components/responses/Forbidden' },
        '404': { $ref: '#/components/responses/NotFound' },
      },
    },
  },

  // AI 상호작용 관리 엔드포인트
  '/ai-interactions': {
    get: {
      tags: ['AI Interactions'],
      summary: 'List AI interactions',
      description: 'Get a paginated list of AI service interactions',
      operationId: 'getAIInteractions',
      parameters: [
        { $ref: '#/components/parameters/page' },
        { $ref: '#/components/parameters/limit' },
        { $ref: '#/components/parameters/sortBy' },
        { $ref: '#/components/parameters/sortOrder' },
        {
          name: 'user_id',
          in: 'query',
          description: 'Filter by user ID',
          schema: { type: 'string' },
        },
        {
          name: 'provider',
          in: 'query',
          description: 'Filter by AI provider',
          schema: { type: 'string' },
        },
        {
          name: 'kind',
          in: 'query',
          description: 'Filter by interaction type',
          schema: { $ref: '#/components/schemas/AIInteractionKind' },
        },
        {
          name: 'status',
          in: 'query',
          description: 'Filter by status',
          schema: { $ref: '#/components/schemas/AIInteractionStatus' },
        },
        { $ref: '#/components/parameters/createdAfter' },
        { $ref: '#/components/parameters/createdBefore' },
      ],
      responses: {
        '200': {
          description: 'AI interactions retrieved successfully',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/AIInteractionsListResponse' },
            },
          },
        },
        '400': { $ref: '#/components/responses/BadRequest' },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '403': { $ref: '#/components/responses/Forbidden' },
      },
    },
    post: {
      tags: ['AI Interactions'],
      summary: 'Record AI interaction',
      description: 'Record a new AI service interaction',
      operationId: 'createAIInteraction',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateAIInteractionRequest' },
          },
        },
      },
      responses: {
        '201': {
          description: 'AI interaction recorded successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/AIInteraction' },
                  message: { type: 'string', example: 'AI interaction recorded successfully' },
                },
              },
            },
          },
        },
        '400': { $ref: '#/components/responses/BadRequest' },
        '401': { $ref: '#/components/responses/Unauthorized' },
      },
    },
  },

  // 개별 AI 상호작용 관리 엔드포인트
  '/ai-interactions/{id}': {
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        description: 'AI interaction identifier',
        schema: { type: 'string' },
      },
    ],
    get: {
      tags: ['AI Interactions'],
      summary: 'Get AI interaction by ID',
      description: 'Retrieve a specific AI interaction by its ID',
      operationId: 'getAIInteraction',
      responses: {
        '200': {
          description: 'AI interaction retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/AIInteraction' },
                  message: { type: 'string' },
                },
              },
            },
          },
        },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '403': { $ref: '#/components/responses/Forbidden' },
        '404': { $ref: '#/components/responses/NotFound' },
      },
    },
    put: {
      tags: ['AI Interactions'],
      summary: 'Update AI interaction',
      description: 'Update AI interaction details (typically cost and token usage)',
      operationId: 'updateAIInteraction',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/UpdateAIInteractionRequest' },
          },
        },
      },
      responses: {
        '200': {
          description: 'AI interaction updated successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/AIInteraction' },
                  message: { type: 'string', example: 'AI interaction updated successfully' },
                },
              },
            },
          },
        },
        '400': { $ref: '#/components/responses/BadRequest' },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '403': { $ref: '#/components/responses/Forbidden' },
        '404': { $ref: '#/components/responses/NotFound' },
      },
    },
  },
};
