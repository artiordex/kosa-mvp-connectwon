/**
 * Description : users.ts - 📌 사용자 관련 스키마 및 타입 (Zod 기반 통합)
 * Author : Shiwoo Min
 * Date : 2025-09-16
 */
import { z } from 'zod';

// 유저 권한 정의
export const UserRole = z.enum(['USER', 'CREATOR', 'ADMIN']);

// 유저 제공자
export const UserProvider = z.enum(['GOOGLE', 'LOCAL']);

// 언어 옵션
export const Language = z.enum(['ko', 'en', 'ja']);

// 테마 옵션
export const Theme = z.enum(['light', 'dark', 'system']);

// 알림 설정 옵션
export const NotificationPreference = z.enum(['EMAIL', 'SMS', 'PUSH', 'NONE']);

// 타입 추출
export type UserRole = z.infer<typeof UserRole>;
export type UserProvider = z.infer<typeof UserProvider>;
export type Language = z.infer<typeof Language>;
export type Theme = z.infer<typeof Theme>;
export type NotificationPreference = z.infer<typeof NotificationPreference>;

// 사용자 선호 설정 스키마
export const UserPreferencesSchema = z.object({
  language: Language.optional(),
  theme: Theme.optional(),
  notifications: NotificationPreference.optional(),
  timezone: z.string().optional(),
  email_notifications: z.boolean().optional(),
  sms_notifications: z.boolean().optional(),
  push_notifications: z.boolean().optional(),
  interest_tags: z.array(z.string()).optional(),
  custom_settings: z.record(z.unknown()).optional(),
});

// 사용자 스키마
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email().nullable(),
  name: z.string().nullable(),
  phone: z.string().nullable(),
  role: UserRole.default('USER'),
  provider: UserProvider.default('GOOGLE'),
  google_sub: z.string().optional(),
  avatar: z.string().url().nullable(),
  bio: z.string().nullable(),
  occupation: z.string().nullable(),
  address: z.string().nullable(),
  profile_image_url: z.string().url().nullable(),
  preferences: UserPreferencesSchema.nullable(),
  last_login_at: z.date().nullable(),
  created_at: z.date(),
  updated_at: z.date(),
});

// 유저 생성 스키마
export const CreateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(1).optional(),
  google_sub: z.string().optional(),
  role: UserRole.optional(),
  preferences: UserPreferencesSchema.optional(),
});

// 유저 수정 스키마
export const UpdateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(1).optional(),
  role: UserRole.optional(),
  preferences: UserPreferencesSchema.optional(),
});

// 프로필 수정 스키마
export const UpdateProfileSchema = z.object({
  name: z.string().min(1).optional(),
  phone: z.string().optional(),
  bio: z.string().optional(),
  occupation: z.string().optional(),
  address: z.string().optional(),
  profile_image_url: z.string().url().optional(),
});

// 유저 선호 설정 수정 스키마
export const UpdateUserPreferencesSchema = UserPreferencesSchema.partial();

// 유저 쿼리 파라미터 스키마
export const UserQuerySchema = z.object({
  email: z.string().optional(),
  name: z.string().optional(),
  role: UserRole.optional(),
  last_login_after: z.string().datetime().optional(),
  last_login_before: z.string().datetime().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

// 유저 검색 스키마
export const UserSearchSchema = z.object({
  query: z.string().optional(),
  roles: z.array(UserRole).optional(),
  active_only: z.boolean().optional(),
  interest_tags: z.array(z.string()).optional(),
  joined_after: z.string().datetime().optional(),
  joined_before: z.string().datetime().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

// 유저 통계 스키마
export const UserStatsSchema = z.object({
  user_id: z.string(),
  sessions_attended: z.number().int().min(0),
  sessions_hosted: z.number().int().min(0),
  programs_created: z.number().int().min(0),
  total_reservations: z.number().int().min(0),
  first_activity_at: z.date().nullable(),
  last_activity_at: z.date().nullable(),
  total_active_days: z.number().int().min(0),
});

// 유저 활동 로그 스키마
export const UserActivitySchema = z.object({
  user_id: z.string(),
  activity_type: z.string(),
  description: z.string(),
  metadata: z.record(z.unknown()).optional(),
  created_at: z.date(),
});

// 상세 유저 정보 스키마
export const UserWithDetailsSchema = UserSchema.extend({
  stats: UserStatsSchema,
  recent_activities: z.array(UserActivitySchema),
  active_programs: z.array(z.string()),
});

// 페이지네이션 스키마
export const PaginationSchema = z.object({
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
  pages: z.number().int().min(0),
});

// 유저 목록 응답 스키마
export const UserListResponseSchema = z.object({
  users: z.array(UserSchema),
  pagination: PaginationSchema,
});

// 유저 권한 관리 스키마
export const UpdateUserRoleSchema = z.object({
  role: UserRole,
  reason: z.string().min(1, '권한 변경 사유는 필수입니다'),
});

// 유저 권한 응답 스키마
export const UserRoleResponseSchema = z.object({
  user_id: z.string(),
  role: UserRole,
  is_admin: z.boolean(),
  is_super_admin: z.boolean(),
});

// 타입 추출
export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
export type UpdateProfile = z.infer<typeof UpdateProfileSchema>;
export type UpdateUserPreferences = z.infer<typeof UpdateUserPreferencesSchema>;
export type UserPreferences = z.infer<typeof UserPreferencesSchema>;
export type UserQuery = z.infer<typeof UserQuerySchema>;
export type UserSearch = z.infer<typeof UserSearchSchema>;
export type UserStats = z.infer<typeof UserStatsSchema>;
export type UserActivity = z.infer<typeof UserActivitySchema>;
export type UserWithDetails = z.infer<typeof UserWithDetailsSchema>;
export type UserListResponse = z.infer<typeof UserListResponseSchema>;
export type UpdateUserRole = z.infer<typeof UpdateUserRoleSchema>;
export type UserRoleResponse = z.infer<typeof UserRoleResponseSchema>;
export type Pagination = z.infer<typeof PaginationSchema>;

// 어드민인지 확인
export function isAdmin(user: User): boolean {
  return user.role === 'ADMIN';
}

// 유저 관리 권한 확인
export function canManageUsers(user: User): boolean {
  return isAdmin(user);
}

// 유저 생성 유효성 검사
export function validateCreateUser(data: unknown) {
  return CreateUserSchema.safeParse(data);
}

// 유저 수정 유효성 검사
export function validateUpdateUser(data: unknown) {
  return UpdateUserSchema.safeParse(data);
}

// 유저 쿼리 유효성 검사
export function validateUserQuery(data: unknown) {
  return UserQuerySchema.safeParse(data);
}

// 유저 선호 설정 기본값
export const DEFAULT_USER_PREFERENCES: UserPreferences = {
  language: 'ko',
  theme: 'light',
  notifications: 'EMAIL',
  timezone: 'Asia/Seoul',
  email_notifications: true,
  sms_notifications: false,
  push_notifications: true,
  interest_tags: [],
  custom_settings: {},
};
