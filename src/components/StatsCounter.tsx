'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface StatsCounterProps {
  value: string;
  label: string;
  sublabel?: string;
  suffix?: string;
  prefix?: string;
}

export default function StatsCounter({ value, label, sublabel, suffix = '', prefix = '' }: StatsCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  // Extract number from value string (e.g., "10" from "< 10s")
  const targetValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = targetValue / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= targetValue) {
          setCount(targetValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, targetValue]);

  return (
    <div ref={ref} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm flex flex-col items-center text-center space-y-2 hover:bg-white/[0.04] transition-all group">
      <div className="text-4xl md:text-5xl font-black tracking-tighter text-white">
        {prefix}{count}{suffix}
      </div>
      <div className="text-base font-bold text-emerald-500">{label}</div>
      {sublabel && <div className="text-xs text-white/30 font-medium">{sublabel}</div>}
      
      {/* Decorative glow */}
      <div className="absolute inset-0 bg-emerald-500/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
}
