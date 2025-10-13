import { load, save, STORAGE_KEYS } from './security-store';

export type LoginRow = {
  device: string;
  location: string;
  ip: string;
  date: string;
  action: 'login' | 'logout';
  provider: 'sso' | 'local';
};

export type TrustedDevice = { id: string; name: string; lastUsed: string };

const useSessionOnly = true; // 세션 유지면 true, 브라우저 영구면 false

const nowStamp = () =>
  new Date().toLocaleString(undefined, { hour12: false });

const parseBrowser = () => {
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  if (/Edg\//.test(ua)) return 'Microsoft Edge (Web)';
  if (/Chrome\//.test(ua)) return 'Chrome (Web)';
  if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) return 'Safari (Web)';
  if (/Firefox\//.test(ua)) return 'Firefox (Web)';
  return 'Browser (Web)';
};

const approxLocation = () => '알 수 없음'; // 데모용
const curDevice = () => {
  const label = parseBrowser();
  return { id: `web-${label}`, label };
};

export function getSecurityState() {
  const loginHistory = load<LoginRow[]>(STORAGE_KEYS.LOGIN_HISTORY, [], useSessionOnly);
  const trustedDevices = load<TrustedDevice[]>(STORAGE_KEYS.TRUSTED_DEVICES, [], useSessionOnly);
  const ssoConnected = load<boolean>(STORAGE_KEYS.SSO_CONNECTED, false, useSessionOnly);
  return { loginHistory, trustedDevices, ssoConnected };
}

export function recordSsoLogin() {
  const row: LoginRow = {
    device: curDevice().label,
    location: approxLocation(),
    ip: 'N/A',
    date: nowStamp(),
    action: 'login',
    provider: 'sso',
  };

  const history = [row, ...getSecurityState().loginHistory];
  save(STORAGE_KEYS.LOGIN_HISTORY, history, useSessionOnly);
  save(STORAGE_KEYS.SSO_CONNECTED, true, useSessionOnly);

  const td = getSecurityState().trustedDevices;
  const id = curDevice().id;
  const next = td.some(d => d.id === id)
    ? td.map<TrustedDevice>(d => d.id === id ? { id, name: curDevice().label, lastUsed: row.date } : d)
    : [{ id, name: curDevice().label, lastUsed: row.date }, ...td];
  save(STORAGE_KEYS.TRUSTED_DEVICES, next, useSessionOnly);

  dispatchEvent(new CustomEvent('demo-auth-updated')); // 화면 갱신 신호(선택)
}

export function recordLogout() {
  const row: LoginRow = {
    device: curDevice().label,
    location: approxLocation(),
    ip: 'N/A',
    date: nowStamp(),
    action: 'logout',
    provider: 'sso',
  };
  const history = [row, ...getSecurityState().loginHistory];
  save(STORAGE_KEYS.LOGIN_HISTORY, history, useSessionOnly);
  save(STORAGE_KEYS.SSO_CONNECTED, false, useSessionOnly);

  const td = getSecurityState().trustedDevices;
  const id = curDevice().id;
  const next = td.map<TrustedDevice>(d => d.id === id ? { id, name: d.name, lastUsed: row.date } : d);
  save(STORAGE_KEYS.TRUSTED_DEVICES, next, useSessionOnly);

  dispatchEvent(new CustomEvent('demo-auth-updated'));
}
