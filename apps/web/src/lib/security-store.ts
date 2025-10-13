// 브라우저 전용: 서버에서 import 하지 않도록 주의
export const STORAGE_KEYS = {
  LOGIN_HISTORY: 'sec:loginHistory',
  TRUSTED_DEVICES: 'sec:trustedDevices',
  SSO_CONNECTED: 'sec:ssoConnected',
} as const;

type StoreLike = Storage;

export function load<T>(key: string, fallback: T, useSession = true): T {
  try {
    const store: StoreLike = useSession ? sessionStorage : localStorage;
    const raw = store.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch (e) {
    console.error('[security-store.load]', key, e);
    return fallback;
  }
}

export function save<T>(key: string, value: T, useSession = true) {
  try {
    const store: StoreLike = useSession ? sessionStorage : localStorage;
    store.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('[security-store.save]', key, e);
  }
}

export function remove(key: string, useSession = true) {
  try {
    const store: StoreLike = useSession ? sessionStorage : localStorage;
    store.removeItem(key);
  } catch (e) {
    console.error('[security-store.remove]', key, e);
  }
}
