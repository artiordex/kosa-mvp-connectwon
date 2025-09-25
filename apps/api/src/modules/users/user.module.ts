/**
 * Description : user.module.ts - 📌 사용자 모듈 정의
 * Author : Shiwoo Min
 * Date : 2025-09-26
 */
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    // TODO: TypeOrmModule.forFeature([UserEntity]) 또는 Prisma 등 ORM 연결 추가
    // TODO: 다른 모듈 (AuthModule, ReservationModule 등) 필요시 imports에 추가
  ],
  controllers: [UserController],
  providers: [
    UserService,
    // TODO: 추가 Provider (예: UserRepository, UserProcessor 등) 등록
  ],
  exports: [
    UserService
  ],
})
export class UserModule {}
