import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export enum ReservationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

// ===== ROOM RESERVATION DTOs =====
export class CreateRoomReservationDto {
  @ApiProperty({ example: 1, description: '방 ID' })
  @IsInt()
  @IsPositive()
  room_id: number;

  @ApiPropertyOptional({ example: 1, description: '사용자 ID' })
  @IsInt()
  @IsPositive()
  @IsOptional()
  user_id?: number;

  @ApiProperty({ example: '2024-12-01T10:00:00Z', description: '시작 시간' })
  @IsDateString()
  starts_at: string;

  @ApiProperty({ example: '2024-12-01T12:00:00Z', description: '종료 시간' })
  @IsDateString()
  ends_at: string;

  @ApiPropertyOptional({ example: '회의', description: '용도' })
  @IsString()
  @IsOptional()
  purpose?: string;

  @ApiPropertyOptional({
    example: ReservationStatus.PENDING,
    description: '예약 상태',
    enum: ReservationStatus,
  })
  @IsEnum(ReservationStatus)
  @IsOptional()
  status?: ReservationStatus = ReservationStatus.PENDING;

  @ApiPropertyOptional({
    example: {
      contact_phone: '010-1234-5678',
      special_requests: '프로젝터 필요',
    },
    description: '메타 정보',
  })
  @IsObject()
  @IsOptional()
  meta?: Record<string, any>;

  @ApiPropertyOptional({ example: 1, description: '연계 세션 ID (1:1 연결)' })
  @IsInt()
  @IsPositive()
  @IsOptional()
  session_id?: number;
}

export class UpdateRoomReservationDto {
  @ApiPropertyOptional({ example: '2024-12-01T10:00:00Z', description: '시작 시간' })
  @IsDateString()
  @IsOptional()
  starts_at?: string;

  @ApiPropertyOptional({ example: '2024-12-01T12:00:00Z', description: '종료 시간' })
  @IsDateString()
  @IsOptional()
  ends_at?: string;

  @ApiPropertyOptional({ example: '회의', description: '용도' })
  @IsString()
  @IsOptional()
  purpose?: string;

  @ApiPropertyOptional({
    example: ReservationStatus.CONFIRMED,
    description: '예약 상태',
    enum: ReservationStatus,
  })
  @IsEnum(ReservationStatus)
  @IsOptional()
  status?: ReservationStatus;

  @ApiPropertyOptional({
    example: {
      contact_phone: '010-1234-5678',
      confirmed_by: 'admin',
    },
    description: '메타 정보',
  })
  @IsObject()
  @IsOptional()
  meta?: Record<string, any>;
}

export class RoomReservationResponseDto {
  @ApiProperty({ example: 1, description: '예약 ID' })
  id: number;

  @ApiProperty({ example: 1, description: '방 ID' })
  room_id: number;

  @ApiProperty({ example: 1, description: '사용자 ID' })
  user_id?: number;

  @ApiProperty({ example: '2024-12-01T10:00:00Z', description: '시작 시간' })
  starts_at: string;

  @ApiProperty({ example: '2024-12-01T12:00:00Z', description: '종료 시간' })
  ends_at: string;

  @ApiProperty({ example: '회의', description: '용도' })
  purpose?: string;

  @ApiProperty({
    example: ReservationStatus.PENDING,
    description: '예약 상태',
    enum: ReservationStatus,
  })
  status: ReservationStatus;

  @ApiProperty({
    example: {
      contact_phone: '010-1234-5678',
      special_requests: '프로젝터 필요',
    },
    description: '메타 정보',
  })
  meta: Record<string, any>;

  @ApiProperty({ example: 1, description: '연계 세션 ID' })
  session_id?: number;

  @ApiProperty({ example: '2024-01-01T00:00:00Z', description: '생성 시각' })
  created_at: string;

  @ApiProperty({ example: '2024-01-01T00:00:00Z', description: '수정 시각' })
  updated_at: string;
}

