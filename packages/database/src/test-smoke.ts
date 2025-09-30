/**
 * Description : test-smoke.ts - 📌 database 패키지의 smoke test 하기
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import { prisma } from './index.js';
import 'dotenv/config';

// DB 연결 테스트: pnpm tsx packages/database/test-smoke.ts
async function main() {
  const now = await prisma.$queryRawUnsafe<Date>('select now()');
  console.log('db ok:', now);
}
main().finally(() => prisma.$disconnect());
