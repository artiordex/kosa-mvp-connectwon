/**
 * Description: membership.generator.ts - 📌 멤버십/구독 데이터 생성기
 * Author: Shiwoo Min
 * Date: 2025-10-09
 */
import { faker } from '@faker-js/faker/locale/ko';
import type {
  Membership,
  MembershipTier,
  BillingCycle,
  MembershipLimits,
  UserSubscription,
  SubscriptionStatus,
  SubscriptionUsage,
} from '../../mock-types.js';

// 멤버십 플랜 생성
export function generateMembership(
  override: Partial<Membership> = {}
): Membership {
  const tier: MembershipTier = faker.helpers.arrayElement(
    ['free', 'basic', 'pro', 'enterprise'] as const
  );
  const plan = getMembershipDataByTier(tier);

  return {
    id: faker.string.uuid(),
    name: plan.name,
    slug: plan.slug,
    tier,
    price: plan.price,
    billingCycle: 'monthly',
    description: plan.description,
    features: plan.features,
    limits: plan.limits,
    benefits: plan.benefits,
    color: plan.color,
    ...(plan.icon && { icon: plan.icon }),
    isPopular: tier === 'pro',
    isActive: true,
    order: ['free', 'basic', 'pro', 'enterprise'].indexOf(tier),
    ...(tier !== 'free' && { trialDays: 14 }),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    ...override,
  };
}

// 티어별 플랜 정의
function getMembershipDataByTier(tier: MembershipTier) {
  const plans: Record<MembershipTier, any> = {
    free: {
      name: 'Free',
      slug: 'free',
      price: 0,
      description: '시작하기 좋은 무료 플랜',
      color: '#6B7280',
      icon: '🆓',
      features: ['월 5시간 공간 이용', '기본 프로그램 참여', '커뮤니티 액세스', '기본 지원'],
      limits: {
        roomHoursPerMonth: 5,
        programsPerMonth: 2,
        mentoringSessionsPerMonth: 0,
        equipmentRentalsPerMonth: 1,
        storageGB: 1,
        teamMembers: 1,
      },
      benefits: {
        priorityBooking: false,
        discountRate: 0,
        freeEventAccess: false,
        dedicatedSupport: false,
        apiAccess: false,
        customBranding: false,
        advancedAnalytics: false,
      },
    },
    basic: {
      name: 'Basic',
      slug: 'basic',
      price: 49000,
      description: '개인 사용자용 기본 플랜',
      color: '#3B82F6',
      icon: '⭐',
      features: [
        '월 20시간 공간 이용',
        '모든 프로그램 참여',
        '월 2회 멘토링',
        '장비 대여 10% 할인',
        '우선 예약',
        '이메일 지원',
      ],
      limits: {
        roomHoursPerMonth: 20,
        programsPerMonth: 5,
        mentoringSessionsPerMonth: 2,
        equipmentRentalsPerMonth: 3,
        storageGB: 10,
        teamMembers: 1,
      },
      benefits: {
        priorityBooking: true,
        discountRate: 10,
        freeEventAccess: false,
        dedicatedSupport: false,
        apiAccess: false,
        customBranding: false,
        advancedAnalytics: false,
      },
    },
    pro: {
      name: 'Pro',
      slug: 'pro',
      price: 99000,
      description: '전문가를 위한 인기 플랜',
      color: '#8B5CF6',
      icon: '🚀',
      features: [
        '월 50시간 공간 이용',
        '무제한 프로그램 참여',
        '월 5회 멘토링',
        '장비 대여 20% 할인',
        '최우선 예약',
        '무료 이벤트',
        '전담 지원',
        'API 액세스',
      ],
      limits: {
        roomHoursPerMonth: 50,
        programsPerMonth: null,
        mentoringSessionsPerMonth: 5,
        equipmentRentalsPerMonth: 10,
        storageGB: 50,
        teamMembers: 3,
      },
      benefits: {
        priorityBooking: true,
        discountRate: 20,
        freeEventAccess: true,
        dedicatedSupport: true,
        apiAccess: true,
        customBranding: false,
        advancedAnalytics: true,
      },
    },
    enterprise: {
      name: 'Enterprise',
      slug: 'enterprise',
      price: 299000,
      description: '기업용 맞춤 플랜',
      color: '#EF4444',
      icon: '💼',
      features: [
        '무제한 공간 이용',
        '무제한 프로그램 참여',
        '무제한 멘토링',
        '장비 대여 30% 할인',
        '전용 공간 제공',
        '커스텀 브랜딩',
        '전담 매니저',
        'API 무제한',
        '고급 분석',
        'SLA 보장',
      ],
      limits: {
        roomHoursPerMonth: null,
        programsPerMonth: null,
        mentoringSessionsPerMonth: null,
        equipmentRentalsPerMonth: null,
        storageGB: null,
        teamMembers: null,
      },
      benefits: {
        priorityBooking: true,
        discountRate: 30,
        freeEventAccess: true,
        dedicatedSupport: true,
        apiAccess: true,
        customBranding: true,
        advancedAnalytics: true,
      },
    },
  };
  return plans[tier];
}

