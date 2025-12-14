import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  return NextResponse.json(
    { message: 'API endpoints require specific routes' },
    { status: 404 }
  );
}

export async function HEAD() {
  return new NextResponse(null, { status: 404 });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 404 });
}
