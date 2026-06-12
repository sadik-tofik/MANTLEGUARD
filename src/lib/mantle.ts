import { defineChain } from 'viem';

export const mantleMainnet = defineChain({
  id: 5000,
  name: 'Mantle Mainnet',
  nativeCurrency: { name: 'MNT', symbol: 'MNT', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.mantle.xyz'] },
  },
  blockExplorers: {
    default: {
      name: 'Mantle Explorer',
      url: 'https://explorer.mantle.xyz',
    },
  },
  testnet: false,
});

export const mantleSepolia = defineChain({
  id: 5003,
  name: 'Mantle Sepolia Testnet',
  nativeCurrency: { name: 'MNT', symbol: 'MNT', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.sepolia.mantle.xyz'] },
  },
  blockExplorers: {
    default: {
      name: 'Mantle Explorer',
      url: 'https://explorer.sepolia.mantle.xyz',
    },
  },
  testnet: true,
});

export const NETWORK = process.env.NEXT_PUBLIC_NETWORK === 'mainnet' ? mantleMainnet : mantleSepolia;

export const AUDIT_REGISTRY_ADDRESS =
  (process.env.NEXT_PUBLIC_REGISTRY_ADDRESS as `0x${string}`) ||
  '0x0000000000000000000000000000000000000000';

export const AUDIT_REGISTRY_ABI = [
  {
    "type": "function",
    "name": "submitAudit",
    "inputs": [
      { "name": "contractHash", "type": "bytes32" },
      { "name": "reportHash", "type": "bytes32" },
      { "name": "riskScore", "type": "uint8" },
      { "name": "issueCount", "type": "uint32" },
      { "name": "criticalCount", "type": "uint32" },
      { "name": "ipfsCid", "type": "string" }
    ],
    "outputs": [{ "name": "auditId", "type": "bytes32" }],
    "stateMutability": "external"
  },
  {
    "type": "function",
    "name": "verifyContract",
    "inputs": [{ "name": "contractHash", "type": "bytes32" }],
    "outputs": [
      { "name": "exists", "type": "bool" },
      { "name": "auditId", "type": "bytes32" },
      { "name": "riskScore", "type": "uint8" },
      { "name": "timestamp", "type": "uint64" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "totalAudits",
    "inputs": [],
    "outputs": [{ "type": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "event",
    "name": "AuditSubmitted",
    "inputs": [
      { "name": "auditId", "type": "bytes32", "indexed": true },
      { "name": "contractHash", "type": "bytes32", "indexed": true },
      { "name": "submitter", "type": "address", "indexed": true },
      { "name": "riskScore", "type": "uint8" },
      { "name": "issueCount", "type": "uint32" },
      { "name": "criticalCount", "type": "uint32" },
      { "name": "timestamp", "type": "uint64" }
    ]
  }
] as const;
