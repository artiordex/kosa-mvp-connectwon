import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

export enum PaymentProvider {
  STRIPE = 'STRIPE',
  TOSS = 'TOSS',
  KAKAO_PAY = 'KAKAO_PAY',
  NAVER_PAY = 'NAVER_PAY',
}

export enum PaymentMethod {
  CARD = 'CARD',
  BANK_TRANSFER = 'BANK_TRANSFER',
  VIRTUAL_ACCOUNT = 'VIRTUAL_ACCOUNT',
  MOBILE = 'MOBILE',
  POINT = 'POINT',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
  PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED',
}

export enum Currency {
  KRW = 'KRW',
  USD = 'USD',
}

// ===== 결제 생성 =====
export class CreatePaymentDto {
  @ApiProperty({ example: 1, description: '세션 ID' })
  @IsInt()
  @IsPositive()
  session_id: number;

  @ApiProperty({ example: 1, description: '사용자 ID' })
  @IsInt()
  @IsPositive()
  user_id: number;

  @ApiProperty({ example: 50000, description: '결제 금액' })
  @IsInt()
  @IsPositive()
  amount: number;

  @ApiProperty({
    example: Currency.KRW,
    description: '통화',
    enum: Currency,
  })
  @IsEnum(Currency)
  currency: Currency = Currency.KRW;

  @ApiProperty({
    example: PaymentProvider.STRIPE,
    description: '결제 제공업체',
    enum: PaymentProvider,
  })
  @IsEnum(PaymentProvider)
  provider: PaymentProvider;

  @ApiProperty({
    example: PaymentMethod.CARD,
    description: '결제 수단',
    enum: PaymentMethod,
  })
  @IsEnum(PaymentMethod)
  method: PaymentMethod;

