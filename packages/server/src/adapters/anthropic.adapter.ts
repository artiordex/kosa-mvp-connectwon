/**
 * Description : anthropic.adapter.ts - 📌 Anthropic Claude API 어댑터
 * Author : Shiwoo Min
 * Date : 2025-09-27
 */
import type { Message, MessageCreateParamsNonStreaming } from '@anthropic-ai/sdk/resources/messages';

import type { AIChatInput, AIChatResult, AIClient, AIClientOptions, AIMessage } from '../../../core/src/ports/ai.port.js';

import type { AIChatInput, AIChatResult, AIClient, AIClientOptions, AIMessage } from '../../../core/src/ports/ai.port.js';

/**
 * @description Anthropic Claude API 어댑터 클래스
 * @implements {AIClient}
 */
export class AnthropicAdapter implements AIClient {
  constructor(private readonly opts: AIClientOptions) {}

  async chat(input: AIChatInput): Promise<AIChatResult> {
    const { default: Anthropic } = await import('@anthropic-ai/sdk');
    const client = new Anthropic({ apiKey: this.opts.apiKey });

    const model = input.params?.model ?? this.opts.defaultModel ?? 'claude-3-5-sonnet-20241022';

    const systemMessage = input.messages.find((m: AIMessage) => m.role === 'system')?.content || input.system;

    type ClaudeMsg = { role: 'user' | 'assistant'; content: string };
    const messages: ClaudeMsg[] = input.messages
      .filter((m: AIMessage) => m.role !== 'system')
      .map((m: AIMessage) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }));

    const createParams: MessageCreateParamsNonStreaming = {
      model,
      max_tokens: input.params?.maxTokens ?? 1024,
      messages,
      ...(input.params?.temperature !== undefined ? { temperature: input.params.temperature } : {}),
      ...(systemMessage ? { system: systemMessage } : {}),
    };

    const res: Message = await client.messages.create(createParams);

    const text = Array.isArray(res.content)
      ? (res.content as Array<{ type: string; text?: string }>)
          .filter(block => block.type === 'text')
          .map(block => block.text ?? '')
          .join('')
      : '';

    const usage = {
      promptTokens: (res as any).usage?.input_tokens ?? 0,
      completionTokens: (res as any).usage?.output_tokens ?? 0,
      totalTokens: ((res as any).usage?.input_tokens ?? 0) + ((res as any).usage?.output_tokens ?? 0),
    };

    return {
      content: text,
      finishReason: (res as any).stop_reason ?? 'stop',
      usage,
      raw: res,
    };
  }
}
