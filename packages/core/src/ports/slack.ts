/**
 * Description : slack.ts - 📌 Slack 제공자 포트 인터페이스
 * Author : Shiwoo Min
 * Date : 2025-09-10
 **/

// Slack 제공자 포트 인터페이스
export interface SlackProvider {
  // 제공자 정보
  name: string;

  // 메시지 전송
  sendMessage(request: SlackMessageRequest): Promise<SlackMessageResult>;
  sendDirectMessage(userId: string, message: string): Promise<SlackMessageResult>;
  sendChannelMessage(channelId: string, message: string): Promise<SlackMessageResult>;

  // 임시 메시지
  sendEphemeralMessage(
    channelId: string,
    userId: string,
    message: string,
  ): Promise<SlackMessageResult>;

  // 메시지 관리
  updateMessage(
    channelId: string,
    timestamp: string,
    newMessage: string,
  ): Promise<SlackMessageResult>;
  deleteMessage(channelId: string, timestamp: string): Promise<boolean>;

  // 파일 업로드
  uploadFile(request: SlackFileUploadRequest): Promise<SlackFileResult>;

  // 사용자 및 채널 정보
  getUserInfo(userId: string): Promise<SlackUser | null>;
  getChannelInfo(channelId: string): Promise<SlackChannel | null>;
  getUserByEmail(email: string): Promise<SlackUser | null>;

  // 채널 관리
  listChannels(): Promise<SlackChannel[]>;
  createChannel(name: string, isPrivate?: boolean): Promise<SlackChannel>;
  inviteToChannel(channelId: string, userIds: string[]): Promise<boolean>;

  // 연결 테스트
  testConnection(): Promise<boolean>;

  // 제공자 상태
  isAvailable(): boolean;
  getStatus(): Promise<SlackProviderStatus>;
}

// Slack 메시지 요청 인터페이스
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

// Slack 블록 인터페이스
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

// Slack 첨부파일 인터페이스
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

// Slack 첨부파일 필드 인터페이스
export interface SlackField {
  title: string;
  value: string;
  short?: boolean;
}

// Slack 메시지 결과 인터페이스
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

// Slack 파일 업로드 요청 인터페이스
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

// Slack 파일 결과 인터페이스
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

// Slack 사용자 정보 인터페이스
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

// Slack 채널 정보 인터페이스
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
  topic?: {
    value: string;
    creator: string;
    lastSet: number;
  };
  purpose?: {
    value: string;
    creator: string;
    lastSet: number;
  };
  members?: string[];
  numMembers?: number;
}

// Slack 제공자 상태 인터페이스
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

// Slack 웹훅 제공자 인터페이스
export interface SlackWebhookProvider extends SlackProvider {
  name: 'webhook';

  // 웹훅 특화 메서드
  sendWebhookMessage(webhookUrl: string, message: SlackWebhookMessage): Promise<SlackMessageResult>;

  // 다중 웹훅 지원
  registerWebhook(name: string, url: string): void;
  sendToWebhook(webhookName: string, message: SlackWebhookMessage): Promise<SlackMessageResult>;
}

// Slack 웹훅 메시지 인터페이스
export interface SlackWebhookMessage {
  text: string;
  channel?: string;
  username?: string;
  iconEmoji?: string;
  iconUrl?: string;
  attachments?: SlackAttachment[];
  blocks?: SlackBlock[];
}

// Slack API 제공자 인터페이스
export interface SlackAPIProvider extends SlackProvider {
  name: 'api';

  // 고급 API 기능
  getConversationHistory(
    channelId: string,
    options?: ConversationHistoryOptions,
  ): Promise<SlackMessage[]>;
  addReaction(channelId: string, timestamp: string, reaction: string): Promise<boolean>;
  removeReaction(channelId: string, timestamp: string, reaction: string): Promise<boolean>;

  // 사용자 상태 관리
  setUserStatus(status: string, emoji?: string): Promise<boolean>;
  setUserPresence(presence: 'auto' | 'away'): Promise<boolean>;

  // 앱 관리
  getAppInfo(): Promise<SlackAppInfo>;

  // 워크플로우 트리거
  triggerWorkflow(workflowId: string, inputs?: Record<string, unknown>): Promise<boolean>;
}

// Slack 대화 기록 옵션 인터페이스
export interface ConversationHistoryOptions {
  cursor?: string;
  latest?: string;
  oldest?: string;
  inclusive?: boolean;
  limit?: number;
}

// Slack 메시지 인터페이스
export interface SlackMessage {
  type: string;
  subtype?: string;
  text: string;
  user: string;
  ts: string;
  threadTs?: string;
  replyCount?: number;
  replies?: Array<{
    user: string;
    ts: string;
  }>;
  subscribed?: boolean;
  reactions?: Array<{
    name: string;
    users: string[];
    count: number;
  }>;
}

// Slack 앱 정보 인터페이스
export interface SlackAppInfo {
  id: string;
  name: string;
  description?: string;
  helpUrl?: string;
  privacyPolicyUrl?: string;
  appHomepageUrl?: string;
  appDirectory?: {
    approved?: boolean;
    listed?: boolean;
  };
  botUser?: {
    id: string;
    deleted: boolean;
    name: string;
    appId: string;
  };
}

// Slack 제공자 팩토리 인터페이스
export interface SlackProviderFactory {
  createWebhookProvider(webhookUrl: string): SlackWebhookProvider;
  createAPIProvider(token: string): SlackAPIProvider;

  // 환경변수 기반 생성
  createFromEnvironment(): SlackProvider;

  // 하이브리드 제공자 (API + 웹훅)
  createHybridProvider(token: string, webhookUrl?: string): SlackProvider;
}

// n8n 연동 특화 인터페이스
export interface N8nSlackProvider extends SlackProvider {
  name: 'n8n';

  // n8n 워크플로우 트리거
  triggerN8nWorkflow(webhookUrl: string, payload: N8nWorkflowPayload): Promise<N8nWorkflowResult>;

  // 이벤트 기반 알림
  sendEventNotification(event: SlackEventNotification): Promise<SlackMessageResult>;

  // 자동화 규칙
  registerAutomationRule(rule: SlackAutomationRule): void;
  processAutomationRules(event: unknown): Promise<void>;
}

// n8n 워크플로우 페이로드 인터페이스
export interface N8nWorkflowPayload {
  event_type: string;
  entity_type: string;
  entity_id: string;
  data: Record<string, unknown>;
  timestamp: string;
  source: 'connectwon';
}

// n8n 워크플로우 결과 인터페이스
export interface N8nWorkflowResult {
  success: boolean;
  workflowId?: string;
  executionId?: string;
  error?: string;
}

// Slack 이벤트 알림 인터페이스
export interface SlackEventNotification {
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  channel?: string;
  data?: Record<string, unknown>;
  actions?: SlackAction[];
}

// Slack 액션 인터페이스
export interface SlackAction {
  type: 'button' | 'select' | 'datepicker';
  text: string;
  value: string;
  url?: string;
  style?: 'primary' | 'danger';
}

// Slack 자동화 규칙 인터페이스
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
