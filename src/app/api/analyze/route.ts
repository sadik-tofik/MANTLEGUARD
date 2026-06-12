import { NextRequest, NextResponse } from 'next/server';
import { analyzeContract } from '@/lib/analyzer';

export const maxDuration = 60; // Max duration for Vercel

export async function POST(req: NextRequest) {
  try {
    const { sourceCode } = await req.json();

    if (!sourceCode || typeof sourceCode !== 'string') {
      return NextResponse.json({ error: 'Source code is required' }, { status: 400 });
    }

    if (sourceCode.length > 50000) {
      return NextResponse.json({ error: 'Contract too large (max 50KB)' }, { status: 400 });
    }

    const report = await analyzeContract(sourceCode);
    
    return NextResponse.json(report);
  } catch (error: any) {
    console.error('API Analyze Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
