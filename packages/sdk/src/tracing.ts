/**
 * Description : tracing.ts - 📌 traceparent/baggage 주입 미들웨어
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
import type { Middleware } from './sdk-types.js';

/**
 * 안전한 랜덤 ID 생성기
 * - 브라우저: Web Crypto API 사용
 * - Node.js: node:crypto 모듈 사용
 * - 폴백: Math.random
 */
function randomId(bytes = 16): string {
  const arr = new Uint8Array(bytes);

  // 브라우저 환경
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    crypto.getRandomValues(arr);
  }
  // Node.js 환경
  else if (typeof process !== 'undefined' && process.versions?.node) {
    try {
      // 동적 임포트로 안전하게 로드
      const { randomFillSync } = require('node:crypto') as typeof import('node:crypto');
      randomFillSync(arr);
    } catch {
      for (let i = 0; i < arr.length; i++) arr[i] = Math.floor(Math.random() * 256);
    }
  }
  // 최종 fallback
  else {
    for (let i = 0; i < arr.length; i++) arr[i] = Math.floor(Math.random() * 256);
  }

  return Array.from(arr, b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * traceparent 헤더 주입 미들웨어
 * @param sampled 샘플링 여부 (기본: true)
 */
export function traceMiddleware(sampled = true): Middleware {
  return {
    onRequest(req) {
      const h = new Headers(req.headers);

      if (!h.has('traceparent')) {
        const traceId = randomId(16); // 32 hex
        const parentId = randomId(8); // 16 hex
        const flags = sampled ? '01' : '00';
        h.set('traceparent', `00-${traceId}-${parentId}-${flags}`);
      }

      return { ...req, headers: h };
    },
  };
}

/**
 * baggage 헤더 주입 미들웨어
 * @param entries baggage key-value 객체
 */
export function baggageMiddleware(entries: Record<string, string>): Middleware {
  return {
    onRequest(req) {
      const h = new Headers(req.headers);
      const current = h.get('baggage');
      const next = Object.entries(entries)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join(',');

      h.set('baggage', current ? `${current},${next}` : next);
      return { ...req, headers: h };
    },
  };
}
