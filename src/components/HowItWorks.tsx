import React from 'react';
import { Code2, Brain, ShieldCheck, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    number: "01",
    title: "Paste Your Contract",
    body: "Paste any Solidity contract into the editor. No wallet connection or login required to start.",
    icon: <Code2 className="w-6 h-6" />
  },
  {
    number: "02",
    title: "AI Analyzes Everything",
    body: "Llama 3.3 70B scans for vulnerabilities, gas waste, and ecosystem-specific integration flaws.",
    icon: <Brain className="w-6 h-6" />
  },
  {
    number: "03",
    title: "Get Proof On-Chain",
    body: "Publish your audit fingerprint to Mantle Sepolia. Share the audit ID for permanent verification.",
    icon: <ShieldCheck className="w-6 h-6" />
  }
];

export default function HowItWorks() {
  return (
    <div className="relative">
      {/* Connecting lines - desktop only */}
      <div className="hidden md:block absolute top-[60px] left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent z-0" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10">
        {STEPS.map((step, i) => (
          <div key={i} className="flex flex-col items-center text-center space-y-6">
            <div className="relative group">
              <div className="absolute -inset-4 bg-emerald-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-20 h-20 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-emerald-500 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-all duration-500">
                {step.icon}
              </div>
              <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-black border border-white/10 flex items-center justify-center text-emerald-500 text-xs font-black">
                {step.number}
              </div>
            </div>
            
            <div className="space-y-3 px-4">
              <h4 className="text-xl font-bold text-white tracking-tight">{step.title}</h4>
              <p className="text-white/40 text-sm leading-relaxed max-w-[280px] mx-auto">
                {step.body}
              </p>
            </div>
            
            {i < STEPS.length - 1 && (
              <div className="md:hidden">
                <ArrowRight className="w-6 h-6 text-white/10 rotate-90" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
