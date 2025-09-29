/**
 * Description : pagination.ts - 📌 커서/오프셋 페이징 유틸 (리팩토링 버전)
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
import type { OffsetExtractor, PageExtractor } from './sdk-types.js';

/**
 * 커서 기반 페이징 유틸
 * @param fetchPage - (cursor) => Promise<J> : API 페이지 fetcher
 * @param extract - (json) => { items, nextCursor } 추출기
 */
export function cursorPager<T, J = any>(fetchPage: (cursor?: string | null) => Promise<J>, extract: PageExtractor<T, J>) {
  return {
    /** 페이지 단위 이터레이터 */
    async *pages() {
      let cursor: string | null | undefined = undefined;
      for (;;) {
        const json = await fetchPage(cursor ?? undefined);
        const { items, nextCursor } = extract(json);

        if (!items || items.length === 0) break;
        yield items;

        if (!nextCursor) break;
        cursor = nextCursor;
      }
    },

    /** 아이템 단위 이터레이터 */
    async *items() {
      for await (const page of this.pages()) {
        for (const item of page) {
          yield item;
        }
      }
    },
  };
}

/**
 * 오프셋 기반 페이징 유틸
 * @param fetchPage - (offset, limit) => Promise<J> : API 페이지 fetcher
 * @param extract - (json) => { items } 추출기
 * @param limit - 페이지 크기 (기본: 50)
 */
export function offsetPager<T, J = any>(fetchPage: (offset: number, limit: number) => Promise<J>, extract: OffsetExtractor<T, J>, limit = 50) {
  return {
    /** 페이지 단위 이터레이터 */
    async *pages() {
      let offset = 0;
      for (;;) {
        const json = await fetchPage(offset, limit);
        const { items } = extract(json);

        if (!items || items.length === 0) break;
        yield items;

        offset += items.length;
        if (items.length < limit) break; // 마지막 페이지
      }
    },

    /** 아이템 단위 이터레이터 */
    async *items() {
      for await (const page of this.pages()) {
        for (const it of page) {
          yield it;
        }
      }
    },
  };
}
