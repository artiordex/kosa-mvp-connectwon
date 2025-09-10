/**
 * Description : huggingface.adapter.ts - 📌 Hugging Face Inference 어댑터
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import type {
  AIChatInput,
  AIChatResult,
  AIClient,
  AIClientOptions,
  AIMessage,
} from '../../../core-types.js';

// 프롬프트 렌더링 유틸
function renderPrompt(system: string | undefined, messages: AIMessage[]): string {
  const head = system ? `System: ${system}\n` : '';
  const body = messages
    .map(m => `${m.role === 'assistant' ? 'Assistant' : 'User'}: ${m.content}`)
    .join('\n');
  return `${head}${body}\nAssistant:`;
}

// Hugging Face Inference 어댑터
export class HFAdapter implements AIClient {
  constructor(private readonly opts: AIClientOptions) {}

  async chat(input: AIChatInput): Promise<AIChatResult> {
    const { HfInference } = await import('@huggingface/inference');
    const hf = new HfInference(this.opts.apiKey);
    const model =
      input.params?.model ?? this.opts.defaultModel ?? 'mistralai/Mixtral-8x7B-Instruct-v0.1';
    const prompt = renderPrompt(input.system, input.messages);
    const out = await hf.textGeneration({
      model,
      inputs: prompt,
      parameters: {
        max_new_tokens: input.params?.maxTokens ?? 256,
        temperature: input.params?.temperature ?? 0.7,
        return_full_text: false,
        ...(input.params?.topP !== undefined && { top_p: input.params.topP }),
      },
    });

    // generated_text가 없을 수도 있으니 안전하게 접근
    const content = (out as any)?.generated_text ?? '';

    // usage를 undefined로 넣지 말고, 아예 키를 생략
    // finishReason도 없으면 생략
    return {
      content,
      raw: out,
    } satisfies AIChatResult;
  }
}
