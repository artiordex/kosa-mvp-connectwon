/**
 * Description : notification.ts - 📌 알림 서비스 포트(이벤트/이메일/슬랙) 인터페이스
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import type { EmailResult, Id, NotificationChannel, NotificationEvent, SendEmailRequest, SendSlackRequest, SlackResult } from '../../core-types.js';

/**
 * @description 알림 서비스 포트
 */
export interface NotificationService {
  /**
   * @description 도메인 이벤트 기반 알림 전송
   * @param {NotificationEvent} event 이벤트 페이로드
   * @returns {Promise<NotificationResult[]>} 채널별 결과
   */
  sendEventNotification(event: NotificationEvent): Promise<NotificationResult[]>;

  /**
   * @description 이메일 전송
   * @param {SendEmailRequest} request 이메일 요청
   * @returns {Promise<EmailResult>}
   */
  sendEmail(request: SendEmailRequest): Promise<EmailResult>;

  /**
   * @description 슬랙 전송
   * @param {SendSlackRequest} request 슬랙 요청
   * @returns {Promise<SlackResult>}
   */
  sendSlack(request: SendSlackRequest): Promise<SlackResult>;

  /**
   * @description 인증번호 이메일 전송(회원가입/이메일변경)
   * @param {string} email 수신자
   * @param {string} code 인증코드
   * @param {'signup'|'email_change'} purpose 목적
   * @returns {Promise<EmailResult>}
   */
  sendVerificationCode(
    email: string,
    code: string,
    purpose: 'signup' | 'email_change',
  ): Promise<EmailResult>;

  /** @description 세션 생성 알림 */
  notifySessionCreated(sessionId: Id): Promise<NotificationResult[]>;
  /** @description 세션 취소 알림 */
  notifySessionCancelled(sessionId: Id, reason?: string): Promise<NotificationResult[]>;
  /** @description 세션 리마인더 알림 */
  notifySessionReminder(sessionId: Id, minutesBefore: number): Promise<NotificationResult[]>;

  /** @description 프로그램 생성 알림 */
  notifyProgramCreated(programId: Id): Promise<NotificationResult[]>;
  /** @description 프로그램 갱신 알림 */
  notifyProgramUpdated(programId: Id): Promise<NotificationResult[]>;

  /** @description 참가자 추가 알림 */
  notifyParticipantJoined(sessionId: Id, userId: Id): Promise<NotificationResult[]>;
  /** @description 참가자 이탈 알림 */
  notifyParticipantLeft(sessionId: Id, userId: Id): Promise<NotificationResult[]>;

  /** @description 이메일 연결 테스트 */
  testEmailConnection(): Promise<boolean>;
  /** @description 슬랙 연결 테스트 */
  testSlackConnection(): Promise<boolean>;
}

/**
 * @description 채널별 알림 전송 결과
 */
export interface NotificationResult {
  success: boolean;
  channel: NotificationChannel;
  message_id?: string;
  error?: string;
}
