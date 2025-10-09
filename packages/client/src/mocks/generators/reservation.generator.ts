/**
 * Description: reservation.generator.ts - 📌 예약 / 참가 데이터 생성기
 * Author: Shiwoo Min
 * Date: 2025-10-09
 */
import { faker } from '@faker-js/faker/locale/ko';
import type {
  Reservation,
  ReservationStatus,
  PaymentStatus,
  Program,
  ProgramCategory,
} from '../../mock-types.js';

// 예약 생성
export function generateReservation(override: Partial<Reservation> = {}): Reservation {
  const status: ReservationStatus = faker.helpers.arrayElement([
    'reserved',
    'confirmed',
    'attended',
    'cancelled',
    'refunded',
  ]);

  const paymentStatus: PaymentStatus = faker.helpers.arrayElement([
    'pending',
    'success',
    'refunded',
    'failed',
  ]);

  const isPaid = paymentStatus === 'success';
  const price = isPaid ? faker.number.int({ min: 10000, max: 300000 }) : 0;
  const createdAt = faker.date.past({ years: 0.5 }); // 6개월 = 0.5년

  const isCancelled = status === 'cancelled';
  const isAttended = status === 'attended';

  // 프로그램 스냅샷 생성
  const programSnapshot = generateProgramSnapshot();

  return {
    id: faker.string.uuid(),
    programId: faker.string.uuid(),
    userId: faker.number.int({ min: 1, max: 999 }),
    userName: faker.person.fullName(),
    status,
    paymentStatus,
    paymentAmount: price,
    currency: 'KRW',
    reservedAt: createdAt.toISOString(),
    ...(isCancelled && {
      cancelledAt: faker.date.between({ from: createdAt, to: new Date() }).toISOString(),
    }),
    ...(isAttended && {
      attendedAt: faker.date.between({ from: createdAt, to: new Date() }).toISOString(),
    }),
    programSnapshot,
    ...override,
  };
}

// 프로그램 스냅샷 생성 (간단한 Program 타입)
function generateProgramSnapshot(): Program {
  const category: ProgramCategory = faker.helpers.arrayElement([
    '창업',
    '마케팅',
    '재무',
    'IT/개발',
    '디자인',
    '피칭',
    '비즈니스',
    '커리어',
    '라이프',
    '기타',
  ]);

  const titleMap: Record<ProgramCategory, string[]> = {
    창업: ['MVP 만들기', '린 스타트업', '아이디어 검증', '사업계획서 작성'],
    마케팅: ['디지털 마케팅 실전', '콘텐츠 마케팅', '브랜딩 전략', 'SNS 마케팅'],
    재무: ['투자 유치 전략', '회계 실무', '재무제표 이해', '세무 관리'],
    'IT/개발': ['AI 서비스 기획', '노코드 앱', '웹개발 기초', '데이터 분석'],
    디자인: ['UX/UI 디자인', '프로토타입 제작', '피그마 실습', '디자인 씽킹'],
    피칭: ['IR 피칭', '발표 스킬', '투자자 설득', '스토리텔링'],
    비즈니스: ['전략적 사고', '리더십', '협상 기술', '프로젝트 관리'],
    커리어: ['이직 성공 전략', '포트폴리오 만들기', '면접 스킬', '자기계발'],
    라이프: ['생산성 향상', '스트레스 관리', '시간 관리', '워라밸'],
    기타: ['네트워킹', '크리에이티브 워크샵', '콘텐츠 제작', '커뮤니케이션'],
  };

  const title = faker.helpers.arrayElement(titleMap[category]);
  const slug = faker.helpers.slugify(title).toLowerCase();

  return {
    id: faker.string.uuid(),
    title,
    slug,
    description: faker.lorem.paragraph(),
    category,
    price: faker.number.int({ min: 30000, max: 200000 }),
    rating: faker.number.float({ min: 3.5, max: 5.0, fractionDigits: 1 }),
    viewCount: faker.number.int({ min: 50, max: 2000 }),
    createdAt: faker.date.past({ years: 1 }).toISOString(),
    updatedAt: faker.date.recent({ days: 30 }).toISOString(),
  };
}

// 다중 예약 생성
export function generateReservationList(count = 10): Reservation[] {
  return Array.from({ length: count }, () => generateReservation());
}

// 사용자별 예약 생성
export function generateUserReservations(userId: number, count = 10): Reservation[] {
  return Array.from({ length: count }, () => generateReservation({ userId }));
}

// 프로그램별 예약 생성
export function generateProgramReservations(programId: string, count = 10): Reservation[] {
  return Array.from({ length: count }, () => generateReservation({ programId }));
}

// 상태별 예약 생성
export function generateStatusReservations(status: ReservationStatus, count = 10): Reservation[] {
  return Array.from({ length: count }, () => generateReservation({ status }));
}

// 예약 통계 생성
export function generateReservationStats(userId?: number) {
  const total = faker.number.int({ min: 5, max: 50 });
  const reserved = faker.number.int({ min: 0, max: Math.floor(total * 0.3) });
  const confirmed = faker.number.int({ min: 0, max: Math.floor(total * 0.4) });
  const attended = faker.number.int({ min: 0, max: Math.floor(total * 0.6) });
  const cancelled = total - (reserved + confirmed + attended);

  return {
    userId,
    totalReservations: total,
    reserved,
    confirmed,
    attended,
    cancelled,
    refunded: faker.number.int({ min: 0, max: cancelled }),
    totalSpent: faker.number.int({ min: 100000, max: 5000000 }),
    averageAmount: faker.number.int({ min: 30000, max: 150000 }),
    lastReservationAt: faker.date.recent({ days: 30 }).toISOString(),
  };
}

// 예약 가능 여부 체크 (시뮬레이션)
export function checkReservationAvailability(programId: string) {
  const capacity = faker.number.int({ min: 10, max: 50 });
  const enrolled = faker.number.int({ min: 0, max: capacity });
  const isAvailable = enrolled < capacity;
  const waitlistCount = !isAvailable ? faker.number.int({ min: 0, max: 20 }) : 0;

  return {
    programId,
    capacity,
    enrolled,
    available: capacity - enrolled,
    isAvailable,
    waitlistCount,
    estimatedWaitTime: !isAvailable ? faker.number.int({ min: 1, max: 14 }) : null,
    nextAvailableDate: !isAvailable
      ? faker.date.future({ years: 0.1 }).toISOString()
      : null,
  };
}

// 예약 취소 시뮬레이션
export function simulateReservationCancellation(reservationId: string) {
  const cancelledAt = new Date();
  const refundEligible = Math.random() > 0.3;
  const refundAmount = refundEligible
    ? faker.number.int({ min: 10000, max: 300000 })
    : 0;
  const refundReason = refundEligible
    ? faker.helpers.arrayElement([
        '일정 변경',
        '개인 사정',
        '프로그램 불만족',
        '중복 신청',
        '기타',
      ])
    : '환불 기한 경과';

  return {
    reservationId,
    cancelledAt: cancelledAt.toISOString(),
    refundEligible,
    refundAmount,
    refundReason,
    cancellationFee: refundEligible ? faker.number.int({ min: 0, max: 10000 }) : 0,
    processedBy: faker.number.int({ min: 1, max: 10 }),
    notes: faker.lorem.sentence(),
  };
}
