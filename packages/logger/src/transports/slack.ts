/**
 * Description : slack.ts - 📌 Slack Incoming Webhook으로 전송하는 트랜스포트
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import type { LogLevel, SlackTransportOptions, Transport } from '../../logger-types.js';
import { levelWeight } from '../../logger-types.js';

// Slack 전송 트랜스포트
export function SlackTransport(opts: SlackTransportOptions): Transport {
  const min = levelWeight(opts.level ?? 'error'); // Slack은 보통 에러 이상만
  const fetchFn = opts.fetchImpl ?? fetch;
  return {
    async log(rec) {
      if (levelWeight(rec.level as LogLevel) < min) return;
      const lines = [
        `*${String(rec.level).toUpperCase()}* ${rec.msg ?? rec.message ?? ''}`,
        rec.service ? `• service: \`${rec.service}\`` : '',
        rec.error?.message ? `• error: \`${rec.error.message}\`` : '',
      ]
        .filter(Boolean)
        .join('\n');
      try {
        const res = await fetchFn(opts.webhookUrl, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            text: lines,
            ...(opts.username ? { username: opts.username } : {}),
            ...(opts.iconEmoji ? { icon_emoji: opts.iconEmoji } : {}),
            ...(opts.channel ? { channel: opts.channel } : {}),
          }),
        });
        if (!res.ok) {
          console.error('Failed to send Slack webhook:', res.status);
        }
      } catch (error) {
        console.error('Error sending Slack webhook:', error);
      }
    },
    async flush() {
      /* noop */
    },
  };
}
