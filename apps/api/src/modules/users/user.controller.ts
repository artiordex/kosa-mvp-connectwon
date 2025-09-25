import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
// 사용자 생성 DTO
import { UserDto } from './dto/user.dto';
import { UsersService } from './user.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './user.service';

// 사용자 조회 DTO

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * 사용자 생성
   * @param {CreateUserDto} createUserDto - 사용자 생성 데이터
   * @returns {Promise<{ userId: string }>} - 생성된 사용자 ID 반환
   */
  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const userId = await this.usersService.createUser(createUserDto);
    return { userId };
  }

  /**
   * 사용자 조회
   * @param {string} userId - 사용자 ID
   * @returns {Promise<UserDto>} - 조회된 사용자 정보 반환
   */
  @Get(':userId')
  async getUser(@Param('userId') userId: string) {
    const user = await this.usersService.getUser(userId);
    return user;
  }
}
