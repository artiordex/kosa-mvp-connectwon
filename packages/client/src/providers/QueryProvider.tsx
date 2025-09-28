/**
 * Description : QueryProvider.tsx - 📌 React Query 설정을 위한 프로바이더
 * Author : Shiwoo Min
 * Date : 2025-09-12
 */
import React, { useState } from 'react';
import { type DehydratedState, HydrationBoundary, QueryClient, type QueryClientConfig, QueryClientProvider } from '@tanstack/react-query';

// Props 타입 정의
interface QueryProviderProps {
  children: React.ReactNode;
  dehydratedState?: DehydratedState;
  client?: QueryClient;
  clientConfig?: QueryClientConfig;
}

/**
 * @description 기본 QueryClient 설정
 */
const defaultQueryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분
      retry: (failureCount, error) => {
        // 4xx 에러는 재시도하지 않음
        const maybeErr = error as any;
        if (maybeErr?.status && typeof maybeErr.status === 'number') {
          if (maybeErr.status >= 400 && maybeErr.status < 500) return false;
        }
        return failureCount < 3;
      },
      retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30_000), // 최대 30초
    },
    mutations: {
      retry: false,
    },
  },
};

/**
 * @description React Query 프로바이더 (HydrationBoundary 포함)
 */
export function QueryProvider({ children, dehydratedState, client, clientConfig }: QueryProviderProps) {
  const [queryClient] = useState(() => client ?? new QueryClient({ ...defaultQueryClientConfig, ...clientConfig }));

  return (
    <QueryClientProvider client={queryClient}>
      {dehydratedState ? <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary> : children}
    </QueryClientProvider>
  );
}
