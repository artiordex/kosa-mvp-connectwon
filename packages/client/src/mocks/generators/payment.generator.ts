/**
 * Description: payment.generator.ts - 📌 결제 데이터 생성기 (faker v9 대응)
 * Author: Shiwoo Min
 * Date: 2025-10-09
 */
import { faker } from '@faker-js/faker/locale/ko';

// 타입 정의
export interface Payment {
  id: string;
  userId: number;
  userName: string;
  type: PaymentType;
  method: PaymentMethod;
  status: PaymentStatus;
  amount: number;
  currency: string;
  description: string;
  orderNumber: string;
  transactionId: string | undefined;
  receiptUrl: string | undefined;
  metadata: PaymentMetadata | undefined;
  failureReason: string | undefined;
  paidAt: string | undefined;
  refundedAt: string | undefined;
  refundAmount: number | undefined;
  refundReason: string | undefined;
  createdAt: string;
  updatedAt: string;
}

export type PaymentType =
  | 'membership'
  | 'program'
  | 'room_reservation'
  | 'equipment_rental'
  | 'deposit'
  | 'mentoring'
  | 'event';

export type PaymentMethod =
  | 'card'
  | 'bank_transfer'
  | 'virtual_account'
  | 'paypal'
  | 'kakao_pay'
  | 'naver_pay'
  | 'toss'
  | 'point'
  | 'corporate';

export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'success'
  | 'failed'
  | 'cancelled'
  | 'refunded'
  | 'partially_refunded';


// 메타데이터 / 영수증 / 환불 타입
export interface PaymentMetadata {
  entityType: string | undefined;
  entityId: number | undefined;
  cardBrand: string | undefined;
  cardLast4: string | undefined;
  bankName: string | undefined;
  accountNumber: string | undefined;
  installment: number | undefined;
  taxAmount: number | undefined;
  feeAmount: number | undefined;
  discountAmount: number | undefined;
  pointsUsed: number | undefined;
  couponCode: string | undefined;
  ipAddress: string | undefined;
  userAgent: string | undefined;
}

export interface PaymentReceipt {
  id: string;
  paymentId: string;
  receiptNumber: string;
  receiptType: 'cash' | 'tax_invoice' | 'corporate';
  issueDate: string;
  buyer: {
    name: string;
    email: string;
    phone: string | undefined;
    businessNumber: string | undefined;
  };
  seller: {
    name: string;
    businessNumber: string;
    address: string;
    representativeName: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    unitPrice: number;
    amount: number;
  }>;
  totalAmount: number;
  taxAmount: number;
  supplyAmount: number;
  downloadUrl: string;
  issuedAt: string;
}

export interface Refund {
  id: string;
  paymentId: string;
  amount: number;
  reason: RefundReason;
  reasonDetail: string | undefined;
  status: RefundStatus;
  method: 'original' | 'point' | 'manual';
  requestedBy: number;
  approvedBy: number | undefined;
  rejectedReason: string | undefined;
  processedAt: string | undefined;
  completedAt: string | undefined;
  createdAt: string;
}

export type RefundReason =
  | 'customer_request'
  | 'service_not_provided'
  | 'defective'
  | 'duplicate_payment'
  | 'policy_violation'
  | 'admin_refund';

export type RefundStatus =
  | 'pending'
  | 'approved'
  | 'processing'
  | 'completed'
  | 'rejected'
  | 'failed';


// 결제 생성기
export function generatePayment(override: Partial<Payment> = {}): Payment {
  const type = faker.helpers.arrayElement([
    'membership',
    'program',
    'room_reservation',
    'equipment_rental',
    'deposit',
    'mentoring',
    'event',
  ] as const);

  const method = faker.helpers.arrayElement([
    'card',
    'bank_transfer',
    'virtual_account',
    'paypal',
    'kakao_pay',
    'naver_pay',
    'toss',
    'point',
    'corporate',
  ] as const);

  const status = faker.helpers.arrayElement([
    'success',
    'pending',
    'processing',
    'failed',
    'cancelled',
    'refunded',
  ] as const);

  const amount = generateAmountByType(type);
  const createdAt = faker.date.past({ days: 365 } as any);

  const isPaid = ['success', 'refunded', 'partially_refunded'].includes(status);
  const paidAt = isPaid ? createdAt : undefined;

  const isRefunded = status === 'refunded';
  const refundedAt = isRefunded
    ? faker.date.between({ from: createdAt, to: new Date() })
    : undefined;

  const isFailed = status === 'failed';

  return {
    id: faker.string.uuid(),
    userId: faker.number.int({ min: 1, max: 999 }),
    userName: faker.person.fullName(),
    type,
    method,
    status,
    amount,
    currency: 'KRW',
    description: getDescriptionByType(type),
    orderNumber: `ORD-${faker.string.alphanumeric(10).toUpperCase()}`,
    transactionId: isPaid
      ? `TXN-${faker.string.alphanumeric(16).toUpperCase()}`
      : undefined,
    receiptUrl: isPaid
      ? `https://receipts.connectwon.com/${faker.string.uuid()}`
      : undefined,
    metadata: generatePaymentMetadata(method, amount),
    failureReason: isFailed
      ? faker.helpers.arrayElement([
          '카드 한도 초과',
          '잔액 부족',
          '카드 정보 오류',
          '결제 승인 거부',
          '시스템 오류',
        ])
      : undefined,
    paidAt: paidAt?.toISOString(),
    refundedAt: refundedAt?.toISOString(),
    refundAmount: isRefunded ? amount : undefined,
    refundReason: isRefunded
      ? faker.helpers.arrayElement([
          '고객 요청',
          '서비스 미제공',
          '중복 결제',
          '관리자 환불',
        ])
      : undefined,
    createdAt: createdAt.toISOString(),
    updatedAt: faker.date.recent({ days: 30 } as any).toISOString(),
    ...override,
  };
}

