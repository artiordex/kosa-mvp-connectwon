/**
 * Description : program.usecase.ts - 📌 프로그램 개설 유스케이스
 * Author : Shiwoo Min
 * Date : 2025-09-26
 */
import { randomUUID } from 'node:crypto';

/**
 * @description 프로그램 도메인 모델 인터페이스
 */
export interface Program {
  /** @description 프로그램 고유 ID */
  id: string;
  /** @description 프로그램 소유자 ID */
  ownerId: string;
  /** @description 프로그램 제목 */
  title: string;
  /** @description 프로그램에 속한 세션 ID 목록 */
  sessions: string[];
}

/**
 * @description 프로그램 생성 유스케이스
 */
export class CreateProgramUsecase {
  /**
   * @description 새 프로그램 생성 실행
   */
  execute(ownerId: string, title: string): Program {
    return {
      id: randomUUID(),
      ownerId,
      title,
      sessions: [],
    };
  }
}
