/**
 * Description : notification.ts - 📌 알림 처리기
 * Author : Shiwoo Min
 * Date : 2025-09-12
 */
import type { Job } from 'bullmq';

// 알림 데이터 타입
export type NotificationJobData = {
  channel: 'email' | 'slack' | 'sms';
  to: string;
  template?: string;
  payload?: Record<string, unknown>;
};

// 알림 처리기
async function notificationProcessor(job: Job<NotificationJobData>) {
  const { channel, to, template } = job.data;

  console.log(`[worker][notification] ${channel} → ${to} template=${template ?? 'raw'}`);

  // TODO: 채널별 어댑터 호출
  // switch (channel) { ... }

  return { delivered: true, channel, to };
}
export { notificationProcessor };
