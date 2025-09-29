/**
 * Description : Textarea.tsx - 📌 텍스트 영역 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
import { forwardRef } from 'react';
import { type TextareaProps } from '../ui-types.js';
import { cva } from 'class-variance-authority';

// 텍스트 영역 variant 스타일 정의
const textareaVariants = cva(
  'flex w-full rounded-md border bg-transparent px-3 py-2 text-sm transition-colors placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/20 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]',
  {
    variants: {
      variant: {
        default: 'border-border hover:border-border-strong',
        error: 'border-error focus-visible:ring-error/20',
        success: 'border-success focus-visible:ring-success/20',
      },
      resize: {
        none: 'resize-none',
        both: 'resize',
        horizontal: 'resize-x',
        vertical: 'resize-y',
      },
    },
    defaultVariants: {
      variant: 'default',
      resize: 'vertical',
    },
  },
);

// 텍스트 영역 컴포넌트 정의
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', variant, resize, error, label, helperText, ...props }, ref) => {
    const textareaVariant = error ? 'error' : variant;

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`${textareaVariants({ variant: textareaVariant, resize })} ${className}`}
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

Textarea.displayName = 'Textarea';
