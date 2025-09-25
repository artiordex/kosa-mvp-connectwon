/**
 * Description : swagger.ts - 📌 간소화된 API 문서화 플러그인 (개선 버전)
 * Author : Shiwoo Min
 * Date  : 2025-09-12
 */
import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';

/**
 * Swagger 설정 인터페이스
 */
export interface SwaggerConfig {
  title: string;
  version: string;
  description?: string;
  outputFile?: string; // CI/CD 등에서 OpenAPI JSON Export 옵션
  tags?: string[]; // 태그 목록
}

/**
 * Swagger 플러그인 생성 함수
 */
export function createSwaggerPlugin(config: SwaggerConfig) {
  return {
    setup: (app: INestApplication) => {
      // DocumentBuilder 생성
      const builder = new DocumentBuilder()
        .setTitle(config.title)
        .setDescription(config.description || 'API Documentation')
        .setVersion(config.version)
        .addBearerAuth();

      // 태그가 있으면 자동 추가
      if (config.tags) {
        config.tags.forEach(tag => builder.addTag(tag));
      }

      const documentConfig = builder.build();

      // Swagger 문서 생성
      const document = SwaggerModule.createDocument(app, documentConfig);

      // Swagger UI 경로 (환경변수 기반)
      const swaggerPath = process.env['SWAGGER_PATH'] || 'api-docs';

      SwaggerModule.setup(swaggerPath, app, document, {
        explorer: true,
        swaggerOptions: {
          persistAuthorization: true, // Swagger UI에서 토큰 유지
        },
      });

      // 필요 시 JSON 파일로 export (CI/CD 배포용)
      if (config.outputFile) {
        writeFileSync(config.outputFile, JSON.stringify(document, null, 2));
        console.log(`OpenAPI spec exported to: ${config.outputFile}`);
      }

      return document;
    },
  };
}

/**
 * ConnectWon 기본 Swagger 플러그인
 */
export function createConnectWonSwagger() {
  return createSwaggerPlugin({
    title: 'ConnectWon API',
    version: '1.0.0',
    description: 'ConnectWon 플랫폼 API',
    outputFile: './openapi-spec.json', // CI/CD 빌드 시 export
    tags: ['Users', 'Programs', 'Reservations', 'Payments', 'Venues'],
  });
}
