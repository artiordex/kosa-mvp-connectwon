/**
 * Description : LoadingSpinner.tsx - 📌 재사용 가능한 스피너
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
import { type LoadingSpinnerProps } from '../ui-types.js';

// 로딩 스피너 컴포넌트
export function LoadingSpinner({
  size = 'medium',
  color = 'blue',
  className = '',
}: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12',
  };
  const colorClasses = {
    blue: 'border-blue-600',
    gray: 'border-gray-600',
    white: 'border-white',
  };
  const sizeClass =
    typeof size === 'number'
      ? `h-[${size}px] w-[${size}px]`
      : sizeClasses[size as keyof typeof sizeClasses] || sizeClasses['medium'];
  const colorClass = colorClasses[color as keyof typeof colorClasses] || `border-t-[${color}]`;

  return (
    <div
      className={`inline-block animate-spin rounded-full border-b-2 ${sizeClass} ${colorClass} ${className}`}
    />
  );
}
