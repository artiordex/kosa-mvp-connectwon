import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './jwt-payload.interface';

import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * 로그인하여 JWT 토큰을 발급합니다.
   * @param {LoginDto} loginDto - 로그인 정보 (예: 사용자 이름, 비밀번호)
   * @returns {Promise<string>} - JWT 토큰
   */
  async login(loginDto: LoginDto): Promise<string> {
    // 실제 구현에서는 DB에서 사용자 인증을 수행해야 합니다.
    const payload: JwtPayload = { username: loginDto.username }; // 예시로 username만 사용

    // JWT 토큰 생성
    return this.jwtService.sign(payload);
  }
}
