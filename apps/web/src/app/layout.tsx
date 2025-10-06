import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { FirebaseProvider, QueryProvider } from '@connectwon/client';
import './globals.css';
import AppShell from 'components/AppShell';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '커넥트원 - 혁신적인 교육과 체험 공간',
  description: '다양한 프로그램과 최첨단 시설을 통해 개인의 성장과 학습을 지원하는 복합 문화 공간',
};

// Viewport 설정
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        {/* FirebaseProvider + QueryProvider로 전역 상태 감싸기 */}
        <FirebaseProvider>
          <QueryProvider>
            {/* 기존 AppShell은 그대로 유지 */}
            <AppShell>{children}</AppShell>
          </QueryProvider>
        </FirebaseProvider>
      </body>
    </html>
  );
}
