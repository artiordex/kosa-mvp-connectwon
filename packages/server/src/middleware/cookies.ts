/**
 * Description : cookies.ts - 📌 쿠키 파서/직렬화 유틸
 * Author : Shiwoo Min
 * Date : 2025-09-11
 */
export type SameSite = 'lax' | 'strict' | 'none';

// 쿠키 옵션 인터페이스
export type CookieOptions = {
  path?: string;
  domain?: string;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: SameSite;
  maxAge?: number;
  expires?: Date;
  priority?: 'Low' | 'Medium' | 'High';
};

// name=value; ... 형태의 Set-Cookie 문자열 생성
export function serializeCookie(name: string, value: string, opts: CookieOptions = {}) {
  const enc = (v: string) => encodeURIComponent(v).replace(/%20/g, '+');
  // 쿠키 기본 속성
  const parts = [`${name}=${enc(value)}`];
  // 선택적 속성들
  if (opts.expires instanceof Date) parts.push(`Expires=${opts.expires.toUTCString()}`);
  if (typeof opts.maxAge === 'number') parts.push(`Max-Age=${Math.floor(opts.maxAge)}`);
  if (opts.domain) parts.push(`Domain=${opts.domain}`);
  parts.push(`Path=${opts.path ?? '/'}`);

  const httpOnly = opts.httpOnly ?? true;
  const secure = opts.secure ?? process.env['NODE_ENV'] === 'production';
  const sameSite = opts.sameSite ?? 'lax';

  if (httpOnly) parts.push('HttpOnly');
  if (secure) parts.push('Secure');
  parts.push(`SameSite=${sameSite}`);

  if (opts.priority) parts.push(`Priority=${opts.priority}`);

  return parts.join('; ');
}

// 요청 헤더의 Cookie 문자열을 객체로 파싱
export function parseCookies(header?: string | null): Record<string, string> {
  if (!header) return {};
  const out: Record<string, string> = {};
  header.split(/; */).forEach(p => {
    if (!p) return;
    const i = p.indexOf('=');
    if (i < 0) return;
    const k = p.slice(0, i).trim();
    const v = decodeURIComponent(p.slice(i + 1).trim());
    out[k] = v;
  });
  return out;
}

// 특정 쿠키 값 가져오기
export function getCookie(header: string | null | undefined, name: string): string | undefined {
  return parseCookies(header)[name];
}

// 삭제용 Set-Cookie 헤더 생성
export function deleteCookieHeader(name: string, opts: CookieOptions = {}) {
  return serializeCookie(name, '', {
    ...opts,
    maxAge: 0,
    expires: new Date('Thu, 01 Jan 1970 00:00:00 GMT'),
  });
}
