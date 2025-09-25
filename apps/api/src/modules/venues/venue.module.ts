/**
 * Description : venue.module.ts - 📌 장소(Venue) 모듈 정의
 * Author : Shiwoo Min
 * Date : 2025-09-26
 */
import { Module } from '@nestjs/common';
import { VenueController } from './venue.controller';
import { VenueService } from './venue.service';

@Module({
  controllers: [VenueController],
  providers: [VenueService],
  exports: [VenueService], // 다른 모듈에서 VenueService 사용 가능하도록 export
})
export class VenueModule {}
