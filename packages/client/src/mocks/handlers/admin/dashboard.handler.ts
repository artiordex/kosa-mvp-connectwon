/**
 * Description : dashboard.handler.ts - 📌 관리자 대시보드 관련 Mock API 핸들러
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */

import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker/locale/ko';
import { db } from '../../db/schema';

/** 대시보드 통계 요약 */
export const dashboardSummaryHandler = http.get('/api/admin/dashboard/summary', () => {
  const summary = {
    totalUsers: db.user.getAll().length,
    totalPrograms: db.program.getAll().length,
    totalVenues: db.venue.getAll().length,
    totalSessions: db.session.getAll().length,
    activeReservations: db.roomReservation.getAll().filter(r => r.status === 'CONFIRMED').length,
  };

  return HttpResponse.json(summary, { status: 200 });
});

/** 최근 활동 로그 */
export const dashboardRecentActivityHandler = http.get('/api/admin/dashboard/activities', () => {
  const activities = Array.from({ length: 10 }).map(() => ({
    id: faker.string.uuid(),
    user: faker.person.fullName(),
    action: faker.helpers.arrayElement(['로그인', '예약 생성', '프로그램 신청', '리뷰 작성']),
    timestamp: faker.date.recent(),
  }));

  return HttpResponse.json({ activities }, { status: 200 });
});

export const dashboardHandlers = [dashboardSummaryHandler, dashboardRecentActivityHandler];
