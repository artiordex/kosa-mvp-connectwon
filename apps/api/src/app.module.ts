/**
 * Description : app.module.ts - 📌 NestJS 루트 모듈 (도메인 모듈 통합)
 * Author : Shiwoo Min
 * Date : 2025-09-12
 */
import { Module } from '@nestjs/common';

@Module({
  imports: [
    // 일단 기본 모듈만 - 나중에 하나씩 추가
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

// import { CoreModule } from '@connectwon/core';
// // 패키지에서 가져오는 공통 모듈들
// import { DatabaseModule } from '@connectwon/database';
// import { LoggerModule } from '@connectwon/logger';
// import { HttpExceptionFilter } from '@connectwon/nest-kit/filters/http-exception.filter';
// // nest-kit에서 가져오는 공통 컴포넌트들
// import { AuthGuard } from '@connectwon/nest-kit/guards/auth.guard';
// import { ResponseInterceptor } from '@connectwon/nest-kit/interceptors/response.interceptor';
// import { ValidationPipe } from '@connectwon/nest-kit/pipes/validation.pipe';
// import { BullModule } from '@nestjs/bullmq';
// import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
// import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

// // 도메인 모듈들
// // import { AiModule } from './ai/module.js';
// // import { AuthModule } from './auth/module.js';
// // import { PaymentsModule } from './payments/module.js';
// // import { ProgramsModule } from './programs/module.js';
// // import { ReservationModule } from './reservation/module.js';
// // import { UsersModule } from './users/module.js';
// // import { VenuesModule } from './venues/module.js';

// @Module({
//   imports: [
//     // 환경설정 모듈 (최우선 로드)
//     ConfigModule.forRoot({
//       isGlobal: true,
//       envFilePath: ['.env.local', '.env'],
//       cache: true,
//     }),

//     // 데이터베이스 모듈
//     DatabaseModule.forRoot(),

//     // 로깅 모듈
//     LoggerModule.forRoot(),

//     // 핵심 비즈니스 로직 모듈
//     CoreModule.forRoot(),

//     // 큐 시스템 모듈 (BullMQ)
//     BullModule.forRoot({
//       connection: {
//         host: process.env['REDIS_HOST'] || '127.0.0.1',
//         port: parseInt(process.env['REDIS_PORT'] || '6379'),
//         password: process.env['REDIS_PASSWORD'],
//         username: process.env['REDIS_USERNAME'],
//         db: parseInt(process.env['REDIS_DB'] || '0'),
//         maxRetriesPerRequest: null,
//       },
//     }),

//     // 큐 등록 (Job 처리용)
//     BullModule.registerQueue(
//       { name: 'reservation' },
//       { name: 'notification' },
//       { name: 'payment' },
//       { name: 'ai' },
//     ),

//     // 도메인 모듈들
//     // AiModule,
//     // AuthModule,
//     // PaymentsModule,
//     // ProgramsModule,
//     // ReservationModule,
//     // UsersModule,
//     // VenuesModule,
//   ],

//   controllers: [],

//   providers: [
//     // 전역 가드 (인증 체크)
//     {
//       provide: APP_GUARD,
//       useClass: AuthGuard,
//     },

//     // 전역 인터셉터 (응답 포맷 통일)
//     {
//       provide: APP_INTERCEPTOR,
//       useClass: ResponseInterceptor,
//     },

//     // 전역 파이프 (유효성 검사)
//     {
//       provide: APP_PIPE,
//       useClass: ValidationPipe,
//     },

//     // 전역 예외 필터 (에러 처리)
//     {
//       provide: APP_FILTER,
//       useClass: HttpExceptionFilter,
//     },
//   ],
// })
// export class AppModule {}
