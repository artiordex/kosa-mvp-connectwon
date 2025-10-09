/**
 * Description : user-management.handler.ts - 📌 사용자 관리 Mock API 핸들러
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */
import { http, HttpResponse } from 'msw';
import { db } from '../../db/schema';

/** 사용자 목록 */
export const userListHandler = http.get('/api/admin/users', () => {
  const users = db.user.getAll().map((u) => ({
    ['id']: u.id,
    ['name']: u.name,
    ['email']: u.email,
    ['roleFlags']: u.roleFlags,
    ['joinedAt']: u.createdAt,
  }));

  return HttpResponse.json({ users }, { status: 200 });
});

/** 사용자 상세 */
export const userDetailHandler = http.get('/api/admin/users/:id', ({ params }) => {
  const id = Number(params['id']);

  const user = db.user.findFirst({
    where: { id: { equals: id } },
  });

  if (!user) {
    return HttpResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return HttpResponse.json({ user }, { status: 200 });
});

/** 사용자 삭제 */
export const userDeleteHandler = http.delete('/api/admin/users/:id', ({ params }) => {
  const id = Number(params['id']);

  db.user.delete({
    where: { id: { equals: id } },
  });

  return HttpResponse.json({ deleted: id }, { status: 200 });
});

/** export handlers */
export const userManagementHandlers = [
  userListHandler,
  userDetailHandler,
  userDeleteHandler,
];
