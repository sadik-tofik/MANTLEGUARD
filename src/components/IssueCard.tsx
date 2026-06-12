'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Zap, Shield } from 'lucide-react';
import { Issue } from '@/types';
import { SeverityBadge } from './SeverityBadge';

interface IssueCardProps {
  issue: Issue;
}

export const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
  const [isOpen, setIsOpen] = useState(issue.severity === 'critical' || issue.severity === 'high');

  return (
    <div className={`overflow-hidden rounded-xl border transition-all duration-300 ${
      isOpen ? 'bg-white/5 border-white/20' : 'bg-white/[0.02] border-white/10 hover:border-white/20'
    }`}>
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-4">
          <SeverityBadge severity={issue.severity} />
          <div>
            <h4 className="text-white font-medium text-sm md:text-base leading-tight">
              {issue.title}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-white/40 uppercase tracking-wider font-semibold">
                {issue.category}
              </span>
              {issue.line && (
                <span className="text-xs text-white/25">
                  Line {issue.line}
                </span>
              )}
              {issue.mantleSpecific && (
                <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-1.5 py-0.5 rounded border border-emerald-500/20 font-bold uppercase tracking-tighter">
                  Mantle
                </span>
              )}
            </div>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-white/40" />
        ) : (
          <ChevronDown className="w-5 h-5 text-white/40" />
        )}
      </button>

      {/* Content */}
      {isOpen && (
        <div className="p-4 pt-0 space-y-4">
          <div className="p-3 bg-black/40 rounded-lg border border-white/5">
            <p className="text-white/70 text-sm leading-relaxed">
              {issue.description}
            </p>
          </div>

          {issue.codeSnippet && (
            <div className="space-y-2">
              <span className="text-xs font-mono text-white/40">Vulnerable Code:</span>
              <pre className="p-3 bg-[#0a0a0a] rounded-lg border border-white/5 font-mono text-xs overflow-x-auto text-white/60">
                <code>{issue.codeSnippet}</code>
              </pre>
            </div>
          )}

          <div className="p-4 bg-emerald-500/5 rounded-lg border border-emerald-500/10 flex gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <Zap className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Recommendation:</span>
              <p className="text-white/80 text-sm italic">
                {issue.recommendation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
