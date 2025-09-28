/**
 * Description : huggingface.adapter.ts - 📌 HuggingFace Inference API 어댑터
 * Author : Shiwoo Min
 * Date : 2025-09-30
 */
import type { AIChatInput, AIChatResult, AIClient, AIClientOptions } from '@connectwon/core/ports/ai.port.js';

/**
 * @class HuggingFaceAdapter
 * @description HuggingFace Inference API 어댑터 클래스
 * @implements {AIClient}
 */
export class HuggingFaceAdapter implements AIClient {
  constructor(private readonly opts: AIClientOptions) {}

  /**
   * @description HuggingFace 모델과 채팅
   */
  async chat(input: AIChatInput): Promise<AIChatResult> {
    const model = input.params?.model ?? this.opts.defaultModel ?? 'mistralai/Mistral-7B-Instruct-v0.2';

    const systemPrompt = input.system ? `System: ${input.system}\n` : '';
    const userMessages = input.messages.map(m => `${m.role}: ${m.content}`).join('\n');

    const payload = {
      inputs: `${systemPrompt}${userMessages}`,
      parameters: {
        max_new_tokens: input.params?.maxTokens ?? 512,
        ...(input.params?.temperature !== undefined && { temperature: input.params.temperature }),
        ...(input.params?.topP !== undefined && { top_p: input.params.topP }),
      },
    };

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

    return {
      content,
      finishReason: 'stop',
      usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }, // HF는 usage 제공 X
      raw: data,
    };
  }
}
