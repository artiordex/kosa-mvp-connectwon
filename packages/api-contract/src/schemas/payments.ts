/**
 * Description : payments.ts - 📌 결제 스키마 (Zod 기반, DTO 대체)
 * Author : Shiwoo Min
 * Date : 2025-09-16
 */
import { z } from 'zod';

// Enums
export const PaymentProvider = z.enum(['STRIPE', 'TOSS', 'KAKAO_PAY', 'NAVER_PAY']);
export const PaymentMethod = z.enum([
  'CARD',
  'BANK_TRANSFER',
  'VIRTUAL_ACCOUNT',
  'MOBILE',
  'POINT',
]);
export const PaymentStatus = z.enum([
  'PENDING',
  'PROCESSING',
  'COMPLETED',
  'FAILED',
  'CANCELLED',
  'REFUNDED',
  'PARTIALLY_REFUNDED',
]);
export const Currency = z.enum(['KRW', 'USD']);
export const PaymentType = z.enum(['MEMBERSHIP', 'SESSION', 'EQUIPMENT']);

export type PaymentProvider = z.infer<typeof PaymentProvider>;
export type PaymentMethod = z.infer<typeof PaymentMethod>;
export type PaymentStatus = z.infer<typeof PaymentStatus>;
export type Currency = z.infer<typeof Currency>;
export type PaymentType = z.infer<typeof PaymentType>;

// Base Schemas
export const PaymentSchema = z.object({
  id: z.string(),
  session_id: z.string().nullable(),
  user_id: z.string(),
  amount: z.number().min(0),
  currency: Currency.default('KRW'),
  type: PaymentType,
  provider: PaymentProvider,
  method: PaymentMethod,
  status: PaymentStatus.default('PENDING'),
  description: z.string(),
  external_payment_id: z.string().nullable(), // Stripe PI, Toss 결제키 등
  item_id: z.string().nullable(), // 결제 대상 아이템
  success_url: z.string().url().nullable(),
  cancel_url: z.string().url().nullable(),
  metadata: z.record(z.unknown()).nullable(),
  paid_at: z.date().nullable(),
  created_at: z.date(),
  updated_at: z.date(),
});

