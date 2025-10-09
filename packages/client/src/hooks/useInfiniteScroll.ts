/**
 * Description : useInfiniteScroll.ts - 📌 IntersectionObserver 기반 무한 스크롤 훅
 * Author : Shiwoo Min
 * Date : 2025-09-29
 */
"use client";

import { useEffect, useRef } from 'react';
import type { UseInfiniteQueryResult } from '@tanstack/react-query';

interface InfiniteScrollOptions {
  rootMargin?: string;
}

/**
 * @description 무한 스크롤 훅
 * @param queryResult react-query의 useInfiniteQuery 리턴값
 * @param options 옵저버 옵션 (rootMargin 등)
 */
export function useInfiniteScroll<TData = unknown, TError = Error>(
  queryResult: UseInfiniteQueryResult<TData, TError>,
  options?: InfiniteScrollOptions,
) {
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = queryResult;
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: options?.rootMargin ?? '200px' },
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, options?.rootMargin]);

  return { loaderRef };
}
