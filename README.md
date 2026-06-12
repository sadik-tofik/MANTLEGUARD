# MantleGuard 🛡️
### AI-Powered Smart Contract Auditor with On-Chain Proof

MantleGuard is a production-ready security auditing platform built natively for the **Mantle Network** ecosystem. It combines Google Gemini 2.0 Flash's advanced code analysis with permanent on-chain proof storage on Mantle's Layer 2 blockchain.

---

## 🌟 Key Features

- **Instant AI Audits**: Analyze any Solidity contract in <15 seconds (compared to 2-4 weeks for manual audits).
- **On-Chain Proof**: Cryptographically link audit reports to source code and store them permanently on Mantle Sepolia.
- **Mantle Intelligence**: Specialized detection for mETH, USDY, Merchant Moe, and Agni Finance integration opportunities.
- **Zero Friction**: Paste-and-go interface with no wallet required for the core audit flow.
- **Actionable Fixes**: Every vulnerability includes exact line numbers and concrete code recommendations.

## 🏗️ Architecture

```text
[ Frontend ] <---> [ API /analyze ] <---> [ Gemini 2.0 Flash ]
     |                      |
     |              (Analysis Report)
     |                      |
 [ Wallet/TX ] <---> [ API /submit ] <---> [ Mantle Network ]
                                          (AuditRegistry.sol)
```

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- Node.js 18+
- pnpm 9+
- Gemini API Key ([AI Studio](https://aistudio.google.com))

### 2. Setup
```bash
# Install dependencies
pnpm install

# Setup environment
cp .env.example .env.local
```

### 3. Configure `.env.local`
- `GEMINI_API_KEY`: Your Google Gemini key.
- `DEPLOYER_PRIVATE_KEY`: A burner wallet private key (for Mantle Sepolia).
- `NEXT_PUBLIC_REGISTRY_ADDRESS`: Address of `AuditRegistry.sol`.

### 4. Deploy Smart Contract
Follow the instructions in `scripts/deploy.mjs` to deploy to Mantle Sepolia using Remix IDE.

### 5. Run App
```bash
pnpm dev
```

## 📦 Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **AI**: Google Gemini 2.0 Flash
- **Blockchain**: viem
- **Smart Contract**: Solidity ^0.8.20

## 🏆 Hackathon Alignment (Track 05: AI DevTools)
MantleGuard is designed to hit the highest judging criteria:
- **Verifiability**: On-chain audit hashes create a tamper-proof record.
- **Output Quality**: Structured JSON output ensures precision and actionability.
- **Mantle Strategic Use**: The blockchain is used as a settlement/proof layer, not just a deployment target.
- **Innovation**: First tool to integrate AI findings natively with Layer 2 on-chain proofs.

---

Built for **Mantle Turing Test Hackathon 2026**.
Track Sponsor: **Tencent Cloud**
