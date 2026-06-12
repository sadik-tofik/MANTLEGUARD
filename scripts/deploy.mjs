/**
 * MantleGuard Deployment Guide
 * 
 * This script provides instructions for deploying AuditRegistry.sol to Mantle Sepolia.
 */

import { createWalletClient, http, Hash } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mantleSepolia } from '../src/lib/mantle.js'; // Note: adjust path if running directly

const pk = process.env.DEPLOYER_PRIVATE_KEY;

console.log(`
=========================================
   MANTLEGUARD CONTRACT DEPLOYER
=========================================

PREREQUISITES:
1. Remix IDE: https://remix.ethereum.org
2. Metamask with Mantle Sepolia:
   - RPC: https://rpc.sepolia.mantle.xyz
   - ChainID: 5003
3. Testnet MNT: https://faucet.sepolia.mantle.xyz

STEP-BY-STEP DEPLOYMENT:
------------------------
1. Copy contents of 'contracts/AuditRegistry.sol' to Remix.
2. Compile with Solidity 0.8.20.
3. In 'Deploy & Run Transactions', set Environment to 'Injected Provider'.
4. Deploy AuditRegistry.
5. Once deployed, copy the address and update NEXT_PUBLIC_REGISTRY_ADDRESS in .env.local.

CURRENT CONFIGURATION:
---------------------
Chain: ${mantleSepolia.name}
RPC:   ${mantleSepolia.rpcUrls.default.http[0]}
Explorer: ${mantleSepolia.blockExplorers.default.url}

`);

if (pk) {
  try {
    const formattedPk = pk.startsWith('0x') ? pk : `0x${pk}`;
    const account = privateKeyToAccount(formattedPk as Hash);
    console.log(`Deployer Address: ${account.address}`);
    console.log(`Status: Private key found. Ready to fund and deploy.`);
  } catch (e) {
    console.log(`Status: Invalid private key format in DEPLOYER_PRIVATE_KEY.`);
  }
} else {
  console.log(`Status: DEPLOYER_PRIVATE_KEY not set in environment.`);
}

console.log(`
=========================================
`);
