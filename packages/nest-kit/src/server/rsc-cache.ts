/**
 * Description : rsc-cache.ts - 📌 RSC/서버 유틸
 * Author : Shiwoo Min
 * Date : 2025-09-11
 */

// TTL(시간 기반 만료) 캐시 생성기
type Entry<T> = { v: T; e: number };

// TTL 밀리초 단위, 기본 1분
export function createTTLCache<T>(ttlMs = 60_000) {
  const m = new Map<string, Entry<T>>();

  return {
    // 만료 검사 후 값 반환
    get(key: string): T | undefined {
      const hit = m.get(key);
      if (!hit) return undefined;
      if (hit.e < Date.now()) {
        m.delete(key);
        return undefined;
      }
      return hit.v;
    },

    // TTL 새로고침하며 저장
    set(key: string, v: T) {
      m.set(key, { v, e: Date.now() + ttlMs });
    },

    delete(key: string) {
      m.delete(key);
    },

    clear() {
      m.clear();
    },

    // 캐시를 감싼 헬퍼: 없으면 factory 실행 후 저장
    async withCache(key: string, factory: () => Promise<T> | T): Promise<T> {
      const cached = this.get(key);
      if (cached !== undefined) return cached;
      const v = await factory();
      this.set(key, v);
      return v;
    },

    // 현재 키 개수(디버그)
    size() {
      return m.size;
    },
  };
}
