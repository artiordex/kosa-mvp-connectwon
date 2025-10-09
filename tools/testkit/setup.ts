/**
 * Description : setup.ts - 📌 전역 테스트 환경 설정
 * Author : Shiwoo Min
 * Date : 2025-09-16
 */
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll, vi } from 'vitest';

// 각 테스트 후 자동 cleanup
afterEach(() => {
  cleanup();
});

// 전역 mocks
beforeAll(() => {
  // matchMedia mock
  Object.defineProperty(globalThis, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  // ResizeObserver mock
  globalThis.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  // IntersectionObserver mock
  globalThis.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  // fetch mock
  globalThis.fetch = vi.fn();

  // localStorage mock
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  };
  vi.stubGlobal('localStorage', localStorageMock);

  // sessionStorage mock
  const sessionStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  };
  vi.stubGlobal('sessionStorage', sessionStorageMock);

  // React 경고 필터링 (error + warn)
  const originalError = console.error;
  const originalWarn = console.warn;
  console.error = (...args: any[]) => {
    if (typeof args[0] === 'string' && args[0].includes('Warning: ReactDOM.render is deprecated')) return;
    originalError.call(console, ...args);
  };
  console.warn = (...args: any[]) => {
    if (typeof args[0] === 'string' && args[0].includes('ReactDOM.render')) return;
    originalWarn.call(console, ...args);
  };
});
