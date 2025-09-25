/**
 * Description : ai.module.ts - 📌 AI 모듈 (Controller, Service, Processor 등록 및 Queue 설정)
 * Author : Shiwoo Min
 * Date : 2025-09-26
 */
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiProcessor } from './ai.processor';
import { AiService } from './ai.service';
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'ai-queue',
    }),
  ],
  controllers: [AiController],
  providers: [AiService, AiProcessor],
  exports: [AiService],
})
export class AiModule {}
