import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentStatusDto } from './dto/payment-status.dto';
import { PaymentsService } from './payment.service';

import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentStatusDto } from './dto/payment-status.dto';
import { PaymentsService } from './payment.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  /**
   * 결제 생성
   * @param {CreatePaymentDto} createPaymentDto - 결제 요청 데이터
   * @returns {Promise<{ paymentId: string }>} - 생성된 결제 ID 반환
   */
  @Post('create')
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    const paymentId = await this.paymentsService.createPayment(createPaymentDto);
    return { paymentId };
  }

  /**
   * 결제 상태 확인
   * @param {string} paymentId - 결제 ID
   * @returns {Promise<PaymentStatusDto>} - 결제 상태 반환
   */
  @Get('status/:paymentId')
  async getPaymentStatus(@Param('paymentId') paymentId: string) {
    return this.paymentsService.getPaymentStatus(paymentId);
  }
}
