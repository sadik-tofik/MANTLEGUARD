import { NextRequest, NextResponse } from 'next/server';
import { getRecentAudits, getTotalAudits } from '@/lib/verifier';

export async function GET(req: NextRequest) {
  const limit = req.nextUrl.searchParams.get('limit') || '20';
  
  try {
    const audits = await getRecentAudits(parseInt(limit));
    const total = await getTotalAudits();

    return NextResponse.json(audits, {
      headers: {
        'x-total-count': total.toString(),
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=59'
      }
    });
  } catch (error: any) {
    console.error('API History Error:', error);
    return NextResponse.json({ error: 'Failed to fetch audit history' }, { status: 500 });
  }
}
