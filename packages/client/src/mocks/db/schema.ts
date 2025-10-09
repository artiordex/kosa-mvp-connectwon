/**
 * Description: schema.ts - 📌 MSW Data 인메모리 DB 스키마 정의 (완전 타입 호환 버전)
 * Author: Shiwoo Min
 * Date: 2025-10-09
 */

import { factory, primaryKey, nullable } from '@mswjs/data';
import { faker } from '@faker-js/faker/locale/ko';

export const db = factory({
  /** USER */
  user: {
    id: primaryKey(() => faker.number.int({ min: 1, max: 999999 })),
    email: () => faker.internet.email(),
    name: () => faker.person.fullName(),
    lastLoginAt: nullable(() => faker.date.recent()),
    roleFlags: () => faker.number.int({ min: 0, max: 7 }),
    preferences: () => JSON.stringify({}),
    createdAt: () => faker.date.past(),
    updatedAt: () => faker.date.recent(),
  },

  /** AUTH_PROVIDER */
  authProvider: {
    id: primaryKey(() => faker.number.int({ min: 1, max: 999999 })),
    userId: nullable(Number),
    provider: () => faker.helpers.arrayElement(['local', 'google', 'kakao', 'naver']),
    providerSub: nullable(() => faker.string.uuid()),
    passwordHash: nullable(() => faker.string.alphanumeric(60)),
    meta: () =>
      JSON.stringify({
        ip: faker.internet.ip(),
        userAgent: faker.internet.userAgent(),
      }),
    createdAt: () => faker.date.past(),
    updatedAt: () => faker.date.recent(),
  },

  /** PROGRAM */
  program: {
    id: primaryKey(() => faker.number.int({ min: 1, max: 999999 })),
    title: () =>
      faker.helpers.arrayElement([
        '창업 멘토링 프로그램',
        '디지털 마케팅 실전',
        '재무 관리 기초',
        'AI 기반 서비스 기획',
        'UX/UI 디자인 워크샵',
        '피칭 스킬업',
        '개발자를 위한 비즈니스 모델',
      ]),
    description: () => faker.lorem.paragraphs(2),
    createdByUserId: nullable(Number),
    category: () =>
      faker.helpers.arrayElement(['창업', '마케팅', '재무', 'IT/개발', '디자인', '피칭']),
    meta: () =>
      JSON.stringify({
        thumbnail: faker.image.url(),
        tags: faker.helpers.arrayElements(
          ['온라인', '오프라인', '초급', '중급', '고급', '실습'],
          3
        ),
        maxParticipants: faker.number.int({ min: 10, max: 50 }),
      }),
    createdAt: () => faker.date.past(),
    updatedAt: () => faker.date.recent(),
  },

  /** SESSION */
  session: {
    id: primaryKey(() => faker.number.int({ min: 1, max: 999999 })),
    programId: nullable(Number),
    startsAt: () => faker.date.future(),
    endsAt: () => faker.date.future({ refDate: new Date() }),
    capacity: () => faker.number.int({ min: 5, max: 30 }),
    participantFee: () => faker.number.int({ min: 0, max: 100000 }),
    status: () =>
      faker.helpers.arrayElement(['SCHEDULED', 'CONFIRMED', 'CANCELLED', 'COMPLETED']),
    roomReservationId: nullable(Number),
    locationText: nullable(() => faker.location.streetAddress()),
    createdAt: () => faker.date.past(),
    updatedAt: () => faker.date.recent(),
  },

  /** VENUE */
  venue: {
    id: primaryKey(() => faker.number.int({ min: 1, max: 999999 })),
    name: () => faker.helpers.arrayElement(['강남 HUB', '마포 Campus', '광명 Center']),
    address: () => faker.location.streetAddress(),
    openingHours: () =>
      JSON.stringify({
        weekday: { open: '09:00', close: '21:00' },
        weekend: { open: '10:00', close: '18:00' },
      }),
    blackoutRules: () => JSON.stringify([]),
    createdAt: () => faker.date.past(),
    updatedAt: () => faker.date.recent(),
  },

  /** ROOM */
  room: {
    id: primaryKey(() => faker.number.int({ min: 1, max: 999999 })),
    venueId: nullable(Number),
    name: () => `회의실 ${faker.number.int({ min: 1, max: 20 })}`,
    capacity: () => faker.number.int({ min: 4, max: 30 }),
    status: () => faker.helpers.arrayElement(['ACTIVE', 'INACTIVE', 'MAINTENANCE']),
    createdAt: () => faker.date.past(),
    updatedAt: () => faker.date.recent(),
  },

  /** ROOM_RESERVATION */
  roomReservation: {
    id: primaryKey(() => faker.number.int({ min: 1, max: 999999 })),
    roomId: nullable(Number),
    userId: nullable(Number),
    startsAt: () => faker.date.future(),
    endsAt: () => faker.date.future({ refDate: new Date(Date.now() + 2 * 60 * 60 * 1000) }),
    purpose: () => faker.helpers.arrayElement(['회의', '세미나', '워크샵', '교육', '촬영']),
    status: () =>
      faker.helpers.arrayElement(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']),
    meta: () =>
      JSON.stringify({
        range: `[${faker.date.future().toISOString()}, ${faker.date
          .future()
          .toISOString()})`,
      }),
    sessionId: nullable(Number),
    createdAt: () => faker.date.past(),
    updatedAt: () => faker.date.recent(),
  },

  /** PROGRAM_PARTICIPANT */
  programParticipant: {
    id: primaryKey(() => faker.number.int({ min: 1, max: 999999 })),
    sessionId: nullable(Number),
    userId: nullable(Number),
    role: () => faker.helpers.arrayElement(['HOST', 'ATTENDEE']),
    status: () =>
      faker.helpers.arrayElement(['APPLIED', 'CONFIRMED', 'CANCELLED', 'NO_SHOW']),
    joinedAt: () => faker.date.recent(),
  },

  /** DEVICE */
  device: {
    id: primaryKey(() => faker.number.int({ min: 1, max: 999999 })),
    name: () =>
      faker.helpers.arrayElement([
        '노트북 (MacBook Pro)',
        '프로젝터',
        '카메라 (Sony A7)',
        '마이크 세트',
        '조명 장비',
        '3D 프린터',
        '레이저 커터',
        '태블릿 (iPad Pro)',
      ]),
    type: () => faker.helpers.arrayElement(['컴퓨터', '영상', '음향', '제작장비', '사무기기']),
    specs: () =>
      JSON.stringify({
        manufacturer: faker.company.name(),
        model: faker.string.alphanumeric(8).toUpperCase(),
        year: faker.number.int({ min: 2020, max: 2024 }),
      }),
    status: () =>
      faker.helpers.arrayElement(['AVAILABLE', 'IN_USE', 'MAINTENANCE', 'RETIRED']),
    createdAt: () => faker.date.past(),
    updatedAt: () => faker.date.recent(),
  },

  /** DEVICE_RENTAL */
  deviceRental: {
    id: primaryKey(() => faker.number.int({ min: 1, max: 999999 })),
    deviceId: nullable(Number),
    userId: nullable(Number),
    startsAt: () => faker.date.future(),
    endsAt: () => faker.date.future({ refDate: new Date() }),
    status: () =>
      faker.helpers.arrayElement(['PENDING', 'APPROVED', 'RETURNED', 'CANCELLED']),
    meta: () =>
      JSON.stringify({
        deposit: faker.number.int({ min: 100000, max: 500000 }),
        purpose: faker.lorem.sentence(),
      }),
    createdAt: () => faker.date.past(),
    updatedAt: () => faker.date.recent(),
  },

  /** AI_INTERACTION */
  aiInteraction: {
    id: primaryKey(() => faker.number.int({ min: 1, max: 999999 })),
    userId: nullable(Number),
    programId: nullable(Number),
    sessionId: nullable(Number),
    provider: () => faker.helpers.arrayElement(['openai', 'anthropic', 'huggingface']),
    model: () => faker.helpers.arrayElement(['gpt-4', 'claude-3', 'llama-2']),
    kind: () =>
      faker.helpers.arrayElement([
        'program_summary',
        'recommendation',
        'chatbot',
        'moderation',
        'sentiment_analysis',
      ]),
    promptTokens: () => faker.number.int({ min: 100, max: 2000 }),
    completionTokens: () => faker.number.int({ min: 50, max: 1000 }),
    cost: () => faker.number.float({ min: 0.001, max: 0.5, fractionDigits: 3 }),
    status: () => faker.helpers.arrayElement(['OK', 'ERROR']),
    traceId: nullable(() => faker.string.uuid()),
    meta: () =>
      JSON.stringify({
        temperature: faker.number.float({ min: 0, max: 1, fractionDigits: 1 }),
        maxTokens: faker.number.int({ min: 500, max: 2000 }),
      }),
    createdAt: () => faker.date.recent(),
  },

  /** USER_ACTIVITY */
  userActivity: {
    id: primaryKey(() => faker.number.int({ min: 1, max: 999999 })),
    userId: nullable(Number),
    action: () =>
      faker.helpers.arrayElement([
        'login',
        'logout',
        'create_program',
        'join_session',
        'reserve_room',
        'rent_device',
      ]),
    entityType: nullable(() =>
      faker.helpers.arrayElement(['program', 'session', 'room', 'device'])
    ),
    entityId: nullable(() => faker.number.int({ min: 1, max: 999 })),
    meta: () =>
      JSON.stringify({
        ipAddress: faker.internet.ip(),
        userAgent: faker.internet.userAgent(),
      }),
    createdAt: () => faker.date.recent(),
  },

  /** REVIEW */
  review: {
    id: primaryKey(() => faker.number.int({ min: 1, max: 999999 })),
    userId: nullable(Number),
    targetType: () =>
      faker.helpers.arrayElement(['program', 'session', 'room', 'device']),
    targetId: () => faker.number.int({ min: 1, max: 999 }),
    rating: () => faker.number.int({ min: 1, max: 5 }),
    comment: nullable(() => faker.lorem.paragraph()),
    createdAt: () => faker.date.past(),
    updatedAt: () => faker.date.recent(),
  },

  /** NOTIFICATION */
  notification: {
    id: primaryKey(() => faker.number.int({ min: 1, max: 999999 })),
    userId: nullable(Number),
    type: () =>
      faker.helpers.arrayElement(['reservation', 'device', 'program', 'system']),
    title: () => faker.lorem.sentence(),
    message: nullable(() => faker.lorem.paragraph()),
    isRead: () => faker.datatype.boolean({ probability: 0.3 }),
    createdAt: () => faker.date.recent(),
  },

  /** BENEFIT */
  benefit: {
    id: primaryKey(() => faker.number.int({ min: 1, max: 999999 })),
    title: () =>
      faker.helpers.arrayElement([
        '신규 가입 쿠폰',
        '첫 예약 10% 할인',
        'AI 체험 포인트',
      ]) as unknown as string,
    description: () => faker.lorem.sentence(),
    type: () =>
      faker.helpers.arrayElement(['coupon', 'point', 'event']) as unknown as string,
    value: () => faker.number.int({ min: 1000, max: 10000 }),
    expiresAt: () => faker.date.future(),
    createdAt: () => faker.date.past(),
    updatedAt: () => faker.date.recent(),
  },

  /** MEMBERSHIP */
  membership: {
    id: primaryKey(() => faker.number.int({ min: 1, max: 999999 })),
    userId: Number,
    level: () =>
      faker.helpers.arrayElement(['BASIC', 'PRO', 'PREMIUM']) as unknown as string,
    joinedAt: () => faker.date.past(),
    expiresAt: () => faker.date.future(),
    benefits: () => JSON.stringify([]),
    createdAt: () => faker.date.past(),
    updatedAt: () => faker.date.recent(),
  },

  /** MESSAGE */
  message: {
    id: primaryKey(() => faker.number.int({ min: 1, max: 999999 })),
    senderId: nullable(Number),
    receiverId: nullable(Number),
    channel: () => faker.helpers.arrayElement(['general', 'support', 'ai', 'admin']),
    type: () => faker.helpers.arrayElement(['TEXT', 'IMAGE', 'SYSTEM']),
    content: () => faker.lorem.sentence(),
    attachmentUrl: nullable(() => faker.internet.url()),
    status: () =>
      faker.helpers.arrayElement([
        'SENT',
        'DELIVERED',
        'READ',
        'FAILED',
      ]) as 'SENT' | 'DELIVERED' | 'READ' | 'FAILED',
    readAt: nullable(() => faker.date.recent()),
    isRead: () => faker.datatype.boolean({ probability: 0.4 }),
    createdAt: () => faker.date.recent(),
    updatedAt: () => faker.date.recent(),
  },

  /** EQUIPMENT */
  equipment: {
    id: primaryKey(() => faker.number.int({ min: 1, max: 999999 })),
    name: () =>
      faker.helpers.arrayElement([
        '프로젝터',
        '마이크',
        '화이트보드',
        '노트북',
        '조명장비',
      ]),
    quantity: () => faker.number.int({ min: 1, max: 20 }),
    status: () =>
      faker.helpers.arrayElement(['AVAILABLE', 'IN_USE', 'BROKEN', 'LOST']),
    createdAt: () => faker.date.past(),
    updatedAt: () => faker.date.recent(),
  },

  /** RESERVATION */
  reservation: {
    id: primaryKey(() => faker.number.int({ min: 1, max: 999999 })),
    userId: nullable(Number),
    roomId: nullable(Number),
    startTime: () => faker.date.future(),
    endTime: () => faker.date.future({ refDate: new Date() }),
    status: () =>
      faker.helpers.arrayElement(['CONFIRMED', 'CANCELLED', 'COMPLETED']),
    createdAt: () => faker.date.past(),
    updatedAt: () => faker.date.recent(),
  },
});

export type Database = typeof db;
