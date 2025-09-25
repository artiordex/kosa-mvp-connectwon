import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
// 결제 생성 DTO
import { PaymentStatusDto } from './dto/payment-status.dto';
import { PaymentsService } from './payment.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create')
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    const paymentId = await this.paymentsService.createPayment(createPaymentDto);
    return { paymentId };
  }

  @Get('status/:paymentId')
  async getPaymentStatus(@Param('paymentId') paymentId: string) {
    const status = await this.paymentsService.getPaymentStatus(paymentId);
    return { status };
  }
}
