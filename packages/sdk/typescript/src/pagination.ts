/**
 * Description : pagination.ts - 📌 커서/오프셋 페이징 유틸 (수정 버전)
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
import type { OffsetExtractor, PageExtractor } from '../../sdk-types.js';

// 커서 기반 페이징 유틸
export function cursorPager<T, J = any>(
  fetchPage: (cursor?: string | null) => Promise<J>,
  extract: PageExtractor<T, J>,
) {
  return {
    async *pages() {
      let cursor: string | null | undefined = undefined;
      while (true) {
        const json = await fetchPage(cursor ?? undefined);
        const { items, nextCursor } = extract(json);
        yield items;
        if (!nextCursor) break;
        cursor = nextCursor;
      }
    },

    async *items() {
      for await (const page of this.pages()) {
        for (const item of page) yield item;
      }
    },
  };
}

// 오프셋 기반 페이징 유틸
export function offsetPager<T, J = any>(
  fetchPage: (offset: number, limit: number) => Promise<J>,
  extract: OffsetExtractor<T, J>,
  limit = 50,
) {
  return {
    async *pages() {
      let offset = 0;
      while (true) {
        const json = await fetchPage(offset, limit);
        const { items } = extract(json);
        if (!items.length) break;
        yield items;
        offset += items.length;
        if (items.length < limit) break;
      }
    },
    async *items() {
      for await (const page of this.pages()) {
        for (const it of page) yield it;
      }
    },
  };
}
