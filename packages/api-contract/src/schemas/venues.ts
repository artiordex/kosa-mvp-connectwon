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

/**
 * Description : venues.ts - 📌 장소/방 스키마 (Zod 기반, DTO 대체)
 * Author : Shiwoo Min
 * Date : 2025-09-16
 */

/**
 * @description 룸 상태 열거형
 */
export const RoomStatus = z.enum(['ACTIVE', 'INACTIVE', 'MAINTENANCE']);

/**
 * @description 요일 열거형
 */
export const DayOfWeek = z.enum(['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일']);

/**
 * @description 룸 상태 타입
 */
export type RoomStatus = z.infer<typeof RoomStatus>;

/**
 * @description 요일 타입
 */
export type DayOfWeek = z.infer<typeof DayOfWeek>;

/**
 * @description 운영 시간 스키마 (요일별 운영시간 또는 휴무 설정)
 */
export const OpeningHoursSchema = z.record(
  DayOfWeek,
  z.union([
    z.object({
      open: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
      close: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    }),
    z.object({
      closed: z.literal(true),
    }),
  ]),
);

/**
 * @description 휴무일 및 특별 이벤트 규칙 스키마
 */
export const BlackoutRulesSchema = z.object({
  holidays: z.array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).optional(),
  maintenance_days: z.array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).optional(),
  special_events: z
    .array(
      z.object({
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        reason: z.string(),
      }),
    )
    .optional(),
});

/**
 * @description 장소 기본 스키마
 */
export const VenueSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  address: z.string().nullable(),
  opening_hours: OpeningHoursSchema.nullable(),
  blackout_rules: BlackoutRulesSchema.nullable(),
  image_url: z.string().url().nullable(),
  manager_id: z.string().nullable(),
  created_at: z.date(),
  updated_at: z.date(),
});

/**
 * @description 방 기본 스키마
 */
export const RoomSchema = z.object({
  id: z.string(),
  venue_id: z.string(),
  name: z.string(),
  capacity: z.number().min(1).nullable(),
  hourly_rate: z.number().min(0).nullable(),
  status: RoomStatus.default('ACTIVE'),
  amenities: z.record(z.unknown()).nullable(), // equipment, facilities, etc.
  image_urls: z.array(z.string().url()).nullable(),
  created_at: z.date(),
  updated_at: z.date(),
});

/**
 * @description 장소 생성 요청 스키마
 */
export const CreateVenueSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  address: z.string().optional(),
  opening_hours: OpeningHoursSchema.optional(),
  blackout_rules: BlackoutRulesSchema.optional(),
  image_url: z.string().url().optional(),
});

/**
 * @description 장소 수정 요청 스키마
 */
export const UpdateVenueSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  address: z.string().optional(),
  opening_hours: OpeningHoursSchema.optional(),
  blackout_rules: BlackoutRulesSchema.optional(),
  image_url: z.string().url().optional(),
});

/**
 * @description 방 생성 요청 스키마
 */
export const CreateRoomSchema = z.object({
  venue_id: z.string(),
  name: z.string().min(1),
  capacity: z.number().min(1).optional(),
  hourly_rate: z.number().min(0).optional(),
  status: RoomStatus.optional(),
  amenities: z.record(z.unknown()).optional(),
  image_urls: z.array(z.string().url()).optional(),
});

/**
 * @description 방 수정 요청 스키마
 */
export const UpdateRoomSchema = z.object({
  name: z.string().min(1).optional(),
  capacity: z.number().min(1).optional(),
  hourly_rate: z.number().min(0).optional(),
  status: RoomStatus.optional(),
  amenities: z.record(z.unknown()).optional(),
  image_urls: z.array(z.string().url()).optional(),
});

/**
 * @description 장소 목록 조회 쿼리 스키마
 */
export const VenueQuerySchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  region: z.string().optional(),
  min_rooms: z.coerce.number().int().min(1).optional(),
  min_total_capacity: z.coerce.number().int().min(1).optional(),
  required_amenities: z.array(z.string()).optional(),
  currently_open: z.boolean().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

/**
 * @description 방 목록 조회 쿼리 스키마
 */
