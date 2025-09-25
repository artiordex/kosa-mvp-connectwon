import { Injectable } from '@nestjs/common';

// 프로세서에서 프로그램 처리
import { CreateProgramDto } from './dto/create-program.dto';
// 프로그램 생성 DTO
import { ProgramDto } from './dto/program.dto';
import { ProgramsProcessor } from './program.processor';

import { CreateProgramDto } from './dto/create-program.dto';
import { ProgramDto } from './dto/program.dto';
import { ProgramsProcessor } from './program.processor';

// 프로그램 조회 DTO

@Injectable()
export class ProgramsService {
  constructor(private readonly programsProcessor: ProgramsProcessor) {}

  /**
   * 새로운 프로그램을 생성합니다.
   * @param {CreateProgramDto} createProgramDto - 프로그램 생성 데이터
   * @returns {Promise<ProgramDto>} - 생성된 프로그램 정보
   */
  async createProgram(createProgramDto: CreateProgramDto): Promise<ProgramDto> {
    // 프로그램 생성 처리
    const program = await this.programsProcessor.processProgram(createProgramDto);
    return program;
  }

  /**
   * 프로그램 ID로 프로그램을 조회합니다.
   * @param {string} id - 프로그램 ID
   * @returns {Promise<ProgramDto>} - 조회된 프로그램 정보
   */
  async getProgram(id: string): Promise<ProgramDto> {
    // 프로그램 조회 처리
    const program = await this.programsProcessor.getProgramDetails(id);
    return program;
  }
}
