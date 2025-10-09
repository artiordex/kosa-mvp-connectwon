/**
 * Description : response.ts - 📌 공통 Mock 응답 유틸
 * Author : Shiwoo Min
 * Date   : 2025-10-09
 * 성공, 실패, 에러 응답 통일 관리
 */

import { HttpResponse } from 'msw';
import { delay } from './delay';

export const ok = async (data: any, status: number = 200, ms: number = 150) => {
  await delay(ms);
  return HttpResponse.json({ success: true, ...data }, { status });
};

export const fail = async (message: string, status: number = 400, ms: number = 150) => {
  await delay(ms);
  return HttpResponse.json({ success: false, error: message }, { status });
};

export const notFound = async (msg: string = 'Not Found') => fail(msg, 404);
export const unauthorized = async (msg: string = 'Unauthorized') => fail(msg, 401);
export const serverError = async (msg: string = 'Internal Server Error') => fail(msg, 500);
