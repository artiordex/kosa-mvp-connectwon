// packages/database/src/index.ts
export { PrismaClient } from '../generated'
export type * from '../generated'
import { config } from 'dotenv'
import path from 'path'

config({ path: path.join(__dirname, '../.env') })

// 싱글톤 Prisma 클라이언트
import { PrismaClient } from '../generated'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// 데이터베이스 연결 테스트
export async function testConnection() {
  try {
    await prisma.$connect()
    console.log('Database connected successfully')
    return true
  } catch (error) {
    console.error('Database connection failed:', error)
    return false
  }
}

// 데이터베이스 연결 종료
export async function disconnect() {
  await prisma.$disconnect()
}
