/**
 * Description : utils.ts - 📌 database 패키지의 유틸리티 함수
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import type { PrismaClient } from '@prisma/client';

import { prisma } from './client.js';

// 트랜잭션 래퍼 - Prisma 6.x 호환
export async function withTx<T>(
  fn: (
    tx: Omit<
      PrismaClient,
      '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
    >,
  ) => Promise<T>,
): Promise<T> {
  return prisma.$transaction(fn);
}

// 간단한 페이징 헬퍼
export async function paginate<T>(q: () => Promise<T[]>, page = 1, pageSize = 20) {
  const [items] = await Promise.all([q()]);
  const total = items.length; // 실제로는 count 쿼리 권장
  return {
    items,
    page,
    pageSize,
    total,
    pages: Math.ceil(total / pageSize),
  };
}

// COUNT 쿼리 페이징 헬퍼
export async function paginateWithCount<T>(
  queryFn: (skip: number, take: number) => Promise<T[]>,
  countFn: () => Promise<number>,
  page = 1,
  pageSize = 20,
) {
  const skip = (page - 1) * pageSize;

  const [items, total] = await Promise.all([queryFn(skip, pageSize), countFn()]);

  return {
    items,
    page,
    pageSize,
    total,
    pages: Math.ceil(total / pageSize),
    hasNext: skip + pageSize < total,
    hasPrev: page > 1,
  };
}

// 연결 상태 확인
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}

// 트랜잭션 내에서 안전한 실행
export async function safeTransaction<T>(
  fn: (
    tx: Omit<
      PrismaClient,
      '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
    >,
  ) => Promise<T>,
): Promise<{ success: true; data: T } | { success: false; error: string }> {
  try {
    const data = await withTx(fn);
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
