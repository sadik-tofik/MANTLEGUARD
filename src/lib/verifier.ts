import { keccak256, toBytes } from 'viem';
import { 
  publicClient, 
  AUDIT_REGISTRY_ADDRESS, 
  AUDIT_REGISTRY_ABI,
  NETWORK
} from './mantle';
import { OnChainAuditRecord } from '@/types';

export async function getAuditById(auditId: string): Promise<OnChainAuditRecord | null> {
  try {
    const data = await publicClient.readContract({
      address: AUDIT_REGISTRY_ADDRESS,
      abi: AUDIT_REGISTRY_ABI,
      functionName: 'audits', // Changed from getAuditById to call the public mapping directly
      args: [auditId as `0x${string}`],
    }) as any;

    if (!data || data[0] === '0x0000000000000000000000000000000000000000000000000000000000000000') {
      return null;
    }

    // Normalize values
    const record: OnChainAuditRecord = {
      auditId,
      contractHash: data[0],
      reportHash: data[1],
      riskScore: Number(data[2]),
      issueCount: Number(data[3]),
      criticalCount: Number(data[4]),
      timestamp: Number(data[5]),
      submitter: data[6],
      blockNumber: '0',
      txHash: '',
      explorerUrl: NETWORK.blockExplorers.default.url,
    };

    // Attempt to find the emitting transaction by scanning recent logs for the AuditSubmitted event
    try {
      const currentBlock = await publicClient.getBlockNumber();
      const fromBlock = currentBlock - BigInt(9999) > BigInt(0) ? currentBlock - BigInt(9999) : BigInt(0);

      const logs = await publicClient.getLogs({
        address: AUDIT_REGISTRY_ADDRESS,
        event: {
          type: 'event',
          name: 'AuditSubmitted',
          inputs: [
            { name: 'auditId', type: 'bytes32', indexed: true },
            { name: 'contractHash', type: 'bytes32', indexed: true },
            { name: 'submitter', type: 'address', indexed: true },
            { name: 'riskScore', type: 'uint8' },
            { name: 'issueCount', type: 'uint32' },
            { name: 'criticalCount', type: 'uint32' },
            { name: 'timestamp', type: 'uint64' }
          ]
        },
        fromBlock,
        toBlock: 'latest',
      });

      // Helper to convert possible bytes to hex string for comparison
      const toHex = (v: any) => {
        if (!v && v !== 0) return null;
        if (typeof v === 'string') return v.toLowerCase();
        if (typeof Buffer !== 'undefined' && (v instanceof Uint8Array || Array.isArray(v))) {
          return '0x' + Buffer.from(v as any).toString('hex');
        }
        try { return String(v).toLowerCase(); } catch { return null; }
      };

      const target = auditId.toLowerCase();
      for (const log of logs) {
        const aid = toHex(log.args.auditId);
        if (aid === target) {
          record.txHash = log.transactionHash || '';
          record.blockNumber = log.blockNumber?.toString() || '0';
          record.explorerUrl = record.txHash ? `${NETWORK.blockExplorers.default.url}/tx/${record.txHash}` : NETWORK.blockExplorers.default.url;
          break;
        }
      }
    } catch (e) {
      // Non-fatal: if logs cannot be fetched, return what we have
      console.error('Error searching logs for auditId tx:', e);
    }

    return record;
  } catch (error) {
    console.error('Error fetching audit by ID:', error);
    return null;
  }
}

export async function verifyByContractHash(contractHash: string): Promise<{ exists: boolean; auditId: string | null }> {
  try {
    const data = await publicClient.readContract({
      address: AUDIT_REGISTRY_ADDRESS,
      abi: AUDIT_REGISTRY_ABI,
      functionName: 'verifyContract',
      args: [contractHash as `0x${string}`],
    }) as any;

    return {
      exists: data[0],
      auditId: data[1],
    };
  } catch (error) {
    console.error('Error verifying contract hash:', error);
    return { exists: false, auditId: null };
  }
}

export async function getRecentAudits(count: number = 5) {
  try {
    // Mantle Sepolia RPC limits block range to 10000. 
    // We fetch current block and query only the recent range.
    const currentBlock = await publicClient.getBlockNumber();
    const fromBlock = currentBlock - BigInt(9999) > BigInt(0) ? currentBlock - BigInt(9999) : BigInt(0);

    const logs = await publicClient.getLogs({
      address: AUDIT_REGISTRY_ADDRESS,
      event: {
        type: 'event',
        name: 'AuditSubmitted',
        inputs: [
          { name: 'auditId', type: 'bytes32', indexed: true },
          { name: 'contractHash', type: 'bytes32', indexed: true },
          { name: 'submitter', type: 'address', indexed: true },
          { name: 'riskScore', type: 'uint8' },
          { name: 'issueCount', type: 'uint32' },
          { name: 'criticalCount', type: 'uint32' },
          { name: 'timestamp', type: 'uint64' }
        ]
      },
      fromBlock,
      toBlock: 'latest',
    });

    return logs
      .sort((a, b) => Number(b.blockNumber - a.blockNumber))
      .slice(0, count)
      .map(log => {
        // Normalize bytes32 fields to hex strings so frontend receives strings
        const normalize = (v: any) => {
          if (!v && v !== 0) return null;
          // If already a string (e.g. '0x...') return as-is
          if (typeof v === 'string') return v;
          // If it's a Uint8Array or Buffer-like, convert to hex
          if (typeof Buffer !== 'undefined' && (v instanceof Uint8Array || Array.isArray(v))) {
            return '0x' + Buffer.from(v as any).toString('hex');
          }
          try {
            return String(v);
          } catch (e) {
            return null;
          }
        };

        return {
          auditId: normalize(log.args.auditId),
          contractHash: normalize(log.args.contractHash),
          submitter: log.args.submitter,
          riskScore: Number(log.args.riskScore),
          issueCount: Number(log.args.issueCount),
          criticalCount: Number(log.args.criticalCount),
          timestamp: Number(log.args.timestamp),
          txHash: log.transactionHash,
          blockNumber: log.blockNumber.toString(),
        };
      });
  } catch (error) {
    console.error('Error fetching recent audits:', error);
    return [];
  }
}

export async function getTotalAudits(): Promise<number> {
  try {
    const total = await publicClient.readContract({
      address: AUDIT_REGISTRY_ADDRESS,
      abi: AUDIT_REGISTRY_ABI,
      functionName: 'totalAudits',
    }) as bigint;
    return Number(total);
  } catch (error) {
    console.error('Error fetching total audits:', error);
    return 0;
  }
}
