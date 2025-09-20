/**
 * Description : payments.ts - 📌 결제 스키마 (Zod 기반, DTO 대체)
 * Author : Shiwoo Min
 * Date : 2025-09-16
 */
import { z } from 'zod';

/**
 * @description 결제 제공자 열거형 (현재 Stripe만 지원)
 */
export const PaymentProvider = z.enum(['STRIPE']);

/**
 * @description 결제 수단 열거형
 */
export const PaymentMethod = z.enum(['CARD', 'BANK_TRANSFER', 'VIRTUAL_ACCOUNT', 'MOBILE', 'POINT']);

/**
 * @description 결제 상태 열거형
 */
export const PaymentStatus = z.enum(['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED', 'REFUNDED', 'PARTIALLY_REFUNDED']);

/**
 * @description 통화 열거형
 */
export const Currency = z.enum(['KRW', 'USD']);

/**
 * @description 결제 유형 열거형
 */
export const PaymentType = z.enum(['MEMBERSHIP', 'SESSION', 'EQUIPMENT']);

/**
 * @description 결제 제공자 타입
 */
export type PaymentProvider = z.infer<typeof PaymentProvider>;

/**
 * @description 결제 수단 타입
 */
export type PaymentMethod = z.infer<typeof PaymentMethod>;

/**
 * @description 결제 상태 타입
 */
export type PaymentStatus = z.infer<typeof PaymentStatus>;

/**
 * @description 통화 타입
 */
export type Currency = z.infer<typeof Currency>;

/**
 * @description 결제 유형 타입
 */
export type PaymentType = z.infer<typeof PaymentType>;

/**
 * @description 결제 기본 스키마
 */
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

/**
 * @description 결제 생성 요청 스키마
 */
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

/**
 * @description 결제 수정 요청 스키마
 */
export const UpdatePaymentSchema = z.object({
  status: PaymentStatus.optional(),
  status_reason: z.string().optional(),
  external_payment_id: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
  paid_at: z.string().datetime().optional(),
});

/**
 * @description 결제 인텐트 응답 스키마
 */
export const PaymentIntentResponseSchema = z.object({
  payment_intent_id: z.string(),
  client_secret: z.string(),
  amount: z.number(),
  currency: Currency,
  status: PaymentStatus,
  payment_id: z.string(), // 내부 결제 ID
});

/**
 * @description Stripe 결제 인텐트 스키마
 */
export const StripePaymentIntentSchema = z.object({
  payment_intent_id: z.string(),
  amount: z.number().min(0),
  metadata: z.record(z.unknown()).optional(),
});

/**
 * @description Stripe 웹훅 스키마
 */
export const StripeWebhookSchema = z.object({
  id: z.string(),
  type: z.string(),
  data: z.object({
    object: z.unknown(),
  }),
  created: z.number(),
});

/**
 * @description 토스페이먼츠 결제 스키마
 */
export const TossPaymentSchema = z.object({
  payment_key: z.string(),
  order_id: z.string(),
  amount: z.number().min(0),
});

/**
 * @description 카카오페이 결제 스키마
 */
export const KakaoPaymentSchema = z.object({
  tid: z.string(),
  partner_order_id: z.string(),
  partner_user_id: z.string(),
});

/**
 * @description 환불 요청 스키마
 */
export const RefundPaymentSchema = z.object({
  amount: z.number().min(1),
  reason: z.string().min(1),
  metadata: z.record(z.unknown()).optional(),
});

/**
 * @description 환불 응답 스키마
 */
export const RefundResponseSchema = z.object({
  refund_id: z.string(),
  payment_id: z.string(),
  amount: z.number(),
  reason: z.string(),
  status: z.enum(['PENDING', 'COMPLETED', 'FAILED']),
  refunded_at: z.date().nullable(),
});

/**
 * @description 결제 목록 조회 쿼리 스키마
 */
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

/**
 * @description 페이지네이션 스키마
 */
export const PaginationSchema = z.object({
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
  pages: z.number().int().min(0),
});

/**
 * @description 결제 목록 응답 스키마
 */
export const PaymentListResponseSchema = z.object({
  payments: z.array(PaymentSchema),
  pagination: PaginationSchema,
});

/**
 * @description 결제 상세 정보 포함 스키마
 */
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

