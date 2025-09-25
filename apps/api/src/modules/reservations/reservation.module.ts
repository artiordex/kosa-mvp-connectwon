import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationProcessor } from './reservation.processor';
import { ReservationService } from './reservation.service';

@Module({
  imports: [],
  controllers: [ReservationController],
  providers: [ReservationService, ReservationProcessor], // 예약 서비스와 프로세서 연결
})
export class ReservationModule {}
