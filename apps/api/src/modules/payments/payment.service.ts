import { Injectable } from '@nestjs/common';

import { PaymentGatewayService } from '../payment-gateway/payment-gateway.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentStatusDto } from './dto/payment-status.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly paymentGatewayService: PaymentGatewayService) {}

  /**
   * 결제 생성
   * @param {CreatePaymentDto} createPaymentDto - 결제 생성 요청 데이터
   * @returns {Promise<string>} - 결제 ID
   */
  async createPayment(createPaymentDto: CreatePaymentDto): Promise<string> {
    // 결제 게이트웨이 서비스를 호출하여 결제 생성
    const paymentResponse = await this.paymentGatewayService.createPayment(createPaymentDto);
    return paymentResponse.paymentId;
  }

  /**
   * 결제 상태 확인
   * @param {string} paymentId - 결제 ID
   * @returns {Promise<PaymentStatusDto>} - 결제 상태 정보
   */
  async getPaymentStatus(paymentId: string): Promise<PaymentStatusDto> {
    // 결제 게이트웨이 서비스에서 결제 상태를 확인
    const status = await this.paymentGatewayService.getPaymentStatus(paymentId);
    return { status };
  }
}
