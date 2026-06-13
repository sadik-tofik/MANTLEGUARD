'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ExternalLink, ChevronRight, Activity } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { NETWORK } from '@/lib/mantle';

interface AuditLog {
  auditId: string;
  riskScore: number;
  issueCount: number;
  timestamp: number;
  txHash: string;
}

export default function RecentAuditsFeed() {
  const [audits, setAudits] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecent() {
      try {
        const res = await fetch('/api/history?limit=5');
        const data = await res.json();
        setAudits(data);
      } catch (err) {
        console.error('Failed to fetch recent audits:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchRecent();
    
    const interval = setInterval(fetchRecent, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-16 rounded-2xl bg-white/[0.03] animate-pulse border border-white/5" />
        ))}
      </div>
    );
  }

  if (audits.length === 0) {
    return (
      <div className="p-12 rounded-3xl border border-dashed border-white/10 text-center space-y-4">
        <Activity className="w-12 h-12 text-white/10 mx-auto" />
        <p className="text-white/40 font-medium">Be the first to audit a contract on Mantle.</p>
        <Link href="/audit" className="inline-block text-emerald-500 font-bold hover:underline">Start Now</Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {audits.map((audit) => (
        <div 
          key={audit.auditId}
          className="group flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-emerald-500/20 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${
              audit.riskScore >= 80 ? 'bg-red-500/10 text-red-500' :
              audit.riskScore >= 50 ? 'bg-orange-500/10 text-orange-500' :
              'bg-emerald-500/10 text-emerald-500'
            }`}>
              {audit.riskScore}
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Link 
                  href={`/audit/${audit.auditId}`}
                  className="text-sm font-bold text-white hover:text-emerald-400 transition-colors"
                >
                  {audit.auditId.slice(0, 10)}...{audit.auditId.slice(-6)}
                </Link>
              </div>
              <div className="text-[10px] text-white/30 font-medium uppercase tracking-wider flex items-center gap-2">
                <span>{audit.issueCount} Issues Found</span>
                <span>•</span>
                <span>{formatDistanceToNow(new Date(audit.timestamp * 1000))} ago</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Link 
              href={`${NETWORK.blockExplorers.default.url}/tx/${audit.txHash}`}
              target="_blank"
              className="p-2 rounded-lg bg-white/5 text-white/20 hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
            <Link href={`/audit/${audit.auditId}`} className="p-2 rounded-lg bg-white/5 text-white/20 hover:text-emerald-500 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ))}
      
      <Link 
        href="/history" 
        className="block w-full py-4 text-center text-xs font-black uppercase tracking-[0.2em] text-white/20 hover:text-white transition-colors"
      >
        View All Audits
      </Link>
    </div>
  );
}
