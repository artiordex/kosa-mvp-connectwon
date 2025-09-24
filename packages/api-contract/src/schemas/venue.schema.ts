/**
 * Description : venue.schema.ts - 📌 장소 관련 타입 및 스키마
 * Author : Shiwoo Min
 * Date : 2025-09-24
 */
import {
  CreateVenueRequestSchema,
  UpdateVenueRequestSchema,
  VenueListResponseSchema,
  VenueSchema,
  VenueStatsResponseSchema,
} from '../contracts/venue.contract.js';
import { z } from 'zod';

/**
 * @description 장소 기본 정보
 */
export const Venue = VenueSchema;
export type Venue = z.infer<typeof Venue>;

/**
 * @description 장소 생성 요청
 */
export const CreateVenueRequest = CreateVenueRequestSchema;
export type CreateVenueRequest = z.infer<typeof CreateVenueRequest>;

/**
 * @description 장소 수정 요청
 */
export const UpdateVenueRequest = UpdateVenueRequestSchema;
export type UpdateVenueRequest = z.infer<typeof UpdateVenueRequest>;

/**
 * @description 장소 목록 응답
 */
export const VenueListResponse = VenueListResponseSchema;
export type VenueListResponse = z.infer<typeof VenueListResponse>;

/**
 * @description 장소 통계 응답
 */
export const VenueStatsResponse = VenueStatsResponseSchema;
export type VenueStatsResponse = z.infer<typeof VenueStatsResponse>;
/**
 * @description 장소 관련 스키마 일괄 내보내기
 */
export const VenueSchemas = {
  Venue,
  CreateVenueRequest,
  UpdateVenueRequest,
  VenueListResponse,
  VenueStatsResponse,
};
