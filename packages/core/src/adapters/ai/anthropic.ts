/**
 * Description : anthropic.adapter.ts - 📌 Anthropic(Claude) 어댑터
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import type { AIChatInput, AIChatResult, AIClient, AIClientOptions } from '../../../core-types.js';

export class AnthropicAdapter implements AIClient {
  constructor(private readonly opts: AIClientOptions) {}

  // 채팅 생성
  async chat(input: AIChatInput): Promise<AIChatResult> {
    const { default: Anthropic } = await import('@anthropic-ai/sdk');
    const client = new Anthropic({
      apiKey: this.opts.apiKey,
    });

    const model = input.params?.model ?? this.opts.defaultModel ?? 'claude-3-5-sonnet-20241022';

    // system 메시지 분리
    const systemMessage = input.messages.find(m => m.role === 'system')?.content || input.system;

    // user/assistant 메시지만 필터링
    const messages = input.messages
      .filter(m => m.role !== 'system')
      .map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }));

    try {
      // system이 undefined인 경우 속성 자체를 제거
      const createParams: any = {
        model,
        max_tokens: input.params?.maxTokens ?? 1024,
        messages,
      };

      // undefined가 아닌 경우에만 추가
      if (input.params?.temperature !== undefined) {
        createParams.temperature = input.params.temperature;
      }

      if (systemMessage !== undefined) {
        createParams.system = systemMessage;
      }

      const res = await client.messages.create(createParams);

      // TextBlock 타입 안전하게 처리 - 타입 predicate 제거
      const content = res.content;
      const text = Array.isArray(content)
        ? content
            .filter(block => block.type === 'text')
            .map(block => (block as any).text || '') // any로 캐스팅해서 text 접근
            .join('')
        : '';

      return {
        content: text,
        finishReason: res.stop_reason || 'stop', // undefined 대신 기본값
        usage: {
          promptTokens: res.usage.input_tokens,
          completionTokens: res.usage.output_tokens,
          totalTokens: res.usage.input_tokens + res.usage.output_tokens,
        },
        raw: res,
      };
    } catch (error) {
      throw new Error(
        `Anthropic API error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }
}
