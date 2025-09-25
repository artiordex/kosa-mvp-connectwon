/**
 * Description : auth.controller.ts - 📌 SSO 인증 모듈
 * Author : Shiwoo Min
 * Date : 2025-09-26
 */
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthProcessor } from './auth.processor';
import { AuthService } from './auth.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'auth-queue',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthProcessor],
  exports: [AuthService],
})
export class AuthModule {}
