/**
 * Description : notification.ts - 📌 알림 서비스 포트 인터페이스
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import type {
  EmailResult,
  Id,
  NotificationChannel,
  NotificationEvent,
  SendEmailRequest,
  SendSlackRequest,
  SlackResult,
} from '../../core-types.js';

// 알림 서비스 포트 인터페이스

export interface NotificationService {
  // 이벤트 기반 알림
  sendEventNotification(event: NotificationEvent): Promise<NotificationResult[]>;

  // 직접 알림 전송
  sendEmail(request: SendEmailRequest): Promise<EmailResult>;
  sendSlack(request: SendSlackRequest): Promise<SlackResult>;

  // 인증번호 전송
  sendVerificationCode(
    email: string,
    code: string,
    purpose: 'signup' | 'email_change',
  ): Promise<EmailResult>;

  // 세션 관련 알림
  notifySessionCreated(sessionId: Id): Promise<NotificationResult[]>;
  notifySessionCancelled(sessionId: Id, reason?: string): Promise<NotificationResult[]>;
  notifySessionReminder(sessionId: Id, minutesBefore: number): Promise<NotificationResult[]>;

  // 프로그램 관련 알림
  notifyProgramCreated(programId: Id): Promise<NotificationResult[]>;
  notifyProgramUpdated(programId: Id): Promise<NotificationResult[]>;

  // 참가자 관련 알림
  notifyParticipantJoined(sessionId: Id, userId: Id): Promise<NotificationResult[]>;
  notifyParticipantLeft(sessionId: Id, userId: Id): Promise<NotificationResult[]>;

  // 연결 테스트
  testEmailConnection(): Promise<boolean>;
  testSlackConnection(): Promise<boolean>;
}

// 알림 결과 인터페이스
export interface NotificationResult {
  success: boolean;
  channel: NotificationChannel;
  message_id?: string;
  error?: string;
}
