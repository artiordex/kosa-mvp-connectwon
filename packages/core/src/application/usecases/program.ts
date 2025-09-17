/**
 * Description : program.ts - 📌 프로그램 개설
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import { Injectable } from '@nestjs/common';

import { randomUUID } from 'node:crypto';

// 프로그램 도메인 모델 인터페이스
export interface Program {
  id: string;
  ownerId: string;
  title: string;
  sessions: string[];
}

// 프로그램 생성 요청 유스케이스
@Injectable()
export class CreateProgramUsecase {
  execute(ownerId: string, title: string): Program {
    return {
      id: randomUUID(),
      ownerId,
      title,
      sessions: [],
    };
  }
}
