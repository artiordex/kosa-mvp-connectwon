/**
 * Description : payments.ts - 📌 결제 어댑터(Stripe 래퍼)
 * Author      : Shiwoo Min
 * Date        : 2025-09-10
 *
 * - Stripe 같은 결제 SDK를 생성자 주입
 * - 금액은 "최소단위 정수"(예: KRW=원, USD=센트) 기준
 */

// import type { Payments } from '@connectwon/core/ports/payments';

export interface ChargeParams {
  amountMinor: number; // 최소단위
  currency: string; // 'KRW' | 'USD' ...
  customerId: string; // Stripe customer id 등
  description?: string;
  metadata?: Record<string, string>;
  idempotencyKey?: string;
  paymentMethodId?: string; // PM 지정 결제 시
}

export interface RefundParams {
  chargeId: string;
  amountMinor?: number; // 부분환불 시
  reason?: string;
  metadata?: Record<string, string>;
}

export class StripePayments /* implements Payments */ {
  constructor(private readonly stripe: any) {}

  /** 결제 승인/즉시청구(환경에 맞춰 capture 전략 조절) */
  async charge(params: ChargeParams): Promise<{ id: string }> {
    try {
      // PaymentIntent 기반 예시
      const intent = await this.stripe.paymentIntents.create(
        {
          amount: params.amountMinor,
          currency: params.currency.toLowerCase(),
          customer: params.customerId,
          confirm: !!params.paymentMethodId,
          payment_method: params.paymentMethodId,
          description: params.description,
          metadata: params.metadata,
        },
        params.idempotencyKey ? { idempotencyKey: params.idempotencyKey } : undefined,
      );
      return { id: intent.id };
    } catch (err) {
      // 로깅/매핑 포인트
      throw err;
    }
  }

  /** 환불 */
  async refund(params: RefundParams): Promise<{ id: string }> {
    try {
      const refund = await this.stripe.refunds.create({
        charge: params.chargeId,
        amount: params.amountMinor,
        reason: params.reason,
        metadata: params.metadata,
      });
      return { id: refund.id };
    } catch (err) {
      throw err;
    }
  }

  /** 헬스체크 */
  async health(): Promise<boolean> {
    try {
      // 가벼운 API 호출(요금 주의). 사용량 고려해서 적절히 교체
      await this.stripe.balance.retrieve();
      return true;
    } catch {
      return false;
    }
  }
}
