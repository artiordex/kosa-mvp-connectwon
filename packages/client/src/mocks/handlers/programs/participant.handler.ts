/**
 * Description : participant.handler.ts - 📌 프로그램 참가자(Participant) 관련 Mock API 핸들러
 * Author      : Shiwoo Min
 * Date        : 2025-10-09
 */

import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker/locale/ko';
import { db } from '../../db/schema';

// 참가자 등록
export const participantJoinHandler = http.post('/api/participants', async ({ request }) => {
  const body = (await request.json().catch(() => ({}))) as Record<string, any>;
  const participant = db.programParticipant.create({
    ['sessionId']: body['sessionId'] ?? faker.number.int({ min: 1, max: 300 }),
    ['userId']: body['userId'] ?? faker.number.int({ min: 1, max: 999 }),
    ['role']: 'ATTENDEE',
    ['status']: 'CONFIRMED',
    ['joinedAt']: new Date(),
  });

  return HttpResponse.json({ ['participant']: participant }, { status: 201 });
});


// 참가자 목록 조회
export const participantListHandler = http.get('/api/participants/:sessionId', ({ params }) => {
  const sessionId = Number(params['sessionId']);
  const participants = db.programParticipant.getAll().filter((p) => p.sessionId === sessionId);

  return HttpResponse.json({ ['participants']: participants }, { status: 200 });
});

// 참가자 삭제
export const participantDeleteHandler = http.delete('/api/participants/:id', ({ params }) => {
  const id = Number(params['id']);
  db.programParticipant.delete({ where: { id: { equals: id } } });
  return HttpResponse.json({ ['deleted']: id }, { status: 200 });
});


// Export
export const participantHandlers = [
  participantJoinHandler,
  participantListHandler,
  participantDeleteHandler,
];
