/**
 * Description : tsconfig.json - 📌 core 패키지의 domain/authz 참조 추가
 * Author : Shiwoo Min
 * Date : 2025-09-21
 * 빌드 로그 확인 - tsc -p tsconfig.json --listEmittedFiles
 */
// configs/eslint
export { default as eslint } from './configs/eslint/base.js';

// configs/tailwind
export { default as tailwindAdmin } from './configs/tailwind/admin.js';
export { default as tailwindBase } from './configs/tailwind/base.js';
export { default as tailwindWeb } from './configs/tailwind/web.js';

// configs/testing
export { default as testingPlaywright } from './configs/testing/playwright.js';
export { default as testingVitest } from './configs/testing/vitest.js';

// configs/typescript
export { default as tsconfigBase } from './configs/typescript/base.json';
export { default as tsconfigNode } from './configs/typescript/node.json';
export { default as tsconfigWeb } from './configs/typescript/web.json';


// application
export * from './application/policies/overbooking.policies.js';
export * from './application/policies/waitlist.policy.js';

// usecases
export * from './application/usecases/program.usecase.js';
export * from './application/usecases/reservation.usecase.js';
export * from './application/usecases/schedule.usecase.js';

// domain
export * from './domain/value-objects.js';

// queue
export * from './queue/bull.queue.js';
export * from './queue/manager.queue.js';
export * from './queue/processor.queue.js';
export * from './queue/scheduler.queue.js';

// ports
export * from './ports/ai.port.js';
export * from './ports/cache.port.js';
export * from './ports/db.port.js';
export * from './ports/notification.port.js';
export * from './ports/program.port.js';
export * from './ports/search.port.js';
export * from './ports/session.port.js';
export * from './ports/time.port.js';
export * from './ports/users.port.js';
export * from './ports/venue.port.js';

// env
export * from './connectwon-env.js';
