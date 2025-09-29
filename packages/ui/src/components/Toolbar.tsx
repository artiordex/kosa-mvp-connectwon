/**
 * Description : Toolbar.tsx - 📌 툴바 레이아웃 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
import { forwardRef } from 'react';
import type { ToolbarProps } from '../ui-types.js';
import { cva } from 'class-variance-authority';

// 툴바 variant 스타일 정의
const toolbarVariants = cva(
  'flex items-center justify-between gap-4 px-4 py-2 border-b border-border bg-bg',
  {
    variants: {
      size: {
        default: 'h-14 px-4',
        sm: 'h-12 px-3',
        lg: 'h-16 px-6',
      },
      variant: {
        default: 'bg-bg border-border',
        muted: 'bg-bg-muted border-border',
        transparent: 'bg-transparent border-transparent',
      },
      position: {
        static: 'static',
        sticky: 'sticky top-0 z-40',
        fixed: 'fixed top-0 left-0 right-0 z-40',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
      position: 'static',
    },
  },
);

// 툴바 컴포넌트 정의
export const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(
  (
    {
      className = '',
      size = 'default',
      variant = 'default',
      position = 'static',
      title,
      subtitle,
      leftContent,
      rightContent,
      centerContent,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={`${toolbarVariants({ size, variant, position })} ${className}`}
        {...props}
      >
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {leftContent}
          {(title || subtitle) && (
            <div className="flex flex-col">
              {title && <h1 className="text-sm font-medium text-text truncate">{title}</h1>}
              {subtitle && <p className="text-xs text-text-muted truncate">{subtitle}</p>}
            </div>
          )}
        </div>

        {/* Center Section */}
        {centerContent && (
          <div className="flex-1 flex items-center justify-center">{centerContent}</div>
        )}

        {/* Right Section */}
        <div className="flex items-center gap-2">{rightContent}</div>

        {/* Children (if no specific sections are used) */}
        {!leftContent && !rightContent && !centerContent && children}
      </div>
    );
  },
);

Toolbar.displayName = 'Toolbar';
