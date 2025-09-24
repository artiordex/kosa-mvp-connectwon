/**
 * Description : venue.contract.ts - 📌 Zod를 사용하여 장소 관련 계약 정의
 * Author : Shiwoo Min
 * Date : 2025-09-24
 */
import { PaginationInfoSchema } from '../contracts/common.contract.js';
import { z } from 'zod';

/**
 * @description 장소 기본 정보 스키마
 */
export const VenueSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string().nullable().optional(),
  created_at: z.string(),
  updated_at: z.string(),
});
export type Venue = z.infer<typeof VenueSchema>;

/**
 * @description 장소 목록 응답 스키마
 */
export const VenueListResponseSchema = z.object({
  venues: z.array(VenueSchema),
  pagination: PaginationInfoSchema,
});
export type VenueListResponse = z.infer<typeof VenueListResponseSchema>;

/**
 * @description 장소 통계 응답 스키마
 */
export const VenueStatsResponseSchema = z.object({
  venue_id: z.string(),
  total_rooms: z.number(),
  total_capacity: z.number(),
  total_reservations: z.number(),
  confirmed_reservations: z.number(),
  occupancy_rate: z.number(),
  total_hours_used: z.number(),
  total_revenue: z.number(),
});
export type VenueStatsResponse = z.infer<typeof VenueStatsResponseSchema>;

/**
 * @description 장소 생성 요청 스키마
 */
export const CreateVenueRequestSchema = z.object({
  name: z.string(),
  address: z.string().nullable().optional(),
  created_at: z.string(),
  updated_at: z.string(),
});
export type CreateVenueRequest = z.infer<typeof CreateVenueRequestSchema>;

/**
 * @description 장소 수정 요청 스키마
 */
export const UpdateVenueRequestSchema = z.object({
  name: z.string().optional(),
  address: z.string().nullable().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});
export type UpdateVenueRequest = z.infer<typeof UpdateVenueRequestSchema>;

/**
 * @description 장소 관련 API 컨트랙트 정의
 */
export const venueContract = {
  createVenue: {
    method: 'POST',
    path: '/venues',
    body: CreateVenueRequestSchema,
    responses: {
      201: VenueSchema,
      400: z.object({
        message: z.string(),
        errors: z.array(z.string()).optional(),
      }),
      409: z.object({
        message: z.string(),
      }),
    },
    summary: '새로운 장소를 생성합니다.',
  },

  updateVenue: {
    method: 'PATCH',
    path: '/venues/:id',
    pathParams: z.object({ id: z.string() }),
    body: UpdateVenueRequestSchema,
    responses: {
      200: VenueSchema,
      400: z.object({
        message: z.string(),
        errors: z.array(z.string()).optional(),
      }),
      404: z.object({ message: z.string() }),
      409: z.object({ message: z.string() }),
    },
    summary: '기존 장소 정보를 수정합니다.',
  },

  getVenues: {
    method: 'GET',
    path: '/venues',
    query: z.object({
      page: z.number().default(1),
      limit: z.number().default(10),
    }),
    responses: {
      200: VenueListResponseSchema,
    },
    summary: '장소 목록을 조회합니다.',
  },

  getVenue: {
    method: 'GET',
    path: '/venues/:id',
    pathParams: z.object({ id: z.string() }),
    responses: {
      200: VenueSchema,
      404: z.object({ message: z.string() }),
    },
    summary: '특정 장소를 조회합니다.',
  },

  getVenueStats: {
    method: 'GET',
    path: '/venues/:id/stats',
    pathParams: z.object({ id: z.string() }),
    responses: {
      200: VenueStatsResponseSchema,
      404: z.object({ message: z.string() }),
    },
    summary: '장소의 통계 정보를 조회합니다.',
  },
};
