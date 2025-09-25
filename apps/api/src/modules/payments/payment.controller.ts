import { Body, Controller, Delete, Get, Headers, HttpCode, Param, Post, Query } from '@nestjs/common';
import type { IPaymentService } from './payment.interface';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: IPaymentService) {}

  // 기본 결제
  @Post(':userId')
  async createPayment(@Param('userId') userId: string, @Body() paymentData: any) {
    return this.paymentService.createPayment(userId, paymentData);
  }

  @Post('confirm/:paymentId')
  async confirmPayment(@Param('paymentId') paymentId: string) {
    return this.paymentService.confirmPayment(paymentId);
  }

  @Post('cancel/:paymentId')
  @HttpCode(204)
  async cancelPayment(@Param('paymentId') paymentId: string, @Body('reason') reason?: string) {
    await this.paymentService.cancelPayment(paymentId, reason);
  }

  @Get('status/:paymentId')
  async getPaymentStatus(@Param('paymentId') paymentId: string) {
    return this.paymentService.getPaymentStatus(paymentId);
  }

  // 결제 이력
  @Get('history/:userId')
  async getUserPaymentHistory(@Param('userId') userId: string, @Query('limit') limit?: number, @Query('offset') offset?: number) {
    return this.paymentService.getUserPaymentHistory(userId, limit, offset);
  }

  @Get('detail/:paymentId')
  async getPaymentDetail(@Param('paymentId') paymentId: string) {
    return this.paymentService.getPaymentDetail(paymentId);
  }

  // 환불
  @Post('refund/:paymentId')
  async requestRefund(@Param('paymentId') paymentId: string, @Body() refundData: any) {
    return this.paymentService.requestRefund(paymentId, refundData);
  }

  @Post('refund/process/:refundId')
  async processRefund(@Param('refundId') refundId: string) {
    return this.paymentService.processRefund(refundId);
  }

  @Get('refund/status/:refundId')
  async getRefundStatus(@Param('refundId') refundId: string) {
    return this.paymentService.getRefundStatus(refundId);
  }

  // 결제 수단 관리
  @Get('methods/:userId')
  async getUserPaymentMethods(@Param('userId') userId: string) {
    return this.paymentService.getUserPaymentMethods(userId);
  }

  @Post('methods/:userId')
  async addPaymentMethod(@Param('userId') userId: string, @Body() methodData: any) {
    return this.paymentService.addPaymentMethod(userId, methodData);
  }

  @Delete('methods/:userId/:methodId')
  @HttpCode(204)
  async removePaymentMethod(@Param('userId') userId: string, @Param('methodId') methodId: string) {
    await this.paymentService.removePaymentMethod(userId, methodId);
  }

  @Post('methods/default/:userId/:methodId')
  @HttpCode(204)
  async setDefaultPaymentMethod(@Param('userId') userId: string, @Param('methodId') methodId: string) {
    await this.paymentService.setDefaultPaymentMethod(userId, methodId);
  }

  // 웹훅 처리
  @Post('webhook/:provider')
  @HttpCode(204)
  async handlePaymentWebhook(@Param('provider') provider: string, @Body() webhookData: any) {
    await this.paymentService.handlePaymentWebhook(provider as any, webhookData);
  }

  @Post('webhook/verify/:provider')
  async verifyWebhookSignature(@Param('provider') provider: string, @Headers('x-signature') signature: string, @Body() payload: string) {
    return this.paymentService.verifyWebhookSignature(provider as any, signature, payload);
  }
}
