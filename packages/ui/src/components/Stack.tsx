/**
 * Description : Stack.tsx - 📌 스택 레이아웃 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */

import { forwardRef } from 'react';
import { cva  } from 'class-variance-authority';
import type { StackProps } from '../../component-types.js';

// 스택 variant 스타일 정의
const stackVariants = cva(
  'flex',
  {
    variants: {
      direction: {
        row: 'flex-row',
        column: 'flex-col',
        'row-reverse': 'flex-row-reverse',
        'column-reverse': 'flex-col-reverse',
      },
      spacing: {
        none: 'gap-0',
        xs: 'gap-1',
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
        xl: 'gap-8',
      },
      align: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
        baseline: 'items-baseline',
      },
      justify: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly',
      },
      wrap: {
        true: 'flex-wrap',
        false: 'flex-nowrap',
      },
    },
    defaultVariants: {
      direction: 'column',
      spacing: 'md',
      align: 'stretch',
      justify: 'start',
      wrap: false,
    },
  }
);

// 스택 컴포넌트 정의
export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ className = '', direction, spacing, align, justify, wrap, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`${stackVariants({ direction, spacing, align, justify, wrap })} ${className}`}
        {...props}
      />
    );
  }
);

Stack.displayName = 'Stack';
