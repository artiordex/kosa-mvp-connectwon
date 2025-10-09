/**
 * Description : mock-types.ts - 📌 모든 generator / mock 데이터 공통 타입 정의
 * Author: Shiwoo Min
 * Date: 2025-10-09
 */

/** ============================================
 *  Payment (추가 타입)
 * ============================================ */
export interface PaymentReceipt {
  id: string;
  paymentId: string;
  receiptNumber: string;
  receiptType: 'cash' | 'tax_invoice' | 'corporate';
  issueDate: string;
  buyer: {
    name: string;
    email: string;
    phone?: string;
    businessNumber?: string;
  };
  seller: {
    name: string;
    businessNumber: string;
    address: string;
    representativeName: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    unitPrice: number;
    amount: number;
  }>;
  totalAmount: number;
  taxAmount: number;
  supplyAmount: number;
  downloadUrl: string;
  issuedAt: string;
}

export type RefundReason =
  | 'customer_request'
  | 'service_not_provided'
  | 'defective'
  | 'duplicate_payment'
  | 'policy_violation'
  | 'admin_refund';

export type RefundStatus =
  | 'pending'
  | 'approved'
  | 'processing'
  | 'completed'
  | 'rejected'
  | 'failed';

export interface Refund {
  id: string;
  paymentId: string;
  amount: number;
  reason: RefundReason;
  reasonDetail?: string;
  status: RefundStatus;
  method: 'original' | 'point' | 'manual';
  requestedBy: number;
  approvedBy?: number;
  rejectedReason?: string;
  processedAt?: string;
  completedAt?: string;
  createdAt: string;
}

/** ============================================
 *  Post (추가 타입)
 * ============================================ */
export interface PostAttachment {
  id: string;
  type: 'image' | 'video' | 'document' | 'link';
  url: string;
  name: string;
  size?: number;
  mimeType?: string;
  thumbnail?: string;
}