export const RoomQuerySchema = z.object({
  venue_id: z.string().optional(),
  name: z.string().optional(),
  status: RoomStatus.optional(),
  min_capacity: z.coerce.number().int().min(1).optional(),
  max_capacity: z.coerce.number().int().min(1).optional(),
  required_equipment: z.array(z.string()).optional(),
  max_hourly_rate: z.coerce.number().min(0).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

/**
 * @description 장소 운영 시간 체크 요청 스키마
 */
export const CheckVenueOperatingHoursSchema = z.object({
  venue_id: z.string(),
  datetime: z.string().datetime(),
});

/**
 * @description 운영 시간 체크 응답 스키마
 */
export const OperatingHoursResponseSchema = z.object({
  is_open: z.boolean(),
  open_time: z.string().optional(),
  close_time: z.string().optional(),
  message: z.string(),
  date: z.string(),
  day_of_week: DayOfWeek,
});

/**
 * @description 운영 시간 업데이트 요청 스키마
 */
export const UpdateOperatingHoursSchema = z.object({
  day: DayOfWeek,
  open_time: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .optional(),
  close_time: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .optional(),
  is_closed: z.boolean().optional(),
});

/**
 * @description 장소 목록 응답 스키마
 */
export const VenueListResponseSchema = z.object({
  venues: z.array(VenueSchema),
  pagination: PaginationSchema,
});

/**
 * @description 방 목록 응답 스키마
 */
export const RoomListResponseSchema = z.object({
  rooms: z.array(RoomSchema),
  pagination: PaginationSchema,
});

/**
 * @description 방 목록 포함 장소 스키마
 */
export const VenueWithRoomsSchema = VenueSchema.extend({
  rooms: z.array(RoomSchema),
  total_rooms: z.number().int().min(0),
  active_rooms: z.number().int().min(0),
  total_capacity: z.number().int().min(0),
});

/**
 * @description 장소 정보 포함 방 스키마
 */
export const RoomWithVenueSchema = RoomSchema.extend({
  venue: z.object({
    id: z.string(),
    name: z.string(),
    address: z.string().nullable(),
    opening_hours: OpeningHoursSchema.nullable(),
  }),
});

/**
 * @description 장소 통계 스키마
 */
export const VenueStatsSchema = z.object({
  venue_id: z.string(),
  period: z.string(), // YYYY-MM
  total_rooms: z.number().int().min(0),
  total_capacity: z.number().int().min(0),
  total_reservations: z.number().int().min(0),
  confirmed_reservations: z.number().int().min(0),
  occupancy_rate: z.number().min(0).max(100),
  total_hours_used: z.number().min(0),
  total_revenue: z.number().min(0),
  room_usage: z.array(
    z.object({
      room_id: z.string(),
      room_name: z.string(),
      reservations: z.number().int().min(0),
      occupancy_rate: z.number().min(0).max(100),
    }),
  ),
});

/**
 * @description 방 통계 스키마
 */
export const RoomStatsSchema = z.object({
  room_id: z.string(),
  period: z.string(),
  total_reservations: z.number().int().min(0),
  confirmed_reservations: z.number().int().min(0),
  cancelled_reservations: z.number().int().min(0),
  occupancy_rate: z.number().min(0).max(100),
  total_hours_used: z.number().min(0),
  average_duration: z.number().min(0),
  revenue: z.number().min(0),
  average_rating: z.number().min(0).max(5).optional(),
});

/**
 * @description 장소 기본 타입
 */
export type Venue = z.infer<typeof VenueSchema>;

/**
 * @description 방 기본 타입
 */
export type Room = z.infer<typeof RoomSchema>;

/**
 * @description 운영 시간 타입
 */
export type OpeningHours = z.infer<typeof OpeningHoursSchema>;

/**
 * @description 휴무일 및 특별 이벤트 규칙 타입
 */
export type BlackoutRules = z.infer<typeof BlackoutRulesSchema>;

/**
 * @description 장소 생성 요청 타입
 */
export type CreateVenue = z.infer<typeof CreateVenueSchema>;

/**
 * @description 장소 수정 요청 타입
 */
export type UpdateVenue = z.infer<typeof UpdateVenueSchema>;

/**
 * @description 방 생성 요청 타입
 */
export type CreateRoom = z.infer<typeof CreateRoomSchema>;

/**
 * @description 방 수정 요청 타입
 */
export type UpdateRoom = z.infer<typeof UpdateRoomSchema>;

/**
 * @description 장소 목록 조회 쿼리 타입
 */
export type VenueQuery = z.infer<typeof VenueQuerySchema>;

/**
 * @description 방 목록 조회 쿼리 타입
 */
export type RoomQuery = z.infer<typeof RoomQuerySchema>;

/**
 * @description 장소 운영 시간 체크 요청 타입
 */
export type CheckVenueOperatingHours = z.infer<typeof CheckVenueOperatingHoursSchema>;

/**
 * @description 운영 시간 체크 응답 타입
 */
export type OperatingHoursResponse = z.infer<typeof OperatingHoursResponseSchema>;

/**
 * @description 운영 시간 업데이트 요청 타입
 */
export type UpdateOperatingHours = z.infer<typeof UpdateOperatingHoursSchema>;

/**
 * @description 장소 목록 응답 타입
 */
export type VenueListResponse = z.infer<typeof VenueListResponseSchema>;

/**
 * @description 방 목록 응답 타입
 */
export type RoomListResponse = z.infer<typeof RoomListResponseSchema>;

/**
 * @description 방 목록 포함 장소 타입
 */
export type VenueWithRooms = z.infer<typeof VenueWithRoomsSchema>;

/**
 * @description 장소 정보 포함 방 타입
 */
export type RoomWithVenue = z.infer<typeof RoomWithVenueSchema>;

/**
 * @description 장소 통계 타입
 */
export type VenueStats = z.infer<typeof VenueStatsSchema>;

/**
 * @description 방 통계 타입
 */
export type RoomStats = z.infer<typeof RoomStatsSchema>;

/**
 * @description 장소 운영 시간 확인 함수
 * @param venue 확인할 장소 객체
 * @param datetime 확인할 날짜/시간
 * @returns 장소가 해당 시간에 운영 중이면 true, 그렇지 않으면 false
 */
export function isVenueOpen(venue: Venue, datetime: Date): boolean {
  if (!venue.opening_hours) return true;

  const dayNames: DayOfWeek[] = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const dayIndex = datetime.getDay();
  const dayName = dayNames[dayIndex];
  if (!dayName) return false;
  const dayHours = venue.opening_hours[dayName];
  if (!dayHours || 'closed' in dayHours) return false;
  const currentTime = datetime.toTimeString().substring(0, 5); // HH:mm
  return currentTime >= dayHours.open && currentTime <= dayHours.close;
}

/**
 * @description 방 사용 가능 여부 확인 함수
 * @param room 확인할 방 객체
 * @returns 방이 활성 상태이면 true, 그렇지 않으면 false
 */
export function isRoomAvailable(room: Room): boolean {
  return room.status === 'ACTIVE';
}

/**
 * @description 방 수익 계산 함수
 * @param room 계산할 방 객체
 * @param hoursUsed 사용 시간 (시간 단위)
 * @returns 계산된 수익
 */
export function calculateRoomRevenue(room: Room, hoursUsed: number): number {
  return (room.hourly_rate || 0) * hoursUsed;
}

/**
 * @description 방 장비 목록 추출 함수
 * @param room 확인할 방 객체
 * @returns 방에 설치된 장비 목록
 */
export function getRoomEquipment(room: Room): string[] {
  if (!room.amenities || typeof room.amenities !== 'object') return [];
  return (room.amenities['equipment'] as string[]) || [];
}

/**
 * @description 운영 시간 포맷팅 함수
 * @param hours 포맷할 운영 시간 객체
 * @returns 포맷된 운영 시간 문자열 (예: "09:00 - 18:00" 또는 "휴무")
 */
export function formatOperatingHours(hours: OpeningHours[DayOfWeek]): string {
  if (!hours || 'closed' in hours) return '휴무';
  return `${hours.open} - ${hours.close}`;
}

/**
 * @description 휴무일 여부 확인 함수
 * @param venue 확인할 장소 객체
 * @param date 확인할 날짜 (YYYY-MM-DD 형식)
 * @returns 해당 날짜가 휴무일이면 true, 그렇지 않으면 false
 */
export function isBlackoutDate(venue: Venue, date: string): boolean {
  if (!venue.blackout_rules) return false;
  const { holidays, maintenance_days, special_events } = venue.blackout_rules;
  return !!(holidays?.includes(date) || maintenance_days?.includes(date) || special_events?.some(event => event.date === date));
}

/**
 * @description 장소 생성 요청 유효성 검사 함수
 * @param data 유효성 검사할 데이터
 * @returns 유효성 검사 결과
 */
export function validateCreateVenue(data: unknown) {
  return CreateVenueSchema.safeParse(data);
}

/**
 * @description 방 생성 요청 유효성 검사 함수
 * @param data 유효성 검사할 데이터
 * @returns 유효성 검사 결과
 */
export function validateCreateRoom(data: unknown) {
  return CreateRoomSchema.safeParse(data);
}

/**
 * @description 장소 쿼리 유효성 검사 함수
 * @param data 유효성 검사할 데이터
 * @returns 유효성 검사 결과
 */
export function validateVenueQuery(data: unknown) {
  return VenueQuerySchema.safeParse(data);
}

/**
 * @description 방 쿼리 유효성 검사 함수
 * @param data 유효성 검사할 데이터
 * @returns 유효성 검사 결과
 */
export function validateRoomQuery(data: unknown) {
  return RoomQuerySchema.safeParse(data);
}

/**
 * @description 오프닝 시간 업데이트 유효성 검사 헬퍼
 */
export const DEFAULT_OPENING_HOURS: OpeningHours = {
  월요일: { open: '09:00', close: '18:00' },
  화요일: { open: '09:00', close: '18:00' },
  수요일: { open: '09:00', close: '18:00' },
  목요일: { open: '09:00', close: '18:00' },
  금요일: { open: '09:00', close: '18:00' },
  토요일: { open: '10:00', close: '16:00' },
  일요일: { closed: true },
};

/**
 * @description 방 편의시설 기본값 상수
 */
export const DEFAULT_ROOM_AMENITIES = {
  equipment: ['Wi-Fi', '프로젝터', '화이트보드'],
  facilities: ['에어컨', '난방', '조명'],
  accessibility: [
    '휠체어 접근 가능',
    '점자 안내판',
    '점자 블록',
    '시각장애인용 음성 안내',
    '청각장애인용 자막 시스템',
    '높이 조절 가능 책상'
  ],
  safety: ['비상구', '소화기', 'CCTV'],
  comfort: ['의자', '테이블', '냉온수기'],
  special_notes: '',
};
