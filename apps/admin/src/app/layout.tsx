import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import AppShell from 'components/AppShell';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: '커넥트원 - 관리자 화면',
  description: '커넥트원 관리자 화면',
};

// Viewport 설정
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${inter.className} bg-gray-100`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
