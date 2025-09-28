/**
 * Description : useDisclosure.ts - 📌 모달/드롭다운 열림 상태 관리
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
import { useCallback, useState } from 'react';
import type { UseDisclosureOptions } from '@connectwon/ui/ui-types';

// 모달/드롭다운 열림 상태 관리 훅
export function useDisclosure(opts: UseDisclosureOptions = {}) {
  const { defaultOpen = false, onOpenChange } = opts;
  const [open, setOpen] = useState<boolean>(defaultOpen);
  const set = useCallback(
    (v: boolean) => {
      setOpen(v);
      onOpenChange?.(v);
    },
    [onOpenChange],
  );
  const openFn = useCallback(() => set(true), [set]);
  const closeFn = useCallback(() => set(false), [set]);
  const toggle = useCallback(() => set(!open), [open, set]);

  return { isOpen: open, open: openFn, close: closeFn, toggle, set };
}
