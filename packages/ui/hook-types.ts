/**
 * Description : hook-types.ts - 📌 공용 훅 타입 모음
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */

// 기본 유틸 타입
export type AnyFn = (...args: any[]) => any;

// SSR/브라우저 혼용 환경에서 타깃을 느슨하게 표현
export type TargetLike =
  | Window
  | Document
  | HTMLElement
  | EventTarget
  | MediaQueryList
  | null
  | undefined;

// ref 객체 또는 실제 노드
export type MaybeRef<T extends HTMLElement = HTMLElement> =
  | import('react').RefObject<T>
  | T
  | null
  | undefined;

// useBoolean
export type UseBooleanActions = {
  set: (v: boolean) => void;
  on: () => void;
  off: () => void;
  toggle: () => void;
};

// useDisclosure
export interface UseDisclosureOptions {
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

// useThrottle
export interface ThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

// 콜백 유틸 타입 – 필요하면 사용
export type DebouncedCallback<T extends AnyFn> = (...args: Parameters<T>) => void;
export type ThrottledCallback<T extends AnyFn> = (...args: Parameters<T>) => void;
