import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 사용자 로그인
   * @param {LoginDto} loginDto - 로그인 요청 데이터
   * @returns {Promise<{ accessToken: string }>} - JWT 토큰 반환
   */
  @Post('login')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: '로그인 성공', type: String })
  async login(@Body() loginDto: LoginDto) {
    const accessToken = await this.authService.login(loginDto);
    return { accessToken };
  }
}
