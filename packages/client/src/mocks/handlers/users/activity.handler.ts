/**
 * Description : activity.handler.ts - 📌 사용자 활동 로그(Activity) 관련 Mock API 핸들러
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */

import { http, HttpResponse } from 'msw';
import { db } from '../../db/schema';
import { faker } from '@faker-js/faker/locale/ko';

// 활동 로그 목록 조회
export const userActivityListHandler = http.get('/api/users/:userId/activities', ({ params }) => {
  const userId = Number(params['userId']);
  const activities = db.userActivity
    .getAll()
    .filter((a) => a.userId === userId)
    .slice(-20)
    .map((a) => ({
      ['id']: a.id,
      ['action']: a.action,
      ['entityType']: a.entityType,
      ['createdAt']: a.createdAt,
      ['meta']: a.meta,
    }));

  return HttpResponse.json({ ['activities']: activities }, { status: 200 });
});

// 활동 로그 추가 (테스트용)
export const userActivityCreateHandler = http.post('/api/users/:userId/activities', ({ params }) => {
  const userId = Number(params['userId']);
  const activity = db.userActivity.create({
    ['userId']: userId,
    ['action']: faker.helpers.arrayElement(['login', 'logout', 'reserve_room', 'join_session']),
    ['entityType']: faker.helpers.arrayElement(['program', 'session', 'device']),
    ['entityId']: faker.number.int({ min: 1, max: 999 }),
  });

  return HttpResponse.json({ ['activity']: activity }, { status: 201 });
});

// Export
export const activityHandlers = [
  userActivityListHandler,
  userActivityCreateHandler,
];
