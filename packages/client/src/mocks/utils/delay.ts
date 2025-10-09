/**
 * Description : delay.ts - 📌 요청 지연(Delay) 유틸
 * Author : Shiwoo Min
 * Date   : 2025-10-09
 */
export const delay = (ms: number = 300): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
