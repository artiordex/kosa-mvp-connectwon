/**
 * Description : Response.interceptor.ts - 📌 반환값을 ApiResponse<T>로 통일하고 elapsedMs만 붙임
 * Author : Shiwoo Min
 * Date : 2025-09-12
 */
import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Injectable, StreamableFile } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RAW_RESPONSE_KEY } from '../decorators/api-response.js';
import type { ApiResponse, ApiSuccess, ResponseMeta } from '../server-types.js';
import { map, Observable } from 'rxjs';

function isApiResponseLike(x: any): x is ApiResponse<unknown> {
  return x && typeof x === 'object' && 'success' in x && ('data' in x || 'error' in x);
}

function isRawBody(x: any): boolean {
  // 파일/스트림/버퍼 등은 래핑하지 않음
  if (x instanceof StreamableFile) return true;
  if (typeof x?.pipe === 'function') return true; // Node stream
  if (Buffer.isBuffer?.(x)) return true;
  return false;
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const started = Date.now();
    const http = ctx.switchToHttp();
    const req = http.getRequest<{ headers?: Record<string, any>; id?: string }>();

    const skipWrap = this.reflector.getAllAndOverride<boolean>(RAW_RESPONSE_KEY, [ctx.getHandler(), ctx.getClass()]);

    return next.handle().pipe(
      map((val: any) => {
        if (skipWrap || isRawBody(val) || isApiResponseLike(val)) return val;

        const meta: ResponseMeta = {
          elapsedMs: Date.now() - started,
          requestId: (req?.headers?.['x-request-id'] ?? req?.id) as any,
        };

        const body: ApiSuccess<any> = { success: true, data: val, meta };
        return body;
      }),
    );
  }
}
