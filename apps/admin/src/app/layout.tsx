import React from 'react'
import './globals.css'

export const metadata = {
  title: 'Admin Dashboard',
  description: '어드민 대시보드',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <h1 className="text-xl font-bold">Admin</h1>
                </div>
                <div className="flex items-center space-x-4">
                  <a href="/dashboard" className="text-gray-700 hover:text-gray-900">대시보드</a>
                  <a href="/users" className="text-gray-700 hover:text-gray-900">사용자</a>
                  <a href="/settings" className="text-gray-700 hover:text-gray-900">설정</a>
                </div>
              </div>
            </div>
          </nav>

          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
