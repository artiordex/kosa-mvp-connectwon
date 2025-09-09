/**
 * Description : Container.tsx - 📌 레이아웃 컨테이너 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */

import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import type { ContainerProps } from '../../component-types.js';

// 컨테이너 variant 스타일 정의
const containerVariants = cva(
  'w-full mx-auto px-4',
  {
    variants: {
      size: {
        sm: 'max-w-screen-sm',
        md: 'max-w-screen-md',
        lg: 'max-w-screen-lg',
        xl: 'max-w-screen-xl',
        '2xl': 'max-w-screen-2xl',
        full: 'max-w-full',
      },
      padding: {
        none: 'px-0',
        sm: 'px-4',
        md: 'px-6',
        lg: 'px-8',
        xl: 'px-12',
      },
    },
    defaultVariants: {
      size: 'xl',
      padding: 'sm',
    },
  }
);

// 컨테이너 컴포넌트 정의
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className = '', size, padding, centered = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`${containerVariants({ size, padding })} ${
          centered ? 'flex items-center justify-center min-h-screen' : ''
        } ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';
