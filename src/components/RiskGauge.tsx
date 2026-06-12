'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface RiskGaugeProps {
  score: number;
  size?: 'sm' | 'lg';
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({ score, size = 'lg' }) => {
  const isLg = size === 'lg';
  const radius = isLg ? 80 : 40;
  const stroke = isLg ? 12 : 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s <= 20) return '#22c55e'; // Safe
    if (s <= 40) return '#84cc16'; // Low
    if (s <= 60) return '#eab308'; // Medium
    if (s <= 80) return '#f97316'; // High
    return '#ef4444'; // Critical
  };

  const getLabel = (s: number) => {
    if (s <= 20) return 'Safe';
    if (s <= 40) return 'Low Risk';
    if (s <= 60) return 'Medium Risk';
    if (s <= 80) return 'High Risk';
    return 'Critical';
  };

  const activeColor = getColor(score);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: radius * 2, height: radius }}>
        <svg
          height={radius}
          width={radius * 2}
          viewBox={`0 0 ${radius * 2} ${radius}`}
          className="transform rotate-0"
        >
          {/* Background Arc */}
          <path
            d={`M ${stroke},${radius} A ${normalizedRadius},${normalizedRadius} 0 0 1 ${radius * 2 - stroke},${radius}`}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={stroke}
            strokeLinecap="round"
          />
          {/* Progress Arc */}
          <motion.path
            d={`M ${stroke},${radius} A ${normalizedRadius},${normalizedRadius} 0 0 1 ${radius * 2 - stroke},${radius}`}
            fill="none"
            stroke={activeColor}
            strokeWidth={stroke}
            strokeLinecap="round"
            initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>

        {/* Score Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
          <span className={`font-bold ${isLg ? 'text-4xl' : 'text-xl'} text-white`}>
            {score}
          </span>
        </div>
      </div>
      
      <span className="mt-2 text-sm font-medium" style={{ color: activeColor }}>
        {getLabel(score)}
      </span>
    </div>
  );
};
