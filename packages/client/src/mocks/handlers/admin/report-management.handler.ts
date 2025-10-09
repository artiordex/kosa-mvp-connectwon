/**
 * Description : report-management.handler.ts - 📌 관리자용 리포트 관리 Mock API 핸들러
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */

import { http, HttpResponse } from 'msw';
import { db } from '../../db/schema';
import { faker } from '@faker-js/faker/locale/ko';

/** 월별 리포트 데이터 */
export const reportMonthlyHandler = http.get('/api/admin/reports/monthly', () => {
  const reports = Array.from({ length: 6 }).map((_, i) => ({
    month: `${i + 1}월`,
    newUsers: faker.number.int({ min: 10, max: 200 }),
    reservations: faker.number.int({ min: 20, max: 500 }),
    programsCreated: faker.number.int({ min: 5, max: 50 }),
  }));

  return HttpResponse.json({ reports }, { status: 200 });
});

/** 프로그램별 참여 통계 */
export const reportProgramHandler = http.get('/api/admin/reports/programs', () => {
  const stats = db.program.getAll().slice(0, 10).map(p => ({
    title: p.title,
    participants: db.programParticipant
      .getAll()
      .filter(pp => pp.sessionId === p.id).length,
  }));

  return HttpResponse.json({ stats }, { status: 200 });
});

export const reportManagementHandlers = [reportMonthlyHandler, reportProgramHandler];
