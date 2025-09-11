/**
 * Description : application.module.ts - 📌 애플리케이션 모듈
 * Author      : Shiwoo Min
 * Date        : 2025-09-10
 */
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { RequireRoleGuard } from './guards/require-role.js';
import { OverbookingPolicyService } from './policies/overbooking.js';
import { WaitlistPolicyService } from './policies/waitlist.js';
import { CreateProgramUsecase } from './usecases/program.js';
import { ReservationUsecase } from './usecases/reservation.js';
import { ScheduleSessionUsecase } from './usecases/schedule.js';

@Module({
  providers: [
    // Policies
    OverbookingPolicyService,
    WaitlistPolicyService,

    // Usecases
    ReservationUsecase,
    CreateProgramUsecase,
    ScheduleSessionUsecase,

    // Global Guard (선택): @Roles()가 달린 핸들러만 권한 검사
    { provide: APP_GUARD, useClass: RequireRoleGuard },
  ],
  exports: [ReservationUsecase, CreateProgramUsecase, ScheduleSessionUsecase],
})
export class ApplicationModule {}
