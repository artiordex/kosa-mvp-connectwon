import { Module } from '@nestjs/common'
import { PaymentGatewayModule } from '../payment-gateway/payment-gateway.module';
import { PaymentsController } from './payment.controller';
import { PaymentsService } from './payment.service';

@Module({
  imports: [PaymentGatewayModule], // 결제 게이트웨이 모듈을 임포트하여 결제 처리 기능을 사용
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
