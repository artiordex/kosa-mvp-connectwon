/**
 * Description : dto.ts - 📌 AI 모듈 DTO 정의
 * Author : Shiwoo Min
 * Date : 2025-09-12
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
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
import 'reflect-metadata';

export enum AIProvider {
  OPENAI = 'OPENAI',
  ANTHROPIC = 'ANTHROPIC',
  HUGGINGFACE = 'HUGGINGFACE',
}

export enum AIInteractionKind {
  CHAT = 'chat',
  EMBEDDING = 'embed',
  COMPLETION = 'completion',
  SUMMARIZATION = 'summarization',
  CLASSIFICATION = 'classification',
}

export enum AIStatus {
  OK = 'OK',
  ERROR = 'ERROR',
}

export class CreateAIInteractionDto {
  @ApiPropertyOptional({ example: 1, description: '사용자 ID' })
  @IsInt()
  @IsPositive()
  @IsOptional()
  user_id?: number;

  @ApiPropertyOptional({ example: 1, description: '프로그램 ID' })
  @IsInt()
  @IsPositive()
  @IsOptional()
  program_id?: number;

  @ApiPropertyOptional({ example: 1, description: '세션 ID' })
  @IsInt()
  @IsPositive()
  @IsOptional()
  session_id?: number;

  @ApiProperty({
    example: AIProvider.OPENAI,
    description: 'AI 제공업체',
    enum: AIProvider,
  })
  @IsEnum(AIProvider)
  provider: AIProvider;

  @ApiProperty({ example: 'gpt-4', description: 'AI 모델명' })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({
    example: AIInteractionKind.CHAT,
    description: 'AI 상호작용 종류',
    enum: AIInteractionKind,
  })
  @IsEnum(AIInteractionKind)
  kind: AIInteractionKind;

  @ApiPropertyOptional({ example: 150, description: '요청 토큰 수' })
  @IsInt()
  @Min(0)
  @IsOptional()
  prompt_tokens?: number = 0;

  @ApiPropertyOptional({ example: 300, description: '응답 토큰 수' })
  @IsInt()
  @Min(0)
  @IsOptional()
  completion_tokens?: number = 0;

  @ApiPropertyOptional({ example: 0.045, description: '비용' })
  @IsNumber({ maxDecimalPlaces: 6 })
  @Min(0)
  @IsOptional()
  cost?: number = 0;

  @ApiPropertyOptional({
    example: AIStatus.OK,
    description: '상태',
    enum: AIStatus,
  })
  @IsEnum(AIStatus)
  @IsOptional()
  status?: AIStatus = AIStatus.OK;

  @ApiPropertyOptional({ example: 'trace-123456', description: '추적 ID' })
  @IsString()
  @IsOptional()
  trace_id?: string;

  @ApiPropertyOptional({
    example: {
      request_data: {},
      response_data: {},
      error_message: null,
    },
    description: '부가정보',
  })
  @IsObject()
  @IsOptional()
  meta?: Record<string, any>;
}

export class UpdateAIInteractionDto {
  @ApiPropertyOptional({ example: 150, description: '요청 토큰 수' })
  @IsInt()
  @Min(0)
  @IsOptional()
  prompt_tokens?: number;

  @ApiPropertyOptional({ example: 300, description: '응답 토큰 수' })
  @IsInt()
  @Min(0)
  @IsOptional()
  completion_tokens?: number;

  @ApiPropertyOptional({ example: 0.045, description: '비용' })
  @IsNumber({ maxDecimalPlaces: 6 })
  @Min(0)
  @IsOptional()
  cost?: number;

  @ApiPropertyOptional({
    example: AIStatus.ERROR,
    description: '상태',
    enum: AIStatus,
  })
  @IsEnum(AIStatus)
  @IsOptional()
  status?: AIStatus;

  @ApiPropertyOptional({
    example: {
      error_message: 'Rate limit exceeded',
      retry_count: 3,
    },
    description: '부가정보',
  })
  @IsObject()
  @IsOptional()
  meta?: Record<string, any>;
}

export class AIInteractionResponseDto {
  @ApiProperty({ example: 1, description: 'AI 상호작용 ID' })
  id: number;

  @ApiProperty({ example: 1, description: '사용자 ID' })
  user_id?: number;

  @ApiProperty({ example: 1, description: '프로그램 ID' })
  program_id?: number;

  @ApiProperty({ example: 1, description: '세션 ID' })
  session_id?: number;

  @ApiProperty({
    example: AIProvider.OPENAI,
    description: 'AI 제공업체',
    enum: AIProvider,
  })
  provider: AIProvider;

  @ApiProperty({ example: 'gpt-4', description: 'AI 모델명' })
  model: string;

  @ApiProperty({
    example: AIInteractionKind.CHAT,
    description: 'AI 상호작용 종류',
    enum: AIInteractionKind,
  })
  kind: AIInteractionKind;

  @ApiProperty({ example: 150, description: '요청 토큰 수' })
  prompt_tokens: number;

  @ApiProperty({ example: 300, description: '응답 토큰 수' })
  completion_tokens: number;

  @ApiProperty({ example: 0.045, description: '비용' })
  cost: number;

  @ApiProperty({
    example: AIStatus.OK,
    description: '상태',
    enum: AIStatus,
  })
  status: AIStatus;

  @ApiProperty({ example: 'trace-123456', description: '추적 ID' })
  trace_id?: string;

  @ApiProperty({
    example: {
      request_data: {},
      response_data: {},
    },
    description: '부가정보',
  })
  meta: Record<string, any>;

  @ApiProperty({ example: '2024-01-01T00:00:00Z', description: '생성 시각' })
  created_at: string;
}

export class AIInteractionQueryDto {
  @ApiPropertyOptional({ example: 1, description: '사용자 ID 필터' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  user_id?: number;

  @ApiPropertyOptional({ example: 1, description: '프로그램 ID 필터' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  program_id?: number;

  @ApiPropertyOptional({ example: 1, description: '세션 ID 필터' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  session_id?: number;

  @ApiPropertyOptional({
    example: AIProvider.OPENAI,
    description: '제공업체 필터',
    enum: AIProvider,
  })
  @IsOptional()
  @IsEnum(AIProvider)
  provider?: AIProvider;

  @ApiPropertyOptional({ example: 'gpt-4', description: '모델 필터' })
  @IsOptional()
  @IsString()
  model?: string;

  @ApiPropertyOptional({
    example: AIInteractionKind.CHAT,
    description: '종류 필터',
    enum: AIInteractionKind,
  })
  @IsOptional()
  @IsEnum(AIInteractionKind)
  kind?: AIInteractionKind;

  @ApiPropertyOptional({
    example: AIStatus.OK,
    description: '상태 필터',
    enum: AIStatus,
  })
  @IsOptional()
  @IsEnum(AIStatus)
  status?: AIStatus;

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

// ===== AI 요청/응답 DTOs =====
export class ChatRequestDto {
  @ApiProperty({ example: 'React 워크샵에 대해 요약해주세요', description: '채팅 메시지' })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiPropertyOptional({ example: 1, description: '프로그램 ID (컨텍스트)' })
  @IsInt()
  @IsPositive()
  @IsOptional()
  program_id?: number;

  @ApiPropertyOptional({ example: 1, description: '세션 ID (컨텍스트)' })
  @IsInt()
  @IsPositive()
  @IsOptional()
  session_id?: number;

  @ApiPropertyOptional({
    example: { temperature: 0.7, max_tokens: 1000 },
    description: 'AI 모델 설정',
  })
  @IsObject()
  @IsOptional()
  options?: Record<string, any>;
}

export class ChatResponseDto {
  @ApiProperty({ example: '이 워크샵은 React의 기초부터...', description: 'AI 응답 메시지' })
  response: string;

  @ApiProperty({ example: 1, description: '상호작용 ID' })
  interaction_id: number;

  @ApiProperty({ example: 150, description: '사용된 토큰 수' })
  tokens_used: number;

  @ApiProperty({ example: 0.045, description: '비용' })
  cost: number;
}
