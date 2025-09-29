/**
 * Description : Grid.tsx - 📌 그리드 레이아웃 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-09-25
 */
import { forwardRef } from 'react';
import type { GridProps } from '../ui-types.js';
import { cva } from 'class-variance-authority';

const gridVariants = cva('grid', {
  variants: {
    cols: {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      12: 'grid-cols-12',
    },
    gap: {
      none: 'gap-0',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    },
    responsive: {
      true: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      false: '',
    },
  },
  defaultVariants: {
    cols: 3,
    gap: 'md',
    responsive: false,
  },
});

// 그리드 컴포넌트 정의
const Grid = forwardRef<HTMLDivElement, GridProps>(({ className = '', cols, gap, responsive, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`${gridVariants({
        cols: responsive ? undefined : cols,
        gap,
        responsive,
      })} ${className}`}
      {...props}
    />
  );
});

Grid.displayName = 'Grid';

export default Grid;
