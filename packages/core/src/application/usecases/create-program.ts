/**
 * Description : create-program.usecase.ts - 📌 프로그램 개설
 * Author      : Shiwoo Min
 * Date        : 2025-09-10
 */
import { Injectable } from '@nestjs/common';

import { randomUUID } from 'node:crypto';

export interface Program {
  id: string;
  ownerId: string;
  title: string;
  sessions: string[]; // 세션 ID 목록 (인메모리)
}

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
