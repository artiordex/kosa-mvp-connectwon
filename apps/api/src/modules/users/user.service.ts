import { Injectable } from '@nestjs/common';

// 사용자 처리 프로세서
import { CreateUserDto } from './dto/create-user.dto';
// 사용자 생성 DTO
import { UserDto } from './dto/user.dto';
import { UsersProcessor } from './user.processor';

import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersProcessor } from './user.processor';

// 사용자 조회 DTO

@Injectable()
export class UsersService {
  constructor(private readonly usersProcessor: UsersProcessor) {}

  /**
   * 새로운 사용자를 생성합니다.
   * @param {CreateUserDto} createUserDto - 사용자 생성 데이터
   * @returns {Promise<string>} - 생성된 사용자 ID
   */
  async createUser(createUserDto: CreateUserDto): Promise<string> {
    const userId = await this.usersProcessor.processUserCreation(createUserDto);
    return userId;
  }

  /**
   * 사용자 ID로 사용자를 조회합니다.
   * @param {string} userId - 사용자 ID
   * @returns {Promise<UserDto>} - 조회된 사용자 정보
   */
  async getUser(userId: string): Promise<UserDto> {
    const user = await this.usersProcessor.getUserDetails(userId);
    return user;
  }
}
