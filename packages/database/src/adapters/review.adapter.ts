import type { CursorPaginatedResponse, CursorPaginationQuery, Id } from '@connectwon/core/core-types.js';
import { PrismaClient } from '@prisma/client';
import type { CreateReview, Review, ReviewRepository, ReviewStats, ReviewTargetType, UpdateReview } from '@connectwon/core/ports/review.port.js';

export class ReviewPrismaAdapter implements ReviewRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: Id): Promise<Review | null> {
    return this.prisma.review.findUnique({ where: { id: BigInt(id) } }) as any;
  }

  async findByTarget(targetType: ReviewTargetType, targetId: Id, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Review>> {
    const take = query.limit ?? 10;

    const items = await this.prisma.review.findMany({
      where: { targetType, targetId: BigInt(targetId) },
      orderBy: { createdAt: 'desc' },
      take: take + 1,
      ...(query.cursor ? { cursor: { id: BigInt(query.cursor) } } : {}),
      skip: query.cursor ? 1 : 0,
    });

    const hasNext = items.length > take;
    const data = hasNext ? items.slice(0, -1) : items;
    const lastItem = data.at(-1);
    const nextCursor = hasNext && lastItem ? lastItem.id.toString() : null;

    return { items: data as any, nextCursor };
  }

  async findByUser(userId: Id, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<Review>> {
    const take = query.limit ?? 10;

    const items = await this.prisma.review.findMany({
      where: { userId: BigInt(userId) },
      orderBy: { createdAt: 'desc' },
      take: take + 1,
      ...(query.cursor ? { cursor: { id: BigInt(query.cursor) } } : {}),
      skip: query.cursor ? 1 : 0,
    });

    const hasNext = items.length > take;
    const data = hasNext ? items.slice(0, -1) : items;
    const lastItem = data.at(-1);
    const nextCursor = hasNext && lastItem ? lastItem.id.toString() : null;

    return { items: data as any, nextCursor };
  }

  async create(data: CreateReview): Promise<Review> {
    return this.prisma.review.create({
      data: {
        userId: BigInt(data.userId),
        targetType: data.targetType,
        targetId: BigInt(data.targetId),
        rating: data.rating,
        comment: data.comment ?? null,
      },
    }) as any;
  }

  async update(id: Id, updates: UpdateReview): Promise<Review> {
    return this.prisma.review.update({
      where: { id: BigInt(id) },
      data: {
        ...(updates.rating !== undefined && { rating: updates.rating }),
        ...(updates.comment !== undefined && { comment: updates.comment ?? null }),
      },
    }) as any;
  }

  async delete(id: Id): Promise<void> {
    await this.prisma.review.delete({ where: { id: BigInt(id) } });
  }

  async getStats(targetType: ReviewTargetType, targetId: Id): Promise<ReviewStats> {
    const stats = await this.prisma.review.groupBy({
      by: ['rating'],
      where: { targetType, targetId: BigInt(targetId) },
      _count: { rating: true },
    });

    const totalReviews = stats.reduce((sum, s) => sum + s._count.rating, 0);
    const averageRating = totalReviews > 0 ? stats.reduce((sum, s) => sum + s.rating * s._count.rating, 0) / totalReviews : 0;

    const ratingDistribution: ReviewStats['ratingDistribution'] = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
    stats.forEach(s => {
      ratingDistribution[s.rating as 1 | 2 | 3 | 4 | 5] = s._count.rating;
    });

    return { averageRating, totalReviews, ratingDistribution };
  }

  async count(): Promise<number> {
    return this.prisma.review.count();
  }

  async countByTarget(targetType: ReviewTargetType, targetId: Id): Promise<number> {
    return this.prisma.review.count({
      where: { targetType, targetId: BigInt(targetId) },
    });
  }

  async exists(id: Id): Promise<boolean> {
    const count = await this.prisma.review.count({ where: { id: BigInt(id) } });
    return count > 0;
  }
}
