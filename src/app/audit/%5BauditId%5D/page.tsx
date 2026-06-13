'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, ArrowLeft, ShieldAlert } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VerifyCertificate from '@/components/VerifyCertificate';
import { OnChainAuditRecord } from '@/types';

export default function CertificatePage() {
  const { auditId } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [record, setRecord] = useState<OnChainAuditRecord | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCertificate() {
      if (!auditId) return;

      try {
        const res = await fetch(`/api/verify?auditId=${auditId}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Audit ID not found on-chain');
        } else {
          setRecord(data.record);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCertificate();
  }, [auditId]);

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white pt-20">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-20 relative">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 space-y-4">
            <Loader2 className="w-16 h-16 text-emerald-500 animate-spin" />
            <p className="text-white/40 font-black uppercase tracking-widest text-sm">Authenticating with Mantle Sepolia...</p>
          </div>
        ) : error ? (
          <div className="py-20 text-center space-y-8 animate-in fade-in duration-500">
            <div className="w-24 h-24 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-12 h-12 text-red-500" />
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-black uppercase tracking-tighter">Certificate Not Found</h2>
              <p className="text-white/40 text-lg max-w-md mx-auto">{error}</p>
            </div>
            <div className="pt-8">
               <button 
                onClick={() => router.push('/verify')}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white font-black uppercase tracking-widest transition-all"
               >
                 Go to Verification
               </button>
            </div>
          </div>
        ) : record ? (
          <VerifyCertificate record={record} />
        ) : null}
      </div>

      <Footer />
    </main>
  );
}
