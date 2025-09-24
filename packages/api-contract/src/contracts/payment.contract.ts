/**
 * Description : payment.contract.ts - 📌 Zod를 사용하여 결제 관련 타입 및 인터페이스 계약 정의
 * Author : Shiwoo Min
 * Date : 2025-09-24
 */
import { z } from 'zod';

/**
 * @description 통화 코드
 * @typedef {'KRW' | 'USD' | 'EUR' | 'JPY'} Currency
 */
export const CurrencySchema = z.enum(['KRW', 'USD', 'EUR', 'JPY']);
export type Currency = z.infer<typeof CurrencySchema>;

/**
 * @description 결제 수단
 * @typedef {'CREDIT_CARD' | 'BANK_TRANSFER' | 'CASH' | 'FREE'} PaymentMethod
 */
export const PaymentMethodSchema = z.enum(['CREDIT_CARD', 'BANK_TRANSFER', 'CASH', 'FREE']);
export type PaymentMethod = z.infer<typeof PaymentMethodSchema>;

/**
 * @description 결제 제공자
 * @typedef {'STRIPE' | 'TOSS' | 'KAKAO' | 'PAYPAL'} PaymentProvider
 */
export const PaymentProviderSchema = z.enum(['STRIPE', 'TOSS', 'KAKAO', 'PAYPAL']);
export type PaymentProvider = z.infer<typeof PaymentProviderSchema>;

/**
 * @description 결제 상태
 * @typedef {'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED' | 'CANCELLED'} PaymentStatus
 */
export const PaymentStatusSchema = z.enum(['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED', 'CANCELLED']);
export type PaymentStatus = z.infer<typeof PaymentStatusSchema>;

/**
 * @description 결제 유형
 * @typedef {'SESSION' | 'SUBSCRIPTION' | 'DONATION'} PaymentType
 */
export const PaymentTypeSchema = z.enum(['SESSION', 'SUBSCRIPTION', 'DONATION']);
export type PaymentType = z.infer<typeof PaymentTypeSchema>;

/**
 * @description 결제 기본 정보
 * @typedef {Object} Payment
 */
export const PaymentSchema = z.object({
  id: z.string(),
  session_id: z.string(),
  user_id: z.string(),
  participant_id: z.string(),
  amount: z.number().min(0),
  currency: CurrencySchema,
  payment_method: PaymentMethodSchema,
  status: PaymentStatusSchema,
  payment_provider_id: z.string().nullable(),
  payment_provider_data: z.record(z.unknown()),
  paid_at: z.string().nullable(),
  refunded_at: z.string().nullable(),
  refund_reason: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});
export type Payment = z.infer<typeof PaymentSchema>;

/**
 * @description 결제 생성 요청
 * @typedef {Object} CreatePaymentRequest
 */
export const CreatePaymentRequestSchema = z.object({
  session_id: z.string(),
  user_id: z.string(),
  participant_id: z.string(),
  amount: z.number().min(0),
  currency: CurrencySchema.optional(),
  payment_method: PaymentMethodSchema,
  payment_provider_data: z.record(z.unknown()).optional(),
});
export type CreatePaymentRequest = z.infer<typeof CreatePaymentRequestSchema>;

/**
 * @description 결제 수정 요청
 * @typedef {Object} UpdatePaymentRequest
 */
export const UpdatePaymentRequestSchema = z.object({
  status: PaymentStatusSchema.optional(),
  payment_provider_id: z.string().optional(),
  payment_provider_data: z.record(z.unknown()).optional(),
  paid_at: z.string().optional(),
  refunded_at: z.string().optional(),
  refund_reason: z.string().optional(),
});
export type UpdatePaymentRequest = z.infer<typeof UpdatePaymentRequestSchema>;

/**
 * @description 결제 목록 조회 쿼리
 * @typedef {Object} PaymentListQuery
 */
export const PaymentListQuerySchema = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
  session_id: z.string().optional(),
  user_id: z.string().optional(),
  participant_id: z.string().optional(),
  status: PaymentStatusSchema.optional(),
  payment_method: PaymentMethodSchema.optional(),
  created_after: z.string().optional(),
  created_before: z.string().optional(),
  paid_after: z.string().optional(),
  paid_before: z.string().optional(),
});
export type PaymentListQuery = z.infer<typeof PaymentListQuerySchema>;

/**
 * @description 결제 처리 요청
 * @typedef {Object} ProcessPaymentRequest
 */
export const ProcessPaymentRequestSchema = z.object({
  payment_id: z.string(),
  payment_token: z.string().optional(),
  payment_method_details: z.record(z.unknown()).optional(),
});
export type ProcessPaymentRequest = z.infer<typeof ProcessPaymentRequestSchema>;

/**
 * @description 결제 환불 요청
 * @typedef {Object} RefundPaymentRequest
 */
export const RefundPaymentRequestSchema = z.object({
  payment_id: z.string(),
  refund_amount: z.number().optional(),
  refund_reason: z.string(),
});
export type RefundPaymentRequest = z.infer<typeof RefundPaymentRequestSchema>;

/**
 * @description 결제 요약 통계
 * @typedef {Object} PaymentSummary
 */
export const PaymentSummarySchema = z.object({
  total_amount: z.number(),
  currency: CurrencySchema,
  payment_count: z.number(),
  breakdown_by_status: z.record(
    PaymentStatusSchema,
    z.object({
      count: z.number(),
      amount: z.number(),
    }),
  ),
  breakdown_by_method: z.record(
    PaymentMethodSchema,
    z.object({
      count: z.number(),
      amount: z.number(),
    }),
  ),
});
export type PaymentSummary = z.infer<typeof PaymentSummarySchema>;

/**
 * @description 단일 결제 응답
 * @typedef {Object} PaymentResponse
 */
export const PaymentResponseSchema = z.object({
  data: PaymentSchema,
  message: z.string().optional(),
});
export type PaymentResponse = z.infer<typeof PaymentResponseSchema>;

/**
 * @description 결제 목록 응답
 * @typedef {Object} PaymentsListResponse
 */
export const PaymentsListResponseSchema = z.object({
  data: z.array(PaymentSchema),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
  }),
});
export type PaymentsListResponse = z.infer<typeof PaymentsListResponseSchema>;

/**
 * @description 결제 처리 응답
 * @typedef {Object} ProcessPaymentResponse
 */
export const ProcessPaymentResponseSchema = z.object({
  success: z.boolean(),
  payment: PaymentSchema,
  provider_response: z.record(z.unknown()).optional(),
  message: z.string().optional(),
});
export type ProcessPaymentResponse = z.infer<typeof ProcessPaymentResponseSchema>;

/**
 * @description 결제 환불 응답
 * @typedef {Object} RefundPaymentResponse
 */
export const RefundPaymentResponseSchema = z.object({
  success: z.boolean(),
  payment: PaymentSchema,
  refund_amount: z.number(),
  provider_response: z.record(z.unknown()).optional(),
  message: z.string().optional(),
});
export type RefundPaymentResponse = z.infer<typeof RefundPaymentResponseSchema>;

/**
 * @description 결제 요약 응답
 * @typedef {Object} PaymentSummaryResponse
 */
export const PaymentSummaryResponseSchema = z.object({
  data: PaymentSummarySchema,
  period: z.object({
    from: z.string(),
    to: z.string(),
  }),
});
export type PaymentSummaryResponse = z.infer<typeof PaymentSummaryResponseSchema>;
