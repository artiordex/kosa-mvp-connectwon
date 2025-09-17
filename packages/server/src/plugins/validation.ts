/**
 * Description : validation.ts - 📌 간소화된 검증 플러그인
 * Author : Shiwoo Min
 * Date : 2025-09-12
 */
import { ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

// 전역 ValidationPipe 프리셋 플러그인 생성 함수
export function createValidationPlugin() {
  return {
    providers: [
      {
        provide: APP_PIPE,
        useValue: new ValidationPipe({
          whitelist: true,
          forbidNonWhitelisted: true,
          transform: true,
        }),
      },
    ],
  };
}

// ConnectWon 기본 Validation 플러그인
export function createConnectWonValidation() {
  return createValidationPlugin();
}
