/**
 * Description : index.ts - 📌 모든 Mock JSON 데이터 통합 Export
 * Author : Shiwoo Min
 * Date   : 2025-10-09
 */

// Admin
import activities from './admin/activities.json' assert { type: 'json' };
import reports from './admin/reports.json' assert { type: 'json' };
import stats from './admin/stats.json' assert { type: 'json' };

// AI
import interactions from './ai/interactions.json' assert { type: 'json' };
import recommendations from './ai/recommendations.json' assert { type: 'json' };
import sentiments from './ai/sentiments.json' assert { type: 'json' };

// Memberships
import comparisons from './memberships/comparisons.json' assert { type: 'json' };
import plans from './memberships/plans.json' assert { type: 'json' };
import subscriptions from './memberships/subscriptions.json' assert { type: 'json' };

// Notifications
import notifications from './notifications/notifications.json' assert { type: 'json' };

// Payments
import payments from './payments/payments.json' assert { type: 'json' };

// Posts
import posts from './posts/posts.json' assert { type: 'json' };
import comments from './posts/comments.json' assert { type: 'json' };

// Programs
import programs from './programs/programs.json' assert { type: 'json' };
import reviews from './programs/reviews.json' assert { type: 'json' };
import sessions from './programs/sessions.json' assert { type: 'json' };

// Reservations
import attendance from './reservations/attendance.json' assert { type: 'json' };
import reservations from './reservations/reservations.json' assert { type: 'json' };
import scheduler from './reservations/scheduler.json' assert { type: 'json' };

// Users
import userActivities from './users/activities.json' assert { type: 'json' };
import creators from './users/creators.json' assert { type: 'json' };
import profiles from './users/profiles.json' assert { type: 'json' };
import userStats from './users/stats.json' assert { type: 'json' };
import users from './users/users.json' assert { type: 'json' };

// Venues
import equipment from './venues/equipment.json' assert { type: 'json' };
import equipmentRentals from './venues/equipmentRentals.json' assert { type: 'json' };
import inventories from './venues/inventories.json' assert { type: 'json' };
import rooms from './venues/rooms.json' assert { type: 'json' };
import venues from './venues/venues.json' assert { type: 'json' };

// Export Objects (그룹별 export)
export const admin = { activities, reports, stats };
export const ai = { interactions, recommendations, sentiments };
export const memberships = { comparisons, plans, subscriptions };
export const notificationData = { notifications };
export const paymentData = { payments };
export const postData = { posts, comments };
export const programData = { programs, reviews, sessions };
export const reservationData = { attendance, reservations, scheduler };
export const userData = { users, creators, profiles, userActivities, userStats };
export const venueData = {
  venues,
  rooms,
  equipment,
  equipmentRentals,
  inventories,
};

// Default Export - 전체 그룹 통합
export default {
  admin,
  ai,
  memberships,
  notificationData,
  paymentData,
  postData,
  programData,
  reservationData,
  userData,
  venueData,
};
