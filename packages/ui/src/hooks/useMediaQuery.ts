/**
 * Description : useMediaQuery.ts - 📌 CSS 미디어쿼리 매칭
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
import { useEffect, useState } from 'react';

// CSS 미디어쿼리 매칭 훅
export function useMediaQuery(query: string, defaultValue = false) {
  const isServer = typeof window === 'undefined';
  const [matches, setMatches] = useState<boolean>(
    isServer ? defaultValue : window.matchMedia(query).matches,
  );

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
