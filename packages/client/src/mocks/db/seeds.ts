/**
 * Description: seeds.ts - 📌 MSW 초기 데이터 시딩
 * Author: Shiwoo Min
 * Date: 2025-10-09
 */

/**
 * Description: seeds.ts - MSW 초기 데이터 시딩
 * Author: Shiwoo Min
 * Date: 2025-10-09
 */

import { db } from './schema';
import { faker } from '@faker-js/faker/locale/ko';

export function seedDatabase() {
  console.log('[MSW] 시딩 시작');

  // 기존 데이터 초기화
  clearDatabase();

  /** 사용자 생성 */
  const users = Array.from({ length: 50 }).map(() => db.user.create());
  console.log(`[MSW] 사용자 ${users.length}명 생성`);

  /** 인증 제공자 */
  users.forEach((user) => {
    const provider = faker.helpers.arrayElement(['google', 'kakao', 'naver', 'local']);
    db.authProvider.create({
      userId: user.id,
      provider,
      providerSub: provider === 'local' ? null : faker.string.uuid(),
      passwordHash: provider === 'local' ? faker.string.alphanumeric(60) : null,
      meta: JSON.stringify({
        ip: faker.internet.ip(),
        userAgent: faker.internet.userAgent(),
      }),
    });
  });
  console.log(`[MSW] 인증 제공자 ${users.length}개 생성`);

  /** 장소 (강남, 마포, 광명) */
  const venues = [
    { name: '강남 HUB', address: '서울시 강남구 테헤란로 123' },
    { name: '마포 Campus', address: '서울시 마포구 양화로 456' },
    { name: '광명 Center', address: '경기도 광명시 오리로 789' },
  ].map((v) =>
    db.venue.create({
      ...(v as any),
      openingHours: JSON.stringify({
        weekday: { open: '09:00', close: '21:00' },
        weekend: { open: '10:00', close: '18:00' },
      }),
      blackoutRules: JSON.stringify([]),
    })
  );
  console.log(`[MSW] 장소 ${venues.length}개 생성`);

  /** 회의실 */
  const rooms = venues.flatMap((venue) =>
    Array.from({ length: 5 }).map((_, i) =>
      db.room.create({
        venueId: venue.id,
        name: `회의실 ${String.fromCharCode(65 + i)}`,
        capacity: faker.number.int({ min: 4, max: 20 }),
      })
    )
  );
  console.log(`[MSW] 회의실 ${rooms.length}개 생성`);

  /** 프로그램 */
  const programs = Array.from({ length: 30 }).map(() =>
    db.program.create({
      createdByUserId: faker.helpers.arrayElement(users).id,
      meta: JSON.stringify({
        thumbnail: faker.image.url(),
        tags: faker.helpers.arrayElements(['온라인', '오프라인', '초급', '중급', '고급'], 3),
        maxParticipants: faker.number.int({ min: 10, max: 50 }),
      }),
    })
  );
  console.log(`[MSW] 프로그램 ${programs.length}개 생성`);

  /** 세션 */
  const sessions = programs.flatMap((program) => {
    const count = faker.number.int({ min: 2, max: 4 });
    return Array.from({ length: count }).map(() => {
      const startsAt = faker.date.future();
      const endsAt = new Date(startsAt.getTime() + 2 * 60 * 60 * 1000);
      return db.session.create({
        programId: program.id,
        startsAt,
        endsAt,
        capacity: faker.number.int({ min: 10, max: 30 }),
        participantFee: faker.number.int({ min: 0, max: 100000 }),
      });
    });
  });
  console.log(`[MSW] 세션 ${sessions.length}개 생성`);

  /** 회의실 예약 (세션 기반 + 개인 예약) */
  const sessionReservations = sessions.slice(0, Math.floor(sessions.length * 0.7)).map((session) => {
    const room = faker.helpers.arrayElement(rooms);
    return db.roomReservation.create({
      roomId: room.id,
      userId: faker.helpers.arrayElement(users).id,
      startsAt: session.startsAt,
      endsAt: session.endsAt,
      purpose: '세미나',
      status: 'CONFIRMED',
      sessionId: session.id,
      meta: JSON.stringify({ linkedSession: true }),
    });
  });

  const personalReservations = Array.from({ length: 30 }).map(() => {
    const startsAt = faker.date.future();
    const endsAt = new Date(startsAt.getTime() + 3 * 60 * 60 * 1000);
    return db.roomReservation.create({
      roomId: faker.helpers.arrayElement(rooms).id,
      userId: faker.helpers.arrayElement(users).id,
      startsAt,
      endsAt,
      purpose: faker.helpers.arrayElement(['회의', '세미나', '워크샵', '교육', '촬영']),
      status: 'CONFIRMED',
      meta: JSON.stringify({ linkedSession: false }),
    });
  });
  console.log(
    `[MSW] 회의실 예약 총 ${sessionReservations.length + personalReservations.length}개 생성 (세션 연동 ${sessionReservations.length}, 개인 ${personalReservations.length})`
  );

  /** AI 상호작용 */
  const aiInteractions = Array.from({ length: 30 }).map(() => {
    const maybeProgram = faker.helpers.arrayElement([...programs, null]);
    const maybeSession = faker.helpers.arrayElement([...sessions.slice(0, 10), null]);
    return db.aiInteraction.create({
      userId: faker.helpers.arrayElement(users).id,
      programId: maybeProgram ? maybeProgram.id : null,
      sessionId: maybeSession ? maybeSession.id : null,
      provider: faker.helpers.arrayElement(['openai', 'anthropic']),
      model: faker.helpers.arrayElement(['gpt-4', 'claude-3']),
      kind: faker.helpers.arrayElement(['program_summary', 'recommendation', 'chatbot']),
    });
  });
  console.log(`[MSW] AI 상호작용 ${aiInteractions.length}개 생성`);

  console.log('[MSW] 시딩 완료');
}

/** DB 초기화 */
function clearDatabase() {
  Object.values(db).forEach((model: any) => {
    if (model.deleteMany) model.deleteMany({ where: {} });
  });
}
