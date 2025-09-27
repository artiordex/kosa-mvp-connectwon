/**
 * Description : utils.ts - 📌 database 패키지의 유틸리티 함수 (개선된 버전)
 * Author : Shiwoo Min
 * Date : 2025-09-27
 */
import type { Prisma } from '@prisma/client';
import { prisma } from './client.js';

/**
 * @description Prisma 트랜잭션 클라이언트 타입 (타입 안전성 개선)
 */
export type TransactionClient = Prisma.TransactionClient;

/**
 * @description 트랜잭션을 실행하는 래퍼 함수
 * @template T 실행 결과 타입
 * @param fn - Prisma 트랜잭션 객체를 인자로 받아 실행할 비동기 함수
 * @param options - 트랜잭션 옵션
 * @returns 트랜잭션 내에서 실행된 함수의 결과
 */
export async function withTx<T>(
  fn: (tx: TransactionClient) => Promise<T>,
  options?: {
    maxWait?: number;
    timeout?: number;
    isolationLevel?: Prisma.TransactionIsolationLevel;
  },
): Promise<T> {
  return prisma.$transaction(fn, options);
}

/**
 * @description 커서 기반 페이징 헬퍼 (ConnectWon에서 사용)
 * @template T 아이템 타입 (id 필드 필수)
 * @param queryFn - 커서와 limit을 받아 데이터를 반환하는 함수
 * @param cursor - 현재 커서 (마지막 아이템의 ID)
 * @param limit - 페이지 크기 (기본값: 20)
 * @returns 커서 기반 페이징 결과
 */
export async function paginateWithCursor<T extends { id: bigint | string | number }>(
  queryFn: (cursor?: T['id'], take?: number) => Promise<T[]>,
  cursor?: T['id'],
  limit = 20,
) {
  // limit + 1개를 가져와서 다음 페이지 존재 여부 확인
  const items = await queryFn(cursor, limit + 1);
  const hasMore = items.length > limit;

  // 실제 반환할 아이템들 (추가로 가져온 1개 제거)
  if (hasMore) {
    items.pop();
  }

  return {
    items,
    nextCursor: hasMore && items.length > 0 ? items[items.length - 1]?.id || null : null,
    hasMore,
    count: items.length,
  };
}

/**
 * @description 간단한 오프셋 기반 페이징 헬퍼 (페이지 번호 기반)
 * @template T 아이템 타입
 * @param queryFn - skip/take 기반으로 데이터를 가져오는 함수
 * @param page - 현재 페이지 (1부터 시작, 기본값: 1)
 * @param pageSize - 페이지 크기 (기본값: 20)
 * @returns 오프셋 기반 페이징 결과
 */
export async function paginateWithOffset<T>(queryFn: (skip: number, take: number) => Promise<T[]>, page = 1, pageSize = 20) {
  const skip = Math.max(0, (page - 1) * pageSize);
  const items = await queryFn(skip, pageSize);

  return {
    items,
    page,
    pageSize,
    count: items.length,
    // 정확한 hasNext를 알려면 추가 쿼리 필요
    isEmpty: items.length === 0,
    isFull: items.length === pageSize,
  };
}

/**
 * @description COUNT 쿼리를 활용한 완전한 페이징 헬퍼
 * @template T 아이템 타입
 * @param queryFn - skip/take 기반으로 데이터를 가져오는 함수
 * @param countFn - 전체 개수를 반환하는 함수
 * @param page - 현재 페이지 (1부터 시작, 기본값: 1)
 * @param pageSize - 페이지 크기 (기본값: 20)
 * @returns 완전한 페이징 정보를 포함한 결과
 */
export async function paginateWithCount<T>(
  queryFn: (skip: number, take: number) => Promise<T[]>,
  countFn: () => Promise<number>,
  page = 1,
  pageSize = 20,
) {
  const skip = Math.max(0, (page - 1) * pageSize);

  const [items, total] = await Promise.all([queryFn(skip, pageSize), countFn()]);

  const totalPages = Math.ceil(total / pageSize);

  return {
    items,
    pagination: {
      page,
      pageSize,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
      isFirst: page === 1,
      isLast: page === totalPages || totalPages === 0,
    },
  };
}

/**
 * @description DB 연결 상태 확인 함수 (헬스체크용)
 * @returns 데이터베이스 연결 가능 여부와 응답 시간
 */