/**
 * @description 결제 통계 스키마
 */
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

/**
 * @description 결제 기본 타입
 */
export type Payment = z.infer<typeof PaymentSchema>;

/**
 * @description 결제 생성 요청 타입
 */
export type CreatePayment = z.infer<typeof CreatePaymentSchema>;

/**
 * @description 결제 수정 요청 타입
 */
export type UpdatePayment = z.infer<typeof UpdatePaymentSchema>;

/**
 * @description 결제 인텐트 응답 타입
 */
export type PaymentIntentResponse = z.infer<typeof PaymentIntentResponseSchema>;

/**
 * @description Stripe 결제 인텐트 타입
 */
export type StripePaymentIntent = z.infer<typeof StripePaymentIntentSchema>;

/**
 * @description Stripe 웹훅 타입
 */
export type StripeWebhook = z.infer<typeof StripeWebhookSchema>;

/**
 * @description 토스페이먼츠 결제 타입
 */
export type TossPayment = z.infer<typeof TossPaymentSchema>;

/**
 * @description 카카오페이 결제 타입
 */
export type KakaoPayment = z.infer<typeof KakaoPaymentSchema>;

/**
 * @description 환불 요청 타입
 */
export type RefundPayment = z.infer<typeof RefundPaymentSchema>;

/**
 * @description 환불 응답 타입
 */
export type RefundResponse = z.infer<typeof RefundResponseSchema>;

/**
 * @description 결제 목록 조회 쿼리 타입
 */
export type PaymentQuery = z.infer<typeof PaymentQuerySchema>;

/**
 * @description 결제 목록 응답 타입
 */
export type PaymentListResponse = z.infer<typeof PaymentListResponseSchema>;

/**
 * @description 결제 상세 정보 포함 타입
 */
export type PaymentWithDetails = z.infer<typeof PaymentWithDetailsSchema>;

/**
 * @description 결제 통계 타입
 */
export type PaymentStats = z.infer<typeof PaymentStatsSchema>;

/**
 * @description 페이지네이션 타입
 */
export type Pagination = z.infer<typeof PaginationSchema>;

/**
 * @description 결제 완료 여부 확인 함수
 * @param payment 확인할 결제 객체
 * @returns 결제가 완료되었으면 true, 그렇지 않으면 false
 */
export function isPaymentCompleted(payment: Payment): boolean {
  return payment.status === 'COMPLETED';
}

/**
 * @description 결제 환불 가능 여부 확인 함수
 * @param payment 확인할 결제 객체
 * @returns 환불 가능하면 true, 그렇지 않으면 false
 */
export function isPaymentRefundable(payment: Payment): boolean {
  return payment.status === 'COMPLETED' && payment.paid_at !== null;
}

/**
 * @description 결제 취소 가능 여부 확인 함수
 * @param payment 확인할 결제 객체
 * @returns 취소 가능하면 true, 그렇지 않으면 false
 */
export function canCancelPayment(payment: Payment): boolean {
  return payment.status === 'PENDING' || payment.status === 'PROCESSING';
}

/**
 * @description 환불 가능한 금액 계산 함수
 * @param payment 대상 결제 객체
 * @param refunds 기존 환불 목록
 * @returns 환불 가능한 금액
 */
export function calculateRefundableAmount(payment: Payment, refunds: RefundResponse[]): number {
  const totalRefunded = refunds.filter(refund => refund.status === 'COMPLETED').reduce((sum, refund) => sum + refund.amount, 0);

  return Math.max(0, payment.amount - totalRefunded);
}

/**
 * @description 결제 상태별 메시지 반환 함수
 * @param status 결제 상태
 * @returns 한국어 상태 메시지
 */
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

/**
 * @description 결제 제공자 표시명 반환 함수
 * @param provider 결제 제공자
 * @returns 한국어 제공자명
 */
export function getProviderDisplayName(provider: PaymentProvider): string {
  const names = {
    STRIPE: 'Stripe',
    TOSS: '토스페이',
    KAKAO_PAY: '카카오페이',
    NAVER_PAY: '네이버페이',
  };
  return names[provider] || provider;
}

/**
 * @description 결제 수단 표시명 반환 함수
 * @param method 결제 수단
 * @returns 한국어 결제 수단명
 */
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

