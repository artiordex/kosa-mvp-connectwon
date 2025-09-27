/**
 * Description : huggingface.ts - 📌 Hugging Face의 추론 API를 통한 텍스트 생성 기능 제공
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import type { AIChatInput, AIChatResult, AIClient, AIClientOptions, AIMessage } from '../../core-types.js';

/**
 * Description : ai-adapter-factory.ts - 📌 AI 어댑터 팩토리
 * Author : Shiwoo Min
 * Date : 2025-09-27
 */

/**
 * @description AI 어댑터 팩토리 클래스
 */
export class AIAdapterFactory {
  /**
   * @description OpenAI 어댑터 생성
   */
  static createOpenAI(options: AIClientOptions): OpenAIAdapter {
    return new OpenAIAdapter(options);
  }

  /**
   * @description Anthropic 어댑터 생성
   */
  static createAnthropic(options: AIClientOptions): AnthropicAdapter {
    return new AnthropicAdapter(options);
  }

  /**
   * @description Hugging Face 어댑터 생성
   */
  static createHuggingFace(options: AIClientOptions): HuggingFaceAdapter {
    return new HuggingFaceAdapter(options);
  }

  /**
   * @description 환경변수 기반 어댑터 생성
   */
  static createFromEnvironment(): AIClient {
    const provider = process.env.AI_PROVIDER || 'openai';
    const apiKey = process.env.AI_API_KEY;
    const baseURL = process.env.AI_BASE_URL;
    const defaultModel = process.env.AI_DEFAULT_MODEL;

    if (!apiKey) {
      throw new Error('AI_API_KEY environment variable is required');
    }

    const options: AIClientOptions = {
      apiKey,
      ...(baseURL && { baseURL }),
      ...(defaultModel && { defaultModel }),
    };

    switch (provider.toLowerCase()) {
      case 'openai':
        return this.createOpenAI(options);
      case 'anthropic':
        return this.createAnthropic(options);
      case 'huggingface':
        return this.createHuggingFace(options);
      default:
        throw new Error(`Unsupported AI provider: ${provider}`);
    }
  }

  /**
   * @description 멀티 프로바이더 어댑터 (라운드로빈)
   */
  static createMultiProvider(adapters: AIClient[]): AIClient {
    if (adapters.length === 0) {
      throw new Error('At least one adapter is required');
    }

    let currentIndex = 0;

    return {
      async chat(input: AIChatInput): Promise<AIChatResult> {
        const adapter = adapters[currentIndex];
        currentIndex = (currentIndex + 1) % adapters.length;

        try {
          return await adapter.chat(input);
        } catch (error) {
          // 페일오버: 다음 어댑터 시도
          if (adapters.length > 1) {
            const fallbackAdapter = adapters[currentIndex];
            currentIndex = (currentIndex + 1) % adapters.length;
            return await fallbackAdapter.chat(input);
          }
          throw error;
        }
      },
    };
  }
}
