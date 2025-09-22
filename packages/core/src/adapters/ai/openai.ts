/**
 * Description : openai.ts - 📌 OpenAI GPT 모델을 통한 채팅 완성 기능 제공
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import type { ChatCompletionCreateParamsNonStreaming } from 'openai/resources/chat/completions';
import type { AIChatInput, AIChatResult, AIClient, AIClientOptions } from '../../../core-types.js';

/**
 * @description OpenAI API 어댑터 클래스
 * @implements {AIClient}
 */
export class OpenAIAdapter implements AIClient {
  /**
   * @description OpenAIAdapter 생성자
   * @param opts AI 클라이언트 옵션 (API 키, 기본 모델, baseURL 등)
   */
  constructor(private readonly opts: AIClientOptions) {}

  /**
   * @description OpenAI API를 사용한 채팅 완성
   * @param input 채팅 입력 데이터 (메시지, 파라미터 등)
   * @returns 채팅 완성 결과
   * @throws {Error} OpenAI API 호출 실패 시
   */
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

    // OpenAI SDK의 chat.completions.create() 호출을 위한 파라미터 구성
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

    try {
      const res = await client.chat.completions.create(body);

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
    } catch (error) {
      throw new Error(
        `OpenAI API error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }
}
