/**
 * Description : useOnClickOutside.ts - 📌 특정 요소 바깥 클릭 감지
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
import { type RefObject, useCallback } from 'react';

import type { MaybeRef } from '../../hook-types.js';
import { useEventListener } from './useEventListener.js';

// 여러 요소 중 하나라도 타겟에 포함되는지 확인
function includesTarget(els: MaybeRef<HTMLElement>[], target: EventTarget | null): boolean {
  if (!target) return false;
  // composedPath로 Shadow DOM도 대응
  const path = (target as any).composedPath?.() as EventTarget[] | undefined;
  for (const el of els) {
    const node =
      el && 'current' in (el as any)
        ? (el as RefObject<HTMLElement>).current
        : (el as HTMLElement | null);
    if (!node) continue;
    if (node === target || (target instanceof Node && node.contains(target))) return true;
    if (path && path.includes(node)) return true;
  }
  return false;
}

// 특정 요소 바깥 클릭 감지 훅
export function useOnClickOutside(
  refs: MaybeRef<HTMLElement> | MaybeRef<HTMLElement>[],
  handler: (ev: MouseEvent | TouchEvent) => void,
  options?: {
    enabled?: boolean;
    events?: Array<'mousedown' | 'mouseup' | 'click' | 'touchstart' | 'touchend'>;
  },
) {
  const enabled = options?.enabled ?? true;
  const events = options?.events ?? ['mousedown', 'touchstart'];
  const arr = Array.isArray(refs) ? refs : [refs];

  const onEvent = useCallback(
    (ev: any) => {
      const t = ev.target as EventTarget | null;
      if (!includesTarget(arr, t)) handler(ev);
    },
    [arr, handler],
  );

  for (const e of events) {
    useEventListener(typeof document !== 'undefined' ? document : null, e, onEvent, {
      capture: true,
    });
  }

  // 간단한 enable 토글
  useEventListener(enabled ? null : document, 'noop', () => {});
}