export interface PostMetadata {
  readTime?: number;
  language?: string;
  seoTitle?: string;
  seoDescription?: string;
  allowComments?: boolean;
  allowLikes?: boolean;
  notifyAuthor?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: number;
  authorName: string;
  authorAvatar?: string;
  content: string;
  parentId?: string;
  depth: number;
  likeCount: number;
  isEdited: boolean;
  isDeleted: boolean;
  deletedReason?: string;
  editedAt?: string;
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type ReportType =
  | 'spam'
  | 'harassment'
  | 'hate_speech'
  | 'inappropriate'
  | 'copyright'
  | 'misinformation'
  | 'off_topic'
  | 'other';

export type ReportStatus = 'pending' | 'reviewing' | 'resolved' | 'dismissed';
export type ReportAction =
  | 'none'
  | 'warning'
  | 'content_removed'
  | 'user_suspended'
  | 'user_banned';

export interface PostReport {
  id: string;
  postId: string;
  commentId?: string;
  reportedBy: number;
  reportType: ReportType;
  reason: string;
  description?: string;
  status: ReportStatus;
  reviewedBy?: number;
  reviewedAt?: string;
  action?: ReportAction;
  actionNote?: string;
  createdAt: string;
  updatedAt: string;
}

export type ReactionType =
  | 'like'
  | 'love'
  | 'laugh'
  | 'wow'
  | 'sad'
  | 'angry';

export interface PostReaction {
  id: string;
  postId: string;
  userId: number;
  type: ReactionType;
  createdAt: string;
}

/** ============================================
 *  Program (확장 타입)
 * ============================================ */
export type ProgramDifficulty = 'beginner' | 'intermediate' | 'advanced' | 'all';
export type ProgramFormat = 'online' | 'offline' | 'hybrid';
export type ProgramStatus =
  | 'draft'
  | 'pending_review'
  | 'approved'
  | 'published'
  | 'ongoing'
  | 'completed'
  | 'cancelled'
  | 'archived';
export type ProgramVisibility = 'public' | 'members_only' | 'private' | 'unlisted';

export interface ProgramInstructor {
  id: number;
  name: string;
  avatar?: string;
  title: string;
  bio: string;
  expertise: string[];
  socialLinks?: {
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

export interface ProgramSyllabus {
  week: number;
  title: string;
  description: string;
  topics: string[];
  duration: number;
}

export interface ProgramSchedule {
  type: 'fixed' | 'flexible';
  daysOfWeek?: number[];
  startTime?: string;
  endTime?: string;
  sessionDuration: number;
  totalSessions: number;
}

export interface ProgramLocation {
  type: 'venue' | 'online' | 'external';
  venueId?: number;
  venueName?: string;
  roomName?: string;
  address?: string;
  onlinePlatform?: string;
  meetingUrl?: string;
}

export interface ProgramMaterial {
  id: string;
  type: 'document' | 'video' | 'link' | 'file';
  title: string;
  url: string;
  description?: string;
  isRequired: boolean;
  order: number;
}

export interface ProgramMetadata {
  language: string;
  certificate: boolean;
  recordingAvailable: boolean;
  qnaSupport: boolean;
  refundPolicy: string;
  cancellationPolicy: string;
  targetAudience: string[];
  benefits: string[];
  requirements: string[];
}

export interface ProgramExtended {
  id: string;
  title: string;
  slug: string;
  description: string;
  summary: string;
  category: ProgramCategory;
  subCategory?: string;
  difficulty: ProgramDifficulty;
  format: ProgramFormat;
  duration: number;
  createdByUserId: number;
  creatorName: string;
  instructors: ProgramInstructor[];
  capacity: number;
  minCapacity?: number;
  enrolledCount: number;
  waitlistCount: number;
  status: ProgramStatus;
  visibility: ProgramVisibility;
  price: number;
  discountedPrice?: number;
  currency: string;
  tags: string[];
  learningObjectives: string[];
  prerequisites?: string[];
  syllabus: ProgramSyllabus[];
  schedule: ProgramSchedule;
  location?: ProgramLocation;
  thumbnail?: string;
  images?: string[];
  videoUrl?: string;
  materials?: ProgramMaterial[];
  rating: number;
  reviewCount: number;
  viewCount: number;
  bookmarkCount: number;
  metadata?: ProgramMetadata;
  publishedAt?: string;
  startsAt?: string;
  endsAt?: string;
  applicationDeadline?: string;
  createdAt: string;
  updatedAt: string;
}

/** ============================================
 *  User & Authentication
 * ============================================ */
export type UserRole = 'user' | 'creator' | 'mentor' | 'admin';
export type UserStatus = 'active' | 'inactive' | 'suspended';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  bio?: string;
  phone?: string;
  emailVerified: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type UserActivityAction =
  | 'login'
  | 'logout'
  | 'profile_update'
  | 'reservation_created'
  | 'reservation_cancelled'
  | 'program_joined'
  | 'payment_completed'
  | 'membership_subscribed'
  | 'equipment_rented';

export interface UserActivity {
  id: string;
  userId: string;
  action: UserActivityAction;
  description: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

export type CreatorVerificationStatus = 'pending' | 'verified' | 'rejected';

export interface Creator {
  userId: string;
  displayName: string;
  slug: string;
  bio: string;
  expertise: string[];
  rating: number;
  reviewCount: number;
  verificationStatus: CreatorVerificationStatus;
  verifiedAt?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    website?: string;
    instagram?: string;
    twitter?: string;
  };
  portfolio?: string[];
  achievements?: string[];
  createdAt: string;
  updatedAt: string;
}

/** ============================================
 *  Admin
 * ============================================ */
export interface AdminStats {
  totalUsers: number;
  totalPrograms: number;
  totalReservations: number;
  totalRevenue: number;
  activeUsers: number;
  completedSessions: number;
  pendingReservations: number;
  cancelledReservations: number;
}

export interface AdminActivity {
  id: string;
  adminId: number;
  action: string;
  targetType: string;
  targetId: number;
  description: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface AdminReport {
  id: string;
  type: 'daily' | 'weekly' | 'monthly';
  period: string;
  stats: AdminStats;
  generatedAt: string;
  generatedBy: number;
}

/** ============================================
 *  AI
 * ============================================ */
export type AIProvider = 'openai' | 'anthropic' | 'huggingface';
export type AIInteractionKind =
  | 'program_summary'
  | 'recommendation'
  | 'chatbot'
  | 'moderation'
  | 'sentiment_analysis'
  | 'tag_generation'
  | 'search_enhancement'
  | 'content_generation';

export interface AIInteraction {
  id: string;
  userId: number | undefined;
  programId: number | undefined;
  sessionId: number | undefined;
  provider: AIProvider;
  model: string;
  kind: AIInteractionKind;
  promptTokens: number;
  completionTokens: number;
  cost: number;
  status: 'OK' | 'ERROR';
  traceId?: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface AIChatMessage {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  tokens?: number;
}

export interface AIRecommendation {
  id: string;
  userId: number;
  type: 'program' | 'session' | 'venue' | 'mentor';
  items: Array<{ id: number; score: number; reason: string }>;
  generatedAt: string;
}

export interface AISentiment {
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  keywords: string[];
  confidence: number;
}

/** ============================================
 *  Membership
 * ============================================ */
export type MembershipTier = 'free' | 'basic' | 'pro' | 'enterprise';
export type BillingCycle = 'monthly' | 'quarterly' | 'yearly';

export interface MembershipLimits {
  roomHoursPerMonth: number | null;
  programsPerMonth: number | null;
  mentoringSessionsPerMonth: number | null;
  equipmentRentalsPerMonth: number | null;
  storageGB: number | null;
  teamMembers: number | null;
}

export interface MembershipBenefits {
  priorityBooking: boolean;
  discountRate: number;
  freeEventAccess: boolean;
  dedicatedSupport: boolean;
  apiAccess: boolean;
  customBranding: boolean;
  advancedAnalytics: boolean;
}

export interface Membership {
  id: string;
  name: string;
  slug: string;
  tier: MembershipTier;
  price: number;
  billingCycle: BillingCycle;
  description: string;
  features: string[];
  limits: MembershipLimits;
  benefits: MembershipBenefits;
  color: string;
  icon?: string;
  isPopular: boolean;
  isActive: boolean;
  order: number;
  trialDays?: number;
  createdAt: string;
  updatedAt: string;
}

export type SubscriptionStatus =
  | 'active'
  | 'cancelled'
  | 'expired'
  | 'trialing'
  | 'past_due';

export interface SubscriptionUsage {
  roomHoursUsed: number;
  programsCreated: number;
  mentoringUsed: number;
  equipmentRented: number;
}

export interface UserSubscription {
  id: string;
  userId: number;
  membershipId: string;
  membershipName: string;
  tier: MembershipTier;
  status: SubscriptionStatus;
  billingCycle: BillingCycle;
  price: number;
  startDate: string;
  endDate: string;
  nextBillingDate?: string;
  autoRenew: boolean;
  trialEndDate?: string;
  cancelledAt?: string;
  cancellationReason?: string;
  paymentMethod: PaymentMethod;
  usage: SubscriptionUsage;
  createdAt: string;
  updatedAt: string;
}

/** ============================================
 *  Notification
 * ============================================ */
export type NotificationType =
  | 'reservation'
  | 'program'
  | 'payment'
  | 'equipment'
  | 'membership'
  | 'system'
  | 'marketing'
  | 'mentoring'
  | 'community'
  | 'slack';

export type NotificationCategory = 'info' | 'success' | 'warning' | 'error' | 'reminder';
export type NotificationPriority = 'low' | 'normal' | 'high' | 'urgent';

export interface NotificationData {
  entityType?: string;
  entityId?: number;
  actionRequired?: boolean;
  metadata?: Record<string, any>;
}

export interface Notification {
  id: string;
  userId: number;
  type: NotificationType;
  category: NotificationCategory;
  title: string;
  message: string;
  data?: NotificationData;
  isRead: boolean;
  readAt?: string;
  priority: NotificationPriority;
  actionUrl?: string;
  actionLabel?: string;
  imageUrl?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

/** ============================================
 *  Payment
 * ============================================ */
export type PaymentType =
  | 'membership'
  | 'program'
  | 'room_reservation'
  | 'equipment_rental'
  | 'deposit'
  | 'mentoring'
  | 'event';

export type PaymentMethod =
  | 'card'
  | 'bank_transfer'
  | 'virtual_account'
  | 'paypal'
  | 'kakao_pay'
  | 'naver_pay'
  | 'toss'
  | 'point'
  | 'corporate';

export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'success'
  | 'failed'
  | 'cancelled'
  | 'refunded'
  | 'partially_refunded';

export interface PaymentMetadata {
  entityType?: string;
  entityId?: number;
  cardBrand?: string;
  cardLast4?: string;
  bankName?: string;
  accountNumber?: string;
  installment?: number;
  taxAmount?: number;
  feeAmount?: number;
  discountAmount?: number;
  pointsUsed?: number;
  couponCode?: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface Payment {
  id: string;
  userId: number;
  userName: string;
  type: PaymentType;
  method: PaymentMethod;
  status: PaymentStatus;
  amount: number;
  currency: string;
  description: string;
  orderNumber: string;
  transactionId?: string;
  receiptUrl?: string;
  metadata?: PaymentMetadata;
  failureReason?: string;
  paidAt?: string;
  refundedAt?: string;
  refundAmount?: number;
  refundReason?: string;
  createdAt: string;
  updatedAt: string;
}

/** ============================================
 *  Post & Community
 * ============================================ */
export type PostCategory =
  | 'notice'
  | 'qna'
  | 'discussion'
  | 'showcase'
  | 'event'
  | 'feedback'
  | 'tip'
  | 'job';

export type PostStatus = 'draft' | 'published' | 'archived' | 'deleted';
export type PostVisibility = 'public' | 'members_only' | 'private';

export interface Post {
  id: string;
  authorId: number;
  authorName: string;
  authorAvatar?: string;
  title: string;
  content: string;
  category: PostCategory;
  tags: string[];
  status: PostStatus;
  visibility: PostVisibility;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  bookmarkCount?: number;
  isPinned: boolean;
  isLocked?: boolean;
  isFeatured?: boolean;
  attachments?: PostAttachment[];
  metadata?: PostMetadata;
  publishedAt?: string;
  editedAt?: string;
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
}

/** ============================================
 *  Program
 * ============================================ */
export type ProgramCategory =
  | '창업'
  | '마케팅'
  | '재무'
  | 'IT/개발'
  | '디자인'
  | '피칭'
  | '비즈니스'
  | '커리어'
  | '라이프'
  | '기타';

export interface Program {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: ProgramCategory;
  price: number;
  rating: number;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

/** ============================================
 *  Reservation
 * ============================================ */
export type ReservationStatus =
  | 'reserved'
  | 'confirmed'
  | 'attended'
  | 'cancelled'
  | 'refunded';

export interface Reservation {
  id: string;
  programId: string;
  userId: number;
  userName: string;
  status: ReservationStatus;
  paymentStatus: PaymentStatus;
  paymentAmount: number;
  currency: string;
  reservedAt: string;
  cancelledAt?: string;
  attendedAt?: string;
  programSnapshot: Program;
}

/** ============================================
 *  Venue & Room
 * ============================================ */
export type VenueStatus = 'active' | 'maintenance' | 'closed' | 'coming_soon';
export type RoomStatus = 'active' | 'inactive' | 'maintenance' | 'reserved';
export type RoomType =
  | 'meeting'
  | 'conference'
  | 'seminar'
  | 'workshop'
  | 'studio'
  | 'office'
  | 'event'
  | 'lounge';

export interface Venue {
  id: string;
  name: string;
  slug: string;
  description: string;
  address: string;
  capacity: number;
  roomCount: number;
  rating: number;
  reviewCount: number;
  status: VenueStatus;
  featured: boolean;
  tags: string[];
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
}

export interface Room {
  id: string;
  venueId: number;
  venueName: string;
  name: string;
  type: RoomType;
  capacity: number;
  status: RoomStatus;
  pricePerHour: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

/** ============================================
 *  Equipment
 * ============================================ */
export type EquipmentType =
  | '공유장비'
  | '회의비품'
  | '영상장비'
  | '음향장비'
  | '사무기기'
  | '충전기기'
  | '기타';

export type EquipmentCategory =
  | 'notebook'
  | 'tablet'
  | 'monitor'
  | 'charger'
  | 'microphone'
  | 'speaker'
  | 'webcam'
  | 'projector'
  | 'hdmi-cable'
  | 'whiteboard'
  | 'mouse'
  | 'keyboard'
  | 'tripod'
  | 'adapter'
  | 'usb-hub'
  | 'remote'
  | 'lighting';

export type EquipmentStatus = 'AVAILABLE' | 'IN_USE' | 'MAINTENANCE' | 'RETIRED';
export type EquipmentCondition = 'excellent' | 'good' | 'fair' | 'poor';

export interface Equipment {
  id: string;
  name: string;
  type: EquipmentType;
  category: EquipmentCategory;
  description?: string;
  status: EquipmentStatus;
  condition: EquipmentCondition;
  venueId: number | undefined;
  roomId: number | undefined;
  quantity: number;
  availableQuantity: number;
  imageUrl?: string;
  location?: string;
  lastCheckedAt: string;
  createdAt: string;
  updatedAt: string;
}

export type RentalStatus =
  | 'PENDING'
  | 'APPROVED'
  | 'IN_USE'
  | 'RETURNED'
  | 'CANCELLED'
  | 'OVERDUE';

export interface EquipmentRental {
  id: string;
  equipmentId: string;
  equipmentName: string;
  userId: number;
  userName: string;
  startsAt: string;
  endsAt: string;
  status: RentalStatus;
  purpose?: string | undefined;
  notes?: string | undefined;
  conditionAtReturn?: EquipmentCondition | undefined;
  returnedAt?: string | undefined;
  conditionAtRental: EquipmentCondition;
  createdAt: string;
  updatedAt: string;
}

/** ============================================
 *  Scheduler (스케줄러)
 * ============================================ */

export type SchedulerStatus =
  | 'confirmed'
  | 'pending'
  | 'in_use'
  | 'completed'
  | 'cancelled';

export type SchedulerResourceType = 'room' | 'equipment' | 'program';

export interface SchedulerEvent {
  id: string;
  venueId: number;
  resourceType: SchedulerResourceType;
  resourceId: string | number;
  resourceName: string;
  title: string;
  start: string;
  end: string;
  status: SchedulerStatus;
  color?: string;
  tags?: string[];
  description?: string;
  relatedReservationId?: string;
  relatedRentalId?: string;
  relatedProgramId?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * 스케줄 리소스 (캘린더 그룹 뷰용)
 * - FullCalendar / DevExtreme Scheduler 등에서 리소스 그룹화용
 */
export interface SchedulerResource {
  id: string | number;
  name: string;
  type: SchedulerResourceType;
  venueId: number;
  capacity?: number;
  status?: SchedulerStatus;
  color?: string;
  icon?: string;
  order?: number;
}
