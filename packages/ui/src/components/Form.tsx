/**
 * Description : Form.tsx - 📌 폼 컨테이너 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
import { forwardRef } from 'react';
import { type FormProps } from '../ui-types.js';

// 폼 컴포넌트 정의
export const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ className = '', loading = false, children, onSubmit, ...props }, ref) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (loading) return;
      onSubmit?.(e);
    };

    return (
      <form ref={ref} className={`space-y-4 ${className}`} onSubmit={handleSubmit} {...props}>
        <fieldset disabled={loading} className="space-y-4">
          {children}
        </fieldset>
      </form>
    );
  },
);

Form.displayName = 'Form';
