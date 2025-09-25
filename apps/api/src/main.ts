/**
 * Description : main.ts - 📌 NestJS API 서버 부트스트랩 진입점
 * Author : Shiwoo Min
 * Date : 2025-09-12
 * 09-18 : 루트 경로 핸들러 추가
 * 09-26 : Swagger 플러그인 적용
 */
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { createConnectWonSwagger } from '@connectwon/server/plugins/swagger';
import { AppModule } from './app.module.js';
import type { Request, Response } from 'express';
import 'reflect-metadata';

/**
 * @function bootstrap
 * @description NestJS 애플리케이션을 초기화하고, 서버를 설정하는 부트스트랩 함수
 *
 * @async
 * @returns {Promise<void>}
 */
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
      'http://localhost:3000',
      'http://localhost:3001',
      configService.get('FRONTEND_URL', 'http://localhost:3000'),
      configService.get('ADMIN_URL', 'http://localhost:3001'),
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
  });

  // 글로벌 API 프리픽스
  app.setGlobalPrefix('api/v1', {
    exclude: ['/health', '/metrics'],
  });

  // 글로벌 유효성 검사 파이프
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      disableErrorMessages: configService.get('NODE_ENV') === 'production',
    }),
  );

  // Swagger 문서 설정 (개발 환경에서만)
  if (configService.get('NODE_ENV') !== 'production') {
    const swagger = createConnectWonSwagger();
    swagger.setup(app);
    console.log(`Swagger UI: http://localhost:${configService.get('PORT', 8000)}/api-docs`);
  }

  // 루트 경로 핸들러
  app.use('/', (_req: Request, res: Response) => {
    res.status(200).json({
      message: 'Connectwon API Server',
      version: '1.0.0',
      endpoints: {
        health: '/health',
        docs: '/api/docs',
        api: '/api/v1',
      },
      environment: configService.get('NODE_ENV', 'development'),
      timestamp: new Date().toISOString(),
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

  // 서버 시작
  const port = configService.get('PORT', 8000);
  await app.listen(port, '0.0.0.0');

  console.log(`API Server running on: http://localhost:${port}`);
  console.log(`Environment: ${configService.get('NODE_ENV', 'development')}`);
  console.log(`Health Check: http://localhost:${port}/health`);

  // Graceful shutdown
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
