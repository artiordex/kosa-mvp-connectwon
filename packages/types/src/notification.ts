/**
 * 알림 관련 타입 (간소화)
 */

export interface SlackConfig {
  // 슬랙 웹훅 URL
  webhookUrl: string

  // 채널명
  channel: string

  // 멘션할 사용자
  mentions?: string[]
}

export interface EmailConfig {
  // SMTP 설정
  host: string
  port: number
  user: string
  password: string

  // 발송자/수신자
  from: string
  to: string[]
}
