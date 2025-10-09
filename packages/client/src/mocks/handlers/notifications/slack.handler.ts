/**
 * Description : slack.handler.ts - 📌 Slack Webhook & Web API Mock 핸들러 (MSW v2 완전 호환)
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */

import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker/locale/ko';

/* 공통 유틸 */
const ok = (payload: Record<string, any>) => ({ ok: true, ...payload });
const nok = (errorMsg = 'error') => ({ ok: false, error: errorMsg });
const log = (...args: any[]) => console.info('[MOCK SLACK]', ...args);

export const slackWebhookHandler = http.post('/api/slack/webhook', async ({ request }) => {
  const body = ((await request.json().catch(() => ({}))) ?? {}) as Record<string, any>;

  const text = body['text'] ?? body['message'] ?? '(no text)';
  const channel = body['channel'] ?? '#general';
  const username = body['username'] ?? 'MockBot';

  log(`Webhook -> ${channel} : ${text}`);

  if (!text || String(text).trim() === '') {
    return HttpResponse.json(nok('text required'), { status: 400 });
  }

  return HttpResponse.json(
    {
      success: true,
      channel,
      username,
      ts: Date.now().toString(),
      text,
    },
    { status: 200 },
  );
});

export const chatPostMessageHandler = http.post('https://slack.com/api/chat.postMessage', async ({ request }) => {
  let body: Record<string, any> = {};
  try {
    body = (await request.json()) as Record<string, any>;
  } catch {
    try {
      const text = await request.text();
      body = Object.fromEntries(new URLSearchParams(text));
    } catch {
      body = {};
    }
  }

  const auth = request.headers.get('authorization') ?? '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  const url = new URL(request.url);
  const channel = body['channel'] ?? body['channel_id'] ?? '#general';
  const text = body['text'] ?? '';

  log('chat.postMessage', { token: !!token, channel, text });

  if (!token) {
    return HttpResponse.json(nok('not_authed'), { status: 200 });
  }

  const simulateRateLimit =
    url.searchParams.get('mockRate') === 'true' || Math.random() < 0.02;
  if (simulateRateLimit) {
    return HttpResponse.json(nok('rate_limited'), {
      status: 429,
      headers: { 'Retry-After': '30' },
    });
  }

  if (String(channel).startsWith('INVALID')) {
    return HttpResponse.json(nok('channel_not_found'), { status: 200 });
  }

  return HttpResponse.json(
    ok({
      channel,
      ts: Date.now().toString(),
      message: {
        text,
        user: 'U' + faker.string.numeric(6),
      },
    }),
    { status: 200 },
  );
});

export const conversationsListHandler = http.get('https://slack.com/api/conversations.list', ({ request }) => {
  const auth = request.headers.get('authorization') ?? '';
  if (!auth) {
    return HttpResponse.json(nok('not_authed'), { status: 200 });
  }

  const channels = [
    { id: 'C' + faker.string.numeric(8), name: 'general', is_channel: true },
    { id: 'C' + faker.string.numeric(8), name: 'dev', is_channel: true },
    { id: 'C' + faker.string.numeric(8), name: 'product', is_channel: true },
    { id: 'C' + faker.string.numeric(8), name: 'random', is_channel: true },
  ];

  log('conversations.list ->', channels.map((c) => c.name).join(', '));

  return HttpResponse.json(
    ok({
      channels,
      response_metadata: { next_cursor: '' },
    }),
    { status: 200 },
  );
});

export const usersInfoHandler = http.get('https://slack.com/api/users.info', ({ request }) => {
  const url = new URL(request.url);
  const auth = request.headers.get('authorization') ?? '';
  const userId = url.searchParams.get('user');

  if (!auth) {
    return HttpResponse.json(nok('not_authed'), { status: 200 });
  }

  if (!userId) {
    return HttpResponse.json(nok('user_missing'), { status: 400 });
  }

  const user = {
    id: userId,
    team_id: 'T' + faker.string.numeric(8),
    name: faker.internet.username(),
    real_name: faker.person.fullName(),
    profile: {
      email: faker.internet.email(),
      display_name: faker.person.firstName(),
      image_72: faker.image.avatar(),
    },
  };

  log('users.info', userId);

  return HttpResponse.json(ok({ user }), { status: 200 });
});

export const slackHandlers = [
  slackWebhookHandler,
  chatPostMessageHandler,
  conversationsListHandler,
  usersInfoHandler,
];
