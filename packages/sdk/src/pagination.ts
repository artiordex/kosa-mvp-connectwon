/**
 * Description : pagination.ts - 📌 커서/오프셋 페이징 유틸
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */

// 커서/오프셋 공용 도우미

type PageExtractor<T, J = any> = (json: J) => { items: T[]; nextCursor?: string | null };

export function cursorPager<T, J = any>(
  fetchPage: (cursor?: string | null) => Promise<J>,
  extract: PageExtractor<T, J>
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
    }
  };
}

// 간단 오프셋 페이징
export function offsetPager<T, J = any>(
  fetchPage: (offset: number, limit: number) => Promise<J>,
  extract: (json: J) => { items: T[]; total?: number },
  limit = 50
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
    }
  };
}
