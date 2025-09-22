/**
 * Description : huggingface.ts - 📌 Hugging Face의 추론 API를 통한 텍스트 생성 기능 제공
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import type { AIChatInput, AIChatResult, AIClient, AIClientOptions, AIMessage } from '../../../core-types.js';

/**
 * @description 시스템 프롬프트와 메시지들을 단일 프롬프트로 렌더링
 * @param system 시스템 프롬프트 (선택사항)
 * @param messages 대화 메시지 배열
 * @returns 렌더링된 프롬프트 문자열
 */
function renderPrompt(system: string | undefined, messages: AIMessage[]): string {
  const head = system ? `System: ${system}\n` : '';
  const body = messages.map(m => `${m.role === 'assistant' ? 'Assistant' : 'User'}: ${m.content}`).join('\n');
  return `${head}${body}\nAssistant:`;
}

/**
 * @description Hugging Face Inference API 어댑터 클래스
 * @implements {AIClient}
 */
export class HFAdapter implements AIClient {
  /**
   * @description HFAdapter 생성자
   * @param opts AI 클라이언트 옵션 (API 키, 기본 모델 등)
   */
  constructor(private readonly opts: AIClientOptions) {}

  /**
   * @description Hugging Face API를 사용한 텍스트 생성
   * @param input 채팅 입력 데이터 (메시지, 파라미터 등)
   * @returns 채팅 완성 결과
   * @throws {Error} Hugging Face API 호출 실패 시
   */
  async chat(input: AIChatInput): Promise<AIChatResult> {
    const { HfInference } = await import('@huggingface/inference');
    const hf = new HfInference(this.opts.apiKey);
    const model = input.params?.model ?? this.opts.defaultModel ?? 'mistralai/Mixtral-8x7B-Instruct-v0.1';
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
