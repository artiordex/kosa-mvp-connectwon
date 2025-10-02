import type { ReactNode } from 'react';

import AppShell from 'components/AppShell';
import '../globals.css';

export const metadata = {
  title: 'ConnectWon',
  description: '생활 서비스 플랫폼',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
