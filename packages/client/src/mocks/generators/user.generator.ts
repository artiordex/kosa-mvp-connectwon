/**
 * Description: user.generator.ts - 📌 사용자 / 크리에이터 / 활동 데이터 생성기
 * Author: Shiwoo Min
 * Date: 2025-10-09
 */
import { faker } from '@faker-js/faker/locale/ko';
import type {
  User,
  UserRole,
  UserStatus,
  UserActivity,
  Creator,
  CreatorVerificationStatus,
} from '../../mock-types.js';

// User 생성기
export function generateUser(override: Partial<User> = {}): User {
  const role: UserRole = faker.helpers.arrayElement(['user', 'creator', 'mentor', 'admin']);
  const status: UserStatus = faker.helpers.arrayElement(['active', 'inactive', 'suspended']);
  const createdAt = faker.date.past({ years: 2 } as any);

  const hasAvatar = Math.random() > 0.3;
  const hasBio = Math.random() > 0.5;
  const hasPhone = Math.random() > 0.7;
  const hasLastLogin = Math.random() > 0.3;

  return {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    name: faker.person.fullName(),
    ...(hasAvatar && { avatar: faker.image.avatar() }),
    role,
    status,
    ...(hasBio && { bio: faker.lorem.sentence() }),
    ...(hasPhone && { phone: faker.phone.number({ style: 'national' }) }),
    emailVerified: Math.random() > 0.2,
    ...(hasLastLogin && { lastLoginAt: faker.date.recent({ days: 7 } as any).toISOString() }),
    createdAt: createdAt.toISOString(),
    updatedAt: faker.date.recent({ days: 30 } as any).toISOString(),
    ...override,
  };
}

// UserActivity 생성기
export function generateUserActivity(override: Partial<UserActivity> = {}): UserActivity {
  const action = faker.helpers.arrayElement([
    'login',
    'logout',
    'profile_update',
    'reservation_created',
    'reservation_cancelled',
    'program_joined',
  ] as const);

  return {
    id: faker.string.uuid(),
    userId: faker.string.uuid(),
    action,
    description: `사용자가 ${action.replace('_', ' ')} 했습니다.`,
    createdAt: faker.date.recent({ days: 5 } as any).toISOString(),
    ...override,
  };
}

// Creator 생성기
export function generateCreator(override: Partial<Creator> = {}): Creator {
  const name = faker.person.fullName();
  const verificationStatus: CreatorVerificationStatus = faker.helpers.arrayElement([
    'pending',
    'verified',
    'rejected',
  ]);

  const isVerified = verificationStatus === 'verified';

  return {
    userId: faker.string.uuid(),
    displayName: name,
    slug: faker.helpers.slugify(name).toLowerCase(),
    bio: faker.lorem.paragraph(),
    expertise: faker.helpers.arrayElements(['창업', '디자인', '마케팅', '개발'], { min: 2, max: 3 }),
    rating: faker.number.float({ min: 3.5, max: 5.0, fractionDigits: 1 }),
    reviewCount: faker.number.int({ min: 0, max: 200 }),
    verificationStatus,
    ...(isVerified && { verifiedAt: faker.date.past({ years: 1 } as any).toISOString() }),
    createdAt: faker.date.past({ years: 2 } as any).toISOString(),
    updatedAt: faker.date.recent({ days: 30 } as any).toISOString(),
    ...override,
  };
}

// 다중 생성 헬퍼
export function generateUserList(count = 10): User[] {
  return Array.from({ length: count }, () => generateUser());
}

export function generateUserActivityList(userId: string, count = 10): UserActivity[] {
  return Array.from({ length: count }, () => generateUserActivity({ userId }));
}

export function generateCreatorList(count = 10): Creator[] {
  return Array.from({ length: count }, () => generateCreator());
}
