/**
 * Description : factory.ts - 📌 알림 팩토리 및 통합 매니저
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import type {
  BaseNotification,
  EmailTemplateDefinition,
  NotificationChannel,
  NotificationEvent,
  NotificationEventType,
  NotificationPreferences,
  NotificationTemplate,
  SendEmailRequest,
  SendSlackRequest,
  SlackTemplate,
} from '../../../core-types.js';

// 템플릿 타입 가드
function isEmailTemplateDefinition(x: unknown): x is EmailTemplateDefinition {
  return (
    !!x &&
    typeof x === 'object' &&
    'subject_template' in (x as any) &&
    'html_template' in (x as any)
  );
}

// 슬랙 템플릿 타입 가드
function isSlackTemplate(x: unknown): x is SlackTemplate {
  return !!x && typeof x === 'object' && 'text_template' in (x as any);
}

// 알림 팩토리 인터페이스
export interface NotificationProvider {
  channel: NotificationChannel;
  send(request: SendEmailRequest | SendSlackRequest): Promise<BaseNotification>;
  isAvailable(): boolean;
}

// 알림 팩토리 구현체
export class NotificationFactory {
  private providers = new Map<NotificationChannel, NotificationProvider>();
  private preferences = new Map<string, NotificationPreferences>();
  private templates = new Map<string, NotificationTemplate>();

  // 채널별 알림 제공자 등록
  registerProvider(provider: NotificationProvider): void {
    this.providers.set(provider.channel, provider);
  }

  // 사용자별 알림 환경설정 저장
  setUserPreferences(userId: string, preferences: NotificationPreferences): void {
    this.preferences.set(userId, preferences);
  }

  // 알림 템플릿 등록
  registerTemplate(tpl: NotificationTemplate): void {
    this.templates.set(tpl.id, tpl);
  }

  // 템플릿 조회
  private getTemplate(id?: string): NotificationTemplate | undefined {
    if (!id) return undefined;
    return this.templates.get(id);
  }

  // 이벤트 기반 알림 전송
  async sendEventNotification(event: NotificationEvent): Promise<NotificationResult[]> {
    const results: NotificationResult[] = [];
    for (const userId of event.recipients.user_ids || []) {
      const userPrefs = this.preferences.get(userId);
      if (!userPrefs) continue;
      const channels = this.getEnabledChannels(event.event_type, userPrefs);
      for (const channel of channels) {
        const result = await this.sendToChannel(channel, event, userId);
        results.push(result);
      }
    }
    // 직접 이메일/슬랙 채널로 전송
    if (event.recipients.email_addresses) {
      for (const email of event.recipients.email_addresses) {
        const result = await this.sendEmailDirect(email, event);
        results.push(result);
      }
    }
    // Slack 채널로 직접 전송
    if (event.recipients.slack_channels) {
      for (const channel of event.recipients.slack_channels) {
        const result = await this.sendSlackDirect(channel, event);
        results.push(result);
      }
    }
    return results;
  }

  // 특정 채널로 직접 알림 전송
  async sendDirectNotification(
    channel: NotificationChannel,
    request: SendEmailRequest | SendSlackRequest,
  ): Promise<BaseNotification> {
    const provider = this.providers.get(channel);
    if (!provider) throw new Error(`Provider for channel '${channel}' not found`);
    if (!provider.isAvailable())
      throw new Error(`Provider for channel '${channel}' is not available`);
    return provider.send(request);
  }

  // 대량 알림 전송
  async sendBulkNotifications(
    channel: NotificationChannel,
    requests: (SendEmailRequest | SendSlackRequest)[],
  ): Promise<BaseNotification[]> {
    const provider = this.providers.get(channel);
    if (!provider) throw new Error(`Provider for channel '${channel}' not found`);
    // 병렬 전송
    const results = await Promise.allSettled(requests.map(request => provider.send(request)));
    return results.map(r =>
      r.status === 'fulfilled' ? r.value : this.createFailedNotification(channel),
    );
  }

  // 이벤트 타입에 따른 활성화된 채널 조회
  private getEnabledChannels(
    eventType: NotificationEventType,
    preferences: NotificationPreferences,
  ): NotificationChannel[] {
    const channelMap: Record<NotificationEventType, keyof NotificationPreferences['channels']> = {
      session_reminder: 'session_reminders',
      session_cancelled: 'session_updates',
      session_confirmed: 'session_updates',
      program_created: 'program_updates',
      program_updated: 'program_updates',
      participant_joined: 'session_updates',
      participant_left: 'session_updates',
      room_reservation_confirmed: 'session_updates',
      room_reservation_cancelled: 'session_updates',
      payment_completed: 'payment_notifications',
      payment_failed: 'payment_notifications',
    };
    const key = channelMap[eventType];
    return preferences.channels[key] || [];
  }

  // 특정 사용자에게 채널별 알림 전송
  private async sendToChannel(
    channel: NotificationChannel,
    event: NotificationEvent,
    userId: string,
  ): Promise<NotificationResult> {
    try {
      let notification: BaseNotification;
      switch (channel) {
        case 'email':
          notification = await this.sendEmailToUser(userId, event);
          break;
        case 'slack':
          notification = await this.sendSlackToUser(userId, event);
          break;
        default:
          throw new Error(`Unsupported channel: ${channel}`);
      }
      return { success: true, channel, userId, notification };
    } catch (error) {
      return {
        success: false,
        channel,
        userId,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // 사용자에게 이메일 전송
  private async sendEmailToUser(
    userId: string,
    event: NotificationEvent,
  ): Promise<BaseNotification> {
    const emailProvider = this.providers.get('email');
    if (!emailProvider) throw new Error('Email provider not configured');

    const userInfo = await this.getUserInfo(userId);
    const tpl = this.getTemplate(event.template_id);
    const emailTpl =
      tpl && isEmailTemplateDefinition(tpl.template_data) ? tpl.template_data : undefined;
    const request: SendEmailRequest = {
      to: [{ email: userInfo.email, name: userInfo.name }],
      subject: emailTpl?.subject_template ?? this.generateSubject(event),
      html: emailTpl?.html_template ?? this.generateDefaultEmailContent(event),
      ...(event.priority ? { priority: event.priority } : {}), // exactOptionalPropertyTypes 대응
    };
    return emailProvider.send(request);
  }

  // 사용자에게 슬랙 메시지 전송
  private async sendSlackToUser(
    userId: string,
    event: NotificationEvent,
  ): Promise<BaseNotification> {
    const slackProvider = this.providers.get('slack');
    if (!slackProvider) throw new Error('Slack provider not configured');

    const slackUserId = await this.getSlackUserId(userId);
    const tpl = this.getTemplate(event.template_id);
    const slackTpl = tpl && isSlackTemplate(tpl.template_data) ? tpl.template_data : undefined;

    const request: SendSlackRequest = {
      user_id: slackUserId,
      text: slackTpl?.text_template ?? this.generateSlackText(event),
      ...(event.priority ? { priority: event.priority } : {}),
    };
    return slackProvider.send(request);
  }
  // 이메일 직접 전송
  private async sendEmailDirect(
    email: string,
    event: NotificationEvent,
  ): Promise<NotificationResult> {
    try {
      const emailProvider = this.providers.get('email');
      if (!emailProvider) throw new Error('Email provider not configured');

      const tpl = this.getTemplate(event.template_id);
      const emailTpl =
        tpl && isEmailTemplateDefinition(tpl.template_data) ? tpl.template_data : undefined;

      const request: SendEmailRequest = {
        to: [{ email }],
        subject: emailTpl?.subject_template ?? this.generateSubject(event),
        html: emailTpl?.html_template ?? this.generateDefaultEmailContent(event),
        ...(event.priority ? { priority: event.priority } : {}),
      };
      const notification = await emailProvider.send(request);
      return { success: true, channel: 'email', notification };
    } catch (error) {
      return {
        success: false,
        channel: 'email',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // 슬랙 채널로 직접 전송
  private async sendSlackDirect(
    channel: string,
    event: NotificationEvent,
  ): Promise<NotificationResult> {
    try {
      const slackProvider = this.providers.get('slack');
      if (!slackProvider) throw new Error('Slack provider not configured');
      const tpl = this.getTemplate(event.template_id);
      const slackTpl = tpl && isSlackTemplate(tpl.template_data) ? tpl.template_data : undefined;
      const request: SendSlackRequest = {
        channel_name: channel,
        text: slackTpl?.text_template ?? this.generateSlackText(event),
        ...(event.priority ? { priority: event.priority } : {}),
      };
      const notification = await slackProvider.send(request);
      return { success: true, channel: 'slack', notification };
    } catch (error) {
      return {
        success: false,
        channel: 'slack',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // 기본 제목/내용 생성 (템플릿 미등록 시 사용)
  private generateSubject(event: NotificationEvent): string {
    const subjectMap: Record<NotificationEventType, string> = {
      session_reminder: '세션 알림',
      session_cancelled: '세션 취소',
      session_confirmed: '세션 확정',
      program_created: '새 프로그램 생성',
      program_updated: '프로그램 업데이트',
      participant_joined: '참가자 등록',
      participant_left: '참가자 취소',
      room_reservation_confirmed: '예약 확정',
      room_reservation_cancelled: '예약 취소',
      payment_completed: '결제 완료',
      payment_failed: '결제 실패',
    };
    return subjectMap[event.event_type] ?? '알림';
  }

  // 기본 이메일 내용 생성
  private generateDefaultEmailContent(event: NotificationEvent): string {
    return `
      <h2>${this.generateSubject(event)}</h2>
      <p>이벤트 유형: ${event.event_type}</p>
      <p>상세 정보는 웹사이트에서 확인해주세요.</p>
    `;
  }

  // 기본 슬랙 메시지 생성
  private generateSlackText(event: NotificationEvent): string {
    return `${this.generateSubject(event)}: ${event.event_type}`;
  }

  // 사용자 정보 조회 (더미 구현 - 실제로는 DB/API 호출)
  private async getUserInfo(userId: string): Promise<{ email: string; name: string }> {
    return { email: `user${userId}@example.com`, name: `User ${userId}` };
  }

  // 사용자 ID로 슬랙 유저 ID 조회 (더미 구현)
  private async getSlackUserId(userId: string): Promise<string> {
    return `U${userId}`;
  }

  // 실패한 알림 생성
  private createFailedNotification(channel: NotificationChannel): BaseNotification {
    return {
      id: `failed_${Date.now()}`,
      channel,
      priority: 'normal',
      status: 'failed',
      created_at: new Date().toISOString(),
      retry_count: 0,
      max_retries: 3,
      error_message: 'Failed to send notification',
    };
  }
}

// 결과 타입
export interface NotificationResult {
  success: boolean;
  channel: NotificationChannel;
  userId?: string;
  notification?: BaseNotification;
  error?: string;
}

// 간소화된 팩토리 헬퍼
export function createNotificationFactory(): NotificationFactory {
  return new NotificationFactory();
}
