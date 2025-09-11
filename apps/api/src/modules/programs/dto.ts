import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

// ===== ENUMS =====
export enum SessionStatus {
  SCHEDULED = 'SCHEDULED',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

export enum ParticipantRole {
  HOST = 'HOST',
  ATTENDEE = 'ATTENDEE',
}

export enum ParticipantStatus {
  APPLIED = 'APPLIED',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
}

// ===== PROGRAM DTOs =====
export class CreateProgramDto {
  @ApiProperty({ example: 'seminar', description: '프로그램 유형' })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiProperty({ example: 'React 개발 워크샵', description: '프로그램 제목' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'React 기초부터 고급까지 학습하는 워크샵입니다.',
    description: '프로그램 설명',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    example: ['React', 'JavaScript', 'Frontend'],
    description: 'AI 요약 태그',
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  ai_summary_tags?: string[];

  @ApiPropertyOptional({ example: true, description: '활성 여부' })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean = true;
}

export class UpdateProgramDto {
  @ApiPropertyOptional({ example: 'seminar', description: '프로그램 유형' })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiPropertyOptional({ example: 'React 개발 워크샵', description: '프로그램 제목' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    example: 'React 기초부터 고급까지 학습하는 워크샵입니다.',
    description: '프로그램 설명',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    example: ['React', 'JavaScript', 'Frontend'],
    description: 'AI 요약 태그',
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  ai_summary_tags?: string[];

  @ApiPropertyOptional({ example: true, description: '활성 여부' })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

export class ProgramResponseDto {
  @ApiProperty({ example: 1, description: '프로그램 ID' })
  id: number;

  @ApiProperty({ example: 1, description: '생성자 사용자 ID' })
  created_by_user_id: number;

  @ApiProperty({ example: 'seminar', description: '프로그램 유형' })
  type?: string;

  @ApiProperty({ example: 'React 개발 워크샵', description: '프로그램 제목' })
  title: string;

  @ApiProperty({
    example: 'React 기초부터 고급까지 학습하는 워크샵입니다.',
    description: '프로그램 설명',
  })
  description?: string;

  @ApiProperty({
    example: ['React', 'JavaScript', 'Frontend'],
    description: 'AI 요약 태그',
  })
  ai_summary_tags: string[];

  @ApiProperty({ example: true, description: '활성 여부' })
  is_active: boolean;

  @ApiProperty({ example: '2024-01-01T00:00:00Z', description: '생성 시각' })
  created_at: string;

  @ApiProperty({ example: '2024-01-01T00:00:00Z', description: '수정 시각' })
  updated_at: string;
}

export class ProgramQueryDto {
  @ApiPropertyOptional({ example: 'seminar', description: '프로그램 유형 필터' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ example: 'React', description: '제목 검색' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: true, description: '활성 상태 필터' })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  is_active?: boolean;

  @ApiPropertyOptional({ example: 1, description: '생성자 ID 필터' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  created_by_user_id?: number;

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

// ===== SESSION DTOs =====
export class CreateSessionDto {
  @ApiProperty({ example: 1, description: '프로그램 ID' })
  @IsInt()
  @IsPositive()
  program_id: number;

  @ApiProperty({ example: '2024-12-01T10:00:00Z', description: '시작 시간' })
  @IsDateString()
  starts_at: string;

  @ApiProperty({ example: '2024-12-01T12:00:00Z', description: '종료 시간' })
  @IsDateString()
  ends_at: string;

  @ApiPropertyOptional({ example: 30, description: '수용 인원' })
  @IsInt()
  @Min(1)
  @IsOptional()
  capacity?: number;

  @ApiPropertyOptional({ example: 50000, description: '참가비 (원)' })
  @IsInt()
  @Min(0)
  @IsOptional()
  participant_fee?: number;

  @ApiPropertyOptional({
    example: SessionStatus.SCHEDULED,
    description: '세션 상태',
    enum: SessionStatus,
  })
  @IsEnum(SessionStatus)
  @IsOptional()
  status?: SessionStatus = SessionStatus.SCHEDULED;

  @ApiPropertyOptional({ example: 1, description: '방 예약 ID (1:1 연결)' })
  @IsInt()
  @IsPositive()
  @IsOptional()
  room_reservation_id?: number;

  @ApiPropertyOptional({ example: '강남구 테헤란로 123번지', description: '장소 설명' })
  @IsString()
  @IsOptional()
  location_text?: string;
}

export class UpdateSessionDto {
  @ApiPropertyOptional({ example: '2024-12-01T10:00:00Z', description: '시작 시간' })
  @IsDateString()
  @IsOptional()
  starts_at?: string;

  @ApiPropertyOptional({ example: '2024-12-01T12:00:00Z', description: '종료 시간' })
  @IsDateString()
  @IsOptional()
  ends_at?: string;

  @ApiPropertyOptional({ example: 30, description: '수용 인원' })
  @IsInt()
  @Min(1)
  @IsOptional()
  capacity?: number;

  @ApiPropertyOptional({ example: 50000, description: '참가비 (원)' })
  @IsInt()
  @Min(0)
  @IsOptional()
  participant_fee?: number;

  @ApiPropertyOptional({
    example: SessionStatus.CONFIRMED,
    description: '세션 상태',
    enum: SessionStatus,
  })
  @IsEnum(SessionStatus)
  @IsOptional()
  status?: SessionStatus;

  @ApiPropertyOptional({ example: 1, description: '방 예약 ID (1:1 연결)' })
  @IsInt()
  @IsPositive()
  @IsOptional()
  room_reservation_id?: number;

  @ApiPropertyOptional({ example: '강남구 테헤란로 123번지', description: '장소 설명' })
  @IsString()
  @IsOptional()
  location_text?: string;
}

export class SessionResponseDto {
  @ApiProperty({ example: 1, description: '세션 ID' })
  id: number;

  @ApiProperty({ example: 1, description: '프로그램 ID' })
  program_id: number;

  @ApiProperty({ example: '2024-12-01T10:00:00Z', description: '시작 시간' })
  starts_at: string;

  @ApiProperty({ example: '2024-12-01T12:00:00Z', description: '종료 시간' })
  ends_at: string;

  @ApiProperty({ example: 30, description: '수용 인원' })
  capacity?: number;

  @ApiProperty({ example: 50000, description: '참가비 (원)' })
  participant_fee?: number;

  @ApiProperty({
    example: SessionStatus.SCHEDULED,
    description: '세션 상태',
    enum: SessionStatus,
  })
  status: SessionStatus;

  @ApiProperty({ example: 1, description: '방 예약 ID' })
  room_reservation_id?: number;

  @ApiProperty({ example: '강남구 테헤란로 123번지', description: '장소 설명' })
  location_text?: string;

  @ApiProperty({ example: '2024-01-01T00:00:00Z', description: '생성 시각' })
  created_at: string;

  @ApiProperty({ example: '2024-01-01T00:00:00Z', description: '수정 시각' })
  updated_at: string;
}

export class SessionQueryDto {
  @ApiPropertyOptional({ example: 1, description: '프로그램 ID 필터' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  program_id?: number;

  @ApiPropertyOptional({
    example: SessionStatus.SCHEDULED,
    description: '상태 필터',
    enum: SessionStatus,
  })
  @IsOptional()
  @IsEnum(SessionStatus)
  status?: SessionStatus;

  @ApiPropertyOptional({ example: '2024-12-01T00:00:00Z', description: '시작 시간 이후' })
  @IsOptional()
  @IsDateString()
  starts_after?: string;

  @ApiPropertyOptional({ example: '2024-12-31T23:59:59Z', description: '시작 시간 이전' })
  @IsOptional()
  @IsDateString()
  starts_before?: string;

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

// ===== PARTICIPANT DTOs =====
export class CreateParticipantDto {
  @ApiProperty({ example: 1, description: '세션 ID' })
  @IsInt()
  @IsPositive()
  session_id: number;

  @ApiProperty({ example: 1, description: '사용자 ID' })
  @IsInt()
  @IsPositive()
  user_id: number;

  @ApiPropertyOptional({
    example: ParticipantRole.ATTENDEE,
    description: '참여자 역할',
    enum: ParticipantRole,
  })
  @IsEnum(ParticipantRole)
  @IsOptional()
  role?: ParticipantRole = ParticipantRole.ATTENDEE;

  @ApiPropertyOptional({
    example: ParticipantStatus.APPLIED,
    description: '참여 상태',
    enum: ParticipantStatus,
  })
  @IsEnum(ParticipantStatus)
  @IsOptional()
  status?: ParticipantStatus = ParticipantStatus.APPLIED;
}

export class UpdateParticipantDto {
  @ApiPropertyOptional({
    example: ParticipantRole.HOST,
    description: '참여자 역할',
    enum: ParticipantRole,
  })
  @IsEnum(ParticipantRole)
  @IsOptional()
  role?: ParticipantRole;

  @ApiPropertyOptional({
    example: ParticipantStatus.CONFIRMED,
    description: '참여 상태',
    enum: ParticipantStatus,
  })
  @IsEnum(ParticipantStatus)
  @IsOptional()
  status?: ParticipantStatus;
}

export class ParticipantResponseDto {
  @ApiProperty({ example: 1, description: '참여 ID' })
  id: number;

  @ApiProperty({ example: 1, description: '세션 ID' })
  session_id: number;

  @ApiProperty({ example: 1, description: '사용자 ID' })
  user_id: number;

  @ApiProperty({
    example: ParticipantRole.ATTENDEE,
    description: '참여자 역할',
    enum: ParticipantRole,
  })
  role: ParticipantRole;

  @ApiProperty({
    example: ParticipantStatus.APPLIED,
    description: '참여 상태',
    enum: ParticipantStatus,
  })
  status: ParticipantStatus;

  @ApiProperty({ example: '2024-01-01T00:00:00Z', description: '참여 시각' })
  joined_at: string;
}

export class ParticipantQueryDto {
  @ApiPropertyOptional({ example: 1, description: '세션 ID 필터' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  session_id?: number;

  @ApiPropertyOptional({ example: 1, description: '사용자 ID 필터' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  user_id?: number;

  @ApiPropertyOptional({
    example: ParticipantRole.ATTENDEE,
    description: '역할 필터',
    enum: ParticipantRole,
  })
  @IsOptional()
  @IsEnum(ParticipantRole)
  role?: ParticipantRole;

  @ApiPropertyOptional({
    example: ParticipantStatus.CONFIRMED,
    description: '상태 필터',
    enum: ParticipantStatus,
  })
  @IsOptional()
  @IsEnum(ParticipantStatus)
  status?: ParticipantStatus;

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

// ===== 복합 응답 DTOs =====
export class ProgramWithSessionsDto extends ProgramResponseDto {
  @ApiProperty({ type: [SessionResponseDto], description: '프로그램의 세션 목록' })
  sessions: SessionResponseDto[];
}

export class SessionWithParticipantsDto extends SessionResponseDto {
  @ApiProperty({ type: [ParticipantResponseDto], description: '세션의 참여자 목록' })
  participants: ParticipantResponseDto[];

  @ApiProperty({ example: 15, description: '현재 참여자 수' })
  current_participants: number;

  @ApiProperty({ example: 5, description: '남은 자리 수' })
  available_slots: number;
}

export class ProgramStatsDto {
  @ApiProperty({ example: 1, description: '프로그램 ID' })
  program_id: number;

  @ApiProperty({ example: 5, description: '총 세션 수' })
  total_sessions: number;

  @ApiProperty({ example: 3, description: '완료된 세션 수' })
  completed_sessions: number;

  @ApiProperty({ example: 125, description: '총 참여자 수' })
  total_participants: number;

  @ApiProperty({ example: 85, description: '참여 확정자 수' })
  confirmed_participants: number;

  @ApiProperty({ example: 750000, description: '총 수익 (원)' })
  total_revenue: number;

  @ApiProperty({ example: 4.5, description: '평균 평점' })
  average_rating?: number;
}
