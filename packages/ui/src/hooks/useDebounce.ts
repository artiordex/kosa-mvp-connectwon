/**
 * Description : useDebounce.ts - 📌 입력/상태값 디바운스 훅
 * Author : Shiwoo Min
 * Date : 2025-09-28
 */
"use client";

import { useEffect, useState } from 'react';

/**
 * @function useDebounce
 * @description
 * 특정 값(value)이 바뀔 때마다 일정 시간(delay) 대기 후 반영하는 디바운스 훅.
 * 입력 필터링, API 호출 최적화 등에 유용.
 * @param value - 디바운스 처리할 원본 값
 * @param delay - 지연 시간(ms), 기본 300ms
 * @returns {T} 디바운스된 값
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // cleanup: 값이 바뀌면 이전 타이머 취소
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
