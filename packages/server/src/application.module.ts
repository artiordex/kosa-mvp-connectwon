/**
 * Description : application.module.ts - 📌 Application Layer Module (Nest)
 * Author: Shiwoo Min
 * Date : 2025-09-27
 */
import { Module } from '@nestjs/common';
// Guards
import { APP_GUARD } from '@nestjs/core';

// Core Layer imports
import { OverbookingPolicyService } from '@connectwon/core/application/policies/overbooking.policies.js';
import { WaitlistPolicyService } from '@connectwon/core/application/policies/waitlist.policy.js';
import { CreateProgramUsecase } from '@connectwon/core/application/usecases/program.usecase.js';
import { ReservationUsecase } from '@connectwon/core/application/usecases/reservation.usecase.js';
import { ScheduleSessionUsecase } from '@connectwon/core/application/usecases/schedule.usecase.js';
import { RoleGuard } from './guards/role.guard.js';

@Module({
  providers: [
    // Policies
    OverbookingPolicyService,
    WaitlistPolicyService,

    // Usecases
    ReservationUsecase,
    CreateProgramUsecase,
    ScheduleSessionUsecase,

    // Global Guard (선택)
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
  exports: [ReservationUsecase, CreateProgramUsecase, ScheduleSessionUsecase],
})
export class ApplicationModule {}
