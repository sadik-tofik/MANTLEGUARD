'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Github, ExternalLink, Ghost, Copy } from 'lucide-react';
import { AUDIT_REGISTRY_ADDRESS, NETWORK } from '@/lib/mantle';

export default function Footer() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <footer className="bg-[#050508] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <ShieldCheck className="w-8 h-8 text-emerald-500" />
              <span className="text-2xl font-black tracking-tighter text-white">
                MANTLE<span className="text-emerald-500">GUARD</span>
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed">
              AI-powered smart contract security audits with on-chain cryptographic proofs. Built for the Mantle ecosystem.
            </p>
            <div className="flex items-center gap-4">
              <Link href="https://github.com/sadik-tofik/MANTLEGUARD" target="_blank" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-6">
            <h4 className="text-white text-sm font-bold uppercase tracking-widest">Product</h4>
            <ul className="space-y-4">
              <li><Link href="/audit" className="text-white/40 hover:text-emerald-400 text-sm transition-colors">Audit Contract</Link></li>
              <li><Link href="/verify" className="text-white/40 hover:text-emerald-400 text-sm transition-colors">Verify Audit</Link></li>
              <li><Link href="/history" className="text-white/40 hover:text-emerald-400 text-sm transition-colors">Audit History</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h4 className="text-white text-sm font-bold uppercase tracking-widest">Resources</h4>
            <ul className="space-y-4">
              <li><Link href="https://explorer.sepolia.mantle.xyz" target="_blank" className="text-white/40 hover:text-emerald-400 text-sm transition-colors flex items-center gap-1">Mantle Explorer <ExternalLink className="w-3 h-3" /></Link></li>
              <li><Link href="https://faucet.sepolia.mantle.xyz" target="_blank" className="text-white/40 hover:text-emerald-400 text-sm transition-colors flex items-center gap-1">Mantle Faucet <ExternalLink className="w-3 h-3" /></Link></li>
              <li><Link href="https://dorahacks.io/hackathon/mantle-turing-test" target="_blank" className="text-white/40 hover:text-emerald-400 text-sm transition-colors flex items-center gap-1">DoraHacks <ExternalLink className="w-3 h-3" /></Link></li>
            </ul>
          </div>

          {/* Contract */}
          <div className="space-y-6">
            <h4 className="text-white text-sm font-bold uppercase tracking-widest">Contract</h4>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-white/20 font-bold uppercase tracking-wider">AuditRegistry.sol</span>
                <span className="text-[10px] text-emerald-500 font-bold px-1.5 py-0.5 rounded bg-emerald-500/10">Sepolia</span>
              </div>
              <div className="flex items-center gap-2 group cursor-pointer" onClick={() => copyToClipboard(AUDIT_REGISTRY_ADDRESS)}>
                <code className="text-[10px] text-white/40 font-mono underline decoration-dotted truncate">
                  {AUDIT_REGISTRY_ADDRESS}
                </code>
                <Copy className="w-3 h-3 text-white/20 group-hover:text-white transition-colors flex-shrink-0" />
              </div>
              <Link 
                href={`${NETWORK.blockExplorers.default.url}/address/${AUDIT_REGISTRY_ADDRESS}`}
                target="_blank"
                className="block w-full py-2 bg-white/5 hover:bg-white/10 text-white/60 text-[10px] text-center font-bold uppercase tracking-widest rounded-lg transition-colors"
              >
                View on Explorer
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-white/20 text-xs font-medium">
            <Ghost className="w-4 h-4" />
            Built for Mantle Turing Test Hackathon 2026
          </div>
          <div className="text-white/10 text-[10px] font-bold uppercase tracking-[0.3em]">
            © 2026 MantleGuard. Secured by AI. Verified on Mantle.
          </div>
        </div>
      </div>
    </footer>
  );
}
