/**
 * Description: post.generator.ts - 📌 게시글/커뮤니티 데이터 생성기
 * Author: Shiwoo Min
 * Date: 2025-10-09
 */
import { faker } from '@faker-js/faker/locale/ko';
import type {
  Post,
  PostCategory,
  PostStatus,
  PostVisibility,
  PostAttachment,
  Comment,
  PostReport,
  ReportStatus,
  PostReaction,
  ReactionType,
} from '../../mock-types.js';

// 게시글 생성기
export function generatePost(override: Partial<Post> = {}): Post {
  const category: PostCategory = faker.helpers.arrayElement([
    'notice',
    'qna',
    'discussion',
    'showcase',
    'event',
    'feedback',
    'tip',
    'job',
  ]);

  const status: PostStatus = faker.helpers.arrayElement([
    'draft',
    'published',
    'archived',
    'deleted',
  ]);

  const isPublished = status === 'published';
  const createdAt = faker.date.past({ years: 1 });
  const title = generateTitleByCategory(category);
  const content = generateContentByCategory(category);
  const tags = generateTagsByCategory(category);

  // 조건부 플래그
  const hasAvatar = Math.random() > 0.3;
  const hasAttachments = Math.random() > 0.6;
  const hasBookmark = isPublished && Math.random() > 0.5;
  const hasLocked = Math.random() > 0.95;
  const hasFeatured = Math.random() > 0.9;
  const hasMetadata = Math.random() > 0.3;
  const hasEdited = Math.random() > 0.7;
  const isDeleted = status === 'deleted';

  return {
    id: faker.string.uuid(),
    authorId: faker.number.int({ min: 1, max: 999 }),
    authorName: faker.person.fullName(),
    ...(hasAvatar && { authorAvatar: faker.image.avatar() }),
    title,
    content,
    category,
    tags,
    status,
    visibility: faker.helpers.arrayElement(['public', 'members_only']) as PostVisibility,
    viewCount: isPublished ? faker.number.int({ min: 10, max: 5000 }) : 0,
    likeCount: isPublished ? faker.number.int({ min: 0, max: 500 }) : 0,
    commentCount: isPublished ? faker.number.int({ min: 0, max: 100 }) : 0,
    ...(hasBookmark && { bookmarkCount: faker.number.int({ min: 0, max: 200 }) }),
    isPinned: category === 'notice' && Math.random() > 0.8,
    ...(hasLocked && { isLocked: true }),
    ...(hasFeatured && { isFeatured: true }),
    ...(hasAttachments && { attachments: generateAttachments() }),
    ...(hasMetadata && {
      metadata: {
        readTime: Math.ceil(content.length / 1000),
        language: 'ko',
        allowComments: Math.random() > 0.1,
        allowLikes: Math.random() > 0.05,
        notifyAuthor: Math.random() > 0.3,
      },
    }),
    ...(isPublished && { publishedAt: createdAt.toISOString() }),
    ...(hasEdited && {
      editedAt: faker.date.between({ from: createdAt, to: new Date() }).toISOString(),
    }),
    ...(isDeleted && { deletedAt: faker.date.recent({ days: 7 }).toISOString() }),
    createdAt: createdAt.toISOString(),
    updatedAt: faker.date.recent({ days: 30 }).toISOString(),
    ...override,
  };
}

// 카테고리별 제목 생성
function generateTitleByCategory(category: PostCategory): string {
  const titleMap: Record<PostCategory, string[]> = {
    notice: ['[공지] 시스템 점검 안내', '[중요] 이용약관 변경 안내', '[필독] 커뮤니티 가이드라인'],
    qna: ['멤버십 결제 관련 질문입니다', '예약 취소는 어떻게 하나요?', '프로그램 참가 자격이 궁금합니다'],
    discussion: ['창업 초기 자금 조달 방법', '팀 빌딩 노하우', 'AI 서비스 런칭 경험담'],
    showcase: ['우리 팀의 프로젝트를 소개합니다', '3개월 만에 완성한 앱', '멘토링 이후 결과 공유'],
    event: ['네트워킹 데이 모집', '워크샵 신청 받습니다', '창업 경진대회 개최 안내'],
    feedback: ['서비스 개선 제안합니다', '모바일 앱 버그 제보', 'UI/UX 개선 의견'],
    tip: ['신청 꿀팁 공유', '공간 활용 노하우', '멘토링 잘 받는 법'],
    job: ['[채용] 프론트엔드 개발자 구인', '[인턴] 마케팅 인턴 모집', '[프리랜서] 디자이너 모집'],
  };
  return faker.helpers.arrayElement(titleMap[category]);
}

// 카테고리별 내용 생성
function generateContentByCategory(category: PostCategory): string {
  const paragraphs =
    category === 'notice'
      ? faker.number.int({ min: 1, max: 3 })
      : category === 'qna'
      ? faker.number.int({ min: 2, max: 6 })
      : faker.number.int({ min: 2, max: 8 });

  return Array.from({ length: paragraphs })
    .map(() => faker.lorem.paragraph())
    .join('\n\n');
}

// 카테고리별 태그 생성
function generateTagsByCategory(category: PostCategory): string[] {
  const tagMap: Record<PostCategory, string[]> = {
    notice: ['공지', '안내'],
    qna: ['질문', '도움요청'],
    discussion: ['토론', '창업', '개발'],
    showcase: ['프로젝트', '성과공유'],
    event: ['이벤트', '모집'],
    feedback: ['피드백', '개선제안'],
    tip: ['팁', '노하우'],
    job: ['채용', '구인'],
  };
  return faker.helpers.arrayElements(tagMap[category], { min: 2, max: 4 });
}

