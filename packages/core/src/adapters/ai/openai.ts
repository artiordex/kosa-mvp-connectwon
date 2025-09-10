/**
 * Description : openai.ts - 📌 OpenAI 어댑터
 * Author      : Shiwoo Min
 * Date        : 2025-09-10
 */
import type { ChatCompletionCreateParamsNonStreaming } from 'openai/resources/chat/completions';

import type { AIChatInput, AIChatResult, AIClient, AIClientOptions } from '../../../core-types.js';

// OpenAI 어댑터
export class OpenAIAdapter implements AIClient {
  constructor(private readonly opts: AIClientOptions) {}

  async chat(input: AIChatInput): Promise<AIChatResult> {
    const OpenAI = (await import('openai')).default;
    const client = new OpenAI({
      apiKey: this.opts.apiKey,
      baseURL: this.opts.baseURL,
    });
    const model = input.params?.model ?? this.opts.defaultModel ?? 'gpt-4o-mini';

    // system 프롬프트를 선두에 삽입
    const messages = input.system
      ? [{ role: 'system', content: input.system }, ...input.messages]
      : input.messages;

    // OpenAI SDK의 chat.completions.create() 호출
    const body: ChatCompletionCreateParamsNonStreaming = {
      model,
      messages: messages as any,
      ...(input.params?.temperature !== undefined && {
        temperature: input.params.temperature,
      }),
      ...(input.params?.maxTokens !== undefined && {
        max_tokens: input.params.maxTokens,
      }),
      ...(input.params?.topP !== undefined && {
        top_p: input.params.topP,
      }),
    };

    // @ts-ignore - messages 타입 미스매치(추후 SDK 개선 기대)
    const res = await client.chat.completions.create(body as any);

    const choice = res.choices?.[0];
    const content = choice?.message?.content ?? '';

    // 토큰 사용량
    const usage = res.usage
      ? {
          promptTokens: res.usage.prompt_tokens,
          completionTokens: res.usage.completion_tokens,
          totalTokens: res.usage.total_tokens,
        }
      : undefined;

    const finishReason = choice?.finish_reason; // string | undefined

    return {
      content,
      ...(finishReason !== undefined && { finishReason }),
      ...(usage && { usage }),
      raw: res,
    };
  }
}
