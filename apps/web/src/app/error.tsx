'use client';

import { useEffect } from 'react';

import Link from 'next/link';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold text-red-600">문제가 발생했습니다</h1>
        {error.digest && <p className="mt-2 text-sm text-gray-500">에러 코드: {error.digest}</p>}
        <div className="mt-6 space-y-2">
          <button onClick={() => reset()} className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            다시 시도
          </button>
          <Link href="/" className="block w-full px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
