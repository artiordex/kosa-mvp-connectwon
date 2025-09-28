/**
 * Description : useOnlineStatus.ts - 📌 온라인/오프라인 상태 감지 훅
 * Author : Shiwoo Min
 * Date : 2025-09-29
 */
import { useEffect, useState } from 'react';

/**
 * @description 브라우저의 네트워크 연결 상태 감지
 * @returns boolean (true = 온라인, false = 오프라인)
 */
export function useOnlineStatus(): boolean {
  const [online, setOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return online;
}
