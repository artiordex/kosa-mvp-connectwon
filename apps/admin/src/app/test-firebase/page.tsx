'use client';

import { useEffect, useState } from 'react';

import { RootProvider } from '@connectwon/client';
import { app, auth } from '@connectwon/client';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export default function TestFirebasePage() {
  const db = getFirestore(app);
  const storage = getStorage(app);
  const [status, setStatus] = useState('확인 중...');

  useEffect(() => {
    try {
      console.group('🔥 Firebase 연결 테스트');
      console.log('App name:', app.name);
      console.log('Project ID:', app.options.projectId);
      console.log('Auth instance:', auth);
      console.log('Firestore instance:', db);
      console.log('Storage instance:', storage);

      if (auth.currentUser) {
        console.log('현재 로그인 사용자:', auth.currentUser.email);
        setStatus(`✅ 연결 성공 (로그인됨: ${auth.currentUser.email})`);
      } else {
        console.log('로그인된 사용자가 없습니다.');
        setStatus('✅ 연결 성공 (로그인 없음)');
      }

      console.groupEnd();
    } catch (err) {
      console.error('Firebase 연결 실패:', err);
      setStatus('❌ 연결 실패 — 콘솔에서 에러 로그 확인');
    }
  }, []);

  return (
    <RootProvider>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-900">
        <div className="p-6 bg-white rounded-2xl shadow-md text-center">
          <h1 className="text-2xl font-bold mb-4">🔥 Firebase 연결 테스트</h1>
          <p className="text-lg">{status}</p>
          <p className="text-sm text-gray-500 mt-2">(브라우저 콘솔에서 세부 로그 확인)</p>
        </div>
      </main>
    </RootProvider>
  );
}
