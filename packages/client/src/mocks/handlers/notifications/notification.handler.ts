/**
 * Description : notification.handler.ts - 📌 알림(Notification) 관련 Mock API 핸들러
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */

import { http, HttpResponse } from 'msw';
import { db } from '../../db/schema';
import { faker } from '@faker-js/faker/locale/ko';

/**
 * 전체 알림 조회 (GET /api/notifications)
 * - 관리자용
 */
export const getAllNotificationsHandler = http.get('/api/notifications', () => {
  const notifications = db.notification.getAll?.() ?? [];
  return HttpResponse.json({
    total: notifications.length,
    data: notifications,
  });
});

/**
 * 사용자 알림 목록 (GET /api/notifications/:userId)
 */
export const getUserNotificationsHandler = http.get('/api/notifications/:userId', ({ params }) => {
  const { userId } = params;
  const notifs = db.notification
    .getAll?.()
    .filter((n: any) => n.userId === Number(userId)) ?? [];

  return HttpResponse.json({
    total: notifs.length,
    data: notifs,
  });
});

/**
 * 새 알림 생성 (POST /api/notifications)
 * - 시스템 또는 관리자에서 호출
 */
export const createNotificationHandler = http.post('/api/notifications', async ({ request }) => {
  const body = (await request.json()) as {
    userId: number;
    type: 'reservation' | 'device' | 'program' | 'system';
    title: string;
    message?: string;
  };

  const newNotif = db.notification.create({
    userId: body.userId,
    type: body.type,
    title: body.title,
    message: body.message ?? faker.lorem.sentence(),
    isRead: false,
    createdAt: new Date(),
  });

  return HttpResponse.json({
    message: '알림이 생성되었습니다.',
    data: newNotif,
  });
});

/**
 * 알림 읽음 처리 (PATCH /api/notifications/:id/read)
 */
export const readNotificationHandler = http.patch('/api/notifications/:id/read', ({ params }) => {
  const { id } = params;
  const notif = db.notification.findFirst({
    where: { id: { equals: Number(id) } },
  });

  if (!notif) {
    return HttpResponse.json({ error: '해당 알림을 찾을 수 없습니다.' }, { status: 404 });
  }

  const updated = db.notification.update({
    where: { id: { equals: notif.id } },
    data: { isRead: true },
  });

  return HttpResponse.json({
    message: '알림이 읽음 처리되었습니다.',
    data: updated,
  });
});

/**
 * 알림 삭제 (DELETE /api/notifications/:id)
 */
export const deleteNotificationHandler = http.delete('/api/notifications/:id', ({ params }) => {
  const { id } = params;
  const deleted = db.notification.delete({
    where: { id: { equals: Number(id) } },
  });

  if (!deleted) {
    return HttpResponse.json({ error: '삭제할 알림이 없습니다.' }, { status: 404 });
  }

  return HttpResponse.json({ message: '알림이 삭제되었습니다.' });
});

export const notificationHandlers = [
  getAllNotificationsHandler,
  getUserNotificationsHandler,
  createNotificationHandler,
  readNotificationHandler,
  deleteNotificationHandler,
];
