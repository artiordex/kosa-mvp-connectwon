/**
 * Description : user-activity.adapter.ts - 📌 In-memory 사용자 활동 로그 어댑터
 * Author : Shiwoo Min
 * Date : 2025-09-30
 */
import type { CursorPaginatedResponse, CursorPaginationQuery, Id, ISODateTime } from '@connectwon/core/core-types.js';
import type { UserActivity, UserActivityRepository } from '@connectwon/core/ports/user.port.js';

function nowISO(): ISODateTime {
  return new Date().toISOString();
}

export class UserActivityMemoryAdapter implements UserActivityRepository {
  private activities: UserActivity[] = [];
  private seq = 1;

  async create(activity: Omit<UserActivity, 'id' | 'createdAt'>): Promise<UserActivity> {
    const newActivity: UserActivity = {
      id: String(this.seq++),
      userId: activity.userId,
      action: activity.action,
      createdAt: nowISO(),
      ...(activity.entityType !== undefined ? { entityType: activity.entityType } : {}),
      ...(activity.entityId !== undefined ? { entityId: activity.entityId } : {}),
      ...(activity.meta !== undefined ? { meta: activity.meta } : {}),
    };

    this.activities.push(newActivity);
    return newActivity;
  }

  async findByUserId(userId: Id, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<UserActivity>> {
    const filtered = this.activities.filter(a => a.userId === userId);

    const take = query.limit ?? 10;
    const startIndex = query.cursor ? filtered.findIndex(a => a.id === query.cursor) + 1 : 0;

    const slice = filtered.slice(startIndex, startIndex + take + 1);
    const hasNext = slice.length > take;
    const items = hasNext ? slice.slice(0, -1) : slice;
    const nextCursor = hasNext ? (items.at(-1)?.id ?? null) : null;

    return { items, nextCursor };
  }

  async findRecent(limit: number): Promise<UserActivity[]> {
    return this.activities
      .slice(-limit) // 마지막 N개
      .reverse(); // 최신순
  }

  async countByUser(userId: Id): Promise<number> {
    return this.activities.filter(a => a.userId === userId).length;
  }
}
