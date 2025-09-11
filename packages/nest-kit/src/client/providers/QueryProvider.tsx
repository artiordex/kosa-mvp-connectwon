/**
 * Description : QueryProvider.ts - 📌 React Query 설정을 위한 프로바이더
 * Author : Shiwoo Min
 * Date : 2025-09-12
 */
'use client';

import { type DehydratedState, HydrationBoundary, QueryClient, type QueryClientConfig, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';

type Props = {
  children: React.ReactNode;
  dehydratedState?: DehydratedState;
  client?: QueryClient;
  clientConfig?: QueryClientConfig;
};

export function QueryProvider({ children, dehydratedState, client, clientConfig }: Props) {
  const [qc] = useState(() => client ?? new QueryClient(clientConfig));

  // 두 분기 모두 JSX.Element가 되도록 통일
  const content: JSX.Element = dehydratedState ? (
    <HydrationBoundary state={dehydratedState}>
      <>{children}</>
    </HydrationBoundary>
  ) : (
    <>{children}</>
  );

  return <QueryClientProvider client={qc}>{content}</QueryClientProvider>;
}
