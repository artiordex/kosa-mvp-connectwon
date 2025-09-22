/**
 * Description : anthropic.ts - 📌 Anthropic Claude API를 통한 채팅 완성 기능 제공
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import type { Message, MessageCreateParamsNonStreaming } from '@anthropic-ai/sdk/resources/messages';
import type { AIChatInput, AIChatResult, AIClient, AIClientOptions, AIMessage } from '../../../core-types.js';

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

    // system 메시지
    const systemMessage = input.messages.find((m: AIMessage) => m.role === 'system')?.content || input.system;

    // user/assistant 만 추출
    type ClaudeMsg = { role: 'user' | 'assistant'; content: string };
    const messages: ClaudeMsg[] = input.messages
      .filter((m: AIMessage) => m.role !== 'system')
      .map((m: AIMessage) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }));

    // Anthropic 메시지 포맷 변환
    const baseParams: MessageCreateParamsNonStreaming = {
      model,
      max_tokens: input.params?.maxTokens ?? 1024,
      messages,
    };

    const createParams: MessageCreateParamsNonStreaming = {
      ...baseParams,
      ...(input.params?.temperature !== undefined ? { temperature: input.params.temperature } : {}),
      ...(systemMessage ? { system: systemMessage } : {}),
    };

    const res: Message = await client.messages.create(createParams);

    const content = res.content;
    const text = Array.isArray(content)
      ? (content as Array<{ type: string; text?: string }>)
          .filter(block => block.type === 'text')
          .map(block => block.text ?? '')
          .join('')
      : '';

    return {
      content: text,
      finishReason: (res as any).stop_reason || 'stop',
      usage: {
        promptTokens: (res as any).usage?.input_tokens ?? 0,
        completionTokens: (res as any).usage?.output_tokens ?? 0,
        totalTokens: ((res as any).usage?.input_tokens ?? 0) + ((res as any).usage?.output_tokens ?? 0),
      },
      raw: res,
    };
  }
}
