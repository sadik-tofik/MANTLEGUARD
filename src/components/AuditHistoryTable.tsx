'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, ChevronRight, Copy, ShieldAlert, ShieldCheck, Activity } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { NETWORK } from '@/lib/mantle';
import { AuditHistoryItem } from '@/types';

interface AuditHistoryTableProps {
  audits: AuditHistoryItem[];
  loading?: boolean;
}

export default function AuditHistoryTable({ audits, loading }: AuditHistoryTableProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (loading && audits.length === 0) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-20 rounded-2xl bg-white/[0.03] animate-pulse border border-white/5" />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-3">
        <thead>
          <tr className="text-left">
            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Audit ID</th>
            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 text-center">Risk</th>
            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Issues</th>
            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Submitter</th>
            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Time</th>
            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {audits.map((audit) => (
            <tr key={audit.auditId} className="group bg-white/[0.02] hover:bg-white/[0.05] transition-colors border border-white/5">
              <td className="px-6 py-5 rounded-l-2xl border-y border-l border-white/5 group-hover:border-emerald-500/20 transition-colors">
                <div className="flex items-center gap-3">
                  {audit.auditId ? (
                    <>
                      <Link
                        href={`/audit/${audit.auditId}`}
                        className="text-sm font-mono text-white/80 hover:text-emerald-400 transition-colors"
                      >
                        {audit.auditId.slice(0, 10)}...{audit.auditId.slice(-8)}
                      </Link>
                      <button
                        onClick={() => copyToClipboard(audit.auditId)}
                        className="text-white/10 hover:text-white transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </>
                  ) : (
                    <span className="text-sm font-mono text-white/40">N/A</span>
                  )}
                </div>
              </td>
              <td className="px-6 py-5 border-y border-white/5 group-hover:border-emerald-500/20 transition-colors text-center">
                <div className={`inline-flex px-2 py-1 rounded text-xs font-bold ${
                  audit.riskScore >= 80 ? 'bg-red-500/10 text-red-500' :
                  audit.riskScore >= 50 ? 'bg-orange-500/10 text-orange-500' :
                  'bg-emerald-500/10 text-emerald-500'
                }`}>
                  {audit.riskScore}
                </div>
              </td>
              <td className="px-6 py-5 border-y border-white/5 group-hover:border-emerald-500/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-xs text-white/60">
                    <Activity className="w-3 h-3" />
                    {audit.issueCount}
                  </div>
                  {audit.criticalCount > 0 && (
                    <div className="flex items-center gap-1 text-xs text-red-500 font-bold">
                      <ShieldAlert className="w-3 h-3" />
                      {audit.criticalCount}
                    </div>
                  )}
                </div>
              </td>
              <td className="px-6 py-5 border-y border-white/5 group-hover:border-emerald-500/20 transition-colors">
                <Link 
                  href={`${NETWORK.blockExplorers.default.url}/address/${audit.submitter}`}
                  target="_blank"
                  className="text-xs font-mono text-white/40 hover:text-white transition-colors"
                >
                  {audit.submitter.slice(0, 6)}...{audit.submitter.slice(-4)}
                </Link>
              </td>
              <td className="px-6 py-5 border-y border-white/5 group-hover:border-emerald-500/20 transition-colors">
                <span className="text-xs text-white/40">
                  {formatDistanceToNow(new Date(audit.timestamp * 1000))} ago
                </span>
              </td>
              <td className="px-6 py-5 rounded-r-2xl border-y border-r border-white/5 group-hover:border-emerald-500/20 transition-colors text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link 
                    href={`${NETWORK.blockExplorers.default.url}/tx/${audit.txHash}`}
                    target="_blank"
                    className="p-2 rounded-lg bg-white/5 text-white/20 hover:text-white transition-colors"
                    title="View on Explorer"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  {audit.auditId ? (
                    <Link
                      href={`/audit/${audit.auditId}`}
                      className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 transition-all font-bold text-xs flex items-center gap-1"
                    >
                      View <ChevronRight className="w-3 h-3" />
                    </Link>
                  ) : (
                    <button className="p-2 rounded-lg bg-white/5 text-white/20 cursor-not-allowed text-xs">View</button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
