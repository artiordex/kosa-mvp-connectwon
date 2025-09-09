/**
 * Description : useThrottle.ts - 📌 스로틀 값/콜백 훅 (leading/trailing)
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import type { ThrottleOptions } from '../../hook-types.js';

// 스로틀 값 훅
export function useThrottle<T>(value: T, delay = 300, opts: ThrottleOptions = {}): T {
  const { leading = true, trailing = true } = opts;
  const [throttled, setThrottled] = useState<T>(value);
  const lastExec = useRef(0);
  const trailingValue = useRef<T>(value);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const now = Date.now();
    trailingValue.current = value;

    const invoke = () => {
      lastExec.current = Date.now();
      setThrottled(trailingValue.current);
    };

    const remaining = delay - (now - lastExec.current);

    if (lastExec.current === 0 && leading) {
      invoke();
      return;
    }

    if (remaining <= 0) {
      if (timer.current) { clearTimeout(timer.current); timer.current = null; }
      invoke();
    } else if (trailing) {
      if (timer.current) clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        timer.current = null;
        invoke();
      }, remaining);
    }
  }, [value, delay, leading, trailing]);

  return throttled;
}

// 스로틀 콜백 훅
export function useThrottledCallback<T extends (...args: any[]) => any>(
  fn: T,
  delay = 300,
  opts: ThrottleOptions = {}
): (...args: Parameters<T>) => void {
  const { leading = true, trailing = true } = opts;
  const lastExec = useRef(0);
  const queued = useRef<Parameters<T> | null>(null);
  const timer = useRef<number | null>(null);
  const fnRef = useRef(fn);
  fnRef.current = fn;

  return useMemo(() => {
    return (...args: Parameters<T>) => {
      const now = Date.now();
      const invoke = (a: Parameters<T>) => { lastExec.current = Date.now(); fnRef.current(...a); };
      const remaining = delay - (now - lastExec.current);

      queued.current = args;

      if (lastExec.current === 0 && leading) {
        invoke(args);
        return;
      }

      if (remaining <= 0) {
        if (timer.current) { clearTimeout(timer.current); timer.current = null; }
        invoke(queued.current!);
      } else if (trailing) {
        if (timer.current) clearTimeout(timer.current);
        timer.current = window.setTimeout(() => {
          timer.current = null;
          if (queued.current) invoke(queued.current);
        }, remaining);
      }
    };
  }, [delay, leading, trailing]);
}