/**
 * @description 통화별 금액 포맷팅 함수
 * @param amount 금액
 * @param currency 통화
 * @returns 포맷된 금액 문자열
 */
export function formatCurrency(amount: number, currency: Currency): string {
  const formatters = {
    KRW: (amt: number) => `${amt.toLocaleString('ko-KR')}원`,
    USD: (amt: number) => `$${amt.toLocaleString('en-US')}`,
  };
  return formatters[currency]?.(amount) || `${amount} ${currency}`;
}

/**
 * @description 한국 결제 제공자 여부 확인 함수
 * @param provider 결제 제공자
 * @returns 한국 제공자이면 true, 그렇지 않으면 false
 */
export function isKoreanProvider(provider: PaymentProvider): boolean {
  return ['TOSS', 'KAKAO_PAY', 'NAVER_PAY'].includes(provider);
}

/**
 * @description 결제 유형 표시명 반환 함수
 * @param type 결제 유형
 * @returns 한국어 결제 유형명
 */
export function getPaymentTypeDisplayName(type: PaymentType): string {
  const names = {
    MEMBERSHIP: '멤버십',
    SESSION: '세션 참가비',
    EQUIPMENT: '장비 대여',
  };
  return names[type] || type;
}

/**
 * @description 결제 수수료 계산 함수
 * @param amount 결제 금액
 * @param provider 결제 제공자
 * @returns 계산된 수수료
 */
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

/**
 * @description 수수료 제외 순 금액 계산 함수
 * @param payment 결제 객체
 * @returns 수수료 제외 순 금액
 */
export function getNetAmount(payment: Payment): number {
  const processingFee = calculateProcessingFee(payment.amount, payment.provider);
  return payment.amount - processingFee;
}

/**
 * @description 결제 만료 여부 확인 함수
 * @param payment 확인할 결제 객체
 * @param expiryHours 만료 시간 (시간 단위, 기본값: 24시간)
 * @returns 만료되었으면 true, 그렇지 않으면 false
 */
export function isPaymentExpired(payment: Payment, expiryHours: number = 24): boolean {
  if (payment.status !== 'PENDING') return false;

  const now = new Date();
  const createdAt = new Date(payment.created_at);
  const hoursPassed = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);

  return hoursPassed > expiryHours;
}

/**
 * @description 결제 생성 데이터 유효성 검사 함수
 * @param data 검사할 데이터
 * @returns Zod 파싱 결과
 */
export function validateCreatePayment(data: unknown) {
  return CreatePaymentSchema.safeParse(data);
}

/**
 * @description 환불 요청 데이터 유효성 검사 함수
 * @param data 검사할 데이터
 * @returns Zod 파싱 결과
 */
export function validateRefundPayment(data: unknown) {
  return RefundPaymentSchema.safeParse(data);
}

/**
 * @description 결제 조회 쿼리 유효성 검사 함수
 * @param data 검사할 데이터
 * @returns Zod 파싱 결과
 */
export function validatePaymentQuery(data: unknown) {
  return PaymentQuerySchema.safeParse(data);
}

/**
 * @description Stripe 웹훅 데이터 유효성 검사 함수
 * @param data 검사할 데이터
 * @returns Zod 파싱 결과
 */
export function validateStripeWebhook(data: unknown) {
  return StripeWebhookSchema.safeParse(data);
}

/**
 * @description 결제 오류 메시지 반환 함수
 * @param error 오류 코드
 * @returns 한국어 오류 메시지
 */
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

/**
 * @description 통화별 최소 결제 금액 상수
 */
export const MINIMUM_PAYMENT_AMOUNT = {
  KRW: 100,
  USD: 1,
} as const;

/**
 * @description 통화별 최대 결제 금액 상수
 */
export const MAXIMUM_PAYMENT_AMOUNT = {
  KRW: 10_000_000, // 1천만원
  USD: 10_000, // 1만달러
} as const;

/**
 * @description 기본 결제 설정 상수
 */
export const DEFAULT_PAYMENT_SETTINGS = {
  currency: 'KRW' as Currency,
  provider: 'STRIPE' as PaymentProvider,
  method: 'CARD' as PaymentMethod,
  status: 'PENDING' as PaymentStatus,
};
