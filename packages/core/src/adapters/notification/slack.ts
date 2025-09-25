/**
 * Description : slack.ts - 📌 n8n 연동용 Slack 웹훅 어댑터
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import type { N8nWebhookPayload, NotificationPayload, SlackAttachment, SlackBlock, SlackField, SlackMessage, SlackResult, SlackWebhookConfig } from '../../../core-types.js';

/**
 * @description 값이 정의되어 있을 때만 키 추가하는 헬퍼 함수
 * @param key 추가할 키
 * @param value 추가할 값
 * @returns 값이 있으면 키-값 객체, 없으면 빈 객체
 */
function opt<K extends string, V>(
  key: K,
  value: V | undefined,
): V extends undefined ? {} : { [P in K]: V } {
  return (value === undefined ? {} : { [key]: value }) as any;
}

/**
 * @description 직렬화 시 undefined 값 제거
 * @param obj 정리할 객체
 * @returns undefined 값이 제거된 객체
 */
function pruneUndefined<T extends Record<string, any>>(obj: T): T {
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined) out[k] = v;
  }
  return out as T;
}

/**
 * @description Slack 웹훅 어댑터 클래스
 * @summary Slack 웹훅을 통한 다양한 형태의 메시지 전송 기능 제공
 */
export class SlackAdapter {
  /**
   * @description SlackAdapter 생성자
   * @param config Slack 웹훅 설정 (URL, 기본 채널 등)
   */
  constructor(private config: SlackWebhookConfig) {}

