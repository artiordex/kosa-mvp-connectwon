import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Add Stripe webhook verification logic here
  return NextResponse.json({ received: true });
}
