import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  getAiResponse() {
    return { message: 'AI Response' };
  }
}
