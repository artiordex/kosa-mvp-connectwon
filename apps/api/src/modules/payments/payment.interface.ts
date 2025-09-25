/**
 * Description : payment.interface.ts - 📌 결제 서비스 인터페이스 정의
 * Author : Shiwoo Min
 * Date : 2025-09-26
 */

// Placeholder 타입들 (나중에 packages/api-contract/schemas 로 대체 예정)
type PaymentRequest = any;
type PaymentResponse = any;
type PaymentHistory = any;
type RefundRequest = any;
type PaymentMethod = any;
type PaymentStatus = 'pending' | 'completed' | 'failed' | 'cancelled' | 'refunded';
type PaymentProvider = 'stripe' | 'toss' | 'kakao_pay' | 'naver_pay';

/**
 * @description 결제 서비스 인터페이스
 */
export interface IPaymentService {
  // 기본 결제
  createPayment(userId: string, paymentData: PaymentRequest): Promise<PaymentResponse>;
  confirmPayment(paymentId: string): Promise<PaymentResponse>;
  cancelPayment(paymentId: string, reason?: string): Promise<void>;
  getPaymentStatus(paymentId: string): Promise<PaymentStatus>;

  // 결제 이력
  getUserPaymentHistory(userId: string, limit?: number, offset?: number): Promise<PaymentHistory[]>;
  getPaymentDetail(paymentId: string): Promise<PaymentHistory>;

  // 환불
  requestRefund(paymentId: string, refundData: RefundRequest): Promise<any>;
  processRefund(refundId: string): Promise<any>;
  getRefundStatus(refundId: string): Promise<string>;

  // 결제 수단 관리
  getUserPaymentMethods(userId: string): Promise<PaymentMethod[]>;
  addPaymentMethod(userId: string, methodData: PaymentMethod): Promise<PaymentMethod>;
  removePaymentMethod(userId: string, methodId: string): Promise<void>;
  setDefaultPaymentMethod(userId: string, methodId: string): Promise<void>;

  // 웹훅 처리
  handlePaymentWebhook(provider: PaymentProvider, webhookData: any): Promise<void>;
  verifyWebhookSignature(provider: PaymentProvider, signature: string, payload: string): Promise<boolean>;
}
