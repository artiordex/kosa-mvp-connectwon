import { Module } from '@nestjs/common';
import { ProgramController } from './program.controller';
import { ProgramProcessor } from './program.processor';
import { ProgramService } from './program.service';

@Module({
  imports: [],
  controllers: [ProgramController],
  providers: [ProgramService, ProgramProcessor], // 프로그램 서비스와 프로세서 연결
})
export class ProgramModule {}
