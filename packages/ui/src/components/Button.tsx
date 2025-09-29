/**
 * Description : Button.tsx - 📌 재사용 가능한 버튼 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
import { forwardRef } from 'react';
import { type ButtonProps } from '../ui-types.js';
import { cva } from 'class-variance-authority';

// 버튼 variant 스타일 정의
const buttonVariants = cva(
  // 기본 스타일
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-brand text-brand-fg hover:bg-brand-dark',
        destructive: 'bg-error text-error-fg hover:bg-error-dark',
        outline: 'border border-border bg-transparent hover:bg-bg-soft',
        secondary: 'bg-bg-muted text-text hover:bg-bg-soft',
        ghost: 'hover:bg-bg-soft hover:text-text',
        link: 'text-brand underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

// 버튼 컴포넌트 정의
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant, size, loading = false, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`${buttonVariants({ variant, size })} ${className}`}
        {...props}
      >
        {loading && (
          <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
