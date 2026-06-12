'use client';

import React from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';

interface AnalysisProgressProps {
  step: number;
}

const STEPS = [
  { id: 1, label: 'Parsing contract structure' },
  { id: 2, label: 'Running security analysis' },
  { id: 3, label: 'Checking gas optimizations' },
  { id: 4, label: 'Applying Mantle-specific checks' },
  { id: 5, label: 'Generating report' },
];

export const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ step }) => {
  return (
    <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
      <div className="flex flex-col items-center mb-8">
        <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
        <h3 className="text-xl font-bold text-white">Analyzing your contract...</h3>
        <p className="text-white/40 text-sm mt-2 text-center">
          Our AI security engine is scanning your code for vulnerabilities on Mantle.
        </p>
      </div>

      <div className="space-y-4">
        {STEPS.map((s) => {
          const isDone = step > s.id;
          const isActive = step === s.id;
          const isPending = step < s.id;

          return (
            <div key={s.id} className="flex items-center gap-4">
              <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                {isDone ? (
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                ) : isActive ? (
                  <Loader2 className="w-5 h-5 text-emerald-500 animate-spin" />
                ) : (
                  <div className="w-1.5 h-1.5 bg-white/20 rounded-full" />
                )}
              </div>
              <span
                className={`text-sm font-medium transition-colors duration-300 ${
                  isActive ? 'text-white' : isDone ? 'text-white/40 line-through' : 'text-white/20'
                }`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
