/**
 * Description : notification.ts - 📌 알림 처리기
 * Author : Shiwoo Min
 * Date : 2025-09-23
 */
import { prisma } from '@connectwon/database';
import { logger } from '@connectwon/logger';

import { recordJobStart } from '../metrics.js';
import type { Job } from 'bullmq';

import { recordJobStart } from '../metrics.js';
import type { Job } from 'bullmq';

/**
 * @description 알림 작업 데이터 타입
 */
export type NotificationJobData = {
  userId: string;
  type: 'email' | 'sms' | 'push' | 'slack';
  template: string;
  subject?: string;
  data?: Record<string, unknown>;
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  scheduledAt?: Date;
  meta?: Record<string, unknown>;
};

/**
 * @description 알림 처리 결과 타입
 */
export type NotificationJobResult = {
  ok: boolean;
  userId: string;
  type: string;
  messageId?: string;
  status: 'sent' | 'failed' | 'scheduled';
  message?: string;
  retryAfter?: number;
};

/**
 * @description 이메일 발송 처리
 * @param userId - 사용자 ID
 * @param template - 템플릿명
 * @param subject - 이메일 제목
 * @param data - 템플릿 데이터
 */
async function handleEmailNotification(
  userId: string,
  template: string,
  subject: string = '',
  data: Record<string, unknown> = {},
): Promise<NotificationJobResult> {
  logger.info('이메일 발송 처리 시작', { userId, template, subject });

  try {
    // 1. 사용자 정보 조회
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, name: true, preferences: true },
    });

    if (!user || !user.email) {
      throw new Error(`사용자 이메일을 찾을 수 없음: ${userId}`);
    }

    // 2. 사용자 알림 설정 확인
    const preferences = user.preferences as any;
    if (preferences?.notifications?.email === false) {
      logger.info('사용자가 이메일 알림을 비활성화함', { userId });
      return {
        ok: true,
        userId,
        type: 'email',
        status: 'sent',
        message: '사용자 알림 설정으로 인해 발송 생략',
      };
    }

    // 3. 템플릿 렌더링
    const emailContent = await renderEmailTemplate(template, {
      ...data,
      userName: user.name,
      userEmail: user.email,
    });

    // 4. 이메일 발송 (실제 구현 필요)
    const messageId = await sendEmail({
      to: user.email,
      subject: subject || emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    });

    // 5. 발송 기록 저장
    await prisma.notificationLog.create({
      data: {
        userId,
        type: 'email',
        template,
        recipient: user.email,
        subject: subject || emailContent.subject,
        status: 'sent',
        messageId,
        sentAt: new Date(),
      },
    });

    return {
      ok: true,
      userId,
      type: 'email',
      messageId,
      status: 'sent',
      message: '이메일 발송 완료',
    };
  } catch (error) {
    logger.error('이메일 발송 실패', {
      userId,
      template,
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}

/**
 * @description SMS 발송 처리
 * @param userId - 사용자 ID
 * @param template - 템플릿명
 * @param data - 템플릿 데이터
 */
async function handleSmsNotification(userId: string, template: string, data: Record<string, unknown> = {}): Promise<NotificationJobResult> {
  logger.info('SMS 발송 처리 시작', { userId, template });

  try {
    // 1. 사용자 정보 조회
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { phone: true, name: true, preferences: true },
    });

    if (!user || !user.phone) {
      throw new Error(`사용자 전화번호를 찾을 수 없음: ${userId}`);
    }

    // 2. 알림 설정 확인
    const preferences = user.preferences as any;
    if (preferences?.notifications?.sms === false) {
      logger.info('사용자가 SMS 알림을 비활성화함', { userId });
      return {
        ok: true,
        userId,
        type: 'sms',
        status: 'sent',
        message: '사용자 알림 설정으로 인해 발송 생략',
      };
    }

    // 3. SMS 텍스트 렌더링
    const smsContent = await renderSmsTemplate(template, {
      ...data,
      userName: user.name,
    });

    // 4. SMS 발송 (실제 구현 필요)
    const messageId = await sendSms({
      to: user.phone,
      message: smsContent.text,
    });

    // 5. 발송 기록 저장
    await prisma.notificationLog.create({
      data: {
        userId,
        type: 'sms',
        template,
        recipient: user.phone,
        content: smsContent.text,
        status: 'sent',
        messageId,
        sentAt: new Date(),
      },
    });

    return {
      ok: true,
      userId,
      type: 'sms',
      messageId,
      status: 'sent',
      message: 'SMS 발송 완료',
    };
  } catch (error) {
    logger.error('SMS 발송 실패', {
      userId,
      template,
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}

/**
 * @description 푸시 알림 발송 처리
 * @param userId - 사용자 ID
 * @param template - 템플릿명
 * @param data - 템플릿 데이터
 */
async function handlePushNotification(userId: string, template: string, data: Record<string, unknown> = {}): Promise<NotificationJobResult> {
  logger.info('푸시 알림 발송 처리 시작', { userId, template });

  try {
    // 1. 사용자 디바이스 토큰 조회
    const userDevices = await prisma.userDevice.findMany({
      where: {
        userId,
        isActive: true,
        pushToken: { not: null },
      },
    });

    if (userDevices.length === 0) {
      throw new Error(`활성 디바이스를 찾을 수 없음: ${userId}`);
    }

    // 2. 푸시 메시지 렌더링
    const pushContent = await renderPushTemplate(template, data);

    // 3. 각 디바이스에 푸시 발송
    const sendPromises = userDevices.map(async device => {
      return await sendPushNotification({
        token: device.pushToken!,
        title: pushContent.title,
        body: pushContent.body,
        data: pushContent.data,
      });
    });

    const results = await Promise.allSettled(sendPromises);
    const successCount = results.filter(r => r.status === 'fulfilled').length;

    // 4. 발송 기록 저장
    await prisma.notificationLog.create({
      data: {
        userId,
        type: 'push',
        template,
        recipient: `${userDevices.length}개 디바이스`,
        subject: pushContent.title,
        content: pushContent.body,
        status: successCount > 0 ? 'sent' : 'failed',
        sentAt: new Date(),
      },
    });

    return {
      ok: successCount > 0,
      userId,
      type: 'push',
      status: successCount > 0 ? 'sent' : 'failed',
      message: `${successCount}/${userDevices.length}개 디바이스에 발송 완료`,
    };
  } catch (error) {
    logger.error('푸시 알림 발송 실패', {
      userId,
      template,
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}

/**
 * @description Slack 알림 발송 처리
 * @param userId - 사용자 ID
 * @param template - 템플릿명
 * @param data - 템플릿 데이터
 */
async function handleSlackNotification(userId: string, template: string, data: Record<string, unknown> = {}): Promise<NotificationJobResult> {
  logger.info('Slack 알림 발송 처리 시작', { userId, template });

  try {
    // 1. 사용자 Slack 정보 조회
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { slackUserId: true, name: true },
    });

    if (!user || !user.slackUserId) {
      throw new Error(`Slack 사용자 정보를 찾을 수 없음: ${userId}`);
    }

    // 2. Slack 메시지 렌더링
    const slackContent = await renderSlackTemplate(template, {
      ...data,
      userName: user.name,
    });

    // 3. Slack 메시지 발송
    const messageId = await sendSlackMessage({
      channel: user.slackUserId,
      text: slackContent.text,
      blocks: slackContent.blocks,
    });

    // 4. 발송 기록 저장
    await prisma.notificationLog.create({
      data: {
        userId,
        type: 'slack',
        template,
        recipient: user.slackUserId,
        content: slackContent.text,
        status: 'sent',
        messageId,
        sentAt: new Date(),
      },
    });

    return {
      ok: true,
      userId,
      type: 'slack',
      messageId,
      status: 'sent',
      message: 'Slack 메시지 발송 완료',
    };
  } catch (error) {
    logger.error('Slack 알림 발송 실패', {
      userId,
      template,
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}

/**
 * @description 알림 처리기 메인 함수
 * @param job - BullMQ Job 인스턴스
 * @returns 처리 결과
 */
export async function notificationProcessor(job: Job<NotificationJobData>): Promise<NotificationJobResult> {
  const { userId, type, template, subject, data = {}, priority = 'normal' } = job.data;

  // 메트릭 기록 시작
  const finishJobMetrics = recordJobStart('notification', `worker-${process.pid}`);

  logger.info('알림 작업 처리 시작', {
    jobId: job.id,
    userId,
    type,
    template,
    priority,
    attempt: job.attemptsMade + 1,
  });

  try {
    let result: NotificationJobResult;

    // 알림 타입별 처리 분기
    switch (type) {
      case 'email':
        result = await handleEmailNotification(userId, template, subject, data);
        break;

      case 'sms':
        result = await handleSmsNotification(userId, template, data);
        break;

      case 'push':
        result = await handlePushNotification(userId, template, data);
        break;

      case 'slack':
        result = await handleSlackNotification(userId, template, data);
        break;

      default:
        throw new Error(`지원하지 않는 알림 타입: ${type}`);
    }

    // 성공 메트릭 기록
    finishJobMetrics('completed');

    logger.info('알림 작업 완료', {
      jobId: job.id,
      userId,
      type,
      status: result.status,
      message: result.message,
    });

    return result;
  } catch (error) {
    // 실패 메트릭 기록
    const errorType = error instanceof Error ? error.constructor.name : 'UnknownError';
    finishJobMetrics('failed', errorType);

    logger.error('알림 작업 실패', {
      jobId: job.id,
      userId,
      type,
      template,
      attempt: job.attemptsMade + 1,
      error: error instanceof Error ? error.message : String(error),
    });

    // BullMQ 재시도를 위해 에러 재발생
    throw error;
  }
}

/**
 * @description 이메일 템플릿 렌더링 (구현 필요)
 * @param template - 템플릿명
 * @param data - 템플릿 데이터
 * @returns 렌더링된 이메일 콘텐츠
 */
async function renderEmailTemplate(template: string, data: Record<string, unknown>) {
  // TODO: 실제 템플릿 엔진 구현 (Handlebars, EJS 등)
  return {
    subject: `ConnectWon 알림 - ${template}`,
    html: `<h1>안녕하세요 ${data.userName}님</h1><p>알림 내용입니다.</p>`,
    text: `안녕하세요 ${data.userName}님\n알림 내용입니다.`,
  };
}

/**
 * @description SMS 템플릿 렌더링 (구현 필요)
 * @param template - 템플릿명
 * @param data - 템플릿 데이터
 */
async function renderSmsTemplate(template: string, data: Record<string, unknown>) {
  // TODO: SMS 템플릿 구현
  return {
    text: `[ConnectWon] ${data.userName}님, 알림이 있습니다.`,
  };
}

/**
 * @description 푸시 알림 템플릿 렌더링 (구현 필요)
 * @param template - 템플릿명
 * @param data - 템플릿 데이터
 */
async function renderPushTemplate(template: string, data: Record<string, unknown>) {
  // TODO: 푸시 알림 템플릿 구현
  return {
    title: 'ConnectWon 알림',
    body: `${data.userName}님, 새로운 알림이 있습니다.`,
    data: data,
  };
}

/**
 * @description Slack 템플릿 렌더링 (구현 필요)
 * @param template - 템플릿명
 * @param data - 템플릿 데이터
 */
async function renderSlackTemplate(template: string, data: Record<string, unknown>) {
  // TODO: Slack 메시지 템플릿 구현
  return {
    text: `안녕하세요 ${data.userName}님, ConnectWon 알림입니다.`,
    blocks: [],
  };
}

/**
 * @description 이메일 발송 (구현 필요)
 */
async function sendEmail(options: { to: string; subject: string; html: string; text: string }) {
  // TODO: 실제 이메일 발송 구현 (nodemailer 등)
  logger.info('이메일 발송', options);
  return `email-${Date.now()}`;
}

/**
 * @description SMS 발송 (구현 필요)
 */
async function sendSms(options: { to: string; message: string }) {
  // TODO: 실제 SMS 발송 구현
  logger.info('SMS 발송', options);
  return `sms-${Date.now()}`;
}

/**
 * @description 푸시 알림 발송 (구현 필요)
 */
async function sendPushNotification(options: { token: string; title: string; body: string; data?: any }) {
  // TODO: 실제 푸시 알림 발송 구현 (FCM 등)
  logger.info('푸시 알림 발송', options);
  return `push-${Date.now()}`;
}

/**
 * @description Slack 메시지 발송 (구현 필요)
 */
async function sendSlackMessage(options: { channel: string; text: string; blocks?: any[] }) {
  // TODO: 실제 Slack API 구현
  logger.info('Slack 메시지 발송', options);
  return `slack-${Date.now()}`;
}

/**
 * @description 알림 처리기 헬스체크
 * @returns 처리기 상태
 */
export function getNotificationProcessorHealth(): { healthy: boolean; message: string } {
  try {
    return {
      healthy: true,
      message: '알림 처리기가 정상 작동 중입니다',
    };
  } catch (error) {
    return {
      healthy: false,
      message: error instanceof Error ? error.message : '알 수 없는 오류',
    };
  }
}
