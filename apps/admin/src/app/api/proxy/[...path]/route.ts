import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // This is a minimal example
  return NextResponse.json({ message: 'Proxy route is working' });
}
