/**
 * ConnectWon 테스트 컨텍스트 타입
 */
import type { Platform, DeviceType } from './platform'

export interface TestContext {
  // 테스트 대상 플랫폼
  platform: Platform

  // 디바이스 타입 (데스크톱/모바일)
  deviceType: DeviceType

  // 실행 환경
  env: 'development' | 'staging' | 'production'

  // 베이스 URL
  baseUrl: string

  // API URL
  apiUrl: string

  // 테스트 세션 ID
  sessionId: string

  // 테스트 시작 시간
  startTime: string

  // 현재 테스트 케이스 이름
  testName?: string

  // 사용자 정보 (로그인 테스트용)
  user?: {
    email: string
    name: string
    token?: string
  }
}
