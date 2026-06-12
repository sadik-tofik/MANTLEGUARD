'use client';

import React, { useState } from 'react';
import { 
  Download, 
  Send, 
  Shield, 
  Flame, 
  Zap, 
  ChevronRight,
  TrendingDown,
  FileCode,
  Layout
} from 'lucide-react';
import { AuditReport, Issue, GasOptimization, MantleInsight } from '@/types';
import { RiskGauge } from './RiskGauge';
import { IssueCard } from './IssueCard';
import { GasCard } from './GasCard';
import { OnChainProof } from './OnChainProof';

interface AuditReportViewProps {
  report: AuditReport;
  sourceCode: string;
}

export const AuditReportView: React.FC<AuditReportViewProps> = ({ report, sourceCode }) => {
  const [activeTab, setActiveTab] = useState<'issues' | 'gas' | 'mantle'>('issues');
  const [onChainData, setOnChainData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | undefined>();

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mantleguard-${report.contractName.toLowerCase()}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePublishOnChain = async () => {
    setIsSubmitting(true);
    setSubmitError(undefined);
    try {
      const res = await fetch('/api/submit-onchain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceCode, report }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setOnChainData(data);
    } catch (err: any) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Report Header */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
        <RiskGauge score={report.riskScore} />
        
        <div className="flex-1 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                <FileCode className="w-8 h-8 text-emerald-500" />
                {report.contractName}
              </h2>
              <p className="text-white/40 text-sm mt-1 flex items-center gap-2">
                <Layout className="w-4 h-4" />
                Audited at {new Date(report.generatedAt).toLocaleString()}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleExportJson}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/80 text-sm font-medium transition-all"
              >
                <Download className="w-4 h-4" /> Export JSON
              </button>
              
              {!onChainData && (
                <button
                  onClick={handlePublishOnChain}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed border border-emerald-400/50 rounded-lg text-black font-bold text-sm transition-all shadow-lg shadow-emerald-500/20"
                >
                  <Send className={`w-4 h-4 ${isSubmitting ? 'animate-pulse' : ''}`} />
                  {isSubmitting ? 'Writing...' : 'Publish On-Chain'}
                </button>
              )}
            </div>
          </div>

          <div className="p-4 bg-black/40 rounded-xl border border-white/5">
            <p className="text-white/60 text-sm leading-relaxed">
              {report.overallSummary}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <StatPill label="Critical" count={report.stats.critical} color="text-red-400" bgColor="bg-red-500/10" />
            <StatPill label="High" count={report.stats.high} color="text-orange-400" bgColor="bg-orange-500/10" />
            <StatPill label="Medium" count={report.stats.medium} color="text-yellow-400" bgColor="bg-yellow-500/10" />
            <StatPill label="Low" count={report.stats.low} color="text-blue-400" bgColor="bg-blue-500/10" />
            <div className="h-6 w-px bg-white/10 mx-2 self-center" />
            <StatPill label="LOC" count={report.stats.linesOfCode} color="text-white/40" bgColor="bg-white/5" />
          </div>
        </div>
      </div>

      {/* On-Chain Proof Display */}
      {(onChainData || isSubmitting || submitError) && (
        <OnChainProof data={onChainData} loading={isSubmitting} error={submitError} />
      )}

      {/* Tab Navigation */}
      <div className="flex border-b border-white/10 p-1 gap-1 bg-white/5 rounded-xl self-start">
        <TabButton 
          active={activeTab === 'issues'} 
          onClick={() => setActiveTab('issues')}
          icon={<Shield className="w-4 h-4" />}
          label="Security Issues"
          count={report.stats.totalIssues}
        />
        <TabButton 
          active={activeTab === 'gas'} 
          onClick={() => setActiveTab('gas')}
          icon={<Flame className="w-4 h-4" />}
          label="Gas Optimization"
          count={report.stats.gasOptCount}
        />
        <TabButton 
          active={activeTab === 'mantle'} 
          onClick={() => setActiveTab('mantle')}
          icon={<Zap className="w-4 h-4" />}
          label="Mantle Insights"
          count={report.mantleInsights.length}
        />
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'issues' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-500">
            {report.issues.length > 0 ? (
              report.issues.map((issue) => (
                <IssueCard key={issue.id} issue={issue} />
              ))
            ) : (
              <EmptyState title="No security issues found" description="Your contract follows best security practices on Mantle." emoji="✅" />
            )}
          </div>
        )}

        {activeTab === 'gas' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-500">
            {report.gasOptimizations.length > 0 ? (
              report.gasOptimizations.map((opt) => (
                <GasCard key={opt.id} opt={opt} />
              ))
            ) : (
              <EmptyState title="Gas usage looks optimal" description="We couldn't find any significant gas saving opportunities." emoji="⚡" />
            )}
          </div>
        )}

        {activeTab === 'mantle' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-left-4 duration-500">
            {report.mantleInsights.length > 0 ? (
              report.mantleInsights.map((insight) => (
                <MantleInsightCard key={insight.id} insight={insight} />
              ))
            ) : (
              <div className="col-span-2">
                <EmptyState title="No Mantle-specific notes" description="Your contract is well-integrated with the Mantle ecosystem." emoji="🟢" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const StatPill = ({ label, count, color, bgColor }: { label: string; count: number; color: string; bgColor: string }) => (
  <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${bgColor} border border-white/5`}>
    <span className={`text-[10px] font-bold uppercase tracking-wider ${color}`}>{label}</span>
    <span className="text-white text-sm font-bold">{count}</span>
  </div>
);

const TabButton = ({ active, onClick, icon, label, count }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string; count: number }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 ${
      active ? 'bg-white/10 text-white shadow-xl' : 'text-white/40 hover:text-white/60 hover:bg-white/[0.03]'
    }`}
  >
    {icon}
    <span className="text-sm font-bold tracking-tight">{label}</span>
    {count > 0 && (
      <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${active ? 'bg-emerald-500 text-black' : 'bg-white/10 text-white/40'}`}>
        {count}
      </span>
    )}
  </button>
);

const EmptyState = ({ title, description, emoji }: { title: string; description: string; emoji: string }) => (
  <div className="flex flex-col items-center justify-center p-12 bg-white/[0.02] border border-white/10 border-dashed rounded-3xl text-center">
    <span className="text-4xl mb-4">{emoji}</span>
    <h4 className="text-white font-bold text-lg">{title}</h4>
    <p className="text-white/40 text-sm max-w-xs mx-auto mt-2">{description}</p>
  </div>
);

const MantleInsightCard = ({ insight }: { insight: MantleInsight }) => {
  const typeStyles = {
    opportunity: 'bg-emerald-500/5 border-emerald-500/10 text-emerald-400',
    warning: 'bg-yellow-500/5 border-yellow-500/10 text-yellow-400',
    info: 'bg-blue-500/5 border-blue-500/10 text-blue-400',
  };

  return (
    <div className={`p-5 rounded-2xl border ${typeStyles[insight.type]} space-y-4 hover:scale-[1.02] transition-transform duration-300`}>
      <div className="flex items-center justify-between">
        <h5 className="font-bold text-base text-white">{insight.title}</h5>
        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${typeStyles[insight.type]}`}>
          {insight.type}
        </span>
      </div>
      <p className="text-white/60 text-sm leading-relaxed italic">
        {insight.description}
      </p>
      <div className="pt-2">
        <div className="flex items-center gap-2 text-emerald-500 mb-1">
          <Zap className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Opportunity Fix:</span>
        </div>
        <p className="text-white text-sm font-medium">
          {insight.recommendation}
        </p>
      </div>
    </div>
  );
};
