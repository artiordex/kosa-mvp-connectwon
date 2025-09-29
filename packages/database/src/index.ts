/**
 * Description : client.ts - 📌 database 패키지의 클라이언트
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */

// Adapters 전부 export
export * from './adapters/ai.adapter.js';
export * from './adapters/db.adapter.js';
export * from './adapters/device.adapter.js';
export * from './adapters/program.adapter.js';
export * from './adapters/review.adapter.js';
export * from './adapters/room.adapter.js';
export * from './adapters/user-activity.adapter.js';
export * from './adapters/user.adapter.js';
export * from './adapters/venue.adapter.js';

// Prisma Client
export * from './client.js';
export * from './utils.js';
export * from '@prisma/client';
