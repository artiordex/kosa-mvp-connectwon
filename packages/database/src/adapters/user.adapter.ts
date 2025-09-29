/**
 * Description : user.adapter.ts - 📌 UserRepository 구현 (Prisma/Postgres 기반)
 * Author : Shiwoo Min
 * Date : 2025-09-29
 */
import type { CreateUser, CursorPaginatedResponse, CursorPaginationQuery, Id, UpdateUser, User } from '@connectwon/core/core-types.js';
import type { UserRepository } from '@connectwon/core/ports/user.port.js';
import { Prisma, PrismaClient } from '@prisma/client';

export class PrismaUserAdapter implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  /**
   * @description DB → Domain 변환
   */
  private toDomain(db: any): User {
    return {
      id: String(db.id),
      email: db.email ?? '',
      name: db.name ?? '',
      roleFlags: db.roleFlags ?? 0,
      preferences: (db.preferences ?? {}) as Record<string, unknown>,
      createdAt: db.createdAt.toISOString(),
      updatedAt: db.updatedAt.toISOString(),
      lastLoginAt: db.lastLoginAt ? db.lastLoginAt.toISOString() : null,
    };
  }

  /** @inheritdoc */
  async findById(id: Id): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id: BigInt(id) } });
    return user ? this.toDomain(user) : null;
  }

  /** @inheritdoc */
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? this.toDomain(user) : null;
  }

  /** @inheritdoc */
  async findByGoogleSub(googleSub: string): Promise<User | null> {
    const provider = await this.prisma.authProvider.findFirst({
      where: { provider: 'google', providerSub: googleSub },
      include: { user: true },
    });
    return provider?.user ? this.toDomain(provider.user) : null;
  }

  /** @inheritdoc */
  async create(user: CreateUser): Promise<User> {
    const created = await this.prisma.user.create({
      data: {
        email: user.email ?? null,
        name: user.name ?? null,
        roleFlags: user.roleFlags ?? 0,
        preferences: (user.preferences ?? {}) as Prisma.InputJsonValue,
      },
    });
    return this.toDomain(created);
  }

  /** @inheritdoc */
  async update(id: Id, updates: UpdateUser): Promise<User> {
    const data: Prisma.UserUpdateInput = {};

    if (updates.email !== undefined) {
      data.email = updates.email;
    }
    if (updates.name !== undefined) {
      data.name = updates.name;
    }
    if (updates.roleFlags !== undefined) {
      data.roleFlags = updates.roleFlags;
    }
    if (updates.preferences !== undefined) {
      data.preferences = updates.preferences as Prisma.InputJsonValue;
    }
    if (updates.lastLoginAt !== undefined) {
      data.lastLoginAt = new Date(updates.lastLoginAt);
    }

    const updated = await this.prisma.user.update({
      where: { id: BigInt(id) },
      data,
    });

    return this.toDomain(updated);
  }

  /** @inheritdoc */
  async delete(id: Id): Promise<boolean> {
    await this.prisma.user.delete({ where: { id: BigInt(id) } });
    return true;
  }

  /** @inheritdoc */
  async findMany(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<User>> {
    const take = query.limit ?? 10;

    const rows = await this.prisma.user.findMany({
      take: take + 1,
      skip: query.cursor ? 1 : 0,
      ...(query.cursor && { cursor: { id: BigInt(query.cursor) } }),
      orderBy: { id: 'asc' },
    });

    const hasNext = rows.length > take;
    const items = rows.slice(0, take).map(u => this.toDomain(u));
    const nextCursor = hasNext ? String(rows[take]!.id) : null;

    return { items, nextCursor };
  }

  /** @inheritdoc */
  async findByRoleFlags(roleFlags: number, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<User>> {
    const take = query.limit ?? 10;

    const rows = await this.prisma.user.findMany({
      where: { roleFlags },
      take: take + 1,
      skip: query.cursor ? 1 : 0,
      ...(query.cursor && { cursor: { id: BigInt(query.cursor) } }),
      orderBy: { id: 'asc' },
    });

    const hasNext = rows.length > take;
    const items = rows.slice(0, take).map(u => this.toDomain(u));
    const nextCursor = hasNext ? String(rows[take]!.id) : null;

    return { items, nextCursor };
  }

  /** @inheritdoc */
  async updateLastLoginAt(id: Id, at: Date): Promise<void> {
    await this.prisma.user.update({
      where: { id: BigInt(id) },
      data: { lastLoginAt: at },
    });
  }

  /** @inheritdoc */
  async exists(id: Id): Promise<boolean> {
    const cnt = await this.prisma.user.count({ where: { id: BigInt(id) } });
    return cnt > 0;
  }

  /** @inheritdoc */
  async existsByEmail(email: string): Promise<boolean> {
    const cnt = await this.prisma.user.count({ where: { email } });
    return cnt > 0;
  }

  /** @inheritdoc */
  async existsByGoogleSub(googleSub: string): Promise<boolean> {
    const cnt = await this.prisma.authProvider.count({
      where: { provider: 'google', providerSub: googleSub },
    });
    return cnt > 0;
  }

  /** @inheritdoc */
  async count(): Promise<number> {
    return this.prisma.user.count();
  }

  /** @inheritdoc */
  async countByRoleFlags(roleFlags: number): Promise<number> {
    return this.prisma.user.count({ where: { roleFlags } });
  }
}
