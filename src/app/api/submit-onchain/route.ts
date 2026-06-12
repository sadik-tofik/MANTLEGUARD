import { NextRequest, NextResponse } from 'next/server';
import { submitAuditOnChain } from '@/lib/onchain';

export const maxDuration = 60; // Max duration for Vercel blockchain wait

export async function POST(req: NextRequest) {
  try {
    const { sourceCode, report } = await req.json();

    if (!sourceCode || !report) {
      return NextResponse.json({ error: 'Source code and report are required' }, { status: 400 });
    }

    const onChainData = await submitAuditOnChain(sourceCode, report);
    
    return NextResponse.json(onChainData);
  } catch (error: any) {
    console.error('API Submit Onchain Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
