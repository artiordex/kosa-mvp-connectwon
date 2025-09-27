'use client';

export default function AutomationTasks() {
  const tasks = [
    { id: 1, name: '자동 예약 승인', status: 'active', processed: 156, accuracy: 94 },
    { id: 2, name: '감정 분석 처리', status: 'active', processed: 89, accuracy: 87 },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">AI 자동화 작업 모니터링</h2>
      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            {t.name} - {t.status} ({t.accuracy}%)
          </li>
        ))}
      </ul>
    </div>
  );
}
