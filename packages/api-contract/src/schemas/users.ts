/**
 * Description : users.ts - 📌 사용자 관련 스키마 및 타입 (Zod 기반 통합)
 * Author : Shiwoo Min
 * Date : 2025-09-16
 */
import { z } from 'zod';

/**
 * @description 유저 권한 열거형
 */
export const UserRole = z.enum(['USER', 'CREATOR', 'ADMIN']);

/**
 * @description 유저 제공자 열거형
 */
export const UserProvider = z.enum(['GOOGLE', 'LOCAL']);

/**
 * @description 언어 옵션 열거형
 */
export const Language = z.enum(['ko', 'en', 'ja']);

/**
 * @description 테마 옵션 열거형
 */
export const Theme = z.enum(['light', 'dark', 'system']);

/**
 * @description 알림 설정 옵션 열거형
 */
export const NotificationPreference = z.enum(['EMAIL', 'SMS', 'PUSH', 'NONE']);

/**
 * @description 유저 권한 타입
 */
export type UserRole = z.infer<typeof UserRole>;

/**
 * @description 유저 제공자 타입
 */
export type UserProvider = z.infer<typeof UserProvider>;

/**
 * @description 언어 옵션 타입
 */
export type Language = z.infer<typeof Language>;

/**
 * @description 테마 옵션 타입
 */
export type Theme = z.infer<typeof Theme>;

/**
 * @description 알림 설정 옵션 타입
 */
export type NotificationPreference = z.infer<typeof NotificationPreference>;

/**
 * @description 사용자 선호 설정 스키마
 */
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

/**
 * @description 사용자 기본 스키마
 */
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

/**
 * @description 유저 생성 요청 스키마
 */
export const CreateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(1).optional(),
  google_sub: z.string().optional(),
  role: UserRole.optional(),
  preferences: UserPreferencesSchema.optional(),
});

/**
 * @description 유저 수정 요청 스키마
 */
export const UpdateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(1).optional(),
  role: UserRole.optional(),
  preferences: UserPreferencesSchema.optional(),
});

/**
 * @description 프로필 수정 요청 스키마
 */
export const UpdateProfileSchema = z.object({
  name: z.string().min(1).optional(),
  phone: z.string().optional(),
  bio: z.string().optional(),
  occupation: z.string().optional(),
  address: z.string().optional(),
  profile_image_url: z.string().url().optional(),
});

/**
 * @description 유저 선호 설정 수정 요청 스키마
 */
export const UpdateUserPreferencesSchema = UserPreferencesSchema.partial();

/**
 * @description 유저 목록 조회 쿼리 스키마
 */
export const UserQuerySchema = z.object({
  email: z.string().optional(),
  name: z.string().optional(),
  role: UserRole.optional(),
  last_login_after: z.string().datetime().optional(),
  last_login_before: z.string().datetime().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

/**
 * @description 유저 검색 쿼리 스키마
 */
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

/**
 * @description 유저 통계 스키마
 */
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

/**
 * @description 유저 활동 로그 스키마
 */
export const UserActivitySchema = z.object({
  user_id: z.string(),
  activity_type: z.string(),
  description: z.string(),
  metadata: z.record(z.unknown()).optional(),
  created_at: z.date(),
});

/**
 * @description 상세 정보 포함 유저 스키마
 */
export const UserWithDetailsSchema = UserSchema.extend({
  stats: UserStatsSchema,
  recent_activities: z.array(UserActivitySchema),
  active_programs: z.array(z.string()),
});

/**
 * @description 페이지네이션 스키마
 */
export const PaginationSchema = z.object({
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
  pages: z.number().int().min(0),
});

/**
 * @description 유저 목록 응답 스키마
 */
export const UserListResponseSchema = z.object({
  users: z.array(UserSchema),
  pagination: PaginationSchema,
});

/**
 * @description 유저 권한 변경 요청 스키마
 */
export const UpdateUserRoleSchema = z.object({
  role: UserRole,
  reason: z.string().min(1, '권한 변경 사유는 필수입니다'),
});

/**
 * @description 유저 권한 응답 스키마
 */
export const UserRoleResponseSchema = z.object({
  user_id: z.string(),
  role: UserRole,
  is_admin: z.boolean(),
  is_super_admin: z.boolean(),
});

/**
 * @description 사용자 기본 타입
 */
export type User = z.infer<typeof UserSchema>;

/**
 * @description 유저 생성 요청 타입
 */
export type CreateUser = z.infer<typeof CreateUserSchema>;

/**
 * @description 유저 수정 요청 타입
 */
export type UpdateUser = z.infer<typeof UpdateUserSchema>;

/**
 * @description 프로필 수정 요청 타입
 */
export type UpdateProfile = z.infer<typeof UpdateProfileSchema>;

/**
 * @description 유저 선호 설정 수정 요청 타입
 */
export type UpdateUserPreferences = z.infer<typeof UpdateUserPreferencesSchema>;

/**
 * @description 사용자 선호 설정 타입
 */
export type UserPreferences = z.infer<typeof UserPreferencesSchema>;

/**
 * @description 유저 목록 조회 쿼리 타입
 */
export type UserQuery = z.infer<typeof UserQuerySchema>;

/**
 * @description 유저 검색 쿼리 타입
 */
export type UserSearch = z.infer<typeof UserSearchSchema>;

/**
 * @description 유저 통계 타입
 */
export type UserStats = z.infer<typeof UserStatsSchema>;

/**
 * @description 유저 활동 로그 타입
 */
export type UserActivity = z.infer<typeof UserActivitySchema>;

/**
 * @description 상세 정보 포함 유저 타입
 */
export type UserWithDetails = z.infer<typeof UserWithDetailsSchema>;

/**
 * @description 유저 목록 응답 타입
 */
export type UserListResponse = z.infer<typeof UserListResponseSchema>;

/**
 * @description 유저 권한 변경 요청 타입
 */
export type UpdateUserRole = z.infer<typeof UpdateUserRoleSchema>;

/**
 * @description 유저 권한 응답 타입
 */
export type UserRoleResponse = z.infer<typeof UserRoleResponseSchema>;

/**
 * @description 페이지네이션 타입
 */
export type Pagination = z.infer<typeof PaginationSchema>;

/**
 * @description 어드민 권한 확인 함수
 * @param user 확인할 사용자 객체
 * @returns 관리자 권한이 있으면 true, 그렇지 않으면 false
 */
export function isAdmin(user: User): boolean {
  return user.role === 'ADMIN';
}

/**
 * @description 유저 관리 권한 확인 함수
 * @param user 확인할 사용자 객체
 * @returns 사용자 관리 권한이 있으면 true, 그렇지 않으면 false
 */
export function canManageUsers(user: User): boolean {
  return isAdmin(user);
}

/**
 * @description 유저 생성 데이터 유효성 검사 함수
 * @param data 검사할 데이터
 * @returns Zod 파싱 결과
 */
export function validateCreateUser(data: unknown) {
  return CreateUserSchema.safeParse(data);
}

/**
 * @description 유저 수정 데이터 유효성 검사 함수
 * @param data 검사할 데이터
 * @returns Zod 파싱 결과
 */
export function validateUpdateUser(data: unknown) {
  return UpdateUserSchema.safeParse(data);
}

/**
 * @description 유저 쿼리 데이터 유효성 검사 함수
 * @param data 검사할 데이터
 * @returns Zod 파싱 결과
 */
export function validateUserQuery(data: unknown) {
  return UserQuerySchema.safeParse(data);
}

/**
 * @description 유저 선호 설정 기본값 상수
 */
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
