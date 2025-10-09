/**
 * Description: notification.generator.ts - 📌 알림 데이터 생성기
 * Author: Shiwoo Min
 * Date: 2025-10-09
 */
import { faker } from '@faker-js/faker/locale/ko';
import type {
  Notification,
  NotificationType,
  NotificationCategory,
  NotificationPriority,
} from '../../mock-types.js';

// 알림 생성
export function generateNotification(
  override: Partial<Notification> = {}
): Notification {
  const type: NotificationType = faker.helpers.arrayElement([
    'reservation',
    'program',
    'payment',
    'equipment',
    'membership',
    'system',
    'marketing',
    'mentoring',
    'community',
    'slack',
  ]);

  const baseData = getNotificationDataByType(type);
  const isRead = faker.datatype.boolean({ probability: 0.3 });
  const hasImage = Math.random() > 0.7;
  const hasExpiry = Math.random() > 0.5;

  return {
    id: faker.string.uuid(),
    userId: faker.number.int({ min: 1, max: 999 }),
    type,
    category: baseData.category,
    title: baseData.title,
    message: baseData.message,
    ...(baseData.data && { data: baseData.data }),
    isRead,
    ...(isRead && { readAt: faker.date.recent().toISOString() }),
    priority: baseData.priority,
    ...(baseData.actionUrl && { actionUrl: baseData.actionUrl }),
    ...(baseData.actionLabel && { actionLabel: baseData.actionLabel }),
    ...(hasImage && { imageUrl: faker.image.urlPicsumPhotos() }),
    ...(hasExpiry && { expiresAt: faker.date.future({ years: 0.1 }).toISOString() }),
    createdAt: faker.date.recent().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    ...override,
  };
}

// 타입별 기본 데이터
function getNotificationDataByType(type: NotificationType) {
  const map: Record<NotificationType, any> = {
    reservation: {
      category: 'reminder' as NotificationCategory,
      title: '예약 알림',
      message: '예약하신 회의실 이용 시간이 곧 시작됩니다.',
      data: {
        entityType: 'reservation',
        entityId: faker.number.int({ min: 1, max: 999 }),
        actionRequired: true,
        metadata: { room: '회의실 A', time: '14:00' },
      },
      priority: 'normal' as NotificationPriority,
      actionUrl: '/reservations',
      actionLabel: '예약 보기',
    },
    program: {
      category: 'info' as NotificationCategory,
      title: '프로그램 안내',
      message: '신규 프로그램이 개설되었습니다.',
      data: {
        entityType: 'program',
        entityId: faker.number.int({ min: 1, max: 999 }),
        actionRequired: false,
        metadata: { programName: 'AI 코딩 부트캠프' },
      },
      priority: 'normal' as NotificationPriority,
      actionUrl: '/programs',
      actionLabel: '자세히 보기',
    },
    payment: {
      category: 'success' as NotificationCategory,
      title: '결제 완료',
      message: '멤버십 결제가 완료되었습니다.',
      data: {
        entityType: 'payment',
        entityId: faker.number.int({ min: 1, max: 999 }),
        actionRequired: false,
        metadata: { amount: 49000, method: '카드' },
      },
      priority: 'high' as NotificationPriority,
      actionUrl: '/payments',
      actionLabel: '결제 내역',
    },
    equipment: {
      category: 'reminder' as NotificationCategory,
      title: '장비 반납 안내',
      message: '대여하신 장비 반납 기한이 내일입니다.',
      data: {
        entityType: 'equipment',
        entityId: faker.number.int({ min: 1, max: 999 }),
        actionRequired: true,
        metadata: { item: 'MacBook Pro', dueDate: faker.date.soon().toISOString() },
      },
      priority: 'normal' as NotificationPriority,
      actionUrl: '/equipment/rentals',
      actionLabel: '내 대여 보기',
    },
    membership: {
      category: 'warning' as NotificationCategory,
      title: '멤버십 갱신 안내',
      message: 'Pro 멤버십이 3일 후 자동 갱신됩니다.',
      data: {
        entityType: 'membership',
        entityId: faker.number.int({ min: 1, max: 999 }),
        actionRequired: true,
        metadata: { tier: 'Pro', renewalDate: faker.date.soon().toISOString() },
      },
      priority: 'high' as NotificationPriority,
      actionUrl: '/membership',
      actionLabel: '멤버십 관리',
    },
    system: {
      category: 'info' as NotificationCategory,
      title: '시스템 점검 예정',
      message: '오늘 밤 12시~2시 시스템 점검이 예정되어 있습니다.',
      data: {
        entityType: 'system',
        entityId: undefined,
        actionRequired: false,
        metadata: { maintenanceTime: '00:00 - 02:00' },
      },
      priority: 'low' as NotificationPriority,
      actionUrl: '/notices',
      actionLabel: '공지 보기',
    },
    marketing: {
      category: 'info' as NotificationCategory,
      title: '이벤트 안내',
      message: '이번 주 특별 할인 이벤트를 놓치지 마세요!',
      data: {
        entityType: 'marketing',
        entityId: faker.number.int({ min: 1, max: 999 }),
        actionRequired: false,
        metadata: { discountRate: 30, validUntil: faker.date.future().toISOString() },
      },
      priority: 'low' as NotificationPriority,
      actionUrl: '/events',
      actionLabel: '이벤트 보기',
    },
    mentoring: {
      category: 'reminder' as NotificationCategory,
      title: '멘토링 세션 알림',
      message: '멘토링 세션이 30분 후 시작됩니다.',
      data: {
        entityType: 'mentoring',
        entityId: faker.number.int({ min: 1, max: 999 }),
        actionRequired: true,
        metadata: { mentor: '김멘토', time: '15:00' },
      },
      priority: 'high' as NotificationPriority,
      actionUrl: '/mentoring',
      actionLabel: '세션 보기',
    },
    community: {
      category: 'info' as NotificationCategory,
      title: '새로운 댓글 알림',
      message: '회원님의 게시글에 새로운 댓글이 달렸습니다.',
      data: {
        entityType: 'post',
        entityId: faker.number.int({ min: 1, max: 999 }),
        actionRequired: false,
        metadata: { postId: faker.number.int({ min: 1, max: 999 }) },
      },
      priority: 'low' as NotificationPriority,
      actionUrl: '/community',
      actionLabel: '게시글 보기',
    },
    slack: {
      category: 'info' as NotificationCategory,
      title: '[Slack] ConnectWon 알림',
      message: 'Slack 채널에 새로운 시스템 알림이 도착했습니다.',
      data: {
        entityType: 'slack',
        entityId: undefined,
        actionRequired: false,
        metadata: {
          channel: '#connectwon-alerts',
          slackTs: faker.string.uuid(),
          bot: 'ConnectWon Bot',
        },
      },
      priority: 'normal' as NotificationPriority,
      actionUrl: 'https://slack.com/app_redirect?channel=connectwon',
      actionLabel: 'Slack 열기',
    },
  };

  return map[type];
}

// 다중 알림 생성
export function generateNotificationList(count = 10): Notification[] {
  return Array.from({ length: count }, () => generateNotification());
}

// 사용자별 알림 생성
export function generateUserNotifications(userId: number, count = 10): Notification[] {
  return Array.from({ length: count }, () => generateNotification({ userId }));
}
