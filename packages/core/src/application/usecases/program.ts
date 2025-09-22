/**
 * Description : program.ts - 📌 프로그램 개설
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';

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
 * @description 프로그램 생성 요청 유스케이스
 * @summary 새로운 프로그램을 생성하는 비즈니스 로직 처리
 */
@Injectable()
export class CreateProgramUsecase {
  /**
   * @description 새 프로그램 생성 실행
   * @param ownerId 프로그램 소유자 ID
   * @param title 프로그램 제목
   * @returns 생성된 프로그램 객체
   * @example
   * ```typescript
   * const program = usecase.execute('user123', 'JavaScript 기초 과정');
   * // { id: 'uuid...', ownerId: 'user123', title: 'JavaScript 기초 과정', sessions: [] }
   * ```
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
