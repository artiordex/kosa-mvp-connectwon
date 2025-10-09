/**
 * Description : index.ts - 📌 모든 Mock API 핸들러 통합 Export
 * Author : Shiwoo Min
 * Date   : 2025-10-09
 */

// Admin
import { dashboardHandlers } from './handlers/admin/dashboard.handler.js';
import { userManagementHandlers } from './handlers/admin/user-management.handler.js';
import { programManagementHandlers } from './handlers/admin/program-management.handler.js';
import { reportManagementHandlers } from './handlers/admin/report-management.handler.js';
import { venueManagementHandlers } from './handlers/admin/venue-management.handler.js';

// Auth
import { authHandlers } from './handlers/auth/auth.handler.js';
import { ssoHandlers } from './handlers/auth/sso.handler.js';
import { sessionHandlers } from './handlers/auth/session.handler.js';

// AI
import { aiHandlers } from './handlers/ai/ai.handler.js';
import { chatHandlers } from './handlers/ai/chat.handler.js';
import { moderationHandlers } from './handlers/ai/moderation.handler.js';
import { recommendationHandlers } from './handlers/ai/recommendation.handler.js';
import { summaryHandlers } from './handlers/ai/summary.handler.js';

// Memberships
import { membershipHandlers } from './handlers/memberships/membership.handler.js';
import { benefitHandlers } from './handlers/memberships/benefit.handler.js';

// Notifications
import { notificationHandlers } from './handlers/notifications/notification.handler.js';
import { messageHandlers } from './handlers/notifications/message.handler.js';
import { slackHandlers } from './handlers/notifications/slack.handler.js';

// Payments
import { paymentHandlers } from './handlers/payments/payment.handler.js';
import { receiptHandlers } from './handlers/payments/receipt.handler.js';
import { subscriptionHandlers } from './handlers/payments/subscription.handler.js';

// Posts
import { postHandlers } from './handlers/posts/post.handler.js';
import { commentHandlers } from './handlers/posts/comment.handler.js';
import { reportHandlers } from './handlers/posts/report.handler.js';

// Programs
import { programHandlers } from './handlers/programs/program.handler.js';
import { participantHandlers } from './handlers/programs/participant.handler.js';
import { reviewHandlers } from './handlers/programs/review.handler.js';
import { sessionHandlers as programSessionHandlers } from './handlers/programs/session.handler.js';

// Users
import { userHandlers } from './handlers/users/user.handler.js';
import { profileHandlers } from './handlers/users/profile.handler.js';
import { creatorHandlers } from './handlers/users/creator.handler.js';
import { activityHandlers } from './handlers/users/activity.handler.js';

// Venues
import { venueHandlers } from './handlers/venues/venue.handler.js';
import { roomHandlers } from './handlers/venues/room.handler.js';
import { reservationHandlers } from './handlers/venues/reservation.handler.js';
import { equipmentHandlers } from './handlers/venues/equipment.handler.js';

// 전체 통합 핸들러 배열
export const handlers = [
  // Admin
  ...dashboardHandlers,
  ...userManagementHandlers,
  ...programManagementHandlers,
  ...reportManagementHandlers,
  ...venueManagementHandlers,

  // Auth
  ...authHandlers,
  ...ssoHandlers,
  ...sessionHandlers,

  // AI
  ...aiHandlers,
  ...chatHandlers,
  ...moderationHandlers,
  ...recommendationHandlers,
  ...summaryHandlers,

  // Memberships
  ...membershipHandlers,
  ...benefitHandlers,

  // Notifications
  ...notificationHandlers,
  ...messageHandlers,
  ...slackHandlers,

  // Payments
  ...paymentHandlers,
  ...receiptHandlers,
  ...subscriptionHandlers,

  // Posts
  ...postHandlers,
  ...commentHandlers,
  ...reportHandlers,

  // Programs
  ...programHandlers,
  ...participantHandlers,
  ...reviewHandlers,
  ...programSessionHandlers,

  // Users
  ...userHandlers,
  ...profileHandlers,
  ...creatorHandlers,
  ...activityHandlers,

  // Venues
  ...venueHandlers,
  ...roomHandlers,
  ...reservationHandlers,
  ...equipmentHandlers,
];
