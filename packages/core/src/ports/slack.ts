/**
 * Description : slack.ts - 📌 Slack 제공자 포트(웹훅/API/하이브리드/n8n) 인터페이스
 * Author : Shiwoo Min
 * Date : 2025-09-10
 **/
/**
 * @description Slack 제공자 포트(공통)
 */
export interface SlackProvider {
  /** @description 제공자 이름 */
  name: string;

  /** @description 일반 메시지 전송(채널/사용자 지정 가능) */
  sendMessage(request: SlackMessageRequest): Promise<SlackMessageResult>;

  /** @description DM 전송 */
  sendDirectMessage(userId: string, message: string): Promise<SlackMessageResult>;

  /** @description 채널 메시지 전송 */
  sendChannelMessage(channelId: string, message: string): Promise<SlackMessageResult>;

  /** @description 에페메럴(임시) 메시지 전송 */
  sendEphemeralMessage(channelId: string, userId: string, message: string): Promise<SlackMessageResult>;

  /** @description 메시지 업데이트 */
  updateMessage(channelId: string, timestamp: string, newMessage: string): Promise<SlackMessageResult>;

  /** @description 메시지 삭제 */
  deleteMessage(channelId: string, timestamp: string): Promise<boolean>;

  /** @description 파일 업로드 */
  uploadFile(request: SlackFileUploadRequest): Promise<SlackFileResult>;

  /** @description 사용자/채널 정보 */
  getUserInfo(userId: string): Promise<SlackUser | null>;
  getChannelInfo(channelId: string): Promise<SlackChannel | null>;
  getUserByEmail(email: string): Promise<SlackUser | null>;

  /** @description 채널 관리 */
  listChannels(): Promise<SlackChannel[]>;
  createChannel(name: string, isPrivate?: boolean): Promise<SlackChannel>;
  inviteToChannel(channelId: string, userIds: string[]): Promise<boolean>;

  /** @description 연결 테스트 */
  testConnection(): Promise<boolean>;

  /** @description 현재 상태 */
  isAvailable(): boolean;
  getStatus(): Promise<SlackProviderStatus>;
}

/**
 * @description Slack 메시지 요청
 */
export interface SlackMessageRequest {
  channel?: string;
  user?: string;
  text: string;
  blocks?: SlackBlock[];
  attachments?: SlackAttachment[];
  threadTs?: string;
  replyBroadcast?: boolean;
  linkNames?: boolean;
  parse?: 'full' | 'none';
  unfurlLinks?: boolean;
  unfurlMedia?: boolean;
  iconEmoji?: string;
  iconUrl?: string;
  username?: string;
}

/**
 * @description Slack Block Kit 블록
 */
export interface SlackBlock {
  type: string;
  text?: {
    type: 'plain_text' | 'mrkdwn';
    text: string;
    emoji?: boolean;
  };
  elements?: unknown[];
  accessory?: unknown;
  fields?: Array<{
    type: 'plain_text' | 'mrkdwn';
    text: string;
  }>;
}

/**
 * @description Slack 첨부(legacy attachments)
 */
export interface SlackAttachment {
  color?: 'good' | 'warning' | 'danger' | string;
  pretext?: string;
  authorName?: string;
  authorLink?: string;
  authorIcon?: string;
  title?: string;
  titleLink?: string;
  text?: string;
  fields?: SlackField[];
  imageUrl?: string;
  thumbUrl?: string;
  footer?: string;
  footerIcon?: string;
  ts?: number;
}

/**
 * @description Slack 첨부 필드
 */
export interface SlackField {
  title: string;
  value: string;
  short?: boolean;
}

/**
 * @description Slack 메시지 전송 결과
 */
export interface SlackMessageResult {
  success: boolean;
  ts?: string;
  channel?: string;
  error?: string;
  message?: {
    type: string;
    subtype?: string;
    text: string;
    ts: string;
    user: string;
    team: string;
  };
}

/**
 * @description Slack 파일 업로드 요청
 */
export interface SlackFileUploadRequest {
  channels: string;
  content?: Buffer;
  file?: string;
  filename?: string;
  filetype?: string;
  initialComment?: string;
  title?: string;
  threadTs?: string;
}

