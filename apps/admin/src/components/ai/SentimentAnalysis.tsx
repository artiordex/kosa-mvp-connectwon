'use client';

export default function SentimentAnalysis() {
  const sentiment = { positive: 78, neutral: 15, negative: 7 };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">AI 감정 분석</h2>
      {/* 차트 & 상세 */}
      <p>
        긍정: {sentiment.positive}% | 중립: {sentiment.neutral}% | 부정: {sentiment.negative}%
      </p>
    </div>
  );
}
