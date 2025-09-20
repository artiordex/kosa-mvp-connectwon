/**
 * Description : payments.ts - 📌 Payments 관련 타입정의
 * Author : Shiwoo Min
 * Date : 2025-09-11
 */
/**
 * @description 결제 상태 타입 정의
 * @returns 결제 진행 상태를 나타내는 문자열
 */
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED' | 'CANCELLED';

/**
 * @description 결제 수단 타입 정의
 * @returns 결제에 사용된 수단 종류
 */
export type PaymentMethod = 'CREDIT_CARD' | 'BANK_TRANSFER' | 'CASH' | 'FREE';

/**
 * @description 결제 인터페이스 정의
 * @returns 결제 기록의 상세 데이터 구조
 */
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

/**
 * @description 결제 생성 요청 인터페이스
 * @returns 결제 생성에 필요한 정보
 */
export interface CreatePaymentRequest {
  session_id: string;
  user_id: string;
  participant_id: string;
  amount: number;
  currency?: string;
  payment_method: PaymentMethod;
  payment_provider_data?: Record<string, any>;
}

/**
 * @description 결제 수정 요청 인터페이스
 * @returns 결제 정보 수정에 사용 가능한 필드들
 */
export interface UpdatePaymentRequest {
  status?: PaymentStatus;
  payment_provider_id?: string;
  payment_provider_data?: Record<string, any>;
  paid_at?: string;
  refunded_at?: string;
  refund_reason?: string;
}

/**
 * @description 결제 목록 조회 쿼리 파라미터 인터페이스
 * @returns 결제 목록 필터링 및 페이징용 파라미터
 */
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

/**
 * @description 결제 처리 요청 인터페이스
 * @returns 결제 처리에 필요한 데이터
 */
export interface ProcessPaymentRequest {
  payment_id: string;
  payment_token?: string;
  payment_method_details?: Record<string, any>;
}

/**
 * @description 결제 환불 요청 인터페이스
 * @returns 환불 요청에 필요한 데이터
 */
export interface RefundPaymentRequest {
  payment_id: string;
  refund_amount?: number;
  refund_reason: string;
}

/**
 * @description 결제 요약 통계 인터페이스
 * @returns 결제 통계 및 상태별 요약 정보
 */
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

/**
 * @description API 단일 결제 응답 인터페이스
 * @returns 단일 결제 데이터 및 선택적 메시지 포함
 */
export interface PaymentResponse {
  data: Payment;
  message?: string;
}

/**
 * @description 결제 목록 응답 인터페이스
 * @returns 결제 배열과 페이지네이션 정보 포함
 */
export interface PaymentsListResponse {
  data: Payment[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * @description 결제 처리 응답 인터페이스
 * @returns 결제 성공 여부, 결제 데이터, 프로바이더 응답 및 메시지 포함
 */
export interface ProcessPaymentResponse {
  success: boolean;
  payment: Payment;
  provider_response?: Record<string, any>;
  message?: string;
}

/**
 * @description 결제 환불 응답 인터페이스
 * @returns 환불 성공 여부, 결제 데이터, 환불 금액, 프로바이더 응답 및 메시지 포함
 */
export interface RefundPaymentResponse {
  success: boolean;
  payment: Payment;
  refund_amount: number;
  provider_response?: Record<string, any>;
  message?: string;
}

/**
 * @description 결제 요약 응답 인터페이스
 * @returns 결제 요약 데이터 및 기간 정보 포함
 */
export interface PaymentSummaryResponse {
  data: PaymentSummary;
  period: {
    from: string;
    to: string;
  };
}
