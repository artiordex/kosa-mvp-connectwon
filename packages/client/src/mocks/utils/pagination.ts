/**
 * Description : pagination.ts - 📌 Mock 데이터 페이지네이션 유틸
 * Author : Shiwoo Min
 * Date   : 2025-10-09
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function paginate<T>(items: T[], params: PaginationParams) {
  const page = params.page ?? 1;
  const limit = params.limit ?? 10;
  const total = items.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  const data = items.slice(start, end);
  const meta: PaginationMeta = { total, page, limit, totalPages };
  return { data, meta };
}
