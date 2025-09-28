/**
 * Description : client.ts - 📌 database 패키지의 클라이언트
 * Author : Shiwoo Min
 * Date : 2025-09-27
 */
import { Prisma, PrismaClient } from '@prisma/client';

/**
 * @description 글로벌 영역에 Prisma 클라이언트 인스턴스를 저장하기 위한 타입 정의
 */
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

/**
 * @description 환경 변수 기반 로그 설정
 */
const shouldLogQueries = process.env['PRISMA_LOG_QUERIES'] === 'true' || process.env['NODE_ENV'] === 'development';
const shouldLogInfo = process.env['PRISMA_LOG_INFO'] === 'true';

/**
 * @description Prisma 로그 레벨 설정
 */
const getLogLevels = (): Prisma.LogLevel[] => {
  const levels: Prisma.LogLevel[] = ['error', 'warn'];

  if (shouldLogQueries) {
    levels.push('query');
  }

  if (shouldLogInfo) {
    levels.push('info');
  }

  return levels;
};

/**
 * @description Prisma 클라이언트 인스턴스 생성
 */
export const prisma: PrismaClient =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: getLogLevels().map(level => ({ emit: 'stdout', level })),
    errorFormat: 'pretty',
    ...(process.env['NODE_ENV'] === 'production' &&
      process.env['DATABASE_URL'] && {
        // 프로덕션에서는 연결 풀 최적화
        datasources: {
          db: {
            url: process.env['DATABASE_URL'],
          },
        },
      }),
  });

/**
 * @description 개발 환경에서 Prisma 클라이언트를 글로벌 변수에 저장하여 핫리로드 시에도 싱글톤 패턴 유지
 */
if (process.env['NODE_ENV'] !== 'production' && process.env['NODE_ENV'] !== 'test') {
  globalForPrisma.prisma = prisma;
}

/**
 * @description 애플리케이션 종료 시 Prisma 연결 정리
 */
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

export default prisma;
