export const dynamic = 'force-static';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Stripe 클라이언트 초기화
const stripe = new Stripe(process.env['STRIPE_SECRET_KEY']!, {
  apiVersion: '2025-08-27.basil', // 사용 중인 Stripe API 버전에 맞게 지정
});

// 웹훅 엔드포인트 비밀키
const endpointSecret = process.env['STRIPE_WEBHOOK_SECRET']!;

export async function POST(request: Request) {
  // Stripe에서 전달된 서명 헤더 추출
  const sig = request.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'stripe-signature 헤더가 없습니다.' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const body = await request.text();
    // 서명 검증 및 이벤트 객체 생성
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    console.error('Stripe 웹훅 서명 검증 실패:', err.message);
    return NextResponse.json({ error: '웹훅 서명 검증 실패' }, { status: 400 });
  }

  // 이벤트 타입에 따라 분기 처리
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('결제 세션 완료:', session.id, session.customer_email);
        // TODO: 결제 완료 후 주문 처리 로직 추가
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log('인보이스 결제 성공:', invoice.id, invoice.customer_email);
        // TODO: 구독/결제 성공 처리 로직 추가
        break;
      }

      case 'invoice.payment_failed': {
        const failedInvoice = event.data.object as Stripe.Invoice;
        console.log('인보이스 결제 실패:', failedInvoice.id);
        // TODO: 결제 실패 처리 로직 추가
        break;
      }

      default:
        console.log(`처리되지 않은 이벤트 타입: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    console.error('웹훅 처리 중 오류 발생:', err);
    return NextResponse.json({ error: '웹훅 처리 실패' }, { status: 500 });
  }
}
