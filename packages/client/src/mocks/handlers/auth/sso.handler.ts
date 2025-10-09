/**
 * Description : sso.handler.ts - 📌 소셜 로그인(구글, 카카오, 네이버 등) 관련 핸들러
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */

import { http, HttpResponse } from 'msw';
import { db } from '../../db/schema';
import { faker } from '@faker-js/faker/locale/ko';

// 요청 body 타입 정의
interface SsoLoginRequestBody {
  provider: 'google' | 'kakao' | 'naver';
  providerSub?: string;
  name: string;
  email: string;
}

// SSO 로그인 (POST /api/auth/sso)
export const ssoLoginHandler = http.post('/api/auth/sso', async ({ request }) => {
  const body = (await request.json()) as SsoLoginRequestBody;
  const { provider, providerSub, name, email } = body;

  let user = db.user.findFirst({
    where: { email: { equals: email } },
  });

  // 존재하지 않으면 자동 가입
  if (!user) {
    user = db.user.create({
      email,
      name,
      roleFlags: 0,
      preferences: JSON.stringify({}),
    });
  }

  // provider가 없으면 새로 연결
  const existingProvider = db.authProvider.findFirst({
    where: { userId: { equals: user.id }, provider: { equals: provider } },
  });

  if (!existingProvider) {
    db.authProvider.create({
      userId: user.id,
      provider,
      providerSub: providerSub ?? faker.string.uuid(),
    });
  }

  return HttpResponse.json({
    message: `${provider} 로그인 성공`,
    user,
    token: faker.string.uuid(),
  });
});

// SSO 연결 해제 (DELETE /api/auth/sso/:provider)
export const ssoUnlinkHandler = http.delete('/api/auth/sso/:provider', async ({ params }) => {
  const { provider } = params as { provider?: string };

  if (!provider) {
    return HttpResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 });
  }

  const deleted = db.authProvider.deleteMany({
    where: { provider: { equals: provider } },
  });

  const count = Array.isArray(deleted) ? deleted.length : 0;

  return HttpResponse.json({
    message: `${provider} 연동이 해제되었습니다.`,
    count,
  });
});

export const ssoHandlers = [ssoLoginHandler, ssoUnlinkHandler];
