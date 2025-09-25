import { Module } from '@nestjs/common';

import { UsersController } from './user.controller';
import { UsersProcessor } from './user.processor';
import { UsersService } from './user.service';

import { UsersController } from './user.controller';
import { UsersProcessor } from './user.processor';
import { UsersService } from './user.service';

// 사용자 처리 로직

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, UsersProcessor], // 사용자 서비스와 프로세서 연결
})
export class UsersModule {}
