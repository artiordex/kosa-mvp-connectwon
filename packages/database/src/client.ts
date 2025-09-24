/**
 * Description : client.ts - 📌 database 패키지의 클라이언트
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import { Prisma, PrismaClient } from '@prisma/client';

/**
 * @description 글로벌 영역에 Prisma 클라이언트 인스턴스를 저장하기 위한 타입 정의 (개발 환경에서 핫리로드 시 다중 인스턴스 생성을 방지)
 */
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

/**
 * @description Prisma 클라이언트 인스턴스 생성
 */
export const prisma: PrismaClient =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: [
      { emit: 'stdout', level: 'error' },
      { emit: 'stdout', level: 'warn' },
      ...(process.env['PRISMA_LOG_QUERIES'] === 'true' ? [{ emit: 'stdout', level: 'query' } as Prisma.LogDefinition] : []),
    ],
  });

/**
 * @description 개발 환경에서 Prisma 클라이언트를 글로벌 변수에 저장하여 핫리로드 시에도 싱글톤 패턴을 유지
 */
if (process.env['NODE_ENV'] !== 'production' && process.env['NODE_ENV'] !== 'test') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
