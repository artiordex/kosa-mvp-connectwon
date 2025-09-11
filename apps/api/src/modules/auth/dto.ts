import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsJWT,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com', description: '이메일 주소' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: '비밀번호' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class GoogleAuthDto {
  @ApiProperty({ example: 'google_oauth_code', description: 'Google OAuth 인증 코드' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiPropertyOptional({
    example: 'http://localhost:3000/auth/callback',
    description: '리디렉션 URI',
  })
  @IsUrl()
  @IsOptional()
  redirect_uri?: string;
}

export class GoogleTokenDto {
  @ApiProperty({ example: 'ya29.a0AfH6...', description: 'Google Access Token' })
  @IsString()
  @IsNotEmpty()
  access_token: string;

  @ApiProperty({ example: 'eyJhbGciOiJSUzI1NiI...', description: 'Google ID Token' })
  @IsJWT()
  id_token: string;
}

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com', description: '이메일 주소' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '홍길동', description: '사용자 이름' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'password123', description: '비밀번호' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiI...', description: '리프레시 토큰' })
  @IsJWT()
  refresh_token: string;
}

export class ResetPasswordDto {
  @ApiProperty({ example: 'user@example.com', description: '이메일 주소' })
  @IsEmail()
  email: string;
}

export class ConfirmResetPasswordDto {
  @ApiProperty({ example: 'reset_token_123', description: '비밀번호 재설정 토큰' })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({ example: 'newpassword123', description: '새 비밀번호' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  new_password: string;
}

export class ChangePasswordDto {
  @ApiProperty({ example: 'oldpassword123', description: '현재 비밀번호' })
  @IsString()
  @IsNotEmpty()
  current_password: string;

  @ApiProperty({ example: 'newpassword123', description: '새 비밀번호' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  new_password: string;
}

// ===== 응답 DTOs =====
export class AuthResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiI...', description: '액세스 토큰' })
  access_token: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiI...', description: '리프레시 토큰' })
  refresh_token: string;

  @ApiProperty({ example: 'Bearer', description: '토큰 타입' })
  token_type: string;

  @ApiProperty({ example: 3600, description: '만료 시간 (초)' })
  expires_in: number;

  @ApiProperty({ description: '사용자 정보' })
  user: {
    id: number;
    email: string;
    name: string;
    role_flags: number;
    last_login_at?: string;
  };
}

export class TokenValidationResponseDto {
  @ApiProperty({ example: true, description: '토큰 유효성' })
  valid: boolean;

  @ApiProperty({ example: 1, description: '사용자 ID' })
  user_id?: number;

  @ApiProperty({ example: 1640995200, description: '만료 시간 (Unix timestamp)' })
  expires_at?: number;

  @ApiProperty({ example: ['user', 'admin'], description: '사용자 권한' })
  permissions?: string[];
}

export class LogoutResponseDto {
  @ApiProperty({ example: '로그아웃되었습니다.', description: '메시지' })
  message: string;

  @ApiProperty({ example: true, description: '성공 여부' })
  success: boolean;
}

export class GoogleUserInfoDto {
  @ApiProperty({ example: 'google_sub_123456', description: 'Google Sub (고유 ID)' })
  sub: string;

  @ApiProperty({ example: 'user@gmail.com', description: '이메일' })
  email: string;

  @ApiProperty({ example: true, description: '이메일 인증 여부' })
  email_verified: boolean;

  @ApiProperty({ example: '홍길동', description: '이름' })
  name: string;

  @ApiProperty({
    example: 'https://lh3.googleusercontent.com/...',
    description: '프로필 이미지 URL',
  })
  picture?: string;

  @ApiProperty({ example: 'ko', description: '언어 설정' })
  locale?: string;
}
