'use client';

import React from 'react';
import { Severity } from '@/types';

interface SeverityBadgeProps {
  severity: Severity;
}

const severityConfig = {
  critical: {
    label: 'Critical',
    className: 'bg-red-500/15 text-red-400 border-red-500/30',
  },
  high: {
    label: 'High',
    className: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  },
  medium: {
    label: 'Medium',
    className: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  },
  low: {
    label: 'Low',
    className: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  },
  info: {
    label: 'Info',
    className: 'bg-slate-500/15 text-slate-400 border-slate-500/30',
  },
};

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({ severity }) => {
  const config = severityConfig[severity] || severityConfig.info;

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${config.className}`}>
      {config.label}
    </span>
  );
};