export async function checkDatabaseConnection(): Promise<{
  isHealthy: boolean;
  responseTime?: number;
  error?: string;
}> {
  const startTime = Date.now();

  try {
    await prisma.$queryRaw`SELECT 1 as health_check`;
    const responseTime = Date.now() - startTime;

    return {
      isHealthy: true,
      responseTime,
    };
  } catch (error) {
    return {
      isHealthy: false,
      responseTime: Date.now() - startTime,
      error: error instanceof Error ? error.message : 'Unknown database error',
    };
  }
}

/**
 * @description 트랜잭션 내에서 안전하게 실행되는 함수 (Result 패턴)
 * @template T 실행 결과 타입
 * @param fn - Prisma 트랜잭션 객체를 인자로 받아 실행할 비동기 함수
 * @param options - 트랜잭션 옵션
 * @returns 성공 시 { success: true, data }, 실패 시 { success: false, error }
 */
export async function safeTransaction<T>(
  fn: (tx: TransactionClient) => Promise<T>,
  options?: {
    maxWait?: number;
    timeout?: number;
    isolationLevel?: Prisma.TransactionIsolationLevel;
  },
): Promise<{ success: true; data: T } | { success: false; error: string; code?: string }> {
  try {
    const data = await withTx(fn, options);
    return { success: true, data };
  } catch (error) {
    let errorMessage = 'Unknown error';
    let errorCode: string | undefined;

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    // Prisma 에러 코드 추출
    if (error && typeof error === 'object' && 'code' in error) {
      errorCode = String(error.code);
    }

    return {
      success: false,
      error: errorMessage,
      ...(errorCode && { code: errorCode }),
    };
  }
}

/**
 * @description 배치 작업을 위한 청크 단위 처리 헬퍼
 * @template T 입력 타입
 * @template R 결과 타입
 * @param items - 처리할 아이템 배열
 * @param processFn - 각 청크를 처리하는 함수
 * @param chunkSize - 청크 크기 (기본값: 100)
 * @returns 모든 청크 처리 결과
 */
export async function processInChunks<T, R>(items: T[], processFn: (chunk: T[]) => Promise<R>, chunkSize = 100): Promise<R[]> {
  const results: R[] = [];

  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    const result = await processFn(chunk);
    results.push(result);
  }

  return results;
}

/**
 * @description Upsert 작업을 위한 헬퍼 (존재하면 업데이트, 없으면 생성)
 * @template T 데이터 타입
 * @param findFn - 기존 데이터를 찾는 함수
 * @param createFn - 데이터를 생성하는 함수
 * @param updateFn - 데이터를 업데이트하는 함수
 * @returns 생성 또는 업데이트된 데이터와 작업 유형
 */
export async function upsert<T>(
  findFn: () => Promise<T | null>,
  createFn: () => Promise<T>,
  updateFn: (existing: T) => Promise<T>,
): Promise<{ data: T; action: 'created' | 'updated' }> {
  const existing = await findFn();

  if (existing) {
    const updated = await updateFn(existing);
    return { data: updated, action: 'updated' };
  } else {
    const created = await createFn();
    return { data: created, action: 'created' };
  }
}

/**
 * @description 데이터베이스 메트릭 수집 (모니터링용)
 * @returns 기본적인 데이터베이스 메트릭
 */
export async function getDatabaseMetrics() {
  try {
    const [connectionInfo, version] = await Promise.all([
      prisma.$queryRaw`
        SELECT
          count(*) as total_connections,
          count(*) FILTER (WHERE state = 'active') as active_connections,
          count(*) FILTER (WHERE state = 'idle') as idle_connections
        FROM pg_stat_activity
        WHERE datname = current_database()
      ` as Promise<
        Array<{
          total_connections: bigint;
          active_connections: bigint;
          idle_connections: bigint;
        }>
      >,
      prisma.$queryRaw`SELECT version()` as Promise<Array<{ version: string }>>,
    ]);

    return {
      connections: {
        total: Number(connectionInfo[0]?.total_connections || 0),
        active: Number(connectionInfo[0]?.active_connections || 0),
        idle: Number(connectionInfo[0]?.idle_connections || 0),
      },
      version: version[0]?.version || 'Unknown',
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      connections: { total: 0, active: 0, idle: 0 },
      version: 'Unknown',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
