/**
 * Description : Drawer.tsx - 📌 사이드 드로어 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { DrawerProps } from '@connectwon/ui/ui-types';
import { cva } from 'class-variance-authority';

// 드로어 variant 스타일 정의
const drawerVariants = cva(
  'fixed inset-y-0 z-50 bg-white shadow-xl dark:bg-gray-800 transition-transform duration-300 ease-in-out',
  {
    variants: {
      side: {
        left: 'left-0 border-r border-border',
        right: 'right-0 border-l border-border',
      },
      size: {
        sm: 'w-80',
        md: 'w-96',
        lg: 'w-[480px]',
        xl: 'w-[640px]',
      },
    },
    defaultVariants: {
      side: 'right',
      size: 'md',
    },
  }
);

// 드로어 컴포넌트 정의
export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  side,
  size,
  closeOnOverlay = true,
  closeOnEsc = true,
  className = '',
  ...props
}: DrawerProps) {
  // ESC 키로 드로어 닫기
  useEffect(() => {
    if (!closeOnEsc || !isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeOnEsc, isOpen, onClose]);

  // 바디 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const translateClass = side === 'left'
    ? isOpen ? 'translate-x-0' : '-translate-x-full'
    : isOpen ? 'translate-x-0' : 'translate-x-full';

  return createPortal(
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={closeOnOverlay ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`${drawerVariants({ side, size })} ${translateClass} ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'drawer-title' : undefined}
        {...props}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 id="drawer-title" className="text-lg font-semibold text-text">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-text-muted hover:text-text transition-colors p-1 rounded-md hover:bg-bg-soft"
              aria-label="닫기"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
