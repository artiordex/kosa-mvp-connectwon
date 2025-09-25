import { Module } from '@nestjs/common';

import { VenuesController } from './venue.controller';
import { VenuesProcessor } from './venue.processor';
import { VenuesService } from './venue.service';

import { VenuesController } from './venue.controller';
import { VenuesProcessor } from './venue.processor';
import { VenuesService } from './venue.service';

// 장소 처리 로직

@Module({
  imports: [],
  controllers: [VenuesController],
  providers: [VenuesService, VenuesProcessor], // 장소 서비스와 프로세서 연결
})
export class VenuesModule {}
