/**
 * Description : cn.ts - 📌 className 조합 및 조건부 적용 유틸리티
 * Author : Shiwoo Min
 * Date : 2025-09-21
 */
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * @function cn
 * @description
 * className을 조건부로 합치고 Tailwind 충돌을 해결하는 함수.
 * @param {...ClassValue[]} inputs - 문자열, 배열, 객체, falsy, 조건부 등 혼합 입력
 * @returns {string} 최적화된 className 문자열
 * @example
 * cn('px-2', 'py-1', isActive && 'bg-blue-500'); // => 'py-1 px-2 bg-blue-500'
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(...inputs));
}

/** @typedef {[cond: boolean, className: string]} ClassTuple */
type ClassTuple = [cond: boolean, className: string];
/** @typedef {(ClassValue | ClassTuple | ClassInput[])} ClassInput */
export type ClassInput = ClassValue | ClassTuple | ClassInput[];

/**
 * tuple type guard
 */
function isTuple(v: unknown): v is ClassTuple {
  return Array.isArray(v) && v.length === 2 && typeof v[0] === 'boolean' && typeof v[1] === 'string';
}

/**
 * @function cnPure
 * @description
 * 외부 의존성 없는 순수 병합 함수. tailwind-merge를 사용하지 않기 때문에
 * 클래스 충돌 우선순위는 보장하지 않는다.
 * @param {...ClassInput[]} classes - 병합할 클래스 입력들
 * @returns {string} 병합된 className
 */
export function cnPure(...classes: ClassInput[]): string {
  const out: string[] = [];

  const push = (v: ClassInput): void => {
    if (!v) return;

    if (isTuple(v)) {
      if (v[0] && v[1]) out.push(v[1]);
      return;
    }

    if (Array.isArray(v)) {
      v.forEach(item => push(item as ClassInput));
      return;
    }

    if (typeof v === 'string' || typeof v === 'number') {
      if (v !== '') out.push(String(v));
      return;
    }

    if (typeof v === 'boolean' || v == null) {
      return; // 무시
    }

    // 객체 맵 { 'class-a': true, 'class-b': false }
    for (const [key, cond] of Object.entries(v as Record<string, unknown>)) {
      if (cond) out.push(key);
    }
  };

  classes.forEach(push);
  return out.join(' ');
}

/**
 * @function conditionalClass
 * @description
 * 조건부 클래스 적용 헬퍼. 조건이 참인 클래스만 활성화하여 cn으로 병합한다.
 * @param {string} baseClass - 기본 클래스
 * @param {...Readonly<[boolean, ClassValue]>[]} pairs - [조건, 클래스] 튜플 배열
 * @returns {string} 병합된 className
 * @example
 * conditionalClass('btn',
 *   [isActive, 'btn-active'],
 *   [isDisabled, 'opacity-50 cursor-not-allowed']
 * );
 */
export function conditionalClass(baseClass: string, ...pairs: ReadonlyArray<Readonly<[boolean, ClassValue]>>): string {
  const enabled = pairs.filter(([cond]) => cond).map(([, klass]) => klass);
  return cn(baseClass, ...enabled);
}

/**
 * @function variantClass
 * @description
 * variant 키에 따라 클래스를 선택해 병합한다.
 * @template T extends string
 * @param {ClassValue} baseClass - 기본 클래스
 * @param {T | undefined} variant - 현재 변형 키
 * @param {Partial<Record<T, ClassValue>>} variants - 변형 키 → 클래스 매핑
 * @returns {string} 병합된 className
 * @example
 * variantClass('btn', variant, {
 *   primary: 'bg-blue-500 text-white',
 *   secondary: 'bg-gray-500 text-white',
 *   outline: 'border border-blue-500 text-blue-500'
 * });
 */
export function variantClass<T extends string>(baseClass: ClassValue, variant: T | undefined, variants: Partial<Record<T, ClassValue>>): string {
  return variant ? cn(baseClass, variants[variant]) : cn(baseClass);
}

/**
 * @function sizeClass
 * @description
 * size 키에 따라 클래스를 선택해 병합한다.
 * @template T extends string
 * @param {ClassValue} baseClass - 기본 클래스
 * @param {T | undefined} size - 현재 사이즈 키
 * @param {Partial<Record<T, ClassValue>>} sizes - 사이즈 키 → 클래스 매핑
 * @returns {string} 병합된 className
 * @example
 * sizeClass('input', size, {
 *   sm: 'px-2 py-1 text-sm',
 *   md: 'px-3 py-2 text-base',
 *   lg: 'px-4 py-3 text-lg'
 * });
 */
export function sizeClass<T extends string>(baseClass: ClassValue, size: T | undefined, sizes: Partial<Record<T, ClassValue>>): string {
  return size ? cn(baseClass, sizes[size]) : cn(baseClass);
}

/**
 * @namespace examples
 * @description cn 사용 예시
 */
export const examples = {
  /** @function basic */
  basic: () => cn('px-4 py-2', 'bg-blue-500', 'text-white'),

  /** @function conditional */
  conditional: (isActive: boolean) => cn('btn', 'px-4 py-2', [isActive, 'bg-blue-500'], [!isActive, 'bg-gray-300']),

  /** @function object */
  object: (variant: string) =>
    cn('btn', {
      'btn-primary': variant === 'primary',
      'btn-secondary': variant === 'secondary',
      'btn-outline': variant === 'outline',
    }),

  /** @function complex */
  complex: (variant: string, size: string, disabled: boolean) =>
    cn(
      'btn',
      'transition-colors duration-200',
      // variant
      {
        'bg-blue-500 text-white hover:bg-blue-600': variant === 'primary',
        'bg-gray-500 text-white hover:bg-gray-600': variant === 'secondary',
        'border border-blue-500 text-blue-500 hover:bg-blue-50': variant === 'outline',
      },
      // size
      {
        'px-2 py-1 text-sm': size === 'sm',
        'px-4 py-2 text-base': size === 'md',
        'px-6 py-3 text-lg': size === 'lg',
      },
      // state
      [disabled, 'opacity-50 cursor-not-allowed'],
      [!disabled, 'hover:opacity-80'],
    ),
};

/** @default cn */
export default cn;
