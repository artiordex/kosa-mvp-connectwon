import { Module } from '@nestjs/common';

import { PaymentsController } from './payment.controller';
import { PaymentProcessor } from './payment.processor';
import { PaymentsService } from './payment.service';

import { PaymentsController } from './payment.controller';
import { PaymentProcessor } from './payment.processor';
import { PaymentsService } from './payment.service';

// 결제 처리 로직

@Module({
  imports: [],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentProcessor], // 결제 서비스와 프로세서 연결
})
export class PaymentsModule {}
