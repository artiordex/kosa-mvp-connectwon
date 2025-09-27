/**
 * Description : validation.pipe.ts - 📌 전역 ValidationPipe 프리셋 + Zod 파이프
 * Author : Shiwoo Min
 * Date : 2025-09-12
 */
import {
  type ArgumentMetadata,
  BadRequestException,
  Injectable,
  type PipeTransform,
  type ValidationError,
  ValidationPipe,
  type ValidationPipeOptions,
} from '@nestjs/common';

import type { ErrorBody } from '../server-types.js';
import type { ZodError, ZodSchema } from 'zod';

// 유틸: 검증 실패 에러 던지기
function throwValidation(details: unknown, message = 'Validation failed'): never {
  const body: { success: false; error: ErrorBody } = {
    success: false,
    error: { code: 'VALIDATION', message, details },
  };
  throw new BadRequestException(body);
}

// class-validator 기반: 전역 프리셋
const DEFAULT_VALIDATION_OPTIONS: ValidationPipeOptions = {
  whitelist: true, // 정의되지 않은 필드 자동 제거
  forbidNonWhitelisted: false, // 제거만 하고 금지는 안 함(원하면 true)
  transform: true, // DTO 타입으로 변환
  transformOptions: { enableImplicitConversion: true }, // 암묵 변환 허용
  forbidUnknownValues: false,
  skipMissingProperties: false,

  // class-validator 오류를 표준 포맷으로 변환
  exceptionFactory: (errors: ValidationError[]) => {
    const details = errors.map(e => ({
      property: e.property,
      constraints: e.constraints,
      children: e.children?.length ? e.children : undefined,
    }));
    return new BadRequestException({
      success: false,
      error: { code: 'VALIDATION', message: 'Validation failed', details },
    });
  },
};

// 전역 파이프로 바로 쓸 수 있는 인스턴스
export const AppValidationPipe = new ValidationPipe(DEFAULT_VALIDATION_OPTIONS);

// 전역 파이프로 쓸 수 있는 팩토리 함수
export function createAppValidationPipe(options?: ValidationPipeOptions) {
  return new ValidationPipe({ ...DEFAULT_VALIDATION_OPTIONS, ...(options ?? {}) });
}

// zod 기반: 라우트 수준 파이프
export type ZodPipeOptions = {
  message?: string;
};

// zod 스키마로 value를 검증/정제하는 파이프
@Injectable()
export class ZodValidationPipe<T = unknown> implements PipeTransform<T> {
  constructor(
    private readonly schema: ZodSchema<T>,
    private readonly opts: ZodPipeOptions = {},
  ) {}

  transform(value: T, _meta: ArgumentMetadata): T {
    if (!this.schema || typeof (this.schema as any).safeParse !== 'function') {
      throwValidation(
        { reason: 'Zod schema is not available or invalid' },
        this.opts.message ?? 'Validation setup error',
      );
    }

    const result = (this.schema as any).safeParse(value) as {
      success: boolean;
      data?: T;
      error?: ZodError;
    };
    if (!result.success) {
      const issues = result.error!.issues.map(i => ({
        path: i.path.join('.'),
        code: i.code,
        message: i.message,
        expected: (i as any).expected,
        received: (i as any).received,
      }));
      throwValidation(issues, this.opts.message ?? 'Validation failed');
    }
    // 정제된 데이터 반환
    return result.data as T;
  }
}
