import { NextRequest, NextResponse } from 'next/server';
import { getAuditById } from '@/lib/verifier';
import { NETWORK } from '@/lib/mantle';

export async function GET(req: NextRequest) {
  const auditId = req.nextUrl.searchParams.get('auditId');

  if (!auditId || !auditId.startsWith('0x') || auditId.length !== 66) {
    return NextResponse.json({ error: 'Invalid Audit ID format' }, { status: 400 });
  }

  try {
    const record = await getAuditById(auditId);
    
    if (!record) {
      return NextResponse.json({ found: false }, { status: 404 });
    }

    return NextResponse.json({
      found: true,
      record: {
        ...record,
        explorerUrl: `${NETWORK.blockExplorers.default.url}/tx/${record.txHash}`
      }
    });
  } catch (error: any) {
    console.error('API Verify Error:', error);
    return NextResponse.json({ error: 'Failed to verify audit' }, { status: 500 });
  }
}
