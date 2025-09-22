/**
 * Description : payments.ts - 📌 결제 어댑터(Stripe 래퍼)
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
// import type { Payments } from '@connectwon/core/ports/payments';

/**
 * @description 결제(청구) 파라미터
 */
export interface ChargeParams {
  /** @description 최소 화폐 단위 금액(예: KRW=원) */
  amountMinor: number;
  /** @description 통화 코드 (예: 'KRW', 'USD') */
  currency: string;
  /** @description 고객 식별자(Stripe customer id 등) */
  customerId: string;
  /** @description 설명(선택) */
  description?: string;
  /** @description 메타데이터(선택) */
  metadata?: Record<string, string>;
  /** @description 멱등성 키(선택) */
  idempotencyKey?: string;
  /** @description 지정 결제수단으로 즉시 confirm 시 사용 */
  paymentMethodId?: string;
}

/**
 * @description 환불 파라미터
 */
export interface RefundParams {
  /** @description 원 거래 ID */
  chargeId: string;
  /** @description 환불 금액(최소단위, 선택: 전체 환불 기본) */
  amountMinor?: number;
  /** @description 환불 사유(선택) */
  reason?: string;
  /** @description 메타데이터(선택) */
  metadata?: Record<string, string>;
}

/**
 * @description Stripe 결제 어댑터 래퍼
 */
export class StripePayments /* implements Payments */ {
  /**
   * @param {any} stripe Stripe SDK 인스턴스
   */
  constructor(private readonly stripe: any) {}

  /**
   * @description 결제 승인/즉시 청구
   * @param {ChargeParams} params 청구 파라미터
   * @returns {Promise<{ id: string }>} 생성된 결제/인텐트 ID
   */
  async charge(params: ChargeParams): Promise<{ id: string }> {
    try {
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
      throw err;
    }
  }

  /**
   * @description 환불 수행
   * @param {RefundParams} params 환불 파라미터
   * @returns {Promise<{ id: string }>} 환불 ID
   */
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

  /**
   * @description 결제 시스템 헬스체크(비용 고려 필요)
   * @returns {Promise<boolean>} 성공 여부
   */
  async health(): Promise<boolean> {
    try {
      await this.stripe.balance.retrieve();
      return true;
    } catch {
      return false;
    }
  }
}
