/**
 * Description : auth.handler.ts - 📌 이메일/비밀번호 로그인 및 회원가입 관련 핸들러
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */

import { http, HttpResponse } from 'msw';
import { db } from '../../db/schema';
import { faker } from '@faker-js/faker/locale/ko';

// 요청 body 타입 정의
interface LoginRequestBody {
  email: string;
  password: string;
}

interface RegisterRequestBody {
  email: string;
  name: string;
  password: string;
}

// 로그인 (POST /api/auth/login)
export const loginHandler = http.post('/api/auth/login', async ({ request }) => {
  const body = (await request.json()) as LoginRequestBody;
  const { email, password } = body;

  const user = db.user.findFirst({
    where: { email: { equals: email } },
  });

  if (!user) {
    return HttpResponse.json({ error: '존재하지 않는 사용자입니다.' }, { status: 404 });
  }

  const provider = db.authProvider.findFirst({
    where: { userId: { equals: user.id }, provider: { equals: 'local' } },
  });

  if (!provider || !provider.passwordHash) {
    return HttpResponse.json({ error: '비밀번호 로그인 사용자가 아닙니다.' }, { status: 400 });
  }

  // 단순 비밀번호 비교 (mock)
  if (password !== 'password1234') {
    return HttpResponse.json({ error: '비밀번호가 올바르지 않습니다.' }, { status: 401 });
  }

  const sessionToken = faker.string.uuid();

  return HttpResponse.json({
    message: '로그인 성공',
    user,
    token: sessionToken,
  });
});

// 회원가입 (POST /api/auth/register)
export const registerHandler = http.post('/api/auth/register', async ({ request }) => {
  const body = (await request.json()) as RegisterRequestBody;
  const { email, name, password } = body;

  const exists = db.user.findFirst({
    where: { email: { equals: email } },
  });

  if (exists) {
    return HttpResponse.json({ error: '이미 등록된 이메일입니다.' }, { status: 409 });
  }

  const user = db.user.create({
    email,
    name,
    roleFlags: 0,
    preferences: JSON.stringify({}),
  });

  db.authProvider.create({
    userId: user.id,
    provider: 'local',
    passwordHash: password,
  });

  return HttpResponse.json({
    message: '회원가입 성공',
    user,
  });
});

export const authHandlers = [loginHandler, registerHandler];