// 사용자 구독 생성
export function generateUserSubscription(
  override: Partial<UserSubscription> = {}
): UserSubscription {
  const tier: MembershipTier = faker.helpers.arrayElement(
    ['free', 'basic', 'pro', 'enterprise'] as const
  );
  const status: SubscriptionStatus = faker.helpers.arrayElement(
    ['trialing', 'active', 'past_due', 'cancelled', 'expired'] as const
  );
  const billingCycle: BillingCycle = faker.helpers.arrayElement(
    ['monthly', 'quarterly', 'yearly'] as const
  );

  const plan = getMembershipDataByTier(tier);
  const startDate = faker.date.past({ years: 1 });

  const cycleDays =
    billingCycle === 'monthly'
      ? 30
      : billingCycle === 'quarterly'
      ? 90
      : 365;

  const endDate = new Date(startDate.getTime() + cycleDays * 86400000);
  const isTrial = status === 'trialing';
  const isCancelled = status === 'cancelled';
  const isActive = status === 'active';

  return {
    id: faker.string.uuid(),
    userId: faker.number.int({ min: 1, max: 999 }),
    membershipId: faker.string.uuid(),
    membershipName: plan.name,
    tier,
    status,
    billingCycle,
    price: plan.price,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    ...(isActive && !isCancelled && {
      nextBillingDate: new Date(endDate.getTime() + 86400000).toISOString(),
    }),
    autoRenew: !isCancelled && faker.datatype.boolean(),
    ...(isTrial && {
      trialEndDate: new Date(startDate.getTime() + 14 * 86400000).toISOString(),
    }),
    ...(isCancelled && {
      cancelledAt: faker.date.between({ from: startDate, to: endDate }).toISOString(),
    }),
    ...(isCancelled && {
      cancellationReason: faker.helpers.arrayElement([
        '가격이 비쌈',
        '기능 부족',
        '사용 빈도 낮음',
        '다른 서비스로 이동',
        '일시적 중단',
      ]),
    }),
    paymentMethod: faker.helpers.arrayElement([
      'card',
      'bank_transfer',
      'virtual_account',
      'corporate',
    ]),
    usage: generateSubscriptionUsage(plan.limits),
    createdAt: startDate.toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    ...override,
  };
}

// 구독 사용량
function generateSubscriptionUsage(limits: MembershipLimits): SubscriptionUsage {
  return {
    roomHoursUsed:
      limits.roomHoursPerMonth !== null
        ? faker.number.int({ min: 0, max: limits.roomHoursPerMonth })
        : faker.number.int({ min: 10, max: 200 }),
    programsCreated:
      limits.programsPerMonth !== null
        ? faker.number.int({ min: 0, max: limits.programsPerMonth })
        : faker.number.int({ min: 5, max: 30 }),
    mentoringUsed:
      limits.mentoringSessionsPerMonth !== null
        ? faker.number.int({ min: 0, max: limits.mentoringSessionsPerMonth })
        : faker.number.int({ min: 1, max: 10 }),
    equipmentRented:
      limits.equipmentRentalsPerMonth !== null
        ? faker.number.int({ min: 0, max: limits.equipmentRentalsPerMonth })
        : faker.number.int({ min: 1, max: 15 }),
  };
}
