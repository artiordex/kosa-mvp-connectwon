/**
 * Description : Section.tsx - 📌 섹션 레이아웃 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-09-25
 */
import { forwardRef } from 'react';

import type { SectionProps } from '../../ui-types.js';
import { cva } from 'class-variance-authority';

// 섹션 variant 스타일 정의
const sectionVariants = cva('w-full', {
  variants: {
    spacing: {
      none: '',
      sm: 'py-8',
      md: 'py-12',
      lg: 'py-16',
      xl: 'py-20',
    },
    background: {
      transparent: 'bg-transparent',
      muted: 'bg-bg-muted',
      soft: 'bg-bg-soft',
    },
  },
  defaultVariants: {
    spacing: 'md',
    background: 'transparent',
  },
});

// 섹션 컴포넌트 정의
const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className = '', spacing, background, title, subtitle, actions, children, ...props }, ref) => {
    return (
      <section ref={ref} className={`${sectionVariants({ spacing, background })} ${className}`} {...props}>
        <div className="container mx-auto px-4">
          {(title || subtitle || actions) && (
            <div className="flex items-start justify-between mb-8">
              <div className="space-y-2">
                {subtitle && <p className="text-sm font-medium text-text-muted">{subtitle}</p>}
                {title && <h2 className="text-xl font-semibold tracking-tight text-text sm:text-2xl">{title}</h2>}
              </div>
              {actions && <div className="flex items-center space-x-3">{actions}</div>}
            </div>
          )}
          {children}
        </div>
      </section>
    );
  },
);

Section.displayName = 'Section';

export default Section;
