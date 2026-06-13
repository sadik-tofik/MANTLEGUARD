# Contributing to MantleGuard

Thank you for your interest in improving MantleGuard! This document provides guidelines for contributing and instructions on how to use MantleGuard in your own projects.

## Developer Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/sadik-tofik/MANTLEGUARD
   cd MANTLEGUARD
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure environment variables**
   Create a `.env.local` file with the following:
   ```env
   GROQ_API_KEY=your_groq_key
   GEMINI_API_KEY=your_gemini_key
   NVIDIA_API_KEY=your_nvidia_key
   DEPLOYER_PRIVATE_KEY=your_mantle_wallet_key
   NEXT_PUBLIC_REGISTRY_ADDRESS=0xC28466F4eFE74422684D84182945fAc02ecA6d82
   NEXT_PUBLIC_NETWORK=testnet
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

## Using MantleGuard in CI/CD

You can automatically audit your smart contracts on every push or pull request using our GitHub Actions template.

### 1. Create the workflow file
Add `.github/workflows/mantleguard.yml` to your repository.

### 2. Add the workflow content
You can copy the template from our repository: `.github/workflows/mantleguard-audit.yml`.

### 3. How it works
The workflow will:
- Detect any changes to `.sol` files in your repository.
- Send the source code to the MantleGuard API for analysis.
- Fail the build if any **CRITICAL** vulnerabilities are detected.
- Print a summary of the risk score and issue count in the GitHub Actions log.

---

Built for the **Mantle Turing Test Hackathon 2026**.
Making smart contract security instant, free, and verifiable.
