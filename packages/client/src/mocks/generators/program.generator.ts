/**
 * Description: program.generator.ts - 📌 프로그램 데이터 생성기
 * Author: Shiwoo Min
 * Date: 2025-10-09
 */
import { faker } from '@faker-js/faker/locale/ko';
import type {
  ProgramExtended,
  ProgramCategory,
  ProgramDifficulty,
  ProgramFormat,
  ProgramStatus,
  ProgramVisibility,
  ProgramInstructor,
  ProgramSyllabus,
  ProgramSchedule,
  ProgramLocation,
  ProgramMaterial,
  ProgramMetadata,
} from '../../mock-types.js';

// 프로그램 생성 (확장 버전)
export function generateProgram(override: Partial<ProgramExtended> = {}): ProgramExtended {
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

  const title = generateProgramTitle(category);
  const slug = faker.helpers.slugify(title).toLowerCase();
  const capacity = faker.number.int({ min: 10, max: 50 });
  const enrolledCount = faker.number.int({ min: 0, max: capacity });
  const price = faker.number.int({ min: 0, max: 500000 });
  const hasDiscount = Math.random() > 0.7;

  const status: ProgramStatus = faker.helpers.arrayElement([
    'draft',
    'pending_review',
    'approved',
    'published',
    'ongoing',
    'completed',
    'cancelled',
    'archived',
  ]);

  const isPublished = ['published', 'ongoing', 'completed'].includes(status);
  const createdAt = faker.date.past({ years: 1 });

  const hasPrerequisites = Math.random() > 0.5;
  const hasLocation = Math.random() > 0.3;
  const hasThumbnail = Math.random() > 0.2;
  const hasImages = Math.random() > 0.4;
  const hasVideo = Math.random() > 0.5;
  const hasMaterials = Math.random() > 0.6;
  const hasMetadata = Math.random() > 0.3;

  return {
    id: faker.string.uuid(),
    title,
    slug,
    description: faker.lorem.paragraphs(3),
    summary: faker.lorem.paragraph(),
    category,
    ...(Math.random() > 0.3 && { subCategory: getSubCategoryByCategory(category) }),
    difficulty: faker.helpers.arrayElement(['beginner', 'intermediate', 'advanced', 'all']) as ProgramDifficulty,
    format: faker.helpers.arrayElement(['online', 'offline', 'hybrid']) as ProgramFormat,
    duration: faker.number.int({ min: 2, max: 12 }),
    createdByUserId: faker.number.int({ min: 1, max: 999 }),
    creatorName: faker.person.fullName(),
    instructors: generateInstructors(),
    capacity,
    minCapacity: Math.floor(capacity * 0.5),
    enrolledCount,
    waitlistCount: enrolledCount >= capacity ? faker.number.int({ min: 0, max: 20 }) : 0,
    status,
    visibility: faker.helpers.arrayElement(['public', 'members_only']) as ProgramVisibility,
    price,
    ...(hasDiscount && { discountedPrice: Math.floor(price * 0.7) }),
    currency: 'KRW',
    tags: generateProgramTags(category),
    learningObjectives: generateLearningObjectives(),
    ...(hasPrerequisites && { prerequisites: generatePrerequisites() }),
    syllabus: generateSyllabus(),
    schedule: generateSchedule(),
    ...(hasLocation && { location: generateLocation() }),
    ...(hasThumbnail && { thumbnail: faker.image.url() }),
    ...(hasImages && { images: Array.from({ length: 3 }, () => faker.image.url()) }),
    ...(hasVideo && { videoUrl: faker.internet.url() }),
    ...(hasMaterials && { materials: generateMaterials() }),
    rating: faker.number.float({ min: 3.5, max: 5.0, fractionDigits: 1 }),
    reviewCount: isPublished ? faker.number.int({ min: 0, max: 100 }) : 0,
    viewCount: isPublished ? faker.number.int({ min: 10, max: 5000 }) : 0,
    bookmarkCount: isPublished ? faker.number.int({ min: 0, max: 200 }) : 0,
    ...(hasMetadata && { metadata: generateProgramMetadata() }),
    ...(isPublished && { publishedAt: createdAt.toISOString() }),
    ...(isPublished && { startsAt: faker.date.future({ years: 0.2 }).toISOString() }),
    ...(isPublished && { endsAt: faker.date.future({ years: 0.5 }).toISOString() }),
    ...(isPublished && { applicationDeadline: faker.date.soon({ days: 30 }).toISOString() }),
    createdAt: createdAt.toISOString(),
    updatedAt: faker.date.recent({ days: 30 }).toISOString(),
    ...override,
  };
}