/**
 * @description Slack 파일 업로드 결과
 */
export interface SlackFileResult {
  success: boolean;
  file?: {
    id: string;
    name: string;
    title: string;
    mimetype: string;
    filetype: string;
    size: number;
    url_private: string;
    url_private_download: string;
    permalink: string;
    permalink_public?: string;
  };
  error?: string;
}

/**
 * @description Slack 사용자
 */
export interface SlackUser {
  id: string;
  teamId?: string;
  name: string;
  deleted?: boolean;
  color?: string;
  realName?: string;
  tz?: string;
  tzLabel?: string;
  tzOffset?: number;
  profile?: {
    displayName?: string;
    realName?: string;
    email?: string;
    image24?: string;
    image32?: string;
    image48?: string;
    image72?: string;
    image192?: string;
    image512?: string;
    statusText?: string;
    statusEmoji?: string;
    title?: string;
    phone?: string;
  };
  isAdmin?: boolean;
  isOwner?: boolean;
  isPrimaryOwner?: boolean;
  isRestricted?: boolean;
  isUltraRestricted?: boolean;
  isBot?: boolean;
  isAppUser?: boolean;
  updated?: number;
}

/**
 * @description Slack 채널
 */
export interface SlackChannel {
  id: string;
  name: string;
  isChannel?: boolean;
  isGroup?: boolean;
  isIm?: boolean;
  isMpim?: boolean;
  isPrivate?: boolean;
  isArchived?: boolean;
  isGeneral?: boolean;
  unlinked?: number;
  nameNormalized?: string;
  isShared?: boolean;
  isExtShared?: boolean;
  isOrgShared?: boolean;
  pendingShared?: string[];
  contextTeamId?: string;
  updated?: number;
  creator?: string;
  isReadOnly?: boolean;
  isThreadOnly?: boolean;
  isNonThreadable?: boolean;
  topic?: { value: string; creator: string; lastSet: number };
  purpose?: { value: string; creator: string; lastSet: number };
  members?: string[];
  numMembers?: number;
}

/**
 * @description Slack 제공자 상태
 */
export interface SlackProviderStatus {
  name: string;
  isHealthy: boolean;
  lastChecked: string;
  teamInfo?: {
    id: string;
    name: string;
    domain: string;
    url: string;
  };
  botInfo?: {
    id: string;
    name: string;
    isActive: boolean;
  };
  rateLimits?: {
    tier: string;
    callsPerMinute: number;
    remaining: number;
    resetTime?: string;
  };
}

/**
 * @description Slack Webhook 제공자
 */
export interface SlackWebhookProvider extends SlackProvider {
  /** @description 고정 'webhook' */
  name: 'webhook';

  /**
   * @description 특정 웹훅 URL로 메시지를 전송한다.
   * @param {string} webhookUrl 웹훅 URL
   * @param {SlackWebhookMessage} message 메시지
   * @returns {Promise<SlackMessageResult>}
   */
  sendWebhookMessage(webhookUrl: string, message: SlackWebhookMessage): Promise<SlackMessageResult>;

  /** @description 이름-URL 매핑 등록 */
  registerWebhook(name: string, url: string): void;

  /**
   * @description 등록된 웹훅 이름으로 전송
   * @param {string} webhookName 웹훅 이름
   * @param {SlackWebhookMessage} message 메시지
   * @returns {Promise<SlackMessageResult>}
   */
  sendToWebhook(webhookName: string, message: SlackWebhookMessage): Promise<SlackMessageResult>;
}

/**
 * @description Slack 웹훅 메시지
 */
export interface SlackWebhookMessage {
  text: string;
  channel?: string;
  username?: string;
  iconEmoji?: string;
  iconUrl?: string;
  attachments?: SlackAttachment[];
  blocks?: SlackBlock[];
}

/**
 * @description Slack API 제공자
 */
export interface SlackAPIProvider extends SlackProvider {
  /** @description 고정 'api' */
  name: 'api';

  /** @description 대화 히스토리 조회 */
  getConversationHistory(
    channelId: string,
    options?: ConversationHistoryOptions,
  ): Promise<SlackMessage[]>;

