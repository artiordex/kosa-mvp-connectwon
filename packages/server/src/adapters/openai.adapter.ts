/**
 * Description : openai.adapter.ts - 📌 OpenAI GPT API 어댑터
 * Author : Shiwoo Min
 * Date : 2025-09-30
 */
import type { AIChatInput, AIChatResult, AIClient, AIClientOptions } from '@connectwon/core/ports/ai.port.js';
import type { ChatCompletionCreateParamsNonStreaming } from 'openai/resources/chat/completions';

/**
 * @class OpenAIAdapter
 * @description OpenAI API 어댑터 클래스
 * @implements {AIClient}
 */
export class OpenAIAdapter implements AIClient {
  constructor(private readonly opts: AIClientOptions) {}

  /**
   * @description OpenAI 모델과 채팅
   */
  async chat(input: AIChatInput): Promise<AIChatResult> {
    const OpenAI = (await import('openai')).default;
    const client = new OpenAI({ apiKey: this.opts.apiKey, baseURL: this.opts.baseURL });

    const model = input.params?.model ?? this.opts.defaultModel ?? 'gpt-4o-mini';
    const messages = input.system ? [{ role: 'system', content: input.system }, ...input.messages] : input.messages;

    const body: ChatCompletionCreateParamsNonStreaming = {
      model,
      messages: messages as any,
      ...(input.params?.temperature !== undefined && { temperature: input.params.temperature }),
      ...(input.params?.maxTokens !== undefined && { max_tokens: input.params.maxTokens }),
      ...(input.params?.topP !== undefined && { top_p: input.params.topP }),
    };

    const res = await client.chat.completions.create(body);
    const choice = res.choices?.[0];
    const content = choice?.message?.content ?? '';

    return {
      content,
      finishReason: choice?.finish_reason ?? 'stop',
      usage: {
        promptTokens: res.usage?.prompt_tokens ?? 0,
        completionTokens: res.usage?.completion_tokens ?? 0,
        totalTokens: res.usage?.total_tokens ?? 0,
      },
      raw: res,
    };
  }
}
