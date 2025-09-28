/**
 * Description : useToggle.ts - 📌 불리언 상태 토글 훅
 * Author : Shiwoo Min
 * Date : 2025-09-29
 */
import { useCallback, useState } from 'react';

/**
 * @description 불리언 상태 토글 훅
 * @param initial 초기값 (기본 false)
 * @returns [값, 토글 함수, set 함수]
 */
export function useToggle(initial = false) {
  const [value, setValue] = useState(initial);

  const toggle = useCallback(() => setValue(v => !v), []);
  return [value, toggle, setValue] as const;
}
