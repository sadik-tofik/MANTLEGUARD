'use client';

import React from 'react';
import { ExternalLink, CheckCircle, Loader2, AlertCircle } from 'lucide-react';

interface OnChainProofProps {
  data?: {
    auditId: string;
    txHash: string;
    contractHash: string;
    blockNumber: string;
    explorerUrl: string;
  };
  loading?: boolean;
  error?: string;
}

export const OnChainProof: React.FC<OnChainProofProps> = ({ data, loading, error }) => {
  if (loading) {
    return (
      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-6 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
        <div className="text-center">
          <h5 className="text-white font-bold">Writing to Mantle Network...</h5>
          <p className="text-emerald-500/60 text-sm">Deploying audit cryptographic proof to Mantle Sepolia</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6 flex items-start gap-4">
        <AlertCircle className="w-6 h-6 text-red-400 mt-1" />
        <div className="space-y-1">
          <h5 className="text-red-400 font-bold">On-chain submission failed</h5>
          <p className="text-white/60 text-sm">{error}</p>
          <p className="text-white/25 text-xs italic mt-2">Note: Your audit report is still valid. On-chain proof is an optional security step.</p>
        </div>
      </div>
    );
  }

  if (data) {
    return (
      <div className="bg-emerald-500/5 border border-emerald-500/25 rounded-xl p-6 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <CheckCircle className="w-32 h-32 text-emerald-500" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <h5 className="text-white font-bold text-lg">Audit Proof Published</h5>
              <p className="text-emerald-500/60 text-sm font-medium">Permanently recorded on Mantle Sepolia</p>
            </div>
          </div>
          <a
            href={data.explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-black font-bold text-xs rounded-lg hover:bg-emerald-400 transition-colors uppercase tracking-wider"
          >
            Explorer <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <HashRow label="Audit ID" value={data.auditId} />
          <HashRow label="TX Hash" value={data.txHash} />
          <HashRow label="Contract Hash" value={data.contractHash} />
          <HashRow label="Block Number" value={data.blockNumber} />
        </div>

        <div className="pt-2">
          <p className="text-white/40 text-xs leading-relaxed max-w-2xl italic">
            This cryptographic proof links the audited source code to the generated report. 
            Anyone with access to the original source can verify this audit was performed by MantleGuard 
            and consensus was reached on the findings.
          </p>
        </div>
      </div>
    );
  }

  return null;
};

const HashRow = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-1">
    <span className="text-[10px] text-white/25 font-bold uppercase tracking-widest">{label}</span>
    <div className="p-2 bg-black/40 rounded border border-white/5 font-mono text-[10px] text-emerald-500/80 truncate select-all" title={value}>
      {value}
    </div>
  </div>
);
