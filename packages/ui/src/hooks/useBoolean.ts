/**
 * Description : useBoolean.ts - 📌 boolean 상태 토글 훅
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
"use client";

import { useCallback, useState } from 'react';
import type { UseBooleanActions } from '../ui-types.js';

// boolean 상태 토글 훅
export function useBoolean(initial = false): [boolean, UseBooleanActions] {
  const [value, setValue] = useState<boolean>(initial);
  const set = useCallback((v: boolean) => setValue(v), []);
  const on = useCallback(() => setValue(true), []);
  const off = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue(v => !v), []);

  return [value, { set, on, off, toggle }];
}
