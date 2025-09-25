/**
 * Description : mypage.module.ts - 📌 어드민 관련 모듈
 * Author : Shiwoo Min
 * Date : 2025-09-26
 */
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [
    // 필요 시 다른 모듈 import (예: TypeOrmModule.forFeature([...]), BullModule.registerQueue({ name: 'mypage-queue' }))
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