export class RoomReservationQueryDto {
  @ApiPropertyOptional({ example: 1, description: '방 ID 필터' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  room_id?: number;

  @ApiPropertyOptional({ example: 1, description: '사용자 ID 필터' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  user_id?: number;

  @ApiPropertyOptional({
    example: ReservationStatus.PENDING,
    description: '상태 필터',
    enum: ReservationStatus,
  })
  @IsOptional()
  @IsEnum(ReservationStatus)
  status?: ReservationStatus;

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

// ===== 예약 가능성 체크 DTOs =====
export class CheckAvailabilityDto {
  @ApiProperty({ example: 1, description: '방 ID' })
  @IsInt()
  @IsPositive()
  room_id: number;

  @ApiProperty({ example: '2024-12-01T10:00:00Z', description: '시작 시간' })
  @IsDateString()
  starts_at: string;

  @ApiProperty({ example: '2024-12-01T12:00:00Z', description: '종료 시간' })
  @IsDateString()
  ends_at: string;

  @ApiPropertyOptional({ example: 1, description: '제외할 예약 ID (수정 시)' })
  @IsInt()
  @IsPositive()
  @IsOptional()
  exclude_reservation_id?: number;
}

export class AvailabilityResponseDto {
  @ApiProperty({ example: true, description: '예약 가능 여부' })
  available: boolean;

  @ApiProperty({ example: 'Room is available for the requested time slot', description: '메시지' })
  message: string;

  @ApiProperty({
    example: [{ starts_at: '2024-12-01T09:00:00Z', ends_at: '2024-12-01T10:00:00Z' }],
    description: '충돌하는 예약 목록',
  })
  conflicts?: Array<{
    id: number;
    starts_at: string;
    ends_at: string;
    purpose?: string;
  }>;
}

export class FindAvailableSlotsDto {
  @ApiProperty({ example: 1, description: '방 ID' })
  @IsInt()
  @IsPositive()
  room_id: number;

  @ApiProperty({ example: '2024-12-01', description: '검색 날짜' })
  @IsDateString()
  date: string;

  @ApiProperty({ example: 2, description: '필요한 시간 (시간 단위)' })
  @IsInt()
  @Min(1)
  duration_hours: number;

  @ApiPropertyOptional({ example: '09:00', description: '검색 시작 시간 (HH:mm)' })
  @IsString()
  @IsOptional()
  start_time?: string = '09:00';

  @ApiPropertyOptional({ example: '18:00', description: '검색 종료 시간 (HH:mm)' })
  @IsString()
  @IsOptional()
  end_time?: string = '18:00';
}

export class AvailableSlotsResponseDto {
  @ApiProperty({ example: '2024-12-01', description: '검색 날짜' })
  date: string;

  @ApiProperty({ example: 1, description: '방 ID' })
  room_id: number;

  @ApiProperty({
    example: [
      { starts_at: '2024-12-01T10:00:00Z', ends_at: '2024-12-01T12:00:00Z' },
      { starts_at: '2024-12-01T14:00:00Z', ends_at: '2024-12-01T16:00:00Z' },
    ],
    description: '예약 가능한 시간 슬롯',
  })
  available_slots: Array<{
    starts_at: string;
    ends_at: string;
  }>;
}

// ===== 복합 예약 DTOs =====
export class CreateReservationWithSessionDto {
  @ApiProperty({ description: '방 예약 정보' })
  @Type(() => CreateRoomReservationDto)
  room_reservation: CreateRoomReservationDto;

  @ApiProperty({
    example: {
      program_id: 1,
      capacity: 20,
      participant_fee: 50000,
    },
    description: '세션 정보',
  })
  @IsObject()
  session_info: {
    program_id: number;
    capacity?: number;
    participant_fee?: number;
  };
}

export class ReservationWithDetailsDto extends RoomReservationResponseDto {
  @ApiProperty({
    example: {
      id: 1,
      venue_id: 1,
      name: '회의실 A',
      capacity: 10,
    },
    description: '방 정보',
  })
  room: {
    id: number;
    venue_id: number;
    name: string;
    capacity?: number;
    status: string;
  };

  @ApiProperty({
    example: {
      id: 1,
      email: 'user@example.com',
      name: '홍길동',
    },
    description: '예약자 정보',
  })
  user?: {
    id: number;
    email: string;
    name: string;
  };

  @ApiProperty({
    example: {
      id: 1,
      program_id: 1,
      status: 'SCHEDULED',
    },
    description: '연결된 세션 정보',
  })
  session?: {
    id: number;
    program_id: number;
    status: string;
    capacity?: number;
    participant_fee?: number;
  };
}

// ===== 취소/변경 DTOs =====
export class CancelReservationDto {
  @ApiProperty({ example: '일정 변경으로 인한 취소', description: '취소 사유' })
  @IsString()
  @IsNotEmpty()
  reason: string;

  @ApiPropertyOptional({ example: true, description: '환불 요청 여부' })
  @IsBoolean()
  @IsOptional()
  request_refund?: boolean = false;
}

export class RescheduleReservationDto {
  @ApiProperty({ example: '2024-12-02T10:00:00Z', description: '새로운 시작 시간' })
  @IsDateString()
  new_starts_at: string;

  @ApiProperty({ example: '2024-12-02T12:00:00Z', description: '새로운 종료 시간' })
  @IsDateString()
  new_ends_at: string;

  @ApiProperty({ example: '기존 시간 충돌로 인한 변경', description: '변경 사유' })
  @IsString()
  @IsNotEmpty()
  reason: string;
}

// ===== 통계 DTOs =====
export class ReservationStatsDto {
  @ApiProperty({ example: 1, description: '방 ID' })
  room_id: number;

  @ApiProperty({ example: '2024-12', description: '통계 기간 (YYYY-MM)' })
  period: string;

  @ApiProperty({ example: 25, description: '총 예약 수' })
  total_reservations: number;

  @ApiProperty({ example: 20, description: '확정된 예약 수' })
  confirmed_reservations: number;

  @ApiProperty({ example: 3, description: '취소된 예약 수' })
  cancelled_reservations: number;

  @ApiProperty({ example: 85.5, description: '예약 점유율 (%)' })
  occupancy_rate: number;

  @ApiProperty({ example: 150, description: '총 사용 시간 (시간)' })
  total_hours_used: number;

  @ApiProperty({ example: 2.5, description: '평균 예약 시간 (시간)' })
  average_duration: number;
}
