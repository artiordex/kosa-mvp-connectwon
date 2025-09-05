/**
 * Playwright 설정 관련 타입
 */
import type { BrowserContextOptions, LaunchOptions } from '@playwright/test'
import type { Platform, DeviceType, BrowserType } from './platform'

export interface E2EProjectConfig {
  // 프로젝트 이름
  name: string

  // 테스트 파일 경로 패턴
  testDir: string

  // 사용할 브라우저
  browserName: BrowserType

  // 플랫폼 타입
  platform: Platform

  // 디바이스 타입
  deviceType: DeviceType

  // 뷰포트 설정
  viewport?: { width: number; height: number } | null

  // 브라우저 실행 옵션
  launchOptions?: LaunchOptions

  // 컨텍스트 옵션
  contextOptions?: BrowserContextOptions

  // 사용자 에이전트
  userAgent?: string
}

export interface TestEnvironmentConfig {
  // 베이스 URL
  baseUrl: string

  // API URL
  apiUrl: string

  // headless 모드 여부
  headless: boolean

  // 병렬 실행 워커 수
  workers: number

  // 재시도 횟수
  retries: number

  // 타임아웃 (밀리초)
  timeout: number

  // 스크린샷 설정
  screenshot: 'off' | 'on' | 'only-on-failure'

  // 비디오 녹화
  video: 'off' | 'on' | 'retain-on-failure'
}
