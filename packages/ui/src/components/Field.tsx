/**
 * Description : Field.tsx - 📌 폼 필드 래퍼 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
import { forwardRef } from 'react';
import { type FieldProps } from '../ui-types.js';

// 폼 필드 래퍼 컴포넌트 정의
export const Field = forwardRef<HTMLDivElement, FieldProps>(
  ({ className = '', label, error, helperText, required = false, children, ...props }, ref) => {
    return (
      <div ref={ref} className={`space-y-2 ${className}`} {...props}>
        {label && (
          <label className="text-sm font-medium leading-none text-text">
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        {children}
        {(error || helperText) && (
          <p className={`text-sm ${error ? 'text-error' : 'text-text-muted'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  },
);

Field.displayName = 'Field';