  /**
   * @description 기본 메시지 전송
   * @param message 전송할 Slack 메시지
   * @returns 전송 결과
   */
  async sendMessage(message: SlackMessage): Promise<SlackResult> {
    const resolved = this.resolveChannel(message.channel);
    if (!resolved.ok) return { success: false, error: resolved.error };

    // exactOptionalPropertyTypes: 옵셔널은 값이 있을 때만 포함
    const finalMessage: SlackMessage = {
      text: message.text,
      channel: resolved.channel, // required string
      ...opt('username', message.username),
      ...opt('icon_emoji', message.icon_emoji),
      ...opt('icon_url', message.icon_url),
      ...opt('attachments', message.attachments),
      ...opt('blocks', message.blocks),
    };

    try {
      const payload = pruneUndefined({
        text: finalMessage.text,
        channel: finalMessage.channel,
        ...opt('username', finalMessage.username ?? this.config.default_username),
        ...opt('icon_emoji', finalMessage.icon_emoji ?? this.config.default_icon),
        ...opt('icon_url', finalMessage.icon_url),
        ...opt('attachments', finalMessage.attachments),
        ...opt('blocks', finalMessage.blocks),
      });

      const response = await fetch(this.config.webhook_url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) return { success: true, response: await response.text() };
      const err = await response.text();
      return { success: false, error: `Slack webhook error: ${response.status} ${err}` };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown Slack error',
      };
    }
  }

  /**
   * @description 간단한 텍스트 메시지 전송
   * @param text 전송할 텍스트
   * @param channel 대상 채널 (선택사항, 기본 채널 사용)
   * @returns 전송 결과
   */
  async sendText(text: string, channel?: string): Promise<SlackResult> {
    const resolved = this.resolveChannel(channel);
    if (!resolved.ok) return { success: false, error: resolved.error };
    return this.sendMessage({ text, channel: resolved.channel });
  }

  /**
   * @description 알림 메시지 전송 (색상/필드 포함)
   * @param notification 알림 페이로드
   * @returns 전송 결과
   */
  async sendNotification(notification: NotificationPayload): Promise<SlackResult> {
    const resolved = this.resolveChannel(notification.channel);
    if (!resolved.ok) return { success: false, error: resolved.error };

    const colorMap: Record<NotificationPayload['type'], string> = {
      info: '#36a64f',
      success: '#2eb886',
      warning: '#daa038',
      error: '#a30200',
    };

    // core-types에서 fields가 필수라면 빈 배열로 보장
    const attachment: SlackAttachment = {
      color: colorMap[notification.type],
      title: notification.title,
      text: notification.message,
      footer: 'ConnectWon',
      ts: Math.floor(Date.now() / 1000),
      fields: notification.data ? this.formatDataFields(notification.data) : [],
    };

    const message: SlackMessage = {
      text: notification.title,
      channel: resolved.channel,
      attachments: [attachment],
    };
    return this.sendMessage(message);
  }

  /**
   * @description n8n 이벤트 메시지 전송
   * @param payload n8n 웹훅 페이로드
   * @returns 전송 결과
   */
  async sendEvent(payload: N8nWebhookPayload): Promise<SlackResult> {
    const resolved = this.resolveChannel(undefined); // 기본 채널 사용
    if (!resolved.ok) return { success: false, error: resolved.error };

    const blocks: SlackBlock[] = [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*이벤트:* ${payload.event_type}\n*타입:* ${payload.entity_type}\n*ID:* ${payload.entity_id}`,
        },
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `발생시간: ${new Date(payload.timestamp).toLocaleString('ko-KR')}`,
          },
        ],
      },
    ];

    const hasDetail = Object.keys(payload.data).length > 0;

    const attachments: SlackAttachment[] | undefined = hasDetail
      ? [
          {
            color: '#f2c744',
            title: '상세 데이터',
            fields: this.formatDataFields(payload.data), // 배열 보장
            footer: 'ConnectWon Event System',
            ts: Math.floor(Date.now() / 1000),
          },
        ]
      : undefined;

    const message: SlackMessage = {
      text: `${payload.event_type} 이벤트가 발생했습니다`,
      channel: resolved.channel,
      ...opt('blocks', blocks),
      ...opt('attachments', attachments),
    };

    return this.sendMessage(message);
  }

  /**
   * @description 세션 알림 메시지 전송
   * @param type 세션 알림 타입
   * @param sessionData 세션 데이터
   * @param channel 대상 채널 (선택사항)
   * @returns 전송 결과
   */
  async sendSessionNotification(
    type: 'created' | 'updated' | 'cancelled' | 'reminder',
    sessionData: {
      id: string;
      title: string;
      starts_at: string;
      location?: string;
      participants_count?: number;
    },
    channel?: string,
  ): Promise<SlackResult> {
    const resolved = this.resolveChannel(channel);
    if (!resolved.ok) return { success: false, error: resolved.error };

    const typeCfg = {
      created: { emoji: '🎉', color: '#2eb886', title: '새 세션이 생성되었습니다' },
      updated: { emoji: '📝', color: '#daa038', title: '세션이 업데이트되었습니다' },
      cancelled: { emoji: '❌', color: '#a30200', title: '세션이 취소되었습니다' },
      reminder: { emoji: '⏰', color: '#36a64f', title: '세션 시작 알림' },
    } as const;

    const cfg = typeCfg[type];
    const startTime = new Date(sessionData.starts_at).toLocaleString('ko-KR');
    const attachment: SlackAttachment = {
      color: cfg.color,
      title: cfg.title,
      text:
        `**${sessionData.title}**\n` +
        `시간: ${startTime}` +
        (sessionData.location ? `\n장소: ${sessionData.location}` : '') +
        (sessionData.participants_count ? `\n참가자: ${sessionData.participants_count}명` : ''),
      footer: 'ConnectWon',
      ts: Math.floor(Date.now() / 1000),
      fields: [
        { title: 'Session ID', value: sessionData.id, short: true },
        { title: 'Timestamp', value: sessionData.starts_at, short: true },
      ],
    };

    const message: SlackMessage = {
      text: `${cfg.emoji} ${cfg.title}`,
      channel: resolved.channel,
      attachments: [attachment],
    };
    return this.sendMessage(message);
  }

  /**
   * @description 연결 테스트
   * @returns 연결 성공 여부
   */
  async testConnection(): Promise<boolean> {
    const result = await this.sendText('ConnectWon 연결 테스트 메시지입니다.');
    return result.success;
  }

  /**
   * @description 채널 해석 및 검증
   * @param channel 대상 채널 (선택사항)
   * @returns 해석된 채널 또는 에러
   * @private
   */
  private resolveChannel(
    channel?: string,
  ): { ok: true; channel: string } | { ok: false; error: string } {
    const resolved = channel ?? this.config.default_channel;
    if (!resolved || resolved.trim() === '') {
      return {
        ok: false,
        error: 'Slack channel이 지정되지 않았고 default_channel도 설정되어 있지 않습니다.',
      };
    }
    return { ok: true, channel: resolved };
  }

  /**
   * @description 데이터 필드 포맷팅
   * @param data 포맷할 데이터 객체
   * @returns Slack 필드 배열
   * @private
   */
  private formatDataFields(data: Record<string, unknown>): SlackField[] {
    return Object.entries(data)
      .filter(([, v]) => v !== null && v !== undefined)
      .map(([k, v]) => ({
        title: this.formatFieldTitle(k),
        value: this.formatFieldValue(v),
        short: this.isShortField(v),
      }));
  }

  /**
   * @description 필드 제목 포맷팅
   * @param key 필드 키
   * @returns 포맷된 제목
   * @private
   */
  private formatFieldTitle(key: string): string {
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  /**
   * @description 필드 값 포맷팅
   * @param value 포맷할 값
   * @returns 포맷된 문자열
   * @private
   */
  private formatFieldValue(value: unknown): string {
    if (typeof value === 'string' || typeof value === 'number') return String(value);
    if (typeof value === 'boolean') return value ? '예' : '아니오';
    if (value instanceof Date) return value.toLocaleString('ko-KR');
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }

  /**
   * @description 짧은 필드 여부 판단 (20자 이하)
   * @param value 판단할 값
   * @returns 짧은 필드 여부
   * @private
   */
  private isShortField(value: unknown): boolean {
    return this.formatFieldValue(value).length <= 20;
  }
}

/**
 * @description n8n 이벤트 페이로드 생성 팩토리 함수
 * @param eventType 이벤트 타입
 * @param entityType 엔티티 타입
 * @param entityId 엔티티 ID
 * @param data 추가 데이터 (선택사항)
 * @returns n8n 웹훅 페이로드
 */
export function createEventPayload(
  eventType: string,
  entityType: N8nWebhookPayload['entity_type'],
  entityId: string,
  data: Record<string, unknown> = {},
): N8nWebhookPayload {
  return {
    event_type: eventType,
    entity_type: entityType,
    entity_id: entityId,
    data,
    timestamp: new Date().toISOString(),
  };
}

/**
 * @description 알림 페이로드 생성 팩토리 함수
 * @param type 알림 타입
 * @param title 알림 제목
 * @param message 알림 메시지
 * @param options 추가 옵션 (선택사항)
 * @returns 알림 페이로드
 */
export function createNotificationPayload(
  type: NotificationPayload['type'],
  title: string,
  message: string,
  options: Partial<NotificationPayload> = {},
): NotificationPayload {
  return { type, title, message, ...options };
}

/**
 * @description Slack 어댑터 팩토리 함수
 * @param config Slack 웹훅 설정
 * @returns SlackAdapter 인스턴스
 */
export function createSlackAdapter(config: SlackWebhookConfig): SlackAdapter {
  return new SlackAdapter(config);
}

/**
 * @description n8n 웹훅 트리거 클래스
 * @summary n8n 워크플로우를 트리거하기 위한 웹훅 호출 기능 제공
 */
export class N8nWebhook {
  /**
   * @description N8nWebhook 생성자
   * @param webhookUrl n8n 웹훅 URL
   */
  constructor(private webhookUrl: string) {}

  /**
   * @description 웹훅 트리거 실행
   * @param payload 전송할 페이로드
   * @returns 트리거 성공 여부
   */
  async trigger(payload: Record<string, unknown>): Promise<boolean> {
    try {
      const res = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return res.ok;
    } catch {
      return false;
    }
  }
}
