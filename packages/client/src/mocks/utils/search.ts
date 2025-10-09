/**
 * Description : search.ts - 📌 검색 및 필터링 유틸
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */
export function search<T extends Record<string, any>>(
  items: T[],
  query: string,
  keys: (keyof T)[]
): T[] {
  if (!query) return items;
  const lower = query.toLowerCase();

  return items.filter((item) =>
    keys.some((key) => String(item[key] ?? '').toLowerCase().includes(lower))
  );
}