// 결제 금액, 설명, 메타데이터
function generateAmountByType(type: PaymentType): number {
  const ranges: Record<PaymentType, [number, number]> = {
    membership: [49000, 299000],
    program: [30000, 150000],
    room_reservation: [20000, 100000],
    equipment_rental: [10000, 80000],
    deposit: [100000, 500000],
    mentoring: [50000, 200000],
    event: [10000, 50000],
  };
  const [min, max] = ranges[type];
  return faker.number.int({ min, max });
}

function getDescriptionByType(type: PaymentType): string {
  const map: Record<PaymentType, string[]> = {
    membership: ['Basic 멤버십', 'Pro 멤버십', 'Enterprise 멤버십'],
    program: ['창업 멘토링', 'AI 기획 과정', '디지털 마케팅'],
    room_reservation: ['회의실 예약', '세미나룸 예약', '스튜디오 예약'],
    equipment_rental: ['MacBook Pro 대여', 'iPad Pro 대여', '프로젝터 대여'],
    deposit: ['공간 이용 보증금', '장비 대여 보증금'],
    mentoring: ['1:1 멘토링', '그룹 멘토링'],
    event: ['워크샵 참가비', '네트워킹 이벤트'],
  };
  return faker.helpers.arrayElement(map[type]);
}

function generatePaymentMetadata(
  method: PaymentMethod,
  amount: number
): PaymentMetadata {
  const base: PaymentMetadata = {
    entityType: faker.helpers.arrayElement(['program', 'reservation', 'membership']),
    entityId: faker.number.int({ min: 1, max: 999 }),
    taxAmount: Math.floor(amount * 0.1),
    feeAmount: Math.floor(amount * 0.03),
    discountAmount:
      Math.random() > 0.7 ? faker.number.int({ min: 5000, max: 30000 }) : 0,
    pointsUsed:
      Math.random() > 0.8 ? faker.number.int({ min: 1000, max: 10000 }) : 0,
    couponCode:
      Math.random() > 0.9
        ? `COUPON-${faker.string.alphanumeric(8).toUpperCase()}`
        : undefined,
    ipAddress: faker.internet.ip(),
    userAgent: faker.internet.userAgent(),
    cardBrand: undefined,
    cardLast4: undefined,
    bankName: undefined,
    accountNumber: undefined,
    installment: undefined,
  };

  if (method === 'card') {
    base.cardBrand = faker.helpers.arrayElement([
      'VISA',
      'MASTERCARD',
      'AMEX',
      'JCB',
    ]);
    base.cardLast4 = faker.string.numeric(4);
    base.installment = faker.helpers.arrayElement([0, 3, 6, 12]);
  } else if (['bank_transfer', 'virtual_account'].includes(method)) {
    base.bankName = faker.helpers.arrayElement([
      'KB국민은행',
      '신한은행',
      '우리은행',
      'NH농협',
      '하나은행',
    ]);
    base.accountNumber = faker.string.numeric(12);
  }

  return base;
}

// 영수증 생성기
export function generatePaymentReceipt(payment: Payment): PaymentReceipt {
  const taxRate = 0.1;
  const supplyAmount = Math.floor(payment.amount / (1 + taxRate));
  const taxAmount = payment.amount - supplyAmount;

  return {
    id: faker.string.uuid(),
    paymentId: payment.id,
    receiptNumber: `RCP-${faker.string.alphanumeric(10).toUpperCase()}`,
    receiptType: faker.helpers.arrayElement(['cash', 'tax_invoice', 'corporate']),
    issueDate: payment.paidAt || new Date().toISOString(),
    buyer: {
      name: payment.userName,
      email: faker.internet.email(),
      phone: faker.phone.number(),
      businessNumber:
        Math.random() > 0.8 ? faker.string.numeric(10) : undefined,
    },
    seller: {
      name: 'ConnectWon',
      businessNumber: '123-45-67890',
      address: '서울시 강남구 테헤란로 123',
      representativeName: '대표자명',
    },
    items: [
      {
        name: payment.description,
        quantity: 1,
        unitPrice: supplyAmount,
        amount: supplyAmount,
      },
    ],
    totalAmount: payment.amount,
    taxAmount,
    supplyAmount,
    downloadUrl:
      payment.receiptUrl ||
      `https://receipts.connectwon.com/${faker.string.uuid()}`,
    issuedAt: new Date().toISOString(),
  };
}

