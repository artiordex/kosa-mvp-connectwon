/** 플랫폼, 디바이스, 브라우저 타입 정의 */

// 플랫폼 구분 (웹 데스크탑, 웹 모바일)
export const Platform = {
  WEB_DESKTOP: 'WEB_DESKTOP',
  WEB_MOBILE: 'WEB_MOBILE',
} as const

export type Platform = typeof Platform[keyof typeof Platform]

// 디바이스 타입
export const DeviceType = {
  DESKTOP: 'DESKTOP',
  MOBILE: 'MOBILE',
} as const

export type DeviceType = keyof typeof DeviceType

// 브라우저 타입
export const BrowserType = {
  CHROME: 'chrome',
  FIREFOX: 'firefox',
  SAFARI: 'safari',
  EDGE: 'edge',
} as const

export type BrowserType = typeof BrowserType[keyof typeof BrowserType]