// 첨부파일 생성
function generateAttachments(): PostAttachment[] {
  const count = faker.number.int({ min: 1, max: 5 });
  return Array.from({ length: count }, () => {
    const type = faker.helpers.arrayElement(['image', 'video', 'document', 'link'] as const);
    const hasSize = type !== 'link';
    const hasThumbnail = type === 'image' || type === 'video';

    return {
      id: faker.string.uuid(),
      type,
      url: type === 'image' ? faker.image.url() : faker.internet.url(),
      name: `${faker.system.fileName()}.${type === 'image' ? 'jpg' : type === 'video' ? 'mp4' : 'pdf'}`,
      ...(hasSize && { size: faker.number.int({ min: 100000, max: 10000000 }) }),
      mimeType: type === 'image' ? 'image/jpeg' : type === 'video' ? 'video/mp4' : 'application/pdf',
      ...(hasThumbnail && { thumbnail: faker.image.url() }),
    };
  });
}

// 댓글 생성기
export function generateComment(override: Partial<Comment> = {}): Comment {
  const hasAvatar = Math.random() > 0.3;
  const hasParent = Math.random() > 0.7;
  const isEdited = Math.random() > 0.2;
  const isDeleted = Math.random() > 0.05;
  const createdAt = faker.date.recent({ days: 30 });

  return {
    id: faker.string.uuid(),
    postId: faker.string.uuid(),
    authorId: faker.number.int({ min: 1, max: 999 }),
    authorName: faker.person.fullName(),
    ...(hasAvatar && { authorAvatar: faker.image.avatar() }),
    content: faker.lorem.paragraph(),
    ...(hasParent && { parentId: faker.string.uuid() }),
    depth: hasParent ? faker.number.int({ min: 1, max: 3 }) : 0,
    likeCount: faker.number.int({ min: 0, max: 50 }),
    isEdited,
    isDeleted,
    ...(isDeleted && {
      deletedReason: faker.helpers.arrayElement(['작성자 삭제', '관리자 삭제', '신고에 의한 삭제']),
    }),
    ...(isEdited && {
      editedAt: faker.date.between({ from: createdAt, to: new Date() }).toISOString(),
    }),
    ...(isDeleted && { deletedAt: faker.date.recent({ days: 7 }).toISOString() }),
    createdAt: createdAt.toISOString(),
    updatedAt: faker.date.recent({ days: 7 }).toISOString(),
    ...override,
  };
}

// 신고 생성기
export function generatePostReport(override: Partial<PostReport> = {}): PostReport {
  const status: ReportStatus = faker.helpers.arrayElement([
    'pending',
    'reviewing',
    'resolved',
    'dismissed',
  ]);

  const hasComment = Math.random() > 0.5;
  const hasDescription = Math.random() > 0.5;
  const isReviewed = ['resolved', 'dismissed'].includes(status);
  const isResolved = status === 'resolved';
  const hasActionNote = isResolved && Math.random() > 0.5;
  const createdAt = faker.date.recent({ days: 30 });

  return {
    id: faker.string.uuid(),
    postId: faker.string.uuid(),
    ...(hasComment && { commentId: faker.string.uuid() }),
    reportedBy: faker.number.int({ min: 1, max: 999 }),
    reportType: faker.helpers.arrayElement([
      'spam',
      'harassment',
      'hate_speech',
      'inappropriate',
      'copyright',
      'misinformation',
      'off_topic',
      'other',
    ]),
    reason: faker.lorem.sentence(),
    ...(hasDescription && { description: faker.lorem.paragraph() }),
    status,
    ...(isReviewed && { reviewedBy: faker.number.int({ min: 1, max: 10 }) }),
    ...(isReviewed && {
      reviewedAt: faker.date.between({ from: createdAt, to: new Date() }).toISOString(),
    }),
    ...(isResolved && {
      action: faker.helpers.arrayElement([
        'none',
        'warning',
        'content_removed',
        'user_suspended',
        'user_banned',
      ]),
    }),
    ...(hasActionNote && { actionNote: faker.lorem.sentence() }),
    createdAt: createdAt.toISOString(),
    updatedAt: faker.date.recent({ days: 7 }).toISOString(),
    ...override,
  };
}

// 리액션 생성기
export function generatePostReaction(override: Partial<PostReaction> = {}): PostReaction {
  const type: ReactionType = faker.helpers.arrayElement([
    'like',
    'love',
    'laugh',
    'wow',
    'sad',
    'angry',
  ]);

  return {
    id: faker.string.uuid(),
    postId: faker.string.uuid(),
    userId: faker.number.int({ min: 1, max: 999 }),
    type,
    createdAt: faker.date.recent({ days: 30 }).toISOString(),
    ...override,
  };
}

// 다중 생성 함수들
export function generatePostList(count = 10): Post[] {
  return Array.from({ length: count }, () => generatePost());
}

export function generateAuthorPosts(authorId: number, count = 10): Post[] {
  return Array.from({ length: count }, () => generatePost({ authorId }));
}

export function generateCategoryPosts(category: PostCategory, count = 10): Post[] {
  return Array.from({ length: count }, () => generatePost({ category }));
}

export function generateCommentList(postId: string, count = 10): Comment[] {
  return Array.from({ length: count }, () => generateComment({ postId }));
}

export function generatePostReportList(count = 10): PostReport[] {
  return Array.from({ length: count }, () => generatePostReport());
}

export function generatePostReactionList(postId: string, count = 10): PostReaction[] {
  return Array.from({ length: count }, () => generatePostReaction({ postId }));
}
