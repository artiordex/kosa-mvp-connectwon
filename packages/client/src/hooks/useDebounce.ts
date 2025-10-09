/**
 * Description : useDebounce.ts - 📌 입력값 디바운스 훅
 * Author : Shiwoo Min
 * Date : 2025-09-29
 */
"use client";

import { useEffect, useState } from 'react';

/**
 * @description 입력값 변경 시 지정한 시간(ms) 이후 반영
 * @param value 입력값
 * @param delay 지연 시간(ms)
 * @returns 디바운스된 값
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
