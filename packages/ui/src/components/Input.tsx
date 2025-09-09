/**
 * Description : Input.tsx - 📌 입력 필드 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';

import { type InputProps } from '../../component-types.js';

// 입력 필드 variant 스타일 정의
const inputVariants = cva(
  'flex w-full rounded-md border bg-transparent px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/20 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-border hover:border-border-strong',
        error: 'border-error focus-visible:ring-error/20',
        success: 'border-success focus-visible:ring-success/20',
      },
      size: {
        default: 'h-10 px-3 py-2',
        sm: 'h-9 px-3 py-2',
        lg: 'h-11 px-4 py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

// 입력 필드 컴포넌트 정의
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', variant, size, error, label, helperText, ...props }, ref) => {
    const inputVariant = error ? 'error' : variant;

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`${inputVariants({ variant: inputVariant, size })} ${className}`}
          {...props}
        />
        {(error || helperText) && (
          <p className={`text-sm ${error ? 'text-error' : 'text-text-muted'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
