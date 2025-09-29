/**
 * Description : ai.service.ts - 📌 서버에서 AI 어댑터 사용 서비스
 * Author : Shiwoo Min
 * Date : 2025-09-26
 */
import { Injectable } from '@nestjs/common';
import { OpenAIAdapter } from '../adapters/openai.adapter.js';
import type { AIChatInput, AIChatResult } from '../server-types.js';
import { AnthropicAdapter } from '../adapters/anthropic.adapter.js';
import { HuggingFaceAdapter } from '../adapters/huggingface.adapter.js';

@Injectable()
export class AiService {
  private readonly openai: OpenAIAdapter;
  private readonly anthropic: AnthropicAdapter;
  private readonly huggingface: HuggingFaceAdapter;

  constructor() {
    this.openai = new OpenAIAdapter({
      apiKey: process.env['OPENAI_API_KEY']!,
      defaultModel: 'gpt-4o-mini',
    });

    this.anthropic = new AnthropicAdapter({
      apiKey: process.env['ANTHROPIC_API_KEY']!,
      defaultModel: 'claude-3-5-sonnet-20241022',
    });

    this.huggingface = new HuggingFaceAdapter({
      apiKey: process.env['HF_API_KEY']!,
      defaultModel: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
    });
  }

  async chatWithOpenAI(input: AIChatInput): Promise<AIChatResult> {
    return this.openai.chat(input);
  }

  async chatWithAnthropic(input: AIChatInput): Promise<AIChatResult> {
    return this.anthropic.chat(input);
  }

  async chatWithHuggingFace(input: AIChatInput): Promise<AIChatResult> {
    return this.huggingface.chat(input);
  }
}
