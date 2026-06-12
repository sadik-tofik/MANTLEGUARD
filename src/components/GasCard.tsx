'use client';

import React, { useState } from 'react';
import { Flame, ChevronDown, ChevronUp } from 'lucide-react';
import { GasOptimization } from '@/types';

interface GasCardProps {
  opt: GasOptimization;
}

export const GasCard: React.FC<GasCardProps> = ({ opt }) => {
  const [isOpen, setIsOpen] = useState(false);

  const priorityColors = {
    high: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    medium: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
    low: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  };

  return (
    <div className={`overflow-hidden rounded-xl border transition-all duration-300 ${
      isOpen ? 'bg-white/5 border-white/20' : 'bg-white/[0.02] border-white/10 hover:border-white/20'
    }`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
            <Flame className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <h4 className="text-white font-medium text-sm md:text-base leading-tight">
              {opt.title}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-[10px] font-bold uppercase tracking-tighter px-1.5 py-0.5 rounded border ${priorityColors[opt.priority]}`}>
                {opt.priority} Priority
              </span>
              <span className="text-xs text-white/40">
                {opt.estimatedSavings} estimated savings
              </span>
            </div>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-white/40" />
        ) : (
          <ChevronDown className="w-5 h-5 text-white/40" />
        )}
      </button>

      {isOpen && (
        <div className="p-4 pt-0 space-y-4">
          <p className="text-white/60 text-sm leading-relaxed p-3 bg-black/40 rounded-lg border border-white/5">
            {opt.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {opt.before && (
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-red-400/60 font-bold px-2 py-0.5 bg-red-500/5 rounded border border-red-500/10">Before</span>
                <pre className="p-3 bg-red-500/[0.02] rounded-lg border border-red-500/10 font-mono text-[10px] text-red-200/40 overflow-x-auto">
                  <code>{opt.before}</code>
                </pre>
              </div>
            )}
            {opt.after && (
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-emerald-400/60 font-bold px-2 py-0.5 bg-emerald-500/5 rounded border border-emerald-500/10">After</span>
                <pre className="p-3 bg-emerald-500/[0.02] rounded-lg border border-emerald-500/10 font-mono text-[10px] text-emerald-200/60 overflow-x-auto">
                  <code>{opt.after}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
