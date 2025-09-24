/**
 * Description : utils.ts - 📌 database 패키지의 유틸리티 함수
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import type { PrismaClient } from '@prisma/client';
import { prisma } from './client.js';

/**
 * @description 트랜잭션을 실행하는 래퍼 함수 (Prisma 6.x 호환).
 * @template T 실행 결과 타입
 * @param fn - Prisma 트랜잭션 객체를 인자로 받아 실행할 비동기 함수
 * @returns 트랜잭션 내에서 실행된 함수의 결과
 */
export async function withTx<T>(
  fn: (tx: Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>) => Promise<T>,
): Promise<T> {
  return prisma.$transaction(fn);
}

/**
 * @description 간단한 페이징 헬퍼 (count 쿼리 없이 아이템 길이로 총 개수 계산).
 * @template T 아이템 타입
 * @param q - 데이터를 가져오는 비동기 함수
 * @param page - 현재 페이지 (기본값: 1)
 * @param pageSize - 페이지 크기 (기본값: 20)
 * @returns 페이징 결과 객체
 */
export async function paginate<T>(q: () => Promise<T[]>, page = 1, pageSize = 20) {
  const [items] = await Promise.all([q()]);
  const total = items.length;
  return {
    items,
    page,
    pageSize,
    total,
    pages: Math.ceil(total / pageSize),
  };
}

/**
 * @description COUNT 쿼리를 활용한 페이징 헬퍼.
 * @template T 아이템 타입
 * @param queryFn - skip/take 기반으로 데이터를 가져오는 함수
 * @param countFn - 전체 개수를 반환하는 함수
 * @param page - 현재 페이지 (기본값: 1)
 * @param pageSize - 페이지 크기 (기본값: 20)
 * @returns 페이징 결과 객체 (이전/다음 페이지 여부 포함)
 */
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

/**
 * @description DB 연결 상태 확인 함수.
 * @returns 데이터베이스 연결 가능 여부 (true/false)
 */
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}

/**
 * @description 트랜잭션 내에서 안전하게 실행되는 함수.
 * @template T 실행 결과 타입
 * @param fn - Prisma 트랜잭션 객체를 인자로 받아 실행할 비동기 함수
 * @returns 성공 시 { success: true, data }, 실패 시 { success: false, error }
 */
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
