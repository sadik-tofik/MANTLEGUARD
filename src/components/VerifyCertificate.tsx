'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  ExternalLink, 
  Copy, 
  Clock, 
  User, 
  Hash, 
  Calendar,
  ChevronRight,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { format } from 'date-fns';
import { NETWORK } from '@/lib/mantle';
import { OnChainAuditRecord } from '@/types';

interface VerifyCertificateProps {
  record: OnChainAuditRecord;
}

export default function VerifyCertificate({ record }: VerifyCertificateProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const badgeMarkdown = `[![MantleGuard Verified](https://mantleguard.vercel.app/badge/${record.auditId})](https://mantleguard.vercel.app/audit/${record.auditId})`;

  return (
    <div className="animate-in fade-in zoom-in duration-500">
      <div className="relative p-1 md:p-1.5 rounded-[40px] bg-gradient-to-br from-emerald-500/20 via-white/5 to-blue-500/20 shadow-2xl shadow-emerald-500/10">
        <div className="bg-[#0a0a0f] rounded-[36px] overflow-hidden border border-white/10">
          {/* Header */}
          <div className="bg-white/[0.02] border-b border-white/5 px-8 md:px-12 py-10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-emerald-500" />
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-black uppercase tracking-widest mb-6">
              Official Audit Certificate
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4 uppercase">
              MantleGuard <span className="text-emerald-500">Verified</span>
            </h2>
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-white/40 font-mono text-xs break-all px-4 max-w-full">
                Audit ID: {record.auditId}
                <button onClick={() => copyToClipboard(record.auditId)} className="hover:text-white transition-colors">
                  <Copy className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-8 md:p-12 space-y-12">
            {/* Risk Gauge Simulation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-white/[0.02] border border-white/5 relative">
                <div className={`text-7xl font-black mb-2 ${
                  record.riskScore >= 80 ? 'text-red-500' :
                  record.riskScore >= 50 ? 'text-orange-500' :
                  'text-emerald-500'
                }`}>
                  {record.riskScore}
                </div>
                <div className="text-white/40 text-xs font-black uppercase tracking-[0.2em]">Risk Score</div>
                
                {/* Visual score bar */}
                <div className="w-full h-1.5 bg-white/5 rounded-full mt-6 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${
                      record.riskScore >= 80 ? 'bg-red-500' :
                      record.riskScore >= 50 ? 'bg-orange-500' :
                      'bg-emerald-500'
                    }`}
                    style={{ width: `${record.riskScore}%` }}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <StatBox label="Total Issues" value={record.issueCount.toString()} />
                  <StatBox 
                    label="Critical" 
                    value={record.criticalCount.toString()} 
                    color={record.criticalCount > 0 ? 'text-red-500' : 'text-emerald-500'} 
                  />
                </div>
                <p className="text-white/50 text-sm leading-relaxed italic">
                  "This smart contract has been analyzed using AI-driven security heuristics. The findings represent a point-in-time assessment of its state."
                </p>
              </div>
            </div>

            <div className="h-[1px] bg-white/5" />

            {/* Blockchain Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <DetailRow icon={<Hash />} label="Source Hash" value={record.contractHash} truncate />
              <DetailRow icon={<Hash />} label="Report Hash" value={record.reportHash} truncate />
              <DetailRow icon={<Calendar />} label="Timestamp" value={format(new Date(record.timestamp * 1000), 'PPP p')} />
              <DetailRow icon={<User />} label="Submitted By" value={record.submitter} truncate />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <Link
                href={`${NETWORK.blockExplorers.default.url}/tx/${record.txHash}`}
                target="_blank"
                className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center gap-2 text-white font-bold text-sm transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                View on Mantle Explorer
              </Link>
              <button
                onClick={() => copyToClipboard(badgeMarkdown)}
                className="w-full py-4 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-2xl flex items-center justify-center gap-2 text-emerald-500 font-bold text-sm transition-all"
              >
                <Copy className="w-4 h-4" />
                Copy Badge Markdown
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-emerald-500/5 px-8 md:px-12 py-6 border-t border-emerald-500/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span className="text-white/60 text-[10px] font-bold uppercase tracking-wider">
                Cryptographic Integrity Verified on Mantle Network
              </span>
            </div>
            <Link href="/audit" className="text-emerald-500 text-[10px] font-black uppercase tracking-widest hover:underline flex items-center gap-1">
              Audit Yours Now <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, color = 'text-white' }: { label: string; value: string; color?: string }) {
  return (
    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
      <div className="text-[10px] text-white/20 font-black uppercase tracking-widest">{label}</div>
      <div className={`text-2xl font-black ${color}`}>{value}</div>
    </div>
  );
}

function DetailRow({ icon, label, value, truncate }: { icon: React.ReactNode; label: string; value: string; truncate?: boolean }) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-2 rounded-lg bg-white/5 text-white/20">
        {React.cloneElement(icon as React.ReactElement, { className: 'w-4 h-4' })}
      </div>
      <div className="space-y-1 overflow-hidden">
        <div className="text-[10px] text-white/20 font-black uppercase tracking-widest">{label}</div>
        <div className={`text-xs font-mono text-white/60 ${truncate ? 'truncate' : 'break-words'}`}>{value}</div>
      </div>
    </div>
  );
}
