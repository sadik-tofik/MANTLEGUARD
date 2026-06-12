import { 
  createWalletClient, 
  createPublicClient, 
  http, 
  keccak256, 
  toBytes,
  type Hash
} from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { NETWORK, AUDIT_REGISTRY_ADDRESS, AUDIT_REGISTRY_ABI } from './mantle';
import { AuditReport } from '@/types';

export async function submitAuditOnChain(sourceCode: string, report: AuditReport) {
  const privateKey = process.env.DEPLOYER_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error('DEPLOYER_PRIVATE_KEY not configured');
  }

  // Ensure 0x prefix
  const formattedPk = privateKey.startsWith('0x') ? privateKey : `0x${privateKey}`;
  const account = privateKeyToAccount(formattedPk as Hash);

  const walletClient = createWalletClient({
    account,
    chain: NETWORK,
    transport: http(),
  });

  const publicClient = createPublicClient({
    chain: NETWORK,
    transport: http(),
  });

  const contractHash = keccak256(toBytes(sourceCode));
  const reportHash = keccak256(toBytes(JSON.stringify(report)));

  try {
    const { request } = await publicClient.simulateContract({
      account,
      address: AUDIT_REGISTRY_ADDRESS,
      abi: AUDIT_REGISTRY_ABI,
      functionName: 'submitAudit',
      args: [
        contractHash,
        reportHash,
        report.riskScore,
        report.stats.totalIssues,
        report.stats.critical,
        '' // ipfsCid (optional for now)
      ],
    });

    const txHash = await walletClient.writeContract(request);
    
    // Wait for confirmation (timeout after 60s)
    const receipt = await publicClient.waitForTransactionReceipt({ 
      hash: txHash,
      timeout: 60000 
    });

    // Extract auditId from logs (it's the first non-indexed argument or indexed depending on event)
    // Based on AuditSubmitted(bytes32 indexed auditId, ...)
    const auditId = receipt.logs[0].topics[1] as string;

    return {
      auditId,
      txHash,
      contractHash,
      reportHash,
      blockNumber: receipt.blockNumber.toString(),
      explorerUrl: `${NETWORK.blockExplorers.default.url}/tx/${txHash}`,
    };
  } catch (error: any) {
    console.error('Blockchain Submission Error:', error);
    throw new Error(error.shortMessage || error.message || 'Failed to submit audit proof on-chain.');
  }
}