// 서브 데이터 생성 함수들
function generateProgramTitle(category: ProgramCategory): string {
  const titleMap: Record<ProgramCategory, string[]> = {
    창업: ['MVP 만들기', '린 스타트업', '아이디어 검증'],
    마케팅: ['디지털 마케팅 실전', '콘텐츠 마케팅', '브랜딩'],
    재무: ['투자 유치 전략', '회계 실무', '재무제표 이해'],
    'IT/개발': ['AI 서비스 기획', '노코드 앱', '웹개발 기초'],
    디자인: ['UX/UI 디자인', '프로토타입 제작', '피그마 실습'],
    피칭: ['IR 피칭', '발표 스킬', '투자자 설득'],
    비즈니스: ['전략적 사고', '리더십', '협상 기술'],
    커리어: ['이직 성공 전략', '포트폴리오 만들기', '면접 스킬'],
    라이프: ['생산성 향상', '스트레스 관리', '시간 관리'],
    기타: ['네트워킹', '크리에이티브 워크샵', '콘텐츠 제작'],
  };
  return faker.helpers.arrayElement(titleMap[category]);
}

function getSubCategoryByCategory(category: ProgramCategory): string {
  const subMap: Record<ProgramCategory, string[]> = {
    창업: ['아이디어', 'MVP', '팀빌딩'],
    마케팅: ['SNS', '콘텐츠', '브랜딩'],
    재무: ['회계', '투자', '재무분석'],
    'IT/개발': ['AI', '노코드', '웹개발'],
    디자인: ['UX', 'UI', '프로토타입'],
    피칭: ['IR', '스토리텔링', '발표'],
    비즈니스: ['전략', '조직', '협상'],
    커리어: ['이직', '면접', '브랜딩'],
    라이프: ['생산성', '습관', '건강'],
    기타: ['네트워킹', '글쓰기', '기타'],
  };
  return faker.helpers.arrayElement(subMap[category]);
}

function generateProgramTags(category: ProgramCategory): string[] {
  const base = ['실습', '소규모', '초보자환영'];
  const categoryTags: Record<ProgramCategory, string[]> = {
    창업: ['스타트업', 'MVP'],
    마케팅: ['브랜딩', '콘텐츠'],
    재무: ['투자', '회계'],
    'IT/개발': ['AI', '개발'],
    디자인: ['UX', '피그마'],
    피칭: ['IR', '발표'],
    비즈니스: ['전략', '리더십'],
    커리어: ['이직', '면접'],
    라이프: ['생산성', '습관'],
    기타: ['네트워킹', '창의력'],
  };
  return faker.helpers.arrayElements([...base, ...categoryTags[category]], { min: 2, max: 4 });
}

function generateLearningObjectives(): string[] {
  return Array.from({ length: faker.number.int({ min: 3, max: 6 }) }, () =>
    faker.lorem.sentence()
  );
}

function generatePrerequisites(): string[] {
  return faker.helpers.arrayElements(['기초지식', '참여의지', '컴퓨터 활용', '팀워크'], { min: 1, max: 3 });
}

function generateSyllabus(): ProgramSyllabus[] {
  const weeks = faker.number.int({ min: 4, max: 12 });
  return Array.from({ length: weeks }, (_, i) => ({
    week: i + 1,
    title: `Week ${i + 1}: ${faker.lorem.words(3)}`,
    description: faker.lorem.paragraph(),
    topics: Array.from({ length: 3 }, () => faker.lorem.words(4)),
    duration: faker.number.int({ min: 2, max: 4 }),
  }));
}

