/**
 * Description : useMediaQuery.ts - 📌 반응형 미디어쿼리 매칭 훅
 * Author : Shiwoo Min
 * Date : 2025-09-29
 */
"use client";

import { useEffect, useState } from 'react';

/**
 * @description 미디어쿼리 일치 여부 감지 훅
 * @param query CSS 미디어쿼리 문자열
 * @returns boolean (쿼리 일치 여부)
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(query);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);

    setMatches(media.matches);
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}
