/**
 * Description : huggingface.adapter.ts - 📌 HuggingFace Inference API 어댑터
 * Author : Shiwoo Min
 * Date : 2025-09-27
 */
import type { AIChatInput, AIChatResult, AIClient, AIClientOptions } from '../../../core/src/ports/ai.port.js';

import type { AIChatInput, AIChatResult, AIClient, AIClientOptions } from '../../../core/src/ports/ai.port.js';

/**
 * @description HuggingFace Inference API 어댑터 클래스
 * @implements {AIClient}
 */
export class HuggingFaceAdapter implements AIClient {
  constructor(private readonly opts: AIClientOptions) {}

  async chat(input: AIChatInput): Promise<AIChatResult> {
    const model = input.params?.model ?? this.opts.defaultModel ?? 'mistralai/Mistral-7B-Instruct-v0.2';

    const systemPrompt = input.system ? `System: ${input.system}\n` : '';
    const userMessages = input.messages.map(m => `${m.role}: ${m.content}`).join('\n');

    const payload = {
      inputs: `${systemPrompt}${userMessages}`,
      parameters: {
        max_new_tokens: input.params?.maxTokens ?? 512,
        temperature: input.params?.temperature ?? 0.7,
        top_p: input.params?.topP ?? 0.95,
      },
    };

    try {
      const res = await fetch(`${this.opts.baseURL ?? 'https://api-inference.huggingface.co/models'}/${model}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.opts.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`HuggingFace API error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();

      const content = Array.isArray(data) && data[0]?.generated_text ? data[0].generated_text : JSON.stringify(data);

      const usage = {
        promptTokens: 0,
        completionTokens: 0,
        totalTokens: 0,
      };

      return {
        content,
        finishReason: 'stop',
        usage,
        raw: data,
      };
    } catch (error) {
      throw new Error(`HuggingFace API error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
