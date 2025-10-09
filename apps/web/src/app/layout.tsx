/**
 * Description : layout.tsx - 📌 ConnectWon Web Root Layout
 * Author : Shiwoo Min
 * Date : 2025-10-07
 */
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { RootProvider } from '../providers/RootProvider';
import './globals.css';
import AppShell from 'components/AppShell';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: '커넥트원 - 혁신적인 교육과 체험 공간',
  description: '다양한 프로그램과 최첨단 시설을 통해 개인의 성장과 학습을 지원하는 복합 문화 공간',
  icons: {
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180' }],
  },
};

// Viewport 설정
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

// RootLayout
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        {/* Firebase + QueryProvider + (추가 Provider) 전역 적용 */}
        <RootProvider>
          <AppShell>{children}</AppShell>
        </RootProvider>
      </body>
    </html>
  );
}
