/**
 * Description : Divider.tsx - 📌 구분선 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
import { forwardRef } from 'react';
import type { DividerProps } from '../ui-types.js';
import { cva } from 'class-variance-authority';

// 구분선 variant 스타일 정의
const dividerVariants = cva('border-border', {
  variants: {
    orientation: {
      horizontal: 'w-full border-t',
      vertical: 'h-full border-l',
    },
    variant: {
      solid: 'border-solid',
      dashed: 'border-dashed',
      dotted: 'border-dotted',
    },
    spacing: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  compoundVariants: [
    {
      orientation: 'horizontal',
      spacing: 'sm',
      className: 'my-2',
    },
    {
      orientation: 'horizontal',
      spacing: 'md',
      className: 'my-4',
    },
    {
      orientation: 'horizontal',
      spacing: 'lg',
      className: 'my-6',
    },
    {
      orientation: 'vertical',
      spacing: 'sm',
      className: 'mx-2',
    },
    {
      orientation: 'vertical',
      spacing: 'md',
      className: 'mx-4',
    },
    {
      orientation: 'vertical',
      spacing: 'lg',
      className: 'mx-6',
    },
  ],
  defaultVariants: {
    orientation: 'horizontal',
    variant: 'solid',
    spacing: 'md',
  },
});

// 구분선 컴포넌트 정의
export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ className = '', orientation, variant, spacing, label, ...props }, ref) => {
    if (label && orientation === 'horizontal') {
      return (
        <div
          ref={ref}
          className={`flex items-center ${spacing === 'sm' ? 'my-2' : spacing === 'lg' ? 'my-6' : 'my-4'} ${className}`}
          {...props}
        >
          <div
            className={`flex-1 ${dividerVariants({ orientation, variant, spacing: undefined })}`}
          />
          <span className="px-3 text-sm text-text-muted bg-bg">{label}</span>
          <div
            className={`flex-1 ${dividerVariants({ orientation, variant, spacing: undefined })}`}
          />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={`${dividerVariants({ orientation, variant, spacing })} ${className}`}
        {...props}
      />
    );
  },
);

Divider.displayName = 'Divider';