// 환불 생성기
export function generateRefund(override: Partial<Refund> = {}): Refund {
  const status = faker.helpers.arrayElement([
    'pending',
    'approved',
    'processing',
    'completed',
    'rejected',
    'failed',
  ] as const);

  const createdAt = faker.date.past({ days: 90 } as any);
  const isCompleted = status === 'completed';
  const isRejected = status === 'rejected';

  return {
    id: faker.string.uuid(),
    paymentId: faker.string.uuid(),
    amount: faker.number.int({ min: 10000, max: 500000 }),
    reason: faker.helpers.arrayElement([
      'customer_request',
      'service_not_provided',
      'defective',
      'duplicate_payment',
      'policy_violation',
      'admin_refund',
    ]),
    reasonDetail: faker.lorem.sentence(),
    status,
    method: faker.helpers.arrayElement(['original', 'point', 'manual']),
    requestedBy: faker.number.int({ min: 1, max: 999 }),
    approvedBy: ['approved', 'processing', 'completed'].includes(status)
      ? faker.number.int({ min: 1, max: 10 })
      : undefined,
    rejectedReason: isRejected
      ? faker.helpers.arrayElement([
          '환불 정책 위반',
          '증빙 서류 미제출',
          '환불 기한 경과',
        ])
      : undefined,
    processedAt:
      ['processing', 'completed'].includes(status) || isRejected
        ? faker.date.between({ from: createdAt, to: new Date() }).toISOString()
        : undefined,
    completedAt: isCompleted
      ? faker.date.recent({ days: 7 } as any).toISOString()
      : undefined,
    createdAt: createdAt.toISOString(),
    ...override,
  };
}

// 결제 통계 / 요약 / 정산
export function generatePaymentStats(userId?: number) {
  const total = faker.number.int({ min: 10, max: 100 });
  const successRate = faker.number.float({ min: 0.85, max: 0.98, fractionDigits: 2 });
  const success = Math.floor(total * successRate);

  return {
    userId,
    totalPayments: total,
    successCount: success,
    failedCount: total - success,
    successRate,
    totalAmount: faker.number.int({ min: 500000, max: 10000000 }),
    refundedAmount: faker.number.int({ min: 50000, max: 500000 }),
    averageAmount: faker.number.int({ min: 50000, max: 200000 }),
    lastPaymentAt: faker.date.recent({ days: 30 } as any).toISOString(),
  };
}

export function generatePaymentSummary(period: 'daily' | 'weekly' | 'monthly') {
  return {
    period,
    totalAmount: faker.number.int({ min: 1000000, max: 50000000 }),
    totalCount: faker.number.int({ min: 100, max: 5000 }),
    successAmount: faker.number.int({ min: 900000, max: 48000000 }),
    refundAmount: faker.number.int({ min: 50000, max: 2000000 }),
    averageAmount: faker.number.int({ min: 50000, max: 150000 }),
    topMethod: faker.helpers.arrayElement(['card', 'kakao_pay', 'bank_transfer']),
    topType: faker.helpers.arrayElement(['membership', 'program', 'room_reservation']),
    generatedAt: new Date().toISOString(),
  };
}

export function generateSettlement(date: string) {
  const totalAmount = faker.number.int({ min: 5000000, max: 100000000 });
  const feeAmount = Math.floor(totalAmount * 0.03);
  const taxAmount = Math.floor(totalAmount * 0.1);
  const settlementAmount = totalAmount - feeAmount - taxAmount;

  return {
    id: faker.string.uuid(),
    settlementDate: date,
    totalAmount,
    feeAmount,
    taxAmount,
    settlementAmount,
    paymentCount: faker.number.int({ min: 100, max: 1000 }),
    refundAmount: faker.number.int({ min: 100000, max: 5000000 }),
    status: faker.helpers.arrayElement(['pending', 'processing', 'completed']),
    bankAccount: {
      bankName: '신한은행',
      accountNumber: '110-###-######',
      accountHolder: 'ConnectWon',
    },
    transferredAt: faker.datatype.boolean({ probability: 0.7 })
      ? faker.date.recent({ days: 30 } as any).toISOString()
      : undefined,
    createdAt: faker.date.past({ days: 30 } as any).toISOString(),
  };
}
