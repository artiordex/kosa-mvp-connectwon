/**
 * Description : reservation.ts - 📌 Reservations 관련 타입정의
 * Author : Shiwoo Min
 * Date : 2025-09-11
 */
import { initContract } from '@ts-rest/core';
import { z } from 'zod';

// Reservation 스키마 정의
const ReservationSchema = z.object({
  id: z.string(),
  userId: z.string(),
  serviceId: z.string(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  status: z.enum(['pending', 'confirmed', 'cancelled', 'completed']),
  notes: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

const CreateReservationSchema = z.object({
  userId: z.string(),
  serviceId: z.string(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  notes: z.string().optional(),
});

const UpdateReservationSchema = z.object({
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
  status: z.enum(['pending', 'confirmed', 'cancelled', 'completed']).optional(),
  notes: z.string().optional(),
});

const ReservationQuerySchema = z.object({
  userId: z.string().optional(),
  serviceId: z.string().optional(),
  status: z.enum(['pending', 'confirmed', 'cancelled', 'completed']).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
});

const c = initContract();

export const reservationContract = c.router({
  // 예약 생성
  createReservation: {
    method: 'POST',
    path: '/reservations',
    responses: {
      201: ReservationSchema,
      400: z.object({
        message: z.string(),
        errors: z.array(z.string()).optional(),
      }),
      409: z.object({
        message: z.string(),
      }),
    },
    body: CreateReservationSchema,
    summary: '새로운 예약을 생성합니다',
  },

  // 예약 목록 조회
  getReservations: {
    method: 'GET',
    path: '/reservations',
    responses: {
      200: z.object({
        data: z.array(ReservationSchema),
        pagination: z.object({
          page: z.number(),
          limit: z.number(),
          total: z.number(),
          totalPages: z.number(),
        }),
      }),
    },
    query: ReservationQuerySchema,
    summary: '예약 목록을 조회합니다',
  },

  // 특정 예약 조회
  getReservation: {
    method: 'GET',
    path: '/reservations/:id',
    responses: {
      200: ReservationSchema,
      404: z.object({
        message: z.string(),
      }),
    },
    pathParams: z.object({
      id: z.string(),
    }),
    summary: '특정 예약을 조회합니다',
  },

  // 예약 수정
  updateReservation: {
    method: 'PATCH',
    path: '/reservations/:id',
    responses: {
      200: ReservationSchema,
      400: z.object({
        message: z.string(),
        errors: z.array(z.string()).optional(),
      }),
      404: z.object({
        message: z.string(),
      }),
      409: z.object({
        message: z.string(),
      }),
    },
    pathParams: z.object({
      id: z.string(),
    }),
    body: UpdateReservationSchema,
    summary: '예약 정보를 수정합니다',
  },

  // 예약 취소
  cancelReservation: {
    method: 'DELETE',
    path: '/reservations/:id',
    responses: {
      200: z.object({
        message: z.string(),
      }),
      404: z.object({
        message: z.string(),
      }),
      409: z.object({
        message: z.string(),
      }),
    },
    pathParams: z.object({
      id: z.string(),
    }),
    summary: '예약을 취소합니다',
  },

  // 사용자별 예약 조회
  getUserReservations: {
    method: 'GET',
    path: '/users/:userId/reservations',
    responses: {
      200: z.object({
        data: z.array(ReservationSchema),
        pagination: z.object({
          page: z.number(),
          limit: z.number(),
          total: z.number(),
          totalPages: z.number(),
        }),
      }),
    },
    pathParams: z.object({
      userId: z.string(),
    }),
    query: z.object({
      status: z.enum(['pending', 'confirmed', 'cancelled', 'completed']).optional(),
      page: z.coerce.number().min(1).default(1),
      limit: z.coerce.number().min(1).max(100).default(10),
    }),
    summary: '특정 사용자의 예약 목록을 조회합니다',
  },

  // 서비스별 예약 조회
  getServiceReservations: {
    method: 'GET',
    path: '/services/:serviceId/reservations',
    responses: {
      200: z.object({
        data: z.array(ReservationSchema),
        pagination: z.object({
          page: z.number(),
          limit: z.number(),
          total: z.number(),
          totalPages: z.number(),
        }),
      }),
    },
    pathParams: z.object({
      serviceId: z.string(),
    }),
    query: z.object({
      status: z.enum(['pending', 'confirmed', 'cancelled', 'completed']).optional(),
      startDate: z.string().datetime().optional(),
      endDate: z.string().datetime().optional(),
      page: z.coerce.number().min(1).default(1),
      limit: z.coerce.number().min(1).max(100).default(10),
    }),
    summary: '특정 서비스의 예약 목록을 조회합니다',
  },
});

// 타입 추출
export type Reservation = z.infer<typeof ReservationSchema>;
export type CreateReservationDto = z.infer<typeof CreateReservationSchema>;
export type UpdateReservationDto = z.infer<typeof UpdateReservationSchema>;
export type ReservationQuery = z.infer<typeof ReservationQuerySchema>;
