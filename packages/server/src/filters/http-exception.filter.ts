/**
 * Description : http-exception.filter.ts - 📌 전역 HTTP 예외 필터
 * Author : Shiwoo Min
 * Date : 2025-09-26
 */
import { Catch, HttpException, HttpStatus, Logger } from '@nestjs/common';
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  /**
   * @description 예외를 가로채어 JSON 응답으로 변환
   */
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // 기본 상태코드
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorResponse: any = {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error',
        details: null,
      },
    };

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      errorResponse = {
        success: false,
        error: {
          code: (res as any).code ?? 'HTTP_ERROR',
          message: (res as any).message ?? exception.message,
          details: (res as any).details ?? null,
        },
      };
    } else if (exception instanceof Error) {
      errorResponse = {
        success: false,
        error: {
          code: 'UNEXPECTED_ERROR',
          message: exception.message,
          details: exception.stack,
        },
      };
    }

    // 로깅
    this.logger.error(`[${request.method}] ${request.url} → ${status}`, JSON.stringify(errorResponse));

    // 응답 반환
    response.status(status).json(errorResponse);
  }
}
