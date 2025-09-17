/**
 * Description : tracing.ts - 📌 traceparent/baggage 주입 미들웨어 (수정 버전)
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
import type { Middleware } from '../sdk-types.js';

// 더 간단하고 안전한 randomId 생성
function randomId(bytes = 16): string {
  const arr = new Uint8Array(bytes);

  // 브라우저 환경
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(arr);
  }
  // Node.js 환경 (동기적 처리)
  else if (typeof globalThis !== 'undefined' && typeof process !== 'undefined') {
    try {
      // Node.js crypto 모듈 사용
      const nodeCrypto = eval('require')('crypto');
      nodeCrypto.randomFillSync(arr);
    } catch {
      // Math.random 폴백
      for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * 256);
      }
    }
  }
  else {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = Math.floor(Math.random() * 256);
    }
  }
  return Array.from(arr, b => b.toString(16).padStart(2, '0')).join('');
}

// traceparent 헤더 주입 미들웨어
export function traceMiddleware(sampled = true): Middleware {
  return {
    onRequest(req) {
      const h = new Headers(req.headers);
      if (!h.has('traceparent')) {
        const traceId = randomId(16);
        const parentId = randomId(8);
        const flags = sampled ? '01' : '00';
        h.set('traceparent', `00-${traceId}-${parentId}-${flags}`);
      }
      return { ...req, headers: h };
    },
  };
}

// baggage 헤더 주입 미들웨어
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