  @ApiProperty({ example: 'React 워크샵 참가비', description: '결제 설명' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({
    example: 'http://localhost:3000/payment/success',
    description: '성공 리디렉션 URL',
  })
  @IsUrl()
  @IsOptional()
  success_url?: string;

  @ApiPropertyOptional({
    example: 'http://localhost:3000/payment/cancel',
    description: '취소 리디렉션 URL',
  })
  @IsUrl()
  @IsOptional()
  cancel_url?: string;

  @ApiPropertyOptional({
    example: {
      customer_name: '홍길동',
      customer_email: 'user@example.com',
    },
    description: '추가 메타데이터',
  })
  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;
}

// ===== Stripe 관련 =====
export class StripePaymentIntentDto {
  @ApiProperty({ example: 'pi_1234567890', description: 'Stripe Payment Intent ID' })
  @IsString()
  @IsNotEmpty()
  payment_intent_id: string;

  @ApiProperty({ example: 50000, description: '결제 금액' })
  @IsInt()
  @IsPositive()
  amount: number;

  @ApiPropertyOptional({
    example: {
      session_id: 1,
      user_id: 1,
    },
    description: '메타데이터',
  })
  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;
}

export class StripeWebhookDto {
  @ApiProperty({ example: 'evt_1234567890', description: 'Stripe Event ID' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'payment_intent.succeeded', description: 'Event Type' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ description: 'Event Data' })
  @IsObject()
  data: {
    object: any;
  };

  @ApiProperty({ example: 1640995200, description: '이벤트 생성 시간' })
  @IsInt()
  created: number;
}

// ===== 한국 PG사 관련 =====
export class TossPaymentDto {
  @ApiProperty({ example: 'toss_payment_123', description: 'Toss 결제 키' })
  @IsString()
  @IsNotEmpty()
  payment_key: string;

  @ApiProperty({ example: 'order_123456', description: '주문 ID' })
  @IsString()
  @IsNotEmpty()
  order_id: string;

  @ApiProperty({ example: 50000, description: '결제 금액' })
  @IsInt()
  @IsPositive()
  amount: number;
}

export class KakaoPaymentDto {
  @ApiProperty({ example: 'kakao_tid_123', description: 'Kakao Pay TID' })
  @IsString()
  @IsNotEmpty()
  tid: string;

  @ApiProperty({ example: 'order_123456', description: '주문 ID' })
  @IsString()
  @IsNotEmpty()
  partner_order_id: string;

  @ApiProperty({ example: 'user_123', description: '사용자 ID' })
  @IsString()
  @IsNotEmpty()
  partner_user_id: string;
}

// ===== 결제 조회/수정 =====
export class UpdatePaymentDto {
  @ApiPropertyOptional({
    example: PaymentStatus.COMPLETED,
    description: '결제 상태',
    enum: PaymentStatus,
  })
  @IsEnum(PaymentStatus)
  @IsOptional()
  status?: PaymentStatus;

  @ApiPropertyOptional({ example: 'payment_confirmed_by_admin', description: '상태 변경 사유' })
  @IsString()
  @IsOptional()
  status_reason?: string;

  @ApiPropertyOptional({
    example: {
      confirmed_by: 'admin',
      confirmation_time: '2024-01-01T12:00:00Z',
    },
    description: '추가 메타데이터',
  })
  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;
}

export class RefundPaymentDto {
  @ApiProperty({ example: 25000, description: '환불 금액 (부분 환불 가능)' })
  @IsInt()
  @IsPositive()
  amount: number;

  @ApiProperty({ example: '사용자 요청으로 인한 환불', description: '환불 사유' })
  @IsString()
  @IsNotEmpty()
  reason: string;

  @ApiPropertyOptional({
    example: {
      refund_account: '110-123-456789',
      refund_bank: '신한은행',
    },
    description: '환불 관련 추가 정보',
  })
  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;
}

// ===== 응답 DTOs =====
export class PaymentResponseDto {
  @ApiProperty({ example: 1, description: '결제 ID' })
  id: number;

  @ApiProperty({ example: 1, description: '세션 ID' })
  session_id: number;

  @ApiProperty({ example: 1, description: '사용자 ID' })
  user_id: number;

  @ApiProperty({ example: 50000, description: '결제 금액' })
  amount: number;

  @ApiProperty({
    example: Currency.KRW,
    description: '통화',
    enum: Currency,
  })
  currency: Currency;

  @ApiProperty({
    example: PaymentProvider.STRIPE,
    description: '결제 제공업체',
    enum: PaymentProvider,
  })
  provider: PaymentProvider;

  @ApiProperty({
    example: PaymentMethod.CARD,
    description: '결제 수단',
    enum: PaymentMethod,
  })
  method: PaymentMethod;

  @ApiProperty({
    example: PaymentStatus.COMPLETED,
    description: '결제 상태',
    enum: PaymentStatus,
  })
  status: PaymentStatus;

  @ApiProperty({ example: 'React 워크샵 참가비', description: '결제 설명' })
  description: string;

  @ApiProperty({ example: 'pi_1234567890', description: '외부 결제 ID' })
  external_payment_id?: string;

  @ApiProperty({
    example: {
      customer_name: '홍길동',
      payment_method_details: { last4: '4242' },
    },
    description: '메타데이터',
  })
  metadata: Record<string, any>;

  @ApiProperty({ example: '2024-01-01T00:00:00Z', description: '생성 시각' })
  created_at: string;

  @ApiProperty({ example: '2024-01-01T00:00:00Z', description: '수정 시각' })
  updated_at: string;

  @ApiProperty({ example: '2024-01-01T12:00:00Z', description: '결제 완료 시각' })
  paid_at?: string;
}

export class PaymentIntentResponseDto {
  @ApiProperty({ example: 'pi_1234567890', description: 'Payment Intent ID' })
  payment_intent_id: string;

  @ApiProperty({ example: 'pi_1234567890_secret_abc', description: 'Client Secret' })
  client_secret: string;

  @ApiProperty({ example: 50000, description: '결제 금액' })
  amount: number;

  @ApiProperty({ example: Currency.KRW, description: '통화' })
  currency: Currency;

  @ApiProperty({ example: PaymentStatus.PENDING, description: '상태' })
  status: PaymentStatus;
}

// ===== 조회 DTOs =====
export class PaymentQueryDto {
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
    example: PaymentStatus.COMPLETED,
    description: '상태 필터',
    enum: PaymentStatus,
  })
  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;

  @ApiPropertyOptional({
    example: PaymentProvider.STRIPE,
    description: '제공업체 필터',
    enum: PaymentProvider,
  })
  @IsOptional()
  @IsEnum(PaymentProvider)
  provider?: PaymentProvider;

  @ApiPropertyOptional({ example: 10000, description: '최소 금액' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  min_amount?: number;

  @ApiPropertyOptional({ example: 100000, description: '최대 금액' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  max_amount?: number;

  @ApiPropertyOptional({ example: '2024-01-01T00:00:00Z', description: '생성일 시작' })
  @IsOptional()
  @Type(() => Date)
  created_after?: Date;

  @ApiPropertyOptional({ example: '2024-12-31T23:59:59Z', description: '생성일 종료' })
  @IsOptional()
  @Type(() => Date)
  created_before?: Date;

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
