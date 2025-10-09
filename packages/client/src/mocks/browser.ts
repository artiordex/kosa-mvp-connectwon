/**
 * Description : browser.ts - 📌 브라우저 관련 Mock 유틸 (Storage, Cookie 등)
 * Author : Shiwoo Min
 * Date   : 2025-10-09
 *
 * 사용 예:
 *   browser.save('token', '123');
 *   const t = browser.load('token');
 *   browser.remove('token');
 */
export const browser = {
  save(key: string, value: any) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn('[browser.save] Failed:', err);
    }
  },

  load<T = any>(key: string, fallback?: T): T | undefined {
    try {
      const v = localStorage.getItem(key);
      return v ? (JSON.parse(v) as T) : fallback;
    } catch {
      return fallback;
    }
  },

  remove(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.warn('[browser.remove] Failed:', err);
    }
  },

  clear() {
    try {
      localStorage.clear();
    } catch (err) {
      console.warn('[browser.clear] Failed:', err);
    }
  },
};
