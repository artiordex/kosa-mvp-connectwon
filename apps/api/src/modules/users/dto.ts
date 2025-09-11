import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Min,
} from 'class-validator';

// ===== ENUMS =====
export enum UserRole {
  USER = 1,
  MODERATOR = 2,
  ADMIN = 4,
  SUPER_ADMIN = 8,
}

export enum NotificationPreference {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  PUSH = 'PUSH',
  NONE = 'NONE',
}

export enum Language {
  KO = 'ko',
  EN = 'en',
  JA = 'ja',
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

// ===== 기본 CRUD DTOs =====
export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com', description: '이메일 주소' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: '홍길동', description: '사용자 이름' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'google_sub_123456', description: 'Google OIDC sub' })
  @IsString()
  @IsOptional()
  google_sub?: string;

  @ApiPropertyOptional({ example: 1, description: '권한 플래그 (비트 연산용)' })
  @IsInt()
  @Min(0)
  @IsOptional()
  role_flags?: number = UserRole.USER;

  @ApiPropertyOptional({
    example: {
      language: 'ko',
      theme: 'light',
      notifications: { email: true, sms: false },
    },
    description: '사용자 설정 정보',
  })
  @IsObject()
  @IsOptional()
  preferences?: Record<string, any>;
}

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'user@example.com', description: '이메일 주소' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ example: '홍길동', description: '사용자 이름' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 1, description: '권한 플래그 (비트 연산용)' })
  @IsInt()
  @Min(0)
  @IsOptional()
  role_flags?: number;

  @ApiPropertyOptional({
    example: {
      language: 'ko',
      theme: 'dark',
    },
    description: '사용자 설정 정보',
  })
  @IsObject()
  @IsOptional()
  preferences?: Record<string, any>;
}

export class UserResponseDto {
  @ApiProperty({ example: 1, description: '사용자 ID' })
  id: number;

  @ApiProperty({ example: 'user@example.com', description: '이메일 주소' })
  email?: string;

  @ApiProperty({ example: '홍길동', description: '사용자 이름' })
  name?: string;

  @ApiProperty({ example: 'google_sub_123456', description: 'Google OIDC sub' })
  google_sub?: string;

  @ApiProperty({ example: '2024-01-01T00:00:00Z', description: '최근 로그인 시간' })
  last_login_at?: string;

  @ApiProperty({ example: 1, description: '권한 플래그' })
  role_flags: number;

  @ApiProperty({
    example: {
      language: 'ko',
      theme: 'light',
      notifications: { email: true },
    },
    description: '사용자 설정 정보',
  })
  preferences: Record<string, any>;

  @ApiProperty({ example: '2024-01-01T00:00:00Z', description: '생성 시각' })
  created_at: string;

  @ApiProperty({ example: '2024-01-01T00:00:00Z', description: '수정 시각' })
  updated_at: string;
}