// CRUD Schemas
export const CreatePaymentSchema = z.object({
  session_id: z.string().optional(),
  user_id: z.string(),
  amount: z.number().min(100), // 최소 100원
  currency: Currency.optional(),
  type: PaymentType,
  provider: PaymentProvider,
  method: PaymentMethod,
  description: z.string().min(1),
  item_id: z.string().optional(),
  success_url: z.string().url().optional(),
  cancel_url: z.string().url().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const UpdatePaymentSchema = z.object({
  status: PaymentStatus.optional(),
  status_reason: z.string().optional(),
  external_payment_id: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
  paid_at: z.string().datetime().optional(),
});

// Payment Intent Schemas
export const PaymentIntentResponseSchema = z.object({
  payment_intent_id: z.string(),
  client_secret: z.string(),
  amount: z.number(),
  currency: Currency,
  status: PaymentStatus,
  payment_id: z.string(), // 내부 결제 ID
});

// Provider-specific Schemas
export const StripePaymentIntentSchema = z.object({
  payment_intent_id: z.string(),
  amount: z.number().min(0),
  metadata: z.record(z.unknown()).optional(),
});

export const StripeWebhookSchema = z.object({
  id: z.string(),
  type: z.string(),
  data: z.object({
    object: z.unknown(),
  }),
  created: z.number(),
});

export const TossPaymentSchema = z.object({
  payment_key: z.string(),
  order_id: z.string(),
  amount: z.number().min(0),
});

export const KakaoPaymentSchema = z.object({
  tid: z.string(),
  partner_order_id: z.string(),
  partner_user_id: z.string(),
});

// Refund Schemas
export const RefundPaymentSchema = z.object({
  amount: z.number().min(1),
  reason: z.string().min(1),
  metadata: z.record(z.unknown()).optional(),
});

export const RefundResponseSchema = z.object({
  refund_id: z.string(),
  payment_id: z.string(),
  amount: z.number(),
  reason: z.string(),
  status: z.enum(['PENDING', 'COMPLETED', 'FAILED']),
  refunded_at: z.date().nullable(),
});

// Query Schemas
export const PaymentQuerySchema = z.object({
  session_id: z.string().optional(),
  user_id: z.string().optional(),
  status: PaymentStatus.optional(),
  provider: PaymentProvider.optional(),
  method: PaymentMethod.optional(),
  type: PaymentType.optional(),
  min_amount: z.coerce.number().min(0).optional(),
  max_amount: z.coerce.number().min(0).optional(),
  created_after: z.string().datetime().optional(),
  created_before: z.string().datetime().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

// Response Schemas
export const PaginationSchema = z.object({
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
  pages: z.number().int().min(0),
});

export const PaymentListResponseSchema = z.object({
  payments: z.array(PaymentSchema),
  pagination: PaginationSchema,
});

// Extended Response Schemas
export const PaymentWithDetailsSchema = PaymentSchema.extend({
  user: z
    .object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
    })
    .nullable(),
  session: z
    .object({
      id: z.string(),
      program_id: z.string(),
      title: z.string(),
      starts_at: z.date(),
    })
    .nullable(),
  refunds: z
    .array(
      z.object({
        id: z.string(),
        amount: z.number(),
        reason: z.string(),
        refunded_at: z.date(),
      }),
    )
    .default([]),
});

// Stats Schemas
export const PaymentStatsSchema = z.object({
  period: z.string(), // YYYY-MM
  total_payments: z.number().int().min(0),
  completed_payments: z.number().int().min(0),
  failed_payments: z.number().int().min(0),
  refunded_payments: z.number().int().min(0),
  total_revenue: z.number().min(0),
  refunded_amount: z.number().min(0),
  net_revenue: z.number(),
  average_payment_amount: z.number().min(0),
  provider_breakdown: z.record(
    PaymentProvider,
    z.object({
      count: z.number().int().min(0),
      revenue: z.number().min(0),
    }),
  ),
  method_breakdown: z.record(
    PaymentMethod,
    z.object({
      count: z.number().int().min(0),
      revenue: z.number().min(0),
    }),
  ),
});

// Type Exports
export type Payment = z.infer<typeof PaymentSchema>;
export type CreatePayment = z.infer<typeof CreatePaymentSchema>;
export type UpdatePayment = z.infer<typeof UpdatePaymentSchema>;
export type PaymentIntentResponse = z.infer<typeof PaymentIntentResponseSchema>;
export type StripePaymentIntent = z.infer<typeof StripePaymentIntentSchema>;
export type StripeWebhook = z.infer<typeof StripeWebhookSchema>;
export type TossPayment = z.infer<typeof TossPaymentSchema>;
export type KakaoPayment = z.infer<typeof KakaoPaymentSchema>;
export type RefundPayment = z.infer<typeof RefundPaymentSchema>;
export type RefundResponse = z.infer<typeof RefundResponseSchema>;
export type PaymentQuery = z.infer<typeof PaymentQuerySchema>;
export type PaymentListResponse = z.infer<typeof PaymentListResponseSchema>;
export type PaymentWithDetails = z.infer<typeof PaymentWithDetailsSchema>;
export type PaymentStats = z.infer<typeof PaymentStatsSchema>;
export type Pagination = z.infer<typeof PaginationSchema>;

// Helper Functions
export function isPaymentCompleted(payment: Payment): boolean {
  return payment.status === 'COMPLETED';
}

export function isPaymentRefundable(payment: Payment): boolean {
  return payment.status === 'COMPLETED' && payment.paid_at !== null;
}

export function canCancelPayment(payment: Payment): boolean {
  return payment.status === 'PENDING' || payment.status === 'PROCESSING';
}

export function calculateRefundableAmount(payment: Payment, refunds: RefundResponse[]): number {
  const totalRefunded = refunds
    .filter(refund => refund.status === 'COMPLETED')
    .reduce((sum, refund) => sum + refund.amount, 0);

  return Math.max(0, payment.amount - totalRefunded);
}

export function getPaymentStatusMessage(status: PaymentStatus): string {
  const messages = {
    PENDING: '결제 대기중',
    PROCESSING: '결제 처리중',
    COMPLETED: '결제 완료',
    FAILED: '결제 실패',
    CANCELLED: '결제 취소',
    REFUNDED: '환불 완료',
    PARTIALLY_REFUNDED: '부분 환불',
  };
  return messages[status] || '알 수 없음';
}

export function getProviderDisplayName(provider: PaymentProvider): string {
  const names = {
    STRIPE: 'Stripe',
    TOSS: '토스페이',
    KAKAO_PAY: '카카오페이',
    NAVER_PAY: '네이버페이',
  };
  return names[provider] || provider;
}

export function getMethodDisplayName(method: PaymentMethod): string {
  const names = {
    CARD: '신용/체크카드',
    BANK_TRANSFER: '계좌이체',
    VIRTUAL_ACCOUNT: '가상계좌',
    MOBILE: '휴대폰',
    POINT: '포인트',
  };
  return names[method] || method;
}

export function formatCurrency(amount: number, currency: Currency): string {
  const formatters = {
    KRW: (amt: number) => `${amt.toLocaleString('ko-KR')}원`,
    USD: (amt: number) => `$${amt.toLocaleString('en-US')}`,
  };
  return formatters[currency]?.(amount) || `${amount} ${currency}`;
}

export function isKoreanProvider(provider: PaymentProvider): boolean {
  return ['TOSS', 'KAKAO_PAY', 'NAVER_PAY'].includes(provider);
}

export function getPaymentTypeDisplayName(type: PaymentType): string {
  const names = {
    MEMBERSHIP: '멤버십',
    SESSION: '세션 참가비',
    EQUIPMENT: '장비 대여',
  };
  return names[type] || type;
}

// Business Logic Helpers
export function calculateProcessingFee(amount: number, provider: PaymentProvider): number {
  // 간단한 수수료 계산 (실제로는 더 복잡함)
  const rates = {
    STRIPE: 0.029, // 2.9%
    TOSS: 0.025, // 2.5%
    KAKAO_PAY: 0.027, // 2.7%
    NAVER_PAY: 0.026, // 2.6%
  };
  return Math.round(amount * (rates[provider] || 0.03));
}

export function getNetAmount(payment: Payment): number {
  const processingFee = calculateProcessingFee(payment.amount, payment.provider);
  return payment.amount - processingFee;
}

export function isPaymentExpired(payment: Payment, expiryHours: number = 24): boolean {
  if (payment.status !== 'PENDING') return false;

  const now = new Date();
  const createdAt = new Date(payment.created_at);
  const hoursPassed = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);

  return hoursPassed > expiryHours;
}

// Validation Helpers
export function validateCreatePayment(data: unknown) {
  return CreatePaymentSchema.safeParse(data);
}

export function validateRefundPayment(data: unknown) {
  return RefundPaymentSchema.safeParse(data);
}

export function validatePaymentQuery(data: unknown) {
  return PaymentQuerySchema.safeParse(data);
}

export function validateStripeWebhook(data: unknown) {
  return StripeWebhookSchema.safeParse(data);
}

// Error Helpers
export function getPaymentErrorMessage(error: string): string {
  const errorMessages: Record<string, string> = {
    insufficient_funds: '잔액이 부족합니다',
    card_declined: '카드가 거절되었습니다',
    expired_card: '카드가 만료되었습니다',
    incorrect_cvc: 'CVC 번호가 올바르지 않습니다',
    processing_error: '결제 처리 중 오류가 발생했습니다',
    authentication_required: '추가 인증이 필요합니다',
  };
  return errorMessages[error] || '결제 처리 중 오류가 발생했습니다';
}

// Constants
export const MINIMUM_PAYMENT_AMOUNT = {
  KRW: 100,
  USD: 1,
} as const;

export const MAXIMUM_PAYMENT_AMOUNT = {
  KRW: 10_000_000, // 1천만원
  USD: 10_000, // 1만달러
} as const;

export const DEFAULT_PAYMENT_SETTINGS = {
  currency: 'KRW' as Currency,
  provider: 'STRIPE' as PaymentProvider,
  method: 'CARD' as PaymentMethod,
  status: 'PENDING' as PaymentStatus,
};
