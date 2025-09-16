/**
 * Description : payments.ts - 📌 Payments 관련 타입정의
 * Author : Shiwoo Min
 * Date : 2025-09-11
 */
// 결제 상태 타입 정의
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED' | 'CANCELLED';

// 결제 수단 타입 정의
export type PaymentMethod = 'CREDIT_CARD' | 'BANK_TRANSFER' | 'CASH' | 'FREE';

// 결제 인터페이스 정의
export interface Payment {
  id: string;
  session_id: string;
  user_id: string;
  participant_id: string;
  amount: number;
  currency: string;
  payment_method: PaymentMethod;
  status: PaymentStatus;
  payment_provider_id: string | null;
  payment_provider_data: Record<string, any>;
  paid_at: string | null;
  refunded_at: string | null;
  refund_reason: string | null;
  created_at: string;
  updated_at: string;
}

// 결제 생성 요청 및 응답 인터페이스
export interface CreatePaymentRequest {
  session_id: string;
  user_id: string;
  participant_id: string;
  amount: number;
  currency?: string;
  payment_method: PaymentMethod;
  payment_provider_data?: Record<string, any>;
}

// 결제 수정 요청 인터페이스
export interface UpdatePaymentRequest {
  status?: PaymentStatus;
  payment_provider_id?: string;
  payment_provider_data?: Record<string, any>;
  paid_at?: string;
  refunded_at?: string;
  refund_reason?: string;
}

// 결제 목록 조회 쿼리 파라미터 인터페이스
export interface PaymentListQuery {
  page?: number;
  limit?: number;
  session_id?: string;
  user_id?: string;
  participant_id?: string;
  status?: PaymentStatus;
  payment_method?: PaymentMethod;
  created_after?: string;
  created_before?: string;
  paid_after?: string;
  paid_before?: string;
}

// 결제 처리 요청 인터페이스
export interface ProcessPaymentRequest {
  payment_id: string;
  payment_token?: string;
  payment_method_details?: Record<string, any>;
}

// 결제 환불 요청 인터페이스
export interface RefundPaymentRequest {
  payment_id: string;
  refund_amount?: number;
  refund_reason: string;
}

// 결제 요약 통계 인터페이스
export interface PaymentSummary {
  total_amount: number;
  currency: string;
  payment_count: number;
  breakdown_by_status: Record<
    PaymentStatus,
    {
      count: number;
      amount: number;
    }
  >;
  breakdown_by_method: Record<
    PaymentMethod,
    {
      count: number;
      amount: number;
    }
  >;
}

// API 응답 인터페이스
export interface PaymentResponse {
  data: Payment;
  message?: string;
}

// 결제 목록 응답 인터페이스
export interface PaymentsListResponse {
  data: Payment[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// 결제 처리 응답 인터페이스
export interface ProcessPaymentResponse {
  success: boolean;
  payment: Payment;
  provider_response?: Record<string, any>;
  message?: string;
}

// 결제 환불 응답 인터페이스
export interface RefundPaymentResponse {
  success: boolean;
  payment: Payment;
  refund_amount: number;
  provider_response?: Record<string, any>;
  message?: string;
}

// 결제 요약 응답 인터페이스
export interface PaymentSummaryResponse {
  data: PaymentSummary;
  period: {
    from: string;
    to: string;
  };
}
