/**
 * Description : payments.ts - 📌 Payments 관련 타입정의
 * Author : Shiwoo Min
 * Date : 2025-09-11
 */
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED' | 'CANCELLED';
export type PaymentMethod = 'CREDIT_CARD' | 'BANK_TRANSFER' | 'CASH' | 'FREE';

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

export interface CreatePaymentRequest {
  session_id: string;
  user_id: string;
  participant_id: string;
  amount: number;
  currency?: string;
  payment_method: PaymentMethod;
  payment_provider_data?: Record<string, any>;
}

export interface UpdatePaymentRequest {
  status?: PaymentStatus;
  payment_provider_id?: string;
  payment_provider_data?: Record<string, any>;
  paid_at?: string;
  refunded_at?: string;
  refund_reason?: string;
}

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

export interface ProcessPaymentRequest {
  payment_id: string;
  payment_token?: string;
  payment_method_details?: Record<string, any>;
}

export interface RefundPaymentRequest {
  payment_id: string;
  refund_amount?: number;
  refund_reason: string;
}

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

export interface PaymentResponse {
  data: Payment;
  message?: string;
}

export interface PaymentsListResponse {
  data: Payment[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ProcessPaymentResponse {
  success: boolean;
  payment: Payment;
  provider_response?: Record<string, any>;
  message?: string;
}

export interface RefundPaymentResponse {
  success: boolean;
  payment: Payment;
  refund_amount: number;
  provider_response?: Record<string, any>;
  message?: string;
}

export interface PaymentSummaryResponse {
  data: PaymentSummary;
  period: {
    from: string;
    to: string;
  };
}
