/**
 * cn - className 조합 및 조건부 적용 유틸리티
 *
 * @description
 * 여러 className을 조건부로 합치고, Tailwind CSS 클래스 충돌을 해결합니다.
 * clsx + tailwind-merge 조합으로 최적화된 className 문자열을 생성합니다.
 *
 * @author Shiwoo Min
 * @date 2025-09-19
 * @path packages/ui/src/utils/cn.ts
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * className을 조건부로 합치고 Tailwind 충돌을 해결하는 함수
 *
 * @param inputs - className 값들 (문자열, 객체, 배열, 조건부 등)
 * @returns 최적화된 className 문자열
 *
 * @example
 * ```typescript
 * // 기본 사용
 * cn('px-4 py-2', 'bg-blue-500')
 * // → 'px-4 py-2 bg-blue-500'
 *
 * // 조건부 적용
 * cn('btn', isActive && 'btn-active', disabled && 'btn-disabled')
 * // → 'btn btn-active' (isActive가 true일 때)
 *
 * // 객체 형태
 * cn('btn', {
 *   'btn-primary': variant === 'primary',
 *   'btn-secondary': variant === 'secondary'
 * })
 *
 * // Tailwind 충돌 해결
 * cn('px-2 py-1', 'px-4')
 * // → 'py-1 px-4' (나중 것이 우선)
 *
 * // 복잡한 조건부
 * cn(
 *   'base-class',
 *   condition1 && 'conditional-class',
 *   condition2 ? 'true-class' : 'false-class',
 *   { 'object-class': condition3 },
 *   additionalClassName
 * )
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// =================================================================
// 순수 JavaScript 버전 (clsx/tailwind-merge 없이)
// =================================================================

/**
 * 외부 의존성 없는 순수 JavaScript cn 함수
 * clsx, tailwind-merge가 없을 때 사용
 */
export function cnPure(...classes: (string | undefined | null | boolean | { [key: string]: boolean })[]): string {
  const result: string[] = [];

  for (const cls of classes) {
    if (!cls) continue;

    if (typeof cls === 'string') {
      result.push(cls);
    } else if (typeof cls === 'object') {
      for (const [key, value] of Object.entries(cls)) {
        if (value) {
          result.push(key);
        }
      }
    }
  }

  return result.join(' ').trim();
}

// =================================================================
// 타입 정의
// =================================================================

/**
 * cn 함수에 전달할 수 있는 값들의 타입
 */
export type ClassNameValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | { [key: string]: boolean | undefined | null }
  | ClassNameValue[];

// =================================================================
// 유틸리티 함수들
// =================================================================

/**
 * 조건부 클래스 적용 헬퍼
 *
 * @example
 * ```typescript
 * const classes = conditionalClass(
 *   'base-class',
 *   isActive, 'active-class',
 *   isDisabled, 'disabled-class'
 * );
 * ```
 */
export function conditionalClass(
  baseClass: string,
  ...conditions: [boolean, string][]
): string {
  const classes = [baseClass];

  for (let i = 0; i < conditions.length; i += 2) {
    const condition = conditions[i] as boolean;
    const className = conditions[i + 1] as string;

    if (condition) {
      classes.push(className);
    }
  }

  return cn(...classes);
}

/**
 * variant 기반 클래스 생성 헬퍼
 *
 * @example
 * ```typescript
 * const buttonClasses = variantClass('btn', 'primary', {
 *   primary: 'bg-blue-500 text-white',
 *   secondary: 'bg-gray-500 text-white',
 *   outline: 'border border-blue-500 text-blue-500'
 * });
 * ```
 */
export function variantClass<T extends string>(
  baseClass: string,
  variant: T,
  variants: Record<T, string>
): string {
  return cn(baseClass, variants[variant]);
}

/**
 * 사이즈 기반 클래스 생성 헬퍼
 *
 * @example
 * ```typescript
 * const inputClasses = sizeClass('input', 'md', {
 *   sm: 'px-2 py-1 text-sm',
 *   md: 'px-3 py-2 text-base',
 *   lg: 'px-4 py-3 text-lg'
 * });
 * ```
 */
export function sizeClass<T extends string>(
  baseClass: string,
  size: T,
  sizes: Record<T, string>
): string {
  return cn(baseClass, sizes[size]);
}

// =================================================================
// 사용 예시 및 테스트
// =================================================================

/**
 * cn 함수 사용 예시들
 */
export const examples = {
  // 기본 사용
  basic: () => cn('px-4 py-2', 'bg-blue-500', 'text-white'),

  // 조건부 적용
  conditional: (isActive: boolean) => cn(
    'btn',
    'px-4 py-2',
    isActive && 'bg-blue-500',
    !isActive && 'bg-gray-300'
  ),

  // 객체 형태
  object: (variant: string) => cn('btn', {
    'btn-primary': variant === 'primary',
    'btn-secondary': variant === 'secondary',
    'btn-outline': variant === 'outline'
  }),

  // 복잡한 조합
  complex: (variant: string, size: string, disabled: boolean) => cn(
    'btn',
    'transition-colors duration-200',
    {
      // variant
      'bg-blue-500 text-white hover:bg-blue-600': variant === 'primary',
      'bg-gray-500 text-white hover:bg-gray-600': variant === 'secondary',
      'border border-blue-500 text-blue-500 hover:bg-blue-50': variant === 'outline',

      // size
      'px-2 py-1 text-sm': size === 'sm',
      'px-4 py-2 text-base': size === 'md',
      'px-6 py-3 text-lg': size === 'lg',

      // state
      'opacity-50 cursor-not-allowed': disabled,
      'hover:opacity-80': !disabled
    }
  )
};

// =================================================================
// Default Export
// =================================================================

export default cn;
