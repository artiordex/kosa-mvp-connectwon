/**
 * Description : program.usecase.ts - 📌 프로그램 개설 유스케이스
 * Author : Shiwoo Min
 * Date : 2025-09-26
 */
import { randomUUID } from 'node:crypto';
import type { Program, ProgramId, SessionId, UserId } from '../../core-types.js';

/**
 * @description CreateProgramUsecase가 반환하는 타입
 * DB 엔티티 Program에서 필요한 필드만 재활용
 */
export type ProgramDraft = Pick<Program, 'id' | 'title' | 'createdByUserId'> & {
  sessions: SessionId[];
};

/**
 * @description 프로그램 생성 유스케이스
 */
export class CreateProgramUsecase {
  /**
   * @description 새 프로그램 생성 실행
   */
  execute(ownerId: UserId, title: string): ProgramDraft {
    return {
      id: randomUUID() as ProgramId,
      createdByUserId: ownerId,
      title,
      sessions: [],
    };
  }
}
