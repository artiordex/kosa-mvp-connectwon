/**
 * Description : ai.adapter.ts - 📌 Prisma 기반 AIInteraction 저장소 어댑터
 * Author : Shiwoo Min
 * Date : 2025-09-29
 */
import { Prisma, PrismaClient } from '@prisma/client';

import type { AIInteraction, AIInteractionRepository, CreateAIInteraction, CursorPaginatedResponse, CursorPaginationQuery, UpdateAIInteraction } from '@connectwon/core/ports/ai.port.js';

const prisma = new PrismaClient();

/**
 * @class PrismaAIInteractionRepository
 * @description Prisma를 이용해 `ai_interactions` 테이블을 관리하는 저장소 어댑터 구현체
 * @implements {AIInteractionRepository}
 */
export class PrismaAIInteractionRepository implements AIInteractionRepository {
  /**
   * @description ID로 단일 AIInteraction 조회
   */
  async findById(id: string): Promise<AIInteraction | null> {
    return prisma.aiInteraction.findUnique({
      where: { id: BigInt(id) },
    }) as any;
  }

  /**
   * @description 새 AIInteraction 레코드 생성
   */
  async create(data: CreateAIInteraction): Promise<AIInteraction> {
    return prisma.aiInteraction.create({
      data: {
        provider: data.provider,
        model: data.model,
        kind: data.kind,
        meta: (data.metadata ?? {}) as Prisma.InputJsonValue, 
        userId: data.userId ? BigInt(data.userId) : null,
        programId: data.programId ? BigInt(data.programId) : null,
        sessionId: data.sessionId ? BigInt(data.sessionId) : null,
      },
    }) as any;
  }

  /**
   * @description 기존 AIInteraction 레코드 갱신
   */
  async update(id: string, updates: UpdateAIInteraction): Promise<AIInteraction> {
    return prisma.aiInteraction.update({
      where: { id: BigInt(id) },
      data: {
        ...(updates.status !== undefined && { status: updates.status }),
        ...(updates.promptTokens !== undefined && { promptTokens: updates.promptTokens }),
        ...(updates.completionTokens !== undefined && { completionTokens: updates.completionTokens }),
        ...(updates.costUSD !== undefined && { cost: updates.costUSD }),
        ...(updates.traceId !== undefined && { traceId: updates.traceId }),
        ...(updates.metadata !== undefined && { meta: updates.metadata as Prisma.InputJsonValue }),
      },
    }) as any;
  }

  /**
   * @description AIInteraction 레코드 삭제
   */
  async delete(id: string): Promise<boolean> {
    await prisma.aiInteraction.delete({
      where: { id: BigInt(id) },
    });
    return true;
  }

  /**
   * @description 커서 기반 페이지네이션 목록 조회
   */
  async findMany(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<AIInteraction>> {
    const limit = query.limit ?? 20;
    const cursor = query.cursor ? { id: BigInt(query.cursor) } : null;

    const items = await prisma.aiInteraction.findMany({
      take: limit + 1,
      skip: cursor ? 1 : 0,
      ...(cursor ? { cursor } : {}),
      orderBy: { id: 'asc' },
    });

    const nextCursor = items.length > limit ? String(items.pop()?.id) : null;
    return { items: items as any, nextCursor };
  }

  /**
   * @description 특정 사용자(userId) 기준으로 커서 기반 페이지네이션 목록 조회
   */
  async findByUser(
    userId: string,
    query: CursorPaginationQuery,
  ): Promise<CursorPaginatedResponse<AIInteraction>> {
    const limit = query.limit ?? 20;
    const cursor = query.cursor ? { id: BigInt(query.cursor) } : null;

    const items = await prisma.aiInteraction.findMany({
      where: { userId: BigInt(userId) },
      take: limit + 1,
      skip: cursor ? 1 : 0,
      ...(cursor ? { cursor } : {}),
      orderBy: { id: 'asc' },
    });

    const nextCursor = items.length > limit ? String(items.pop()?.id) : null;
    return { items: items as any, nextCursor };
  }

  /**
   * @description 전체 AIInteraction 레코드 개수 반환
   */
  async count(): Promise<number> {
    return prisma.aiInteraction.count();
  }
}
