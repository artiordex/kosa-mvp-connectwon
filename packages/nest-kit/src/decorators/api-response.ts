/**
 * Description : api-response.ts - 📌 API 문서화 & 응답 래핑/스킵 데코레이터
 * Author : Shiwoo Min
 * Date : 2025-09-12
 */
import { applyDecorators, SetMetadata } from '@nestjs/common';
import type { Type } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  type ApiResponseOptions,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';

// 인터셉터 래핑 스킵용 메타키/데코레이터
export const RAW_RESPONSE_KEY = 'connectwon:rawResponse' as const;

// RawResponse 데코레이터
export const RawResponse = () => SetMetadata(RAW_RESPONSE_KEY, true);

// 표준 성공 응답
export const ApiSuccessResponse = <T>(
  type?: Type<T> | Function,
  description: string = 'Success',
) => {
  const options: ApiResponseOptions = { status: 200, description };
  if (type) (options as any).type = type;
  return ApiOkResponse(options);
};

// 표준 생성 응답
export const ApiCreateResponse = <T>(
  type?: Type<T> | Function,
  description: string = 'Created successfully',
) => {
  const options: ApiResponseOptions = { status: 201, description };
  if (type) (options as any).type = type;
  return ApiCreatedResponse(options);
};

// 표준 에러 응답들
export const ApiErrorResponses = () =>
  applyDecorators(
    ApiBadRequestResponse({ description: 'Bad Request' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiForbiddenResponse({ description: 'Forbidden' }),
    ApiNotFoundResponse({ description: 'Not Found' }),
    ApiInternalServerErrorResponse({ description: 'Internal Server Error' }),
  );

// 인증 엔드포인트 공통 에러 응답
export const ApiAuthResponses = () =>
  applyDecorators(
    ApiBadRequestResponse({ description: 'Bad Request' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized - Token required' }),
    ApiForbiddenResponse({ description: 'Forbidden - Insufficient permissions' }),
    ApiInternalServerErrorResponse({ description: 'Internal Server Error' }),
  );

// 데이터 스키마 래핑
function wrappedDataSchema(type?: Type<any> | Function) {
  if (!type) return { type: 'object' }; // data가 object인데 DTO 미지정
  return { $ref: getSchemaPath(type as any) };
}

// 메타 스키마 래핑
function wrappedMetaSchema() {
  return {
    type: 'object',
    properties: {
      timestamp: { type: 'string', format: 'date-time', nullable: true },
      requestId: { type: 'string', nullable: true },
      version: { type: 'string', nullable: true },
      elapsedMs: { type: 'number', nullable: true },
    },
  };
}

// 200 OK 래핑 응답
export const ApiWrappedOk = <T>(type?: Type<T> | Function, description: string = 'Success') =>
  ApiOkResponse({
    description,
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: wrappedDataSchema(type),
        meta: wrappedMetaSchema(),
      },
    },
  });

// 201 Created 래핑 응답
export const ApiWrappedCreated = <T>(
  type?: Type<T> | Function,
  description: string = 'Created successfully',
) =>
  ApiCreatedResponse({
    description,
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: wrappedDataSchema(type),
        meta: wrappedMetaSchema(),
      },
    },
  });

// 200 목록 래핑 응답
export const ApiWrappedList = <T>(
  type: Type<T> | Function,
  description: string = 'List retrieved successfully',
) =>
  ApiOkResponse({
    description,
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: { type: 'array', items: { $ref: getSchemaPath(type as any) } },
        pagination: {
          type: 'object',
          properties: {
            page: { type: 'number' },
            limit: { type: 'number' },
            total: { type: 'number' },
            totalPages: { type: 'number' },
            hasNext: { type: 'boolean' },
            hasPrev: { type: 'boolean' },
          },
        },
        meta: wrappedMetaSchema(),
      },
    },
  });

// CRUD 목록 조회 (페이지네이션 포함)
export const ApiListResponse = <T>(
  type: Type<T> | Function,
  description: string = 'List retrieved successfully',
) =>
  applyDecorators(
    ApiOkResponse({
      description,
      schema: {
        type: 'object',
        properties: {
          data: { type: 'array', items: { $ref: getSchemaPath(type as any) } },
          pagination: {
            type: 'object',
            properties: {
              page: { type: 'number' },
              limit: { type: 'number' },
              total: { type: 'number' },
              totalPages: { type: 'number' },
            },
          },
        },
      },
    }),
    ApiAuthResponses(),
  );

// 단일 조회/생성/수정/삭제
export const ApiGetResponse = <T>(
  type: Type<T> | Function,
  description = 'Item retrieved successfully',
) =>
  applyDecorators(
    ApiSuccessResponse(type, description),
    ApiNotFoundResponse({ description: 'Item not found' }),
    ApiAuthResponses(),
  );
export const ApiCreateSuccessResponse = <T>(
  type: Type<T> | Function,
  description = 'Item created successfully',
) => applyDecorators(ApiCreateResponse(type, description), ApiAuthResponses());
export const ApiUpdateResponse = <T>(
  type: Type<T> | Function,
  description = 'Item updated successfully',
) =>
  applyDecorators(
    ApiSuccessResponse(type, description),
    ApiNotFoundResponse({ description: 'Item not found' }),
    ApiAuthResponses(),
  );
export const ApiDeleteResponse = (description = 'Item deleted successfully') =>
  applyDecorators(
    ApiOkResponse({
      description,
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: description },
        },
      },
    }),
    ApiNotFoundResponse({ description: 'Item not found' }),
    ApiAuthResponses(),
  );

// 예약어 엔드포인트 응답들
export const ApiUserResponse = () => ApiGetResponse(Object, 'User information retrieved');
export const ApiUserListResponse = () => ApiListResponse(Object, 'Users list retrieved');
export const ApiUserCreateResponse = () => ApiCreateSuccessResponse(Object, 'User created');
export const ApiVenueResponse = () => ApiGetResponse(Object, 'Venue information retrieved');
export const ApiVenueListResponse = () => ApiListResponse(Object, 'Venues list retrieved');
export const ApiVenueCreateResponse = () => ApiCreateSuccessResponse(Object, 'Venue created');
export const ApiProgramResponse = () => ApiGetResponse(Object, 'Program information retrieved');
export const ApiProgramListResponse = () => ApiListResponse(Object, 'Programs list retrieved');
export const ApiProgramCreateResponse = () => ApiCreateSuccessResponse(Object, 'Program created');
export const ApiReservationResponse = () =>
  ApiGetResponse(Object, 'Reservation information retrieved');
export const ApiReservationListResponse = () =>
  ApiListResponse(Object, 'Reservations list retrieved');
export const ApiReservationCreateResponse = () =>
  ApiCreateSuccessResponse(Object, 'Reservation created');
export const ApiReservationCancelResponse = () =>
  ApiOkResponse({
    description: 'Reservation cancelled successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
        refundAmount: { type: 'number', nullable: true },
      },
    },
  });
export const ApiPaymentResponse = () => ApiGetResponse(Object, 'Payment information retrieved');
export const ApiPaymentCreateResponse = () =>
  ApiCreateSuccessResponse(Object, 'Payment processed successfully');
