'use client';

import React, { useState } from 'react';

export default function ProgramAddPage() {
  const [title, setTitle] = useState('');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">프로그램 등록</h1>
      <input value={title} onChange={e => setTitle(e.target.value)} className="border px-2 py-1 rounded" placeholder="프로그램 이름 입력" />
    </div>
  );
}
