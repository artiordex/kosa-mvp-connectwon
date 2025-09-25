import { Controller, Get } from '@nestjs/common';

import { AiService } from './admin.service';

import { AiService } from './admin.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get()
  getAiResponse() {
    return this.aiService.getAiResponse();
  }
}
