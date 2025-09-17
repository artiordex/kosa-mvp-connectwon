/**
 * Description : QueryProvider.tsx - 📌 React Query 설정을 위한 프로바이더
 * Author : Shiwoo Min
 * Date : 2025-09-12
 */
'use client';

import {
  type DehydratedState,
  HydrationBoundary,
  QueryClient,
  type QueryClientConfig,
  QueryClientProvider
} from '@tanstack/react-query';
import React, { useState } from 'react';

// Props 타입 정의
interface QueryProviderProps {
  children: React.ReactNode;
  dehydratedState?: DehydratedState;
  client?: QueryClient;
  clientConfig?: QueryClientConfig;
}

// 기본 QueryClient 설정
const defaultQueryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분
      retry: (failureCount, error) => {
        // 4xx 에러는 재시도하지 않음
        if (error && typeof error === 'object' && 'status' in error) {
          const status = error.status as number;
          if (status >= 400 && status < 500) return false;
        }
        return failureCount < 3;
      },
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: false,
    },
  },
};

// QueryProvider 컴포넌트
export function QueryProvider({
  children,
  dehydratedState,
  client,
  clientConfig
}: QueryProviderProps) {
  const [queryClient] = useState(() =>
    client ?? new QueryClient({ ...defaultQueryClientConfig, ...clientConfig })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {dehydratedState ? (
        <HydrationBoundary state={dehydratedState}>
          {children}
        </HydrationBoundary>
      ) : (
        children
      )}
    </QueryClientProvider>
  );
}