  /** @description 리액션 추가/삭제 */
  addReaction(channelId: string, timestamp: string, reaction: string): Promise<boolean>;
  removeReaction(channelId: string, timestamp: string, reaction: string): Promise<boolean>;

  /** @description 사용자 상태/프레즌스 */
  setUserStatus(status: string, emoji?: string): Promise<boolean>;
  setUserPresence(presence: 'auto' | 'away'): Promise<boolean>;

  /** @description 앱 정보 */
  getAppInfo(): Promise<SlackAppInfo>;

  /** @description 워크플로우 트리거 */
  triggerWorkflow(workflowId: string, inputs?: Record<string, unknown>): Promise<boolean>;
}

/**
 * @description 대화 히스토리 옵션
 */
export interface ConversationHistoryOptions {
  cursor?: string;
  latest?: string;
  oldest?: string;
  inclusive?: boolean;
  limit?: number;
}

/**
 * @description Slack 메시지(히스토리)
 */
export interface SlackMessage {
  type: string;
  subtype?: string;
  text: string;
  user: string;
  ts: string;
  threadTs?: string;
  replyCount?: number;
  replies?: Array<{ user: string; ts: string }>;
  subscribed?: boolean;
  reactions?: Array<{ name: string; users: string[]; count: number }>;
}

/**
 * @description Slack 앱 정보
 */
export interface SlackAppInfo {
  id: string;
  name: string;
  description?: string;
  helpUrl?: string;
  privacyPolicyUrl?: string;
  appHomepageUrl?: string;
  appDirectory?: { approved?: boolean; listed?: boolean };
  botUser?: { id: string; deleted: boolean; name: string; appId: string };
}

/**
 * @description Slack 제공자 팩토리
 */
export interface SlackProviderFactory {
  createWebhookProvider(webhookUrl: string): SlackWebhookProvider;
  createAPIProvider(token: string): SlackAPIProvider;

  /** @description 환경변수 기반 기본 제공자 생성 */
  createFromEnvironment(): SlackProvider;

  /** @description API + 웹훅 하이브리드 제공자 */
  createHybridProvider(token: string, webhookUrl?: string): SlackProvider;
}

/**
 * @description n8n 연동 Slack 제공자
 */
export interface N8nSlackProvider extends SlackProvider {
  /** @description 고정 'n8n' */
  name: 'n8n';

  /** @description n8n 워크플로우 트리거 */
  triggerN8nWorkflow(webhookUrl: string, payload: N8nWorkflowPayload): Promise<N8nWorkflowResult>;

  /** @description 이벤트 알림 전송 */
  sendEventNotification(event: SlackEventNotification): Promise<SlackMessageResult>;

  /** @description 자동화 규칙 등록/처리 */
  registerAutomationRule(rule: SlackAutomationRule): void;
  processAutomationRules(event: unknown): Promise<void>;
}

/**
 * @description n8n 워크플로우 페이로드
 */
export interface N8nWorkflowPayload {
  event_type: string;
  entity_type: string;
  entity_id: string;
  data: Record<string, unknown>;
  timestamp: string;
  source: 'connectwon';
}

/**
 * @description n8n 워크플로우 실행 결과
 */
export interface N8nWorkflowResult {
  success: boolean;
  workflowId?: string;
  executionId?: string;
  error?: string;
}

/**
 * @description Slack 이벤트 알림 페이로드
 */
export interface SlackEventNotification {
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  channel?: string;
  data?: Record<string, unknown>;
  actions?: SlackAction[];
}

/**
 * @description Slack 액션 정의
 */
export interface SlackAction {
  type: 'button' | 'select' | 'datepicker';
  text: string;
  value: string;
  url?: string;
  style?: 'primary' | 'danger';
}

/**
 * @description Slack 자동화 규칙
 */
export interface SlackAutomationRule {
  id: string;
  name: string;
  trigger: {
    event: string;
    conditions?: Record<string, unknown>;
  };
  action: {
    type: 'send_message' | 'trigger_workflow' | 'create_channel';
    config: Record<string, unknown>;
  };
  isActive: boolean;
}
