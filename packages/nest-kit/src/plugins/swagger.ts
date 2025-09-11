/**
 * Description : swagger.ts - 📌 간소화된 API 문서화 플러그인
 * Author : Shiwoo Min
 * Date  : 2025-09-12
 */
import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// Swagger 설정 인터페이스
export interface SwaggerConfig {
  title: string;
  version: string;
  description?: string;
}

// Swagger 플러그인 생성 함수
export function createSwaggerPlugin(config: SwaggerConfig) {
  return {
    setup: (app: INestApplication) => {
      const documentConfig = new DocumentBuilder()
        .setTitle(config.title)
        .setDescription(config.description || 'API Documentation')
        .setVersion(config.version)
        .addBearerAuth()
        .build();
      // Swagger 문서 생성 및 설정
      const document = SwaggerModule.createDocument(app, documentConfig);
      SwaggerModule.setup('api-docs', app, document, {
        explorer: true,
        swaggerOptions: {
          persistAuthorization: true,
        },
      });

      return document;
    },
  };
}

// ConnectWon 기본 Swagger 플러그인
export function createConnectWonSwagger() {
  return createSwaggerPlugin({
    title: 'ConnectWon API',
    version: '1.0.0',
    description: 'ConnectWon 플랫폼 API',
  });
}
