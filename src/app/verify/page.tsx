'use client';

import React, { useState } from 'react';
import { Search, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VerifyCertificate from '@/components/VerifyCertificate';
import { VerifyResult } from '@/types';

export default function VerifyPage() {
  const [auditId, setAuditId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditId.trim()) return;

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch(`/api/verify?auditId=${auditId}`);
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 404) {
          setResult({ found: false });
        } else {
          throw new Error(data.error || 'Failed to verify audit');
        }
      } else {
        setResult(data);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white pt-20">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-20 relative">
        <div className="text-center space-y-4 mb-20">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
            Verify <span className="text-emerald-500">Audit Proof</span>
          </h1>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Enter an Audit ID to verify the on-chain cryptographic proof recorded on Mantle Sepolia.
          </p>
        </div>

        <div className="mb-16">
          <form onSubmit={handleVerify} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-2xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity" />
            <div className="relative flex items-center bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden group-focus-within:border-emerald-500/50 transition-all">
              <div className="pl-6 text-white/20">
                <Search className="w-6 h-6" />
              </div>
              <input
                type="text"
                value={auditId}
                onChange={(e) => setAuditId(e.target.value)}
                placeholder="Enter Audit ID (0x...)"
                className="w-full bg-transparent p-6 text-white font-mono text-sm focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading || !auditId}
                className="px-8 py-6 bg-emerald-500 hover:bg-emerald-400 disabled:bg-white/5 disabled:text-white/20 text-black font-black uppercase tracking-widest transition-all"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Verify'}
              </button>
            </div>
          </form>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
            <p className="text-white/40 font-bold uppercase tracking-widest text-xs">Querying Mantle Sepolia...</p>
          </div>
        )}

        {error && (
          <div className="p-8 rounded-3xl bg-red-500/5 border border-red-500/10 flex items-center gap-4 text-red-500">
            <AlertCircle className="w-8 h-8" />
            <div className="space-y-1">
              <div className="font-black uppercase tracking-widest text-xs">Verification Error</div>
              <div className="text-sm">{error}</div>
            </div>
          </div>
        )}

        {result && !result.found && (
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-dashed border-white/10 flex items-center gap-4 text-white/40">
            <AlertCircle className="w-8 h-8" />
            <div className="space-y-1">
              <div className="font-black uppercase tracking-widest text-xs">Audit Not Found</div>
              <div className="text-sm">The provided Audit ID was not found on the Mantle Sepolia network.</div>
            </div>
          </div>
        )}

        {result && result.found && result.record && (
          <VerifyCertificate record={result.record} />
        )}
      </div>

      <Footer />
    </main>
  );
}
