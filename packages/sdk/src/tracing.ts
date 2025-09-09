/**
 * Description : tracing.ts - 📌 traceparent/baggage 주입 미들웨어
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */

import type { Middleware } from '../sdk-types.js';

// 간단한 W3C traceparent 헤더 주입
function randomId(bytes = 16) {
  // 16 bytes → 32 hex
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues ? crypto.getRandomValues(arr) : require('node:crypto').randomFillSync(arr);
  return Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
}

export function traceMiddleware(sampled = true): Middleware {
  return {
    onRequest(req) {
      const h = new Headers(req.headers as any);
      if (!h.has('traceparent')) {
        const traceId = randomId(16);
        const parentId = randomId(8);
        const flags = sampled ? '01' : '00';
        h.set('traceparent', `00-${traceId}-${parentId}-${flags}`);
      }
      return { ...req, headers: h };
    }
  };
}

// (옵션) 정적 baggage 주입
export function baggageMiddleware(entries: Record<string, string>): Middleware {
  return {
    onRequest(req) {
      const h = new Headers(req.headers as any);
      const current = h.get('baggage');
      const next = Object.entries(entries).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join(',');
      h.set('baggage', current ? `${current},${next}` : next);
      return { ...req, headers: h };
    }
  };
}
