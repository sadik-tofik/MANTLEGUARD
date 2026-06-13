'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  RefreshCcw, 
  Terminal, 
  Code2, 
  ChevronRight,
  ShieldAlert,
  Ghost
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { AnalysisProgress } from '@/components/AnalysisProgress';
import { AuditReportView } from '@/components/AuditReportView';
import { AuditReport } from '@/types';
import Navbar from '@/components/Navbar';

const EXAMPLE_CONTRACT = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title VulnerableVault
 * @dev A simple vault with classic security flaws for MantleGuard testing.
 */
contract VulnerableVault {
    mapping(address => uint256) public balances;
    
    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    // CRITICAL: Reentrancy vulnerability
    function withdraw() external {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "No balance");
        
        (bool success, ) = msg.sender.call{value: amount}("");
        if (success) {
            balances[msg.sender] = 0; // State changed AFTER external call
        }
    }

    // HIGH: Missing access control on sensitive function
    function emergencyWithdraw() public {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }
}
`;

function AuditContent() {
  const searchParams = useSearchParams();
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'done' | 'error'>('idle');

  useEffect(() => {
    if (searchParams.get('example') === 'true') {
      setCode(EXAMPLE_CONTRACT);
    }
  }, [searchParams]);

  const [step, setStep] = useState(1);
  const [report, setReport] = useState<AuditReport | null>(null);
  const [error, setError] = useState<string | undefined>();
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleAudit = async () => {
    if (!code.trim()) return;
    
    setStatus('analyzing');
    setStep(1);
    setReport(null);
    setError(undefined);

    // Simulate progress animation
    const progressInterval = setInterval(() => {
      setStep(prev => (prev < 5 ? prev + 1 : prev));
    }, 1800);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceCode: code }),
      });
      
      const data = await res.json();
      
      if (data.error) throw new Error(data.error);
      
      clearInterval(progressInterval);
      setStep(5);
      
      // Artificial delay to feel thorough
      setTimeout(() => {
        setReport(data);
        setStatus('done');
      }, 800);
      
    } catch (err: any) {
      clearInterval(progressInterval);
      setError(err.message);
      setStatus('error');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setReport(null);
    setCode('');
    setStep(1);
  };

  useEffect(() => {
    if (status === 'done' && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [status]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-16 relative z-10">
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-4 mb-12 md:mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold uppercase tracking-widest mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Hackathon Build — track 05
        </div>
        <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-white">
          MANTLE<span className="text-emerald-500">GUARD</span>
        </h1>
        <p className="text-white/60 text-base md:text-xl max-w-2xl font-medium leading-relaxed">
          Instant AI-powered smart contract auditing with permanent 
          <span className="text-white"> cryptographic on-chain proofs</span> on Mantle Network.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <FeatureBadge icon={<ShieldCheck className="w-4 h-4" />} label="Security Analysis" />
          <FeatureBadge icon={<RefreshCcw className="w-4 h-4" />} label="On-Chain Hash" />
          <FeatureBadge icon={<Terminal className="w-4 h-4" />} label="Mantle Optimized" />
        </div>
      </div>

      {/* Action Section */}
      <div className="max-w-4xl mx-auto space-y-8">
        {(status === 'idle' || status === 'error') && (
          <div className="space-y-6 animate-in fade-in duration-1000">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white/40 text-sm font-bold uppercase tracking-wider">
                <Code2 className="w-4 h-4" />
                Source Code Input
              </div>
              <button 
                onClick={() => setCode(EXAMPLE_CONTRACT)}
                className="text-emerald-500 text-sm font-bold hover:text-emerald-400 transition-colors flex items-center gap-1 group"
              >
                Load example <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-2xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity" />
              <div className="relative glass rounded-2xl overflow-hidden border border-white/10 group-focus-within:border-emerald-500/30 transition-all">
                {/* Fake Editor Chrome */}
                <div className="bg-white/5 border-b border-white/5 px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                  </div>
                  <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest ml-2">contract.sol (Read/Write)</span>
                </div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="// Paste your Solidity contract here..."
                  spellCheck={false}
                  className="w-full h-80 p-8 bg-transparent text-white/80 font-mono text-sm leading-relaxed focus:outline-none resize-none"
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm animate-in shake duration-500">
                <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                {error}
              </div>
            )}

            <button
              onClick={handleAudit}
              disabled={!code.trim()}
              className="w-full py-5 bg-emerald-500 hover:bg-emerald-400 disabled:bg-white/5 disabled:hover:bg-white/5 disabled:text-white/20 text-black font-extrabold text-lg rounded-2xl transition-all shadow-xl shadow-emerald-500/10 active:scale-[0.99] flex items-center justify-center gap-3 group"
            >
              <ShieldCheck className="w-6 h-6 group-hover:scale-110 transition-transform" />
              Audit Contract
            </button>
          </div>
        )}

        {status === 'analyzing' && (
          <div className="flex flex-col items-center py-20 animate-in fade-in zoom-in duration-500">
            <AnalysisProgress step={step} />
          </div>
        )}

        {status === 'done' && report && (
          <div ref={resultsRef} className="space-y-8 pb-20">
            <div className="flex items-center justify-between">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-bold group"
              >
                <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                New audit
              </button>
            </div>
            <AuditReportView report={report} sourceCode={code} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function AuditPage() {
  return (
    <main className="min-h-screen relative overflow-x-hidden pt-20">
      <Navbar />
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <RefreshCcw className="w-8 h-8 text-emerald-500 animate-spin" />
        </div>
      }>
        <AuditContent />
      </Suspense>

      <footer className="max-w-6xl mx-auto px-4 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 text-white/20 text-sm font-mono">
          <Ghost className="w-4 h-4" />
          Mantle Turing Test Hackathon 2026
        </div>
        <div className="text-white/20 text-[10px] font-bold uppercase tracking-[0.2em]">
          Securing the Mantle Ecosystem with Intelligence
        </div>
      </footer>
    </main>
  );
}

const FeatureBadge = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/5 bg-white/[0.02] text-white/40 text-xs font-semibold">
    {icon}
    {label}
  </div>
);
