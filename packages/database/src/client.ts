/**
 * Description : client.ts - 📌 database 패키지의 클라이언트
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */

import { PrismaClient } from '@prisma/client'

// dev 핫리로드 시 다중 인스턴스 방지
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // 타입 에러 방지를 위해 as any 사용
    log: [
      { emit: 'stdout', level: 'error' },
      { emit: 'stdout', level: 'warn' },
      ...(process.env['PRISMA_LOG_QUERIES'] === 'true'
        ? [{ emit: 'stdout', level: 'query' }]
        : []),
    ] as any,
  });

if (process.env['NODE_ENV'] !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
