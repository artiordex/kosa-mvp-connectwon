/**
 * Description : firebase.ts - 📌 Firebase 환경변수 로드 (web/admin 구분)
 * Author : Shiwoo Min
 * Date : 2025-10-07
 */

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

/**
 * @description Firebase 환경변수 로드 함수
 * @note NEXT_PUBLIC_APP_TYPE이 'admin'이면 관리자용, 그 외는 web용
 * @note NODE_ENV 대신 NEXT_PUBLIC_ENV_MODE로 모드 구분
 */
export const getFirebaseConfig = (): FirebaseConfig => {
  const appType = process.env['NEXT_PUBLIC_APP_TYPE']?.toLowerCase();
  const isAdmin = appType === 'admin';

  // prefix 자동 결정
  const prefix = isAdmin ? 'NEXT_PUBLIC_FIREBASE_ADMIN' : 'NEXT_PUBLIC_FIREBASE_WEB';
  console.log(`[FirebaseConfig] APP_TYPE=${appType}, PREFIX=${prefix}`);

  // Firebase 설정 로드
  const config: FirebaseConfig = {
    apiKey: process.env[`${prefix}_API_KEY`] ?? '',
    authDomain: process.env[`${prefix}_AUTH_DOMAIN`] ?? '',
    projectId: process.env[`${prefix}_PROJECT_ID`] ?? '',
    storageBucket: process.env[`${prefix}_STORAGE_BUCKET`] ?? '',
    messagingSenderId: process.env[`${prefix}_MESSAGING_SENDER_ID`] ?? '',
    appId: process.env[`${prefix}_APP_ID`] ?? '',
  };

  // measurementId 존재 시에만 추가
  const measurementId = process.env[`${prefix}_MEASUREMENT_ID`];
  if (measurementId) config.measurementId = measurementId;

  // 누락 항목 경고 (모드 구분 없이 항상 확인)
  const missing = Object.entries(config)
    .filter(([_, v]) => !v)
    .map(([k]) => k);

  if (missing.length > 0) {
    console.warn(
      `[Firebase Config Warning] ${isAdmin ? 'Admin' : 'Web'} 환경에서 누락된 항목: ${missing.join(', ')}`
    );
  }

  return config;
};
