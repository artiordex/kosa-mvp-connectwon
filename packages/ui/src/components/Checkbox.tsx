/**
 * Description : Checkbox.tsx - 📌 체크박스 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */

import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { type CheckboxProps } from '../../component-types.js';

// 체크박스 variant 스타일 정의
const checkboxVariants = cva(
  'h-4 w-4 rounded border border-border text-brand focus:ring-2 focus:ring-brand/20 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-3 w-3',
        default: 'h-4 w-4',
        lg: 'h-5 w-5',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

// 체크박스 컴포넌트 정의
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = '', size, label, description, error, ...props }, ref) => {
    return (
      <div className="flex items-start space-x-2">
        <input
          ref={ref}
          type="checkbox"
          className={`${checkboxVariants({ size })} ${className}`}
          {...props}
        />
        {(label || description) && (
          <div className="flex-1 min-w-0">
            {label && (
              <label className="text-sm font-medium text-text cursor-pointer">
                {label}
              </label>
            )}
            {description && (
              <p className="text-sm text-text-muted">
                {description}
              </p>
            )}
            {error && (
              <p className="text-sm text-error mt-1">
                {error}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
