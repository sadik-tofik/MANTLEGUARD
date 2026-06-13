# MANTLEGUARD v2.0
### Instant AI Smart Contract Auditor with On-Chain Proof

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Mantle](https://img.shields.io/badge/Mantle-Sepolia-00D4AA)](https://mantle.xyz/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![AI](https://img.shields.io/badge/AI-Llama%203.3%2070B-orange)](https://groq.com/)

**MantleGuard** is the first AI-powered smart contract security auditor where every finding is permanently verifiable on the Mantle Network. Built for the **Mantle Turing Test Hackathon 2026 (Track 05: AI DevTools)**.

---

## 🚀 Live Links
- **Live App**: [mantleguard.vercel.app](https://mantleguard.vercel.app)
- **Deployed Contract**: [0xC28466F4eFE74422684D84182945fAc02ecA6d82](https://explorer.sepolia.mantle.xyz/address/0xC28466F4eFE74422684D84182945fAc02ecA6d82)
- **Demo Video**: [Coming Soon]

---

## ✨ Features
- **Instant AI Audit**: Powered by Llama 3.3 70B via Groq for deep security analysis in under 10 seconds.
- **On-Chain Proof**: Every audit generates a cryptographic fingerprint recorded immutably on Mantle Sepolia.
- **3-Provider Fallback**: High reliability with automatic switching between Groq, Gemini, and NVIDIA NIM providers.
- **Mantle Native**: Specific checks for mETH, USDY, and L2 gas optimizations.
- **Verified Certificates**: Shareable, tamper-proof audit certificates with unique Audit IDs.
- **CI/CD Integration**: GitHub Actions template for automated security checks on every commit.
- **Self-Optimized Core**: The `AuditRegistry` contract was optimized using MantleGuard, resulting in a **10% Reduction in Gas Fees**.

---

## 🛡️ Self-Hardening Case Study
To demonstrate the power of MantleGuard, we audited our own `AuditRegistry.sol` contract and applied the AI-suggested improvements.
- **Security**: Closed reentrancy vectors and implemented Checks-Effects-Interactions patterns.
- **Gas**: Achieved a **~10% reduction in deployment and execution costs** (averaging from 0.1 MNT down to 0.09 MNT per submission) by optimizing storage pointers.
- **Score**: Improved our own security score from "Warning" to "Golden Pass".

---

## 🛠 Tech Stack
- **Frontend**: Next.js 14, Tailwind CSS, Framer Motion, Lucide React
- **Blockchain**: Mantle Network (Sepolia Testnet), Viem, Solidity
- **AI Engine**: Llama 3.3 70B (via Groq), Gemini 2.0 Flash, Meta Llama 3.1 70B (via NVIDIA NIM)
- **Infrastructure**: Vercel, GitHub Actions

---

## 📐 Architecture
```mermaid
graph LR
    A[Developer Browser] --> B[Next.js 14 on Vercel]
    B --> C[/api/analyze]
    C --> D[Groq API - Llama 3.3 70B]
    D -->|Fallback| E[Gemini 2.0 Flash]
    E -->|Fallback| F[NVIDIA NIM API]
    D --> G[Structured JSON Report]
    G --> B
    B --> H[/api/submit-onchain]
    H --> I[viem Wallet Client]
    I --> J[AuditRegistry.sol]
    J --> K[Mantle Sepolia Chain ID 5003]
    K --> L[auditId returned]
    L --> B
```

---

## 📦 Getting Started

### Prerequisites
- Node.js 20+
- pnpm

### Installation
1. Clone the repo: `git clone https://github.com/sadik-tofik/MANTLEGUARD`
2. Install deps: `pnpm install`
3. Set up `.env.local` using `.env.example`
4. Run dev: `pnpm dev`

---

## 📄 API Reference

### `POST /api/analyze`
Analyzes Solidity source code using the AI fallback chain.
- **Body**: `{ "sourceCode": "string" }`
- **Response**: `AuditReport` object with issues and risk score.

### `GET /api/verify?auditId=0x...`
Verifies an audit record stored on the Mantle blockchain.
- **Response**: `OnChainAuditRecord` if found.

---

## 🏆 Hackathon Alignment
MantleGuard v2.0 is designed to dominate the **Track 05: AI DevTools** by demonstrating:
1. **Technical Excellence**: Complex multi-provider AI pipeline + robust blockchain integration.
2. **Ecosystem Fit**: Directly serves Mantle developers and generates on-chain activity.
3. **Innovation**: The first tool to combine AI audits with on-chain cryptographic verifiability.
4. **User Experience**: A premium, responsive web app that simplifies a complex security workflow.

---

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

© 2026 MantleGuard Team. Built with 💚 for Mantle.
