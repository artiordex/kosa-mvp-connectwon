/**
 * Description : review.port.ts - 📌 리뷰/평가 저장소 포트 인터페이스
 * Author : Shiwoo Min
 * Date : 2025-09-30
 */
import type { CursorPaginatedResponse, CursorPaginationQuery, Id, ISODateTime } from '../core-types.js';

/**
 * @description 리뷰 대상 종류
 * ('program','session','room','device')
 */
export type ReviewTargetType = 'program' | 'session' | 'room' | 'device';

/**
 * @description 리뷰 엔터티 (DB 매핑)
 */
export interface Review {
  id: Id;
  userId: Id;
  targetType: ReviewTargetType;
  targetId: Id;
  rating: number; // 1~5
  comment?: string;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

/**
 * @description 리뷰 생성 입력
 */
export interface CreateReview {
  userId: Id;
  targetType: ReviewTargetType;
  targetId: Id;
  rating: number;
  comment?: string;
}

/**
 * @description 리뷰 수정 입력
 */
export interface UpdateReview {
  rating?: number;
  comment?: string;
}

/**
 * @description 리뷰 저장소 포트
 */
export interface ReviewRepository {
  /** ID로 조회 */
  findById(id: Id): Promise<Review | null>;

  /** 특정 대상(프로그램/세션/룸/디바이스)의 리뷰 조회 */
  findByTarget(targetType: ReviewTargetType, targetId: Id, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Review>>;

  /** 특정 사용자가 작성한 리뷰 조회 */
  findByUser(userId: Id, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Review>>;

  /** 리뷰 생성 */
  create(data: CreateReview): Promise<Review>;

  /** 리뷰 수정 */
  update(id: Id, updates: UpdateReview): Promise<Review>;

  /** 리뷰 삭제 */
  delete(id: Id): Promise<void>;

  /** 통계: 특정 대상의 리뷰 평균/개수 */
  getStats(targetType: ReviewTargetType, targetId: Id): Promise<ReviewStats>;

  /** 전체 개수 */
  count(): Promise<number>;
  /** 특정 대상 리뷰 개수 */
  countByTarget(targetType: ReviewTargetType, targetId: Id): Promise<number>;

  /** 존재 여부 */
  exists(id: Id): Promise<boolean>;
}

/**
 * @description 리뷰 통계
 */
export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: Record<1 | 2 | 3 | 4 | 5, number>;
}