function generateSchedule(): ProgramSchedule {
  const type = faker.helpers.arrayElement(['fixed', 'flexible'] as const);
  if (type === 'fixed') {
    return {
      type,
      daysOfWeek: faker.helpers.arrayElements([1, 2, 3, 4, 5], { min: 1, max: 2 }),
      startTime: faker.helpers.arrayElement(['09:00', '14:00', '19:00']),
      endTime: faker.helpers.arrayElement(['12:00', '17:00', '22:00']),
      sessionDuration: faker.number.int({ min: 90, max: 180 }),
      totalSessions: faker.number.int({ min: 8, max: 24 }),
    };
  }
  return {
    type,
    sessionDuration: faker.number.int({ min: 60, max: 120 }),
    totalSessions: faker.number.int({ min: 6, max: 20 }),
  };
}

function generateLocation(): ProgramLocation {
  const type = faker.helpers.arrayElement(['venue', 'online', 'external'] as const);
  if (type === 'venue') {
    return {
      type,
      venueId: faker.number.int({ min: 1, max: 10 }),
      venueName: faker.helpers.arrayElement(['강남 HUB', '마포 Campus', '광명 Center']),
      roomName: `회의실 ${faker.helpers.arrayElement(['A', 'B', 'C'])}`,
    };
  }
  if (type === 'online') {
    return {
      type,
      onlinePlatform: faker.helpers.arrayElement(['Zoom', 'Google Meet', 'MS Teams']),
      meetingUrl: faker.internet.url(),
    };
  }
  return { type, address: faker.location.streetAddress() };
}

function generateMaterials(): ProgramMaterial[] {
  const count = faker.number.int({ min: 2, max: 6 });
  return Array.from({ length: count }, (_, i) => ({
    id: faker.string.uuid(),
    type: faker.helpers.arrayElement(['document', 'video', 'link', 'file']),
    title: `자료 ${i + 1}: ${faker.lorem.words(3)}`,
    url: faker.internet.url(),
    ...(Math.random() > 0.5 && { description: faker.lorem.sentence() }),
    isRequired: Math.random() > 0.5,
    order: i + 1,
  }));
}

function generateProgramMetadata(): ProgramMetadata {
  return {
    language: 'ko',
    certificate: Math.random() > 0.5,
    recordingAvailable: Math.random() > 0.5,
    qnaSupport: Math.random() > 0.5,
    refundPolicy: '시작 7일 전까지 전액 환불 가능',
    cancellationPolicy: '최소 인원 미달 시 취소될 수 있습니다',
    targetAudience: faker.helpers.arrayElements(['창업자', '직장인', '학생'], { min: 2, max: 3 }),
    benefits: faker.helpers.arrayElements(['수료증', '네트워킹', '멘토링'], { min: 2, max: 3 }),
    requirements: ['노트북 지참', '사전 과제 완료'],
  };
}

function generateInstructors(): ProgramInstructor[] {
  const count = faker.number.int({ min: 1, max: 3 });
  return Array.from({ length: count }, () => {
    const hasAvatar = Math.random() > 0.3;
    const hasSocialLinks = Math.random() > 0.5;

    return {
      id: faker.number.int({ min: 1, max: 999 }),
      name: faker.person.fullName(),
      ...(hasAvatar && { avatar: faker.image.avatar() }),
      title: faker.person.jobTitle(),
      bio: faker.lorem.paragraph(),
      expertise: faker.helpers.arrayElements(['창업', '마케팅', '디자인', '개발'], { min: 2, max: 3 }),
      ...(hasSocialLinks && {
        socialLinks: {
          ...(Math.random() > 0.5 && { linkedin: faker.internet.url() }),
          ...(Math.random() > 0.5 && { github: faker.internet.url() }),
          ...(Math.random() > 0.5 && { website: faker.internet.url() }),
        },
      }),
    };
  });
}

// 다중 생성 함수
export function generateProgramList(count = 10): ProgramExtended[] {
  return Array.from({ length: count }, () => generateProgram());
}

export function generateCategoryPrograms(category: ProgramCategory, count = 10): ProgramExtended[] {
  return Array.from({ length: count }, () => generateProgram({ category }));
}

export function generateStatusPrograms(status: ProgramStatus, count = 10): ProgramExtended[] {
  return Array.from({ length: count }, () => generateProgram({ status }));
}
