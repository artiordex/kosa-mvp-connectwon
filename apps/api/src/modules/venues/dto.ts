import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

// ===== ENUMS =====
export enum RoomStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  MAINTENANCE = 'MAINTENANCE',
}

export enum DayOfWeek {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
  SUNDAY = 'sunday',
}

// ===== VENUE DTOs =====
export class CreateVenueDto {
  @ApiProperty({ example: '강남점', description: '지점명' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: '서울특별시 강남구 테헤란로 123', description: '주소' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({
    example: {
      monday: { open: '09:00', close: '18:00' },
      tuesday: { open: '09:00', close: '18:00' },
      wednesday: { open: '09:00', close: '18:00' },
      thursday: { open: '09:00', close: '18:00' },
      friday: { open: '09:00', close: '18:00' },
      saturday: { open: '10:00', close: '16:00' },
      sunday: { closed: true },
    },
    description: '운영시간',
  })
  @IsObject()
  @IsOptional()
  opening_hours?: Record<string, any>;

  @ApiPropertyOptional({
    example: {
      holidays: ['2024-01-01', '2024-12-25'],
      maintenance_days: ['2024-06-15'],
      special_events: [{ date: '2024-05-01', reason: '근로자의 날' }],
    },
    description: '예약 제한 규칙',
  })
  @IsObject()
  @IsOptional()
  blackout_rules?: Record<string, any>;
}

export class UpdateVenueDto {
  @ApiPropertyOptional({ example: '강남점', description: '지점명' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: '서울특별시 강남구 테헤란로 123', description: '주소' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({
    example: {
      monday: { open: '09:00', close: '19:00' },
      friday: { open: '09:00', close: '17:00' },
    },
    description: '운영시간',
  })
  @IsObject()
  @IsOptional()
  opening_hours?: Record<string, any>;

  @ApiPropertyOptional({
    example: {
      holidays: ['2024-01-01', '2024-12-25'],
      maintenance_days: ['2024-06-15'],
    },
    description: '예약 제한 규칙',
  })
  @IsObject()
  @IsOptional()
  blackout_rules?: Record<string, any>;
}

export class VenueResponseDto {
  @ApiProperty({ example: 1, description: '지점 ID' })
  id: number;

  @ApiProperty({ example: '강남점', description: '지점명' })
  name: string;

  @ApiProperty({ example: '서울특별시 강남구 테헤란로 123', description: '주소' })
  address?: string;

  @ApiProperty({
    example: {
      monday: { open: '09:00', close: '18:00' },
      sunday: { closed: true },
    },
    description: '운영시간',
  })
  opening_hours?: Record<string, any>;

  @ApiProperty({
    example: {
      holidays: ['2024-01-01', '2024-12-25'],
      maintenance_days: ['2024-06-15'],
    },
    description: '예약 제한 규칙',
  })
  blackout_rules?: Record<string, any>;

  @ApiProperty({ example: '2024-01-01T00:00:00Z', description: '생성 시각' })
  created_at: string;

  @ApiProperty({ example: '2024-01-01T00:00:00Z', description: '수정 시각' })
  updated_at: string;
}

export class VenueQueryDto {
  @ApiPropertyOptional({ example: '강남', description: '지점명 검색' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: '강남구', description: '주소 검색' })
  @IsOptional()
  @IsString()
  address?: string;

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

// ===== ROOM DTOs =====
export class CreateRoomDto {
  @ApiProperty({ example: 1, description: '지점 ID' })
  @IsInt()
  @IsPositive()
  venue_id: number;

  @ApiProperty({ example: '회의실 A', description: '방 이름' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 10, description: '정원' })
  @IsInt()
  @Min(1)
  @IsOptional()
  capacity?: number;

  @ApiPropertyOptional({
    example: RoomStatus.ACTIVE,
    description: '방 상태',
    enum: RoomStatus,
  })
  @IsEnum(RoomStatus)
  @IsOptional()
  status?: RoomStatus = RoomStatus.ACTIVE;

  @ApiPropertyOptional({
    example: {
      equipment: ['프로젝터', '화이트보드', '스피커'],
      amenities: ['Wi-Fi', '에어컨', '난방'],
      accessibility: ['휠체어 접근 가능'],
      special_notes: '창가 자리로 자연채광 우수',
    },
    description: '방 부가정보',
  })
  @IsObject()
  @IsOptional()
  amenities?: Record<string, any>;
}

export class UpdateRoomDto {
  @ApiPropertyOptional({ example: '회의실 A', description: '방 이름' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 10, description: '정원' })
  @IsInt()
  @Min(1)
  @IsOptional()
  capacity?: number;

  @ApiPropertyOptional({
    example: RoomStatus.ACTIVE,
    description: '방 상태',
    enum: RoomStatus,
  })
  @IsEnum(RoomStatus)
  @IsOptional()
  status?: RoomStatus;

  @ApiPropertyOptional({
    example: {
      equipment: ['프로젝터', '화이트보드'],
      maintenance_note: '에어컨 수리 완료',
    },
    description: '방 부가정보',
  })
  @IsObject()
  @IsOptional()
  amenities?: Record<string, any>;
}

export class RoomResponseDto {
  @ApiProperty({ example: 1, description: '방 ID' })
  id: number;

  @ApiProperty({ example: 1, description: '지점 ID' })
  venue_id: number;

  @ApiProperty({ example: '회의실 A', description: '방 이름' })
  name: string;

  @ApiProperty({ example: 10, description: '정원' })
  capacity?: number;

  @ApiProperty({
    example: RoomStatus.ACTIVE,
    description: '방 상태',
    enum: RoomStatus,
  })
  status: RoomStatus;

  @ApiProperty({
    example: {
      equipment: ['프로젝터', '화이트보드', '스피커'],
      amenities: ['Wi-Fi', '에어컨'],
    },
    description: '방 부가정보',
  })
  amenities?: Record<string, any>;

  @ApiProperty({ example: '2024-01-01T00:00:00Z', description: '생성 시각' })
  created_at: string;

  @ApiProperty({ example: '2024-01-01T00:00:00Z', description: '수정 시각' })
  updated_at: string;
}

export class RoomQueryDto {
  @ApiPropertyOptional({ example: 1, description: '지점 ID 필터' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  venue_id?: number;

  @ApiPropertyOptional({ example: '회의실', description: '방 이름 검색' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: RoomStatus.ACTIVE,
    description: '상태 필터',
    enum: RoomStatus,
  })
  @IsOptional()
  @IsEnum(RoomStatus)
  status?: RoomStatus;

  @ApiPropertyOptional({ example: 5, description: '최소 정원' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  min_capacity?: number;

  @ApiPropertyOptional({ example: 20, description: '최대 정원' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  max_capacity?: number;

  @ApiPropertyOptional({ example: ['프로젝터', '화이트보드'], description: '필요한 장비' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  required_equipment?: string[];

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
export class VenueWithRoomsDto extends VenueResponseDto {
  @ApiProperty({ type: [RoomResponseDto], description: '지점의 방 목록' })
  rooms: RoomResponseDto[];

  @ApiProperty({ example: 8, description: '총 방 개수' })
  total_rooms: number;

  @ApiProperty({ example: 6, description: '활성 방 개수' })
  active_rooms: number;

  @ApiProperty({ example: 120, description: '총 수용 인원' })
  total_capacity: number;
}

export class RoomWithVenueDto extends RoomResponseDto {
  @ApiProperty({
    example: {
      id: 1,
      name: '강남점',
      address: '서울특별시 강남구 테헤란로 123',
    },
    description: '지점 정보',
  })
  venue: {
    id: number;
    name: string;
    address?: string;
    opening_hours?: Record<string, any>;
  };
}

// ===== 운영시간 관련 DTOs =====
export class CheckVenueOperatingHoursDto {
  @ApiProperty({ example: 1, description: '지점 ID' })
  @IsInt()
  @IsPositive()
  venue_id: number;

  @ApiProperty({ example: '2024-12-01T10:00:00Z', description: '확인할 시간' })
  @IsDateString()
  datetime: string;
}

export class OperatingHoursResponseDto {
  @ApiProperty({ example: true, description: '운영 중 여부' })
  is_open: boolean;

  @ApiProperty({ example: '09:00', description: '오픈 시간' })
  open_time?: string;

  @ApiProperty({ example: '18:00', description: '마감 시간' })
  close_time?: string;

  @ApiProperty({ example: '휴무일입니다', description: '메시지' })
  message: string;

  @ApiProperty({ example: '2024-12-01', description: '확인 날짜' })
  date: string;

  @ApiProperty({ example: 'sunday', description: '요일' })
  day_of_week: string;
}

export class UpdateOperatingHoursDto {
  @ApiProperty({
    example: DayOfWeek.MONDAY,
    description: '요일',
    enum: DayOfWeek,
  })
  @IsEnum(DayOfWeek)
  day: DayOfWeek;

  @ApiPropertyOptional({ example: '09:00', description: '오픈 시간 (HH:mm)' })
  @IsString()
  @IsOptional()
  open_time?: string;

  @ApiPropertyOptional({ example: '18:00', description: '마감 시간 (HH:mm)' })
  @IsString()
  @IsOptional()
  close_time?: string;

  @ApiPropertyOptional({ example: true, description: '휴무 여부' })
  @IsBoolean()
  @IsOptional()
  is_closed?: boolean;
}

// ===== 통계 DTOs =====
export class VenueStatsDto {
  @ApiProperty({ example: 1, description: '지점 ID' })
  venue_id: number;

  @ApiProperty({ example: '2024-12', description: '통계 기간 (YYYY-MM)' })
  period: string;

  @ApiProperty({ example: 8, description: '총 방 개수' })
  total_rooms: number;

  @ApiProperty({ example: 120, description: '총 수용 인원' })
  total_capacity: number;

  @ApiProperty({ example: 245, description: '총 예약 수' })
  total_reservations: number;

  @ApiProperty({ example: 210, description: '확정된 예약 수' })
  confirmed_reservations: number;

  @ApiProperty({ example: 85.7, description: '예약 점유율 (%)' })
  occupancy_rate: number;

  @ApiProperty({ example: 1850, description: '총 사용 시간 (시간)' })
  total_hours_used: number;

  @ApiProperty({ example: 3500000, description: '총 매출 (원)' })
  total_revenue: number;

  @ApiProperty({
    example: [
      { room_id: 1, room_name: '회의실 A', reservations: 45 },
      { room_id: 2, room_name: '회의실 B', reservations: 38 },
    ],
    description: '방별 예약 현황',
  })
  room_usage: Array<{
    room_id: number;
    room_name: string;
    reservations: number;
    occupancy_rate: number;
  }>;
}

export class RoomStatsDto {
  @ApiProperty({ example: 1, description: '방 ID' })
  room_id: number;

  @ApiProperty({ example: '2024-12', description: '통계 기간 (YYYY-MM)' })
  period: string;

  @ApiProperty({ example: 45, description: '총 예약 수' })
  total_reservations: number;

  @ApiProperty({ example: 40, description: '확정된 예약 수' })
  confirmed_reservations: number;

  @ApiProperty({ example: 3, description: '취소된 예약 수' })
  cancelled_reservations: number;

  @ApiProperty({ example: 88.9, description: '예약 점유율 (%)' })
  occupancy_rate: number;

  @ApiProperty({ example: 180, description: '총 사용 시간 (시간)' })
  total_hours_used: number;

  @ApiProperty({ example: 4.0, description: '평균 예약 시간 (시간)' })
  average_duration: number;

  @ApiProperty({ example: 450000, description: '방 관련 매출 (원)' })
  revenue: number;

  @ApiProperty({ example: 4.5, description: '평균 평점' })
  average_rating?: number;
}

// ===== 검색 DTOs =====
export class VenueSearchDto {
  @ApiPropertyOptional({ example: '강남', description: '검색어 (지점명, 주소)' })
  @IsOptional()
  @IsString()
  query?: string;

  @ApiPropertyOptional({ example: '서울', description: '지역 필터' })
  @IsOptional()
  @IsString()
  region?: string;

  @ApiPropertyOptional({ example: 5, description: '최소 방 개수' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  min_rooms?: number;

  @ApiPropertyOptional({ example: 50, description: '최소 총 수용인원' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  min_total_capacity?: number;

  @ApiPropertyOptional({ example: ['프로젝터', '주차장'], description: '필요한 시설' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  required_amenities?: string[];

  @ApiPropertyOptional({ example: true, description: '현재 운영 중인 지점만' })
  @IsOptional()
  @IsBoolean()
  currently_open?: boolean;
}
