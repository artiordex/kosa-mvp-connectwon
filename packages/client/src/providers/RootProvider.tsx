/**
 * Description : RootProvider.tsx - 📌 공통 Provider 엔트리 (Firebase + Query)
 * Author : Shiwoo Min
 * Date : 2025-10-07
 */
'use client';

import React from 'react';
import { FirebaseProvider } from './FirebaseProvider.js';
import { QueryProvider } from './QueryProvider.js';

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseProvider>
      <QueryProvider>{children}</QueryProvider>
    </FirebaseProvider>
  );
}
