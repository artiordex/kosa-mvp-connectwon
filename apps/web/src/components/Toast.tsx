'use client';

import { useCallback, useEffect, useState } from 'react';

type ToastType = 'info' | 'success' | 'warning' | 'error';
type Toast = { id: number; type: ToastType; message: string };

let pushToastGlobal: ((t: Omit<Toast, 'id'>) => void) | null = null;

export function useToast() {
  const show = useCallback((message: string, type: ToastType = 'info') => {
    pushToastGlobal?.({ type, message });
  }, []);
  return { show };
}

export default function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    pushToastGlobal = ({ type, message }) => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, type, message }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    };
    return () => {
      pushToastGlobal = null;
    };
  }, []);

  const bgByType = (type: ToastType) =>
    ({
      info: 'bg-slate-800 text-white',
      success: 'bg-green-600 text-white',
      warning: 'bg-amber-500 text-white',
      error: 'bg-red-600 text-white',
    }[type]);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[1000] flex flex-col gap-2 items-center px-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`${bgByType(t.type)} rounded-lg shadow-lg px-4 py-2 text-sm max-w-[90vw] sm:max-w-[520px] w-max`}
          role="status"
          aria-live="polite"
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
