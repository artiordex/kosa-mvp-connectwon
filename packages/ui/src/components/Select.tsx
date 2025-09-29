/**
 * Description : Select.tsx - 📌 선택 드롭다운 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
import { forwardRef } from 'react';
import { type SelectProps } from '../ui-types.js';
import { cva } from 'class-variance-authority';

// 선택 드롭다운 variant 스타일 정의
const selectVariants = cva(
  'flex w-full rounded-md border bg-transparent px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/20 disabled:cursor-not-allowed disabled:opacity-50 appearance-none bg-no-repeat bg-right-2 pr-8',
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

// 선택 드롭다운 props 타입 정의
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { className = '', variant, size, options, error, label, helperText, placeholder, ...props },
    ref,
  ) => {
    const selectVariant = error ? 'error' : variant;

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={`${selectVariants({ variant: selectVariant, size })} ${className}`}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map(option => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {(error || helperText) && (
          <p className={`text-sm ${error ? 'text-error' : 'text-text-muted'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';
