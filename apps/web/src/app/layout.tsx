import type { ReactNode } from 'react';

export const metadata = { title: 'ConnectWon' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
