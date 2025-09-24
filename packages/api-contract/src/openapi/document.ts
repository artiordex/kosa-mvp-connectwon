import { OpenAPIV3 } from 'openapi-types';

export const document: OpenAPIV3.Document = {
  openapi: '3.0.3',
  info: { title: 'Connectwon API', version: '1.0.0' },
  paths: {},
  components: {
    schemas: {
      BaseResponse: { type: 'object', properties: { message: { type: 'string' } } },
      ErrorResponse: { type: 'object', properties: { error: { type: 'string' }, message: { type: 'string' } } },
      PaginationInfo: { type: 'object', properties: { page: { type: 'integer' }, limit: { type: 'integer' }, total: { type: 'integer' } } },

      User: {
        type: 'object',
        properties: { id: { type: 'string' }, email: { type: 'string' }, name: { type: 'string' }, role_flags: { type: 'integer' } },
      },
      Program: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          description: { type: 'string' },
          is_active: { type: 'boolean' },
          created_by_user_id: { type: 'string' },
        },
      },
      Session: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          program_id: { type: 'string' },
          starts_at: { type: 'string', format: 'date-time' },
          ends_at: { type: 'string', format: 'date-time' },
          capacity: { type: 'integer' },
          participant_fee: { type: 'integer' },
          status: { type: 'string', enum: ['SCHEDULED', 'CONFIRMED', 'CANCELLED', 'COMPLETED'] },
          room_reservation_id: { type: 'string' },
        },
      },
      Venue: { type: 'object', properties: { id: { type: 'string' }, name: { type: 'string' }, address: { type: 'string' } } },
      Room: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          venue_id: { type: 'string' },
          name: { type: 'string' },
          capacity: { type: 'integer' },
          status: { type: 'string', enum: ['ACTIVE', 'INACTIVE', 'MAINTENANCE'] },
        },
      },
      RoomReservation: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          room_id: { type: 'string' },
          user_id: { type: 'string' },
          starts_at: { type: 'string', format: 'date-time' },
          ends_at: { type: 'string', format: 'date-time' },
          purpose: { type: 'string' },
          status: { type: 'string', enum: ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'] },
          session_id: { type: 'string' },
        },
      },
      ProgramParticipant: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          session_id: { type: 'string' },
          user_id: { type: 'string' },
          role: { type: 'string', enum: ['HOST', 'ATTENDEE'] },
          status: { type: 'string', enum: ['APPLIED', 'CONFIRMED', 'CANCELLED', 'NO_SHOW'] },
        },
      },
      AIInteraction: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          user_id: { type: 'string' },
          provider: { type: 'string' },
          model: { type: 'string' },
          kind: { type: 'string' },
          prompt_tokens: { type: 'integer' },
          completion_tokens: { type: 'integer' },
          cost: { type: 'number' },
        },
      },

      LoginRequest: {
        type: 'object',
        oneOf: [
          { properties: { google_token: { type: 'string' } }, required: ['google_token'] },
          { properties: { email: { type: 'string' }, password: { type: 'string' } }, required: ['email', 'password'] },
        ],
      },
      LoginResponse: {
        type: 'object',
        properties: { access_token: { type: 'string' }, refresh_token: { type: 'string' }, user: { $ref: '#/components/schemas/User' } },
      },
    },
    parameters: {
      pathId: { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
    },
    responses: {
      Unauthorized: { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
      NotFound: { description: 'Not Found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
    },
    securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer' } },
  },
  security: [{ bearerAuth: [] }],
};
