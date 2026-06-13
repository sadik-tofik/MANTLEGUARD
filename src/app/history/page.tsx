'use client';

import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, AlertTriangle, ChevronDown, RefreshCw } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuditHistoryTable from '@/components/AuditHistoryTable';
import { AuditHistoryItem } from '@/types';

export default function HistoryPage() {
  const [audits, setAudits] = useState<AuditHistoryItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchHistory = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const res = await fetch('/api/history?limit=100');
      const data = await res.json();
      setAudits(data);
      const total = res.headers.get('x-total-count');
      if (total) setTotalCount(parseInt(total));
    } catch (err) {
      console.error('Failed to fetch history:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const stats = {
    totalVulnerabilities: audits.reduce((acc, curr) => acc + curr.issueCount, 0),
    totalCritical: audits.reduce((acc, curr) => acc + curr.criticalCount, 0),
    avgRiskScore: audits.length > 0 
      ? Math.round(audits.reduce((acc, curr) => acc + curr.riskScore, 0) / audits.length) 
      : 0
  };

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white pt-20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
              Audit <span className="text-emerald-500">History</span>
            </h1>
            <p className="text-white/40 text-lg max-w-2xl font-medium">
              Every audit published on Mantle Sepolia — permanently recorded and publicly verifiable.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Total Audits</span>
              <span className="text-2xl font-black text-white">{totalCount}</span>
            </div>
            <button 
              onClick={() => fetchHistory(true)}
              className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/10 transition-colors"
            >
              <RefreshCw className={`w-6 h-6 text-emerald-500 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <StatSummaryCard 
            icon={<ShieldCheck className="text-emerald-500" />} 
            label="Avg Risk Score" 
            value={`${stats.avgRiskScore}/100`} 
          />
          <StatSummaryCard 
            icon={<Activity className="text-blue-500" />} 
            label="Vulnerabilities Found" 
            value={stats.totalVulnerabilities.toString()} 
          />
          <StatSummaryCard 
            icon={<AlertTriangle className="text-red-500" />} 
            label="Critical Issues" 
            value={stats.totalCritical.toString()} 
          />
        </div>

        <div className="bg-white/[0.01] border border-white/5 rounded-[32px] p-2 md:p-4 shadow-2xl">
          <AuditHistoryTable audits={audits} loading={loading} />
        </div>
      </div>

      <Footer />
    </main>
  );
}

function StatSummaryCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm flex items-center gap-6">
      <div className="p-4 rounded-2xl bg-white/5">
        {React.cloneElement(icon as React.ReactElement, { className: 'w-8 h-8' })}
      </div>
      <div>
        <div className="text-[10px] text-white/20 font-black uppercase tracking-[0.2em]">{label}</div>
        <div className="text-3xl font-black text-white leading-none mt-1">{value}</div>
      </div>
    </div>
  );
}
