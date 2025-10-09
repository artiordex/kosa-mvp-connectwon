/**
 * Description : firebase-init.ts - 📌 Firebase 초기화 및 SDK 인스턴스
 * Author : Shiwoo Min
 * Date : 2025-10-07
 */
import { getFirebaseConfig } from './firebase.js';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = getFirebaseConfig();

// 환경 로깅
console.log(`[Firebase Init] APP_TYPE=${process.env['NEXT_PUBLIC_APP_TYPE']}`);

// Firebase 앱 중복 초기화 방지
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// 인증(Auth) 인스턴스
const auth = getAuth(app);

// 클라이언트 전용 Analytics (SSR에서는 undefined)
let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== 'undefined') {
  isSupported().then(supported => {
    if (supported) analytics = getAnalytics(app);
  });
}

export { app, auth, analytics };
