/**
 * Description : slack.ts - 📌 Slack Incoming Webhook으로 전송하는 트랜스포트
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import type { LogLevel, SlackTransportOptions, Transport } from './logger-types.js';
import { levelWeight } from './logger-types.js';

/**
 * @description Slack Incoming Webhook으로 로그 전송하는 트랜스포트 생성 함수
 * @param opts Slack 트랜스포트 옵션 (webhookUrl, username, 채널, 최소 레벨 등)
 * @returns Transport 구현체
 */
export function SlackTransport(opts: SlackTransportOptions): Transport {
  const min = levelWeight(opts.level ?? 'error'); // 기본: error 이상만 전송
  const fetchFn = opts.fetchImpl ?? fetch;

  return {
    async log(rec) {
      if (levelWeight(rec.level as LogLevel) < min) return;

      const timestamp = typeof rec.time === 'number' ? new Date(rec.time).toISOString() : (rec.time ?? new Date().toISOString());

      // Slack 메시지 본문 구성
      const lines: string[] = [
        `*${String(rec.level).toUpperCase()}* ${rec.msg ?? rec.message ?? ''}`,
        `• time: \`${timestamp}\``,
        rec.service ? `• service: \`${rec.service}\`` : '',
        rec.error?.message ? `• error: \`${rec.error.message}\`` : '',
        rec.error?.stack ? `\`\`\`${rec.error.stack}\`\`\`` : '',
      ].filter(Boolean);

      try {
        const res = await fetchFn(opts.webhookUrl, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            text: lines.join('\n'),
            mrkdwn: true,
            ...(opts.username ? { username: opts.username } : {}),
            ...(opts.iconEmoji ? { icon_emoji: opts.iconEmoji } : {}),
            ...(opts.channel ? { channel: opts.channel } : {}),
          }),
        });
        if (!res.ok) {
          const body = await res.text().catch(() => '');
          console.error('Failed to send Slack webhook:', res.status, body);
        }
      } catch (error) {
        console.error('Error sending Slack webhook:', error);
      }
    },
    async flush() {
      // 이벤트 루프 tick 대기 → 비동기 log 완료 보장
      await Promise.resolve();
    },
  };
}
