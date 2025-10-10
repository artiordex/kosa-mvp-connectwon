/**
 * Description : layout.tsx - 📌 ConnectWon 관리자 Root Layout
 * Author : Shiwoo Min
 * Date : 2025-10-07
 */
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
// TODO: Firebase 임시 주석처리
// import { RootProvider } from '../providers/RootProvider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: '커넥트원 - 관리자 화면',
  description: '커넥트원 관리자 전용 관리 시스템',
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
      <body className={`${inter.className} bg-gray-100`}>
        {children}
      </body>
    </html>
  );
}
