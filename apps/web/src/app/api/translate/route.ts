export const dynamic = 'force-static';
import { NextResponse } from 'next/server';

/**
 * Google Translate 프록시 API 라우트
 * 클라이언트 → /api/translate → Google Translate API 호출
 */
export async function POST(req: Request) {
  try {
    const { text, target } = await req.json();
    // 요청 데이터 유효성 검사
    if (!text || !target) {
      console.error('번역 요청에 필요한 text 또는 target 값이 없습니다.');
      return NextResponse.json({ error: 'text, target 값이 필요합니다.' }, { status: 400 });
    }

    // Google Translate API 호출
    const res = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${process.env['GOOGLE_API_KEY']}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: text, target }),
    });
    // API 호출 실패 처리
    if (!res.ok) {
      const errText = await res.text();
      console.error('Google 번역 API 호출 실패:', errText);
      return NextResponse.json({ error: 'Google 번역 API 호출에 실패했습니다.' }, { status: 500 });
    }
    const data = await res.json();
    console.log(`번역 성공: "${text}" → (${target}) "${data.data.translations[0].translatedText}"`);
    return NextResponse.json({
      translatedText: data.data.translations[0].translatedText,
    });
  } catch (error) {
    console.error('번역 처리 중 오류 발생:', error);
    return NextResponse.json({ error: '번역 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
