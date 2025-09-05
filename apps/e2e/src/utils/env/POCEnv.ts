/**
 * Description : POCEnv.ts - 📌 Playwright 테스트 실행 시 POC 관련 환경변수 유틸 클래스
 * Author : Shiwoo Min
 * Date : 2025-04-11
 */
import {
  ALL_POCS,
  getAllPOCValues,
  isValidPOCValue,
  POCValueToKey,
} from '@common/types/platform-types';
import type { POCUpper, ValidPOCValue } from '@common/types/platform-types';

/**
 * Logger 타입이 "ALL" | POCKey 라면,
 * 여기서 강제로 string literal 타입 배열로 리턴하는 방식으로 맞춰줄 수 있음
 */
export class POCEnv {
  /**
   * 현재 설정된 환경변수 POC 값 반환 (원시 문자열)
   */
  public static getRawValue(): string {
    return process.env.POC?.toLowerCase().trim() || '';
  }

  /**
   * 유효한 POCValue 반환 (검증된 경우만)
   */
  public static getSafeValue(): ValidPOCValue | null {
    const raw = this.getRawValue();
    return isValidPOCValue(raw) ? raw : null;
  }

  /**
   * 현재 설정된 POC 타입 반환
   */
  public static getType(): ValidPOCValue {
    const value = this.getSafeValue();
    if (!value) {
      throw new Error(
        '[POCEnv] 유효하지 않은 POC 환경변수입니다. POC=pc|aos|ios|... 중 하나를 설정하세요.',
      );
    }
    return value;
  }

  /**
   * 현재 실행 중인 POC 대문자 Key ('PC', 'AOS', ...)
   */
  public static getKey(): POCUpper {
    return POCValueToKey[this.getType()];
  }

  /**
   * 실행 대상 POCKey 리스트
   * - 단일 실행이면 해당 POC만
   * - 전체 실행이면 ALL_POCS (as const literal array)
   */
  public static getPOCList(): ValidPOCValue[] {
    const value = this.getSafeValue();
    return value ? [value] : getAllPOCValues();
  }

  /**
   * 실행 대상 POC Key 리스트
   */
  public static getPOCKeyList(): POCUpper[] {
    return this.getPOCList().map(v => POCValueToKey[v]);
  }

  /**
   * 전체 실행 여부 확인
   */
  public static isAll(): boolean {
    return this.getSafeValue() === null;
  }

  /**
   * 현재 실행 대상이 특정 POC인지 확인
   */
  public static isPOC(target: POCUpper): boolean {
    return this.getPOCKeyList().includes(target);
  }

  /**
   * 현재 설정값 디버깅용 출력
   */
  public static printPOCInfo(): void {
    const raw = this.getRawValue() || 'all';
    const type = this.getKey();
    const list = this.getPOCKeyList().join(', ');
    console.log(`[POCEnv] POC 설정값: "${raw}" | 타입: ${type} | 실행 대상: [${list}]`);
  }

  /**
   * 전체 유효한 POC 값 리스트 반환
   */
  public static getAllPOCValues(): ValidPOCValue[] {
    return getAllPOCValues();
  }
}
