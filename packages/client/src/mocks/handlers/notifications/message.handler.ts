/**
 * Description : message.handler.ts - 📌 사용자 간 메시지 / 문의 / 채팅 관련 Mock API 핸들러
 * Author      : Shiwoo Min
 * Date        : 2025-10-09
 */

import { http, HttpResponse } from 'msw';
import { db } from '../../db/schema.js';

/**
 * 메시지 전체 조회 (GET /api/messages)
 * - 관리자 또는 시스템용 전체 메시지 로그
 */
export const getAllMessagesHandler = http.get('/api/messages', () => {
  const messages = db.message.getAll?.() ?? [];
  return HttpResponse.json({
    total: messages.length,
    data: messages,
  });
});

/**
 * 특정 사용자 메시지 목록 조회 (GET /api/messages/:userId)
 * - 특정 사용자에게 온/보낸 메시지 조회
 */
export const getMessagesByUserHandler = http.get('/api/messages/:userId', ({ params }) => {
  const { userId } = params;
  const userMessages = db.message
    .getAll?.()
    .filter(
      (msg: any) =>
        msg.senderId === Number(userId) || msg.receiverId === Number(userId)
    ) ?? [];

  return HttpResponse.json({
    total: userMessages.length,
    data: userMessages,
  });
});

/**
 * 메시지 전송 (POST /api/messages)
 */
export const sendMessageHandler = http.post('/api/messages', async ({ request }) => {
  const body = (await request.json()) as {
    senderId: number;
    receiverId: number;
    content: string;
  };

  if (!body.content?.trim()) {
    return HttpResponse.json({ error: '메시지 내용을 입력해주세요.' }, { status: 400 });
  }

  const newMessage = db.message.create({
    senderId: body.senderId,
    receiverId: body.receiverId,
    content: body.content,
    status: 'SENT',
    createdAt: new Date(),
    readAt: null,
  });

  return HttpResponse.json({
    message: '메시지가 전송되었습니다.',
    data: newMessage,
  });
});

/**
 * 메시지 읽음 처리 (PATCH /api/messages/:id/read)
 */
export const readMessageHandler = http.patch('/api/messages/:id/read', ({ params }) => {
  const { id } = params;

  const msg = db.message.findFirst({
    where: { id: { equals: Number(id) } },
  });

  if (!msg) {
    return HttpResponse.json({ error: '해당 메시지를 찾을 수 없습니다.' }, { status: 404 });
  }

  const updated = db.message.update({
    where: { id: { equals: msg.id } },
    data: { status: 'READ', readAt: new Date() },
  });

  return HttpResponse.json({
    message: '메시지가 읽음 처리되었습니다.',
    data: updated,
  });
});

/**
 * 메시지 삭제 (DELETE /api/messages/:id)
 */
export const deleteMessageHandler = http.delete('/api/messages/:id', ({ params }) => {
  const { id } = params;
  const deleted = db.message.delete({
    where: { id: { equals: Number(id) } },
  });

  if (!deleted) {
    return HttpResponse.json({ error: '삭제할 메시지를 찾을 수 없습니다.' }, { status: 404 });
  }

  return HttpResponse.json({ message: '메시지가 삭제되었습니다.' });
});

export const messageHandlers = [
  getAllMessagesHandler,
  getMessagesByUserHandler,
  sendMessageHandler,
  readMessageHandler,
  deleteMessageHandler,
];