export class UserQueryDto {
  @ApiPropertyOptional({ example: 'user@example.com', description: '이메일 검색' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({ example: '홍길동', description: '이름 검색' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 1, description: '권한 플래그 필터' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  role_flags?: number;

  @ApiPropertyOptional({ example: '2024-01-01T00:00:00Z', description: '최근 로그인 이후' })
  @IsOptional()
  @IsDateString()
  last_login_after?: string;

  @ApiPropertyOptional({ example: '2024-12-31T23:59:59Z', description: '최근 로그인 이전' })
  @IsOptional()
  @IsDateString()
  last_login_before?: string;

  @ApiPropertyOptional({ example: 1, description: '페이지 번호' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ example: 20, description: '페이지 크기' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 20;
}

// ===== 프로필 관리 DTOs =====
export class UpdateProfileDto {
  @ApiPropertyOptional({ example: '홍길동', description: '이름' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: '010-1234-5678', description: '전화번호' })
  @IsPhoneNumber('KR')
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ example: '서울시 강남구', description: '주소' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({ example: '프론트엔드 개발자', description: '직업' })
  @IsString()
  @IsOptional()
  occupation?: string;

  @ApiPropertyOptional({ example: 'React, TypeScript에 관심이 많습니다.', description: '자기소개' })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/profile.jpg',
    description: '프로필 이미지 URL',
  })
  @IsString()
  @IsOptional()
  profile_image_url?: string;
}

export class UserPreferencesDto {
  @ApiPropertyOptional({
    example: Language.KO,
    description: '언어 설정',
    enum: Language,
  })
  @IsEnum(Language)
  @IsOptional()
  language?: Language;

  @ApiPropertyOptional({
    example: Theme.LIGHT,
    description: '테마 설정',
    enum: Theme,
  })
  @IsEnum(Theme)
  @IsOptional()
  theme?: Theme;

  @ApiPropertyOptional({
    example: NotificationPreference.EMAIL,
    description: '알림 설정',
    enum: NotificationPreference,
  })
  @IsEnum(NotificationPreference)
  @IsOptional()
  notifications?: NotificationPreference;

  @ApiPropertyOptional({ example: 'Asia/Seoul', description: '시간대' })
  @IsString()
  @IsOptional()
  timezone?: string;

  @ApiPropertyOptional({ example: true, description: '이메일 수신 동의' })
  @IsBoolean()
  @IsOptional()
  email_notifications?: boolean;

  @ApiPropertyOptional({ example: false, description: 'SMS 수신 동의' })
  @IsBoolean()
  @IsOptional()
  sms_notifications?: boolean;

  @ApiPropertyOptional({ example: true, description: '푸시 알림 동의' })
  @IsBoolean()
  @IsOptional()
  push_notifications?: boolean;

  @ApiPropertyOptional({ example: ['React', 'TypeScript', 'AI'], description: '관심 태그' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  interest_tags?: string[];

  @ApiPropertyOptional({
    example: {
      auto_join_sessions: true,
      reminder_minutes: 30,
    },
    description: '기타 설정',
  })
  @IsObject()
  @IsOptional()
  custom_settings?: Record<string, any>;
}

// ===== 권한 관리 DTOs =====
export class UpdateUserRoleDto {
  @ApiProperty({ example: 5, description: '새로운 권한 플래그 (비트 조합)' })
  @IsInt()
  @Min(0)
  role_flags: number;

  @ApiProperty({ example: '관리자 권한 부여', description: '권한 변경 사유' })
  @IsString()
  @IsNotEmpty()
  reason: string;
}

export class UserRoleResponseDto {
  @ApiProperty({ example: 1, description: '사용자 ID' })
  user_id: number;

  @ApiProperty({ example: 5, description: '권한 플래그' })
  role_flags: number;

  @ApiProperty({ example: ['USER', 'ADMIN'], description: '권한 목록' })
  roles: string[];

  @ApiProperty({ example: true, description: '관리자 여부' })
  is_admin: boolean;

  @ApiProperty({ example: false, description: '슈퍼 관리자 여부' })
  is_super_admin: boolean;
}

// ===== 활동 이력 DTOs =====
export class UserActivityDto {
  @ApiProperty({ example: 1, description: '사용자 ID' })
  user_id: number;

  @ApiProperty({ example: 'login', description: '활동 타입' })
  activity_type: string;

  @ApiProperty({ example: '사용자가 로그인했습니다', description: '활동 설명' })
  description: string;

  @ApiProperty({ example: { ip: '192.168.1.1', user_agent: 'Chrome' }, description: '메타데이터' })
  metadata?: Record<string, any>;

  @ApiProperty({ example: '2024-01-01T00:00:00Z', description: '발생 시각' })
  created_at: string;
}

export class UserStatsDto {
  @ApiProperty({ example: 1, description: '사용자 ID' })
  user_id: number;

  @ApiProperty({ example: 15, description: '참여한 세션 수' })
  sessions_attended: number;

  @ApiProperty({ example: 3, description: '호스팅한 세션 수' })
  sessions_hosted: number;

  @ApiProperty({ example: 5, description: '생성한 프로그램 수' })
  programs_created: number;

  @ApiProperty({ example: 25, description: '총 방 예약 수' })
  total_reservations: number;

  @ApiProperty({ example: '2024-01-01T00:00:00Z', description: '첫 활동 시간' })
  first_activity_at: string;

  @ApiProperty({ example: '2024-12-01T00:00:00Z', description: '마지막 활동 시간' })
  last_activity_at: string;

  @ApiProperty({ example: 45, description: '총 활동 일수' })
  total_active_days: number;
}

// ===== 복합 응답 DTOs =====
export class UserWithDetailsDto extends UserResponseDto {
  @ApiProperty({ description: '사용자 통계' })
  stats: UserStatsDto;

  @ApiProperty({ type: [UserActivityDto], description: '최근 활동 이력' })
  recent_activities: UserActivityDto[];

  @ApiProperty({ example: ['React 워크샵', 'AI 세미나'], description: '참여 중인 프로그램' })
  active_programs: string[];
}

export class UserListResponseDto {
  @ApiProperty({ type: [UserResponseDto], description: '사용자 목록' })
  users: UserResponseDto[];

  @ApiProperty({ example: 150, description: '총 사용자 수' })
  total: number;

  @ApiProperty({ example: 1, description: '현재 페이지' })
  page: number;

  @ApiProperty({ example: 20, description: '페이지 크기' })
  limit: number;

  @ApiProperty({ example: 8, description: '총 페이지 수' })
  total_pages: number;
}

// ===== 검색/필터 DTOs =====
export class UserSearchDto {
  @ApiPropertyOptional({ example: '홍길동', description: '검색어 (이름, 이메일)' })
  @IsOptional()
  @IsString()
  query?: string;

  @ApiPropertyOptional({ example: [UserRole.USER, UserRole.ADMIN], description: '권한 필터' })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  roles?: number[];

  @ApiPropertyOptional({ example: true, description: '활성 사용자만' })
  @IsOptional()
  @IsBoolean()
  active_only?: boolean;

  @ApiPropertyOptional({ example: ['React', 'TypeScript'], description: '관심 태그 필터' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interest_tags?: string[];

  @ApiPropertyOptional({ example: '2024-01-01T00:00:00Z', description: '가입일 시작' })
  @IsOptional()
  @IsDateString()
  joined_after?: string;

  @ApiPropertyOptional({ example: '2024-12-31T23:59:59Z', description: '가입일 종료' })
  @IsOptional()
  @IsDateString()
  joined_before?: string;
}
