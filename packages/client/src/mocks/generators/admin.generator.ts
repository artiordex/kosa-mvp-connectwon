/**
 * Description : admin.generator.ts - 📌 관리자(Admin) 관련 더미 데이터 생성기
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */
import { faker } from '@faker-js/faker/locale/ko';
import type { AdminStats, AdminActivity, AdminReport  } from '../../mock-types.js';

// 관리자 대시보드 통계 생성
export function generateAdminStats(): AdminStats {
  const totalUsers = faker.number.int({ min: 500, max: 5000 });
  const activeUsers = faker.number.int({
    min: Math.floor(totalUsers * 0.3),
    max: Math.floor(totalUsers * 0.7),
  });
  const totalReservations = faker.number.int({ min: 1000, max: 10000 });

  return {
    totalUsers,
    totalPrograms: faker.number.int({ min: 50, max: 500 }),
    totalReservations,
    totalRevenue: faker.number.int({ min: 5_000_000, max: 50_000_000 }),
    activeUsers,
    completedSessions: faker.number.int({ min: 200, max: 2000 }),
    pendingReservations: faker.number.int({ min: 10, max: 100 }),
    cancelledReservations: faker.number.int({
      min: Math.floor(totalReservations * 0.05),
      max: Math.floor(totalReservations * 0.15),
    }),
  };
}

// 관리자 활동 로그 생성
export function generateAdminActivity(override: Partial<AdminActivity> = {}): AdminActivity {
  const actions = [
    'user_approved',
    'user_suspended',
    'program_created',
    'program_updated',
    'program_deleted',
    'venue_updated',
    'room_created',
    'reservation_cancelled',
    'refund_processed',
    'report_generated',
  ];

  const targetTypes = ['user', 'program', 'session', 'venue', 'room', 'reservation', 'payment'];
  const action = faker.helpers.arrayElement(actions);
  const targetType = faker.helpers.arrayElement(targetTypes);
  return {
    id: faker.string.uuid(),
    adminId: faker.number.int({ min: 1, max: 10 }),
    action,
    targetType,
    targetId: faker.number.int({ min: 1, max: 9999 }),
    description: `${action.replace('_', ' ')} on ${targetType}`,
    timestamp: faker.date.recent().toISOString(),
    metadata: {
      ipAddress: faker.internet.ip(),
      userAgent: faker.internet.userAgent(),
    },
    ...override,
  };
}

// 관리자 리포트 생성 (일간 / 주간 / 월간)
export function generateAdminReport(override: Partial<AdminReport> = {}): AdminReport {
  const type = faker.helpers.arrayElement(['daily', 'weekly', 'monthly'] as const);
  let period: string | undefined;

  switch (type) {
    case 'daily': {
      const date = faker.date.recent({ days: 30 });
      period = date.toISOString().split('T')[0];
      break;
    }
    case 'weekly': {
      const start = faker.date.recent({ days: 90 });
      const end = new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000);
      period = `${start.toISOString().split('T')[0]} ~ ${end.toISOString().split('T')[0]}`;
      break;
    }
    case 'monthly': {
      const month = faker.date.recent({ days: 365 });
      period = `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, '0')}`;
      break;
    }
    default:
      period = new Date().toISOString().split('T')[0];
  }

  return {
    id: faker.string.uuid(),
    type,
    period: period!,
    stats: generateAdminStats(),
    generatedAt: faker.date.recent().toISOString(),
    generatedBy: faker.number.int({ min: 1, max: 10 }),
    ...override,
  };
}

// 실시간 대시보드 통계 생성
export function generateRealtimeStats() {
  return {
    onlineUsers: faker.number.int({ min: 10, max: 200 }),
    activeReservations: faker.number.int({ min: 5, max: 50 }),
    todayRevenue: faker.number.int({ min: 100_000, max: 1_000_000 }),
    todaySignups: faker.number.int({ min: 0, max: 20 }),
    pendingApprovals: faker.number.int({ min: 0, max: 10 }),
    systemStatus: faker.helpers.arrayElement(['healthy', 'warning', 'critical']),
    lastUpdated: new Date().toISOString(),
  };
}

// 사용자 관리 통계 생성
export function generateUserManagementData() {
  return {
    totalUsers: faker.number.int({ min: 500, max: 5000 }),
    activeUsers: faker.number.int({ min: 300, max: 3000 }),
    suspendedUsers: faker.number.int({ min: 0, max: 50 }),
    newUsersToday: faker.number.int({ min: 0, max: 30 }),
    newUsersThisWeek: faker.number.int({ min: 0, max: 150 }),
    newUsersThisMonth: faker.number.int({ min: 0, max: 500 }),
  };
}

// 프로그램 관리 통계 생성
export function generateProgramManagementStats() {
  return {
    totalPrograms: faker.number.int({ min: 50, max: 500 }),
    activePrograms: faker.number.int({ min: 30, max: 300 }),
    completedPrograms: faker.number.int({ min: 20, max: 200 }),
    cancelledPrograms: faker.number.int({ min: 0, max: 20 }),
    averageRating: faker.number.float({ min: 3.5, max: 5.0, fractionDigits: 1 }),
    totalParticipants: faker.number.int({ min: 500, max: 5000 }),
  };
}
