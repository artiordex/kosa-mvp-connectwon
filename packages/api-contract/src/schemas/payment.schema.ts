/**
 * Description : payment.schema.ts - 📌 결제 관련 타입 및 스키마
 * Author : Shiwoo Min
 * Date : 2025-09-24
 */
import {
  CreatePaymentRequestSchema,
  CurrencySchema,
  PaymentListQuerySchema,
  PaymentMethodSchema,
  PaymentProviderSchema,
  PaymentResponseSchema,
  PaymentSchema,
  PaymentsListResponseSchema,
  PaymentStatusSchema,
  PaymentSummaryResponseSchema,
  PaymentSummarySchema,
  PaymentTypeSchema,
  ProcessPaymentRequestSchema,
  ProcessPaymentResponseSchema,
  RefundPaymentRequestSchema,
  RefundPaymentResponseSchema,
  UpdatePaymentRequestSchema,
} from '../contracts/payment.contract.js';
import { z } from 'zod';

/**
 * @description 통화 코드
 * @typedef {Currency}
 */
export const Currency = CurrencySchema;
export type Currency = z.infer<typeof Currency>;

/**
 * @description 결제 수단
 * @typedef {PaymentMethod}
 */
export const PaymentMethod = PaymentMethodSchema;
export type PaymentMethod = z.infer<typeof PaymentMethod>;

/**
 * @description 결제 제공자
 * @typedef {PaymentProvider}
 */
export const PaymentProvider = PaymentProviderSchema;
export type PaymentProvider = z.infer<typeof PaymentProvider>;

/**
 * @description 결제 상태
 * @typedef {PaymentStatus}
 */
export const PaymentStatus = PaymentStatusSchema;
export type PaymentStatus = z.infer<typeof PaymentStatus>;

/**
 * @description 결제 유형
 * @typedef {PaymentType}
 */
export const PaymentType = PaymentTypeSchema;
export type PaymentType = z.infer<typeof PaymentType>;

/**
 * @description 결제 정보
 * @typedef {Payment}
 */
export const Payment = PaymentSchema;
export type Payment = z.infer<typeof Payment>;

/**
 * @description 결제 생성 요청
 * @typedef {CreatePaymentRequest}
 */
export const CreatePaymentRequest = CreatePaymentRequestSchema;
export type CreatePaymentRequest = z.infer<typeof CreatePaymentRequest>;

/**
 * @description 결제 수정 요청
 * @typedef {UpdatePaymentRequest}
 */
export const UpdatePaymentRequest = UpdatePaymentRequestSchema;
export type UpdatePaymentRequest = z.infer<typeof UpdatePaymentRequest>;

/**
 * @description 결제 목록 조회 쿼리
 * @typedef {PaymentListQuery}
 */
export const PaymentListQuery = PaymentListQuerySchema;
export type PaymentListQuery = z.infer<typeof PaymentListQuery>;

/**
 * @description 결제 처리 요청
 * @typedef {ProcessPaymentRequest}
 */
export const ProcessPaymentRequest = ProcessPaymentRequestSchema;
export type ProcessPaymentRequest = z.infer<typeof ProcessPaymentRequest>;

/**
 * @description 결제 환불 요청
 * @typedef {RefundPaymentRequest}
 */
export const RefundPaymentRequest = RefundPaymentRequestSchema;
export type RefundPaymentRequest = z.infer<typeof RefundPaymentRequest>;

/**
 * @description 결제 요약 정보
 * @typedef {PaymentSummary}
 */
export const PaymentSummary = PaymentSummarySchema;
export type PaymentSummary = z.infer<typeof PaymentSummary>;

/**
 * @description 단일 결제 응답
 * @typedef {PaymentResponse}
 */
export const PaymentResponse = PaymentResponseSchema;
export type PaymentResponse = z.infer<typeof PaymentResponse>;

/**
 * @description 결제 목록 응답
 * @typedef {PaymentsListResponse}
 */
export const PaymentsListResponse = PaymentsListResponseSchema;
export type PaymentsListResponse = z.infer<typeof PaymentsListResponse>;

/**
 * @description 결제 처리 응답
 * @typedef {ProcessPaymentResponse}
 */
export const ProcessPaymentResponse = ProcessPaymentResponseSchema;
export type ProcessPaymentResponse = z.infer<typeof ProcessPaymentResponse>;

/**
 * @description 결제 환불 응답
 * @typedef {RefundPaymentResponse}
 */
export const RefundPaymentResponse = RefundPaymentResponseSchema;
export type RefundPaymentResponse = z.infer<typeof RefundPaymentResponse>;

/**
 * @description 결제 요약 응답
 * @typedef {PaymentSummaryResponse}
 */
export const PaymentSummaryResponse = PaymentSummaryResponseSchema;
export type PaymentSummaryResponse = z.infer<typeof PaymentSummaryResponse>;
