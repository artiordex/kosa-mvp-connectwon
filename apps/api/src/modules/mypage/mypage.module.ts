/**
 * Description : mypage.module.ts - 📌 마이페이지 모듈
 * Author : Shiwoo Min
 * Date : 2025-09-26
 */
import { Module } from '@nestjs/common';
import { MyPageController } from './mypage.controller';
import { MyPageService } from './mypage.service';

@Module({
  imports: [
    // 필요 시 다른 모듈 import (예: TypeOrmModule.forFeature([...]), BullModule.registerQueue({ name: 'mypage-queue' }))
  ],
  controllers: [MyPageController],
  providers: [MyPageService],
  exports: [MyPageService],
})
export class MyPageModule {}
