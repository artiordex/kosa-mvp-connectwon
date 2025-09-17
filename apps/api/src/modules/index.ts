/**
 * Description : index.ts - 📌 도메인 모듈
 * Author : Shiwoo Min
 * Date : 2025-09-12
 */
// TODO: 실제 모듈 구현 후 import 활성화
// import { AiModule } from './ai/module.js';
// import { AuthModule } from './auth/module.js';
// import { PaymentsModule } from './payments/module.js';
// import { ProgramsModule } from './programs/module.js';
// import { ReservationModule } from './reservations/module.js';
// import { UsersModule } from './users/module.js';
// import { VenuesModule } from './venues/module.js';

// 임시 모듈 대체 (빈 객체 또는 placeholder)
const AiModule = {};
const AuthModule = {};
const PaymentsModule = {};
const ProgramsModule = {};
const ReservationModule = {};
const UsersModule = {};
const VenuesModule = {};

// AppModule에서 한 번에 가져다 쓰기 위한 모듈 묶음
export const ApiModules = [
  AiModule,
  AuthModule,
  PaymentsModule,
  ProgramsModule,
  ReservationModule,
  UsersModule,
  VenuesModule,
] as const;

// 필요 시 개별 모듈도 바로 import 가능하도록 재노출
export {
  AiModule,
  AuthModule,
  PaymentsModule,
  ProgramsModule,
  ReservationModule,
  UsersModule,
  VenuesModule,
};
