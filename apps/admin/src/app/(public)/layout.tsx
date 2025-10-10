/**
 * Description : layout.tsx - 📌 Admin Public Layout
 * Author : Shiwoo Min
 * Date : 2025-10-11
 */
import '../globals.css';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 min-h-screen flex items-center justify-center">
        {children}
      </body>
    </html>
  );
}
