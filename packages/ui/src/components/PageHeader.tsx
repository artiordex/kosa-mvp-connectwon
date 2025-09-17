/**
 * Description : PageHeader.tsx - 📌 페이지 헤더 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
import { forwardRef } from 'react';

import { type PageHeaderProps } from '../../ui-types.js';

// 페이지 헤더 컴포넌트 정의
export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ className = '', title, subtitle, description, actions, breadcrumbs, ...props }, ref) => {
    return (
      <div ref={ref} className={`space-y-4 ${className}`} {...props}>
        {breadcrumbs && <div className="text-sm text-text-muted">{breadcrumbs}</div>}

        <div className="flex items-start justify-between">
          <div className="space-y-1">
            {subtitle && <p className="text-sm font-medium text-text-muted">{subtitle}</p>}
            <h1 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">{title}</h1>
            {description && <p className="text-text-muted max-w-2xl">{description}</p>}
          </div>

          {actions && <div className="flex items-center space-x-3">{actions}</div>}
        </div>
      </div>
    );
  },
);

PageHeader.displayName = 'PageHeader';
