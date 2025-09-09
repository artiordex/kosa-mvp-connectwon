/**
 * Description : useIsMounted.ts - 📌 마운트 여부 조회 훅(비동기 안전)
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */

import { useCallback, useEffect, useRef } from 'react';

// 마운트 여부 조회 훅
export function useIsMounted() {
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);
  return useCallback(() => mounted.current, []);
}
