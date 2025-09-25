/**
 * Description : app.module.ts - 📌 NestJS 루트 모듈 (도메인 모듈 통합)
 * Author      : Shiwoo Min
 * Date        : 2025-09-26
 */
import { BullModule } from '@nestjs/bullmq';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

// 내부 패키지들
import * as Core from '@connectwon/core';
import * as DB from '@connectwon/database';
import * as Logger from '@connectwon/logger';

// 서버 공통 레이어
import { HttpExceptionFilter } from '@connectwon/server/filters/http-exception.filter';
import { AuthGuard } from '@connectwon/server/guards/auth.guard';
import { ResponseInterceptor } from '@connectwon/server/interceptors/response.interceptor';

// Middleware
import { AuthMiddleware } from '@connectwon/server/middleware/auth.middleware';
import { CookiesMiddleware } from '@connectwon/server/middleware/cookie.middleware';
import { AppValidationPipe } from '@connectwon/server/pipes/validation.pipe';

// 도메인 모듈들
import { AiModule, AuthModule, MyPageModule, PaymentModule, ProgramModule, ReservationModule, UserModule, VenueModule } from './modules';

@Module({
  imports: [
    /**
     * 환경설정 모듈 (최우선 로드)
     */
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      cache: true,
    }),

    /**
     * BullMQ 큐 모듈
     */
    BullModule.forRoot({
      connection: {
        host: process.env['REDIS_HOST'] || '127.0.0.1',
        port: parseInt(process.env['REDIS_PORT'] || '6379'),
        password: process.env['REDIS_PASSWORD'],
        username: process.env['REDIS_USERNAME'],
        db: parseInt(process.env['REDIS_DB'] || '0'),
        maxRetriesPerRequest: null,
      },
    }),

    /**
     * Job Queue 등록
     */
    BullModule.registerQueue({ name: 'reservation' }, { name: 'notification' }, { name: 'payment' }, { name: 'ai' }),

    /**
     * 도메인 모듈들
     */
    AiModule,
    AuthModule,
    MyPageModule,
    PaymentModule,
    ProgramModule,
    ReservationModule,
    UserModule,
    VenueModule,
  ],
  controllers: [],
  providers: [
    // 전역 가드 (인증)
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // 전역 인터셉터 (응답 포맷)
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    // 전역 파이프 (Validation)
    {
      provide: APP_PIPE,
      useValue: AppValidationPipe,
    },
    // 전역 예외 필터
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  /**
   * @description 전역 미들웨어 등록
   */
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, CookiesMiddleware).forRoutes('*');
  }
}
