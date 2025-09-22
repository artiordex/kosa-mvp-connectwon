/**
 * Description : main.ts - 📌 NestJS API 서버 부트스트랩 진입점
 * Author : Shiwoo Min
 * Date : 2025-09-12
 * 09-18 : 루트 경로 핸들러 추가
 */
import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { Request, Response } from 'express';

import { AppModule } from './app.module.js';

// 부트스트랩 함수 정의
async function bootstrap() {
  // NestJS 애플리케이션 생성
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  // 환경설정 서비스 가져오기
  const configService = app.get(ConfigService);

  // CORS 설정
  app.enableCors({
    origin: [
      'http://localhost:3000', // web app
      'http://localhost:3001', // admin app
      configService.get('FRONTEND_URL', 'http://localhost:3000'),
      configService.get('ADMIN_URL', 'http://localhost:3001'),
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
  });

  // 글로벌 API 프리픽스 설정
  app.setGlobalPrefix('api/v1', {
    exclude: ['/health', '/metrics'],
  });

  // 글로벌 유효성 검사 파이프 설정
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 정의되지 않은 속성 제거
      forbidNonWhitelisted: true, // 허용되지 않은 속성 있을 시 에러
      transform: true, // 타입 자동 변환
      disableErrorMessages: configService.get('NODE_ENV') === 'production',
    }),
  );

  // Swagger API 문서 설정 (개발 환경에서만 활성화)
  if (configService.get('NODE_ENV') !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Connectwon API')
      .setDescription('Connectwon 플랫폼 REST API 문서')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        'access-token',
      )
      .addTag('auth', '인증 관련 API')
      .addTag('users', '사용자 관리 API')
      .addTag('venues', '장소 관리 API')
      .addTag('programs', '프로그램 관리 API')
      .addTag('reservation', '예약 관리 API')
      .addTag('payments', '결제 관리 API')
      .addTag('ai', 'AI 서비스 API')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });

    console.log('Swagger UI: http://localhost:8000/api/docs');
  }

  // 루트 경로 핸들러
  app.use('/', (_req: Request, res: Response) => {
    res.status(200).json({
      message: 'Connectwon API Server',
      version: '1.0.0',
      endpoints: {
        health: '/health',
        docs: '/api/docs',
        api: '/api/v1'
      },
      environment: configService.get('NODE_ENV', 'development'),
      timestamp: new Date().toISOString()
    });
  });

  // 헬스체크 엔드포인트
  app.use('/health', (_req: Request, res: Response) => {
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: configService.get('NODE_ENV'),
    });
  });

  // 서버 포트 설정
  const port = configService.get('PORT', 8000);

  // 서버 시작
  await app.listen(port, '0.0.0.0');

  console.log(`API Server running on: http://localhost:${port}`);
  console.log(`Environment: ${configService.get('NODE_ENV', 'development')}`);
  console.log(`Health Check: http://localhost:${port}/health`);

  // Graceful shutdown 설정
  process.on('SIGTERM', async () => {
    console.log('SIGTERM received, shutting down gracefully...');
    await app.close();
    process.exit(0);
  });

  process.on('SIGINT', async () => {
    console.log('SIGINT received, shutting down gracefully...');
    await app.close();
    process.exit(0);
  });
}

// 애플리케이션 시작
bootstrap().catch(error => {
  console.error('Failed to start application:', error);
  process.exit(1);
});
