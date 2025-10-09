/**
 * Description : useEventListener.ts - 📌 안전한 이벤트 리스너 훅(SSR 대응)
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
"use client";

import { useEffect, useRef } from 'react';
import type { TargetLike } from '../ui-types.js';

// 대상이 함수일 경우 호출하여 실제 대상을 반환
function getTarget(target: TargetLike) {
  return (
    (typeof target === 'function' ? (target as unknown as () => TargetLike)() : target) ?? null
  );
}

// 안전한 이벤트 리스너 훅
export function useEventListener<TTarget extends TargetLike, TType extends string>(
  target: TTarget,
  type: TType,
  listener: (ev: Event) => void,
  options?: AddEventListenerOptions | boolean,
) {
  const saved = useRef(listener);
  useEffect(() => {
    saved.current = listener;
  }, [listener]);

  useEffect(() => {
    const t = getTarget(target);
    if (!t || typeof (t as any).addEventListener !== 'function') return;

    const handler = (e: Event) => saved.current(e);
    (t as any).addEventListener(type, handler, options);
    return () => (t as any).removeEventListener(type, handler, options);
  }, [target, type, options]);
}
