import React from 'react';
import { ShieldCheck, Link as LinkIcon, Zap, CheckCircle2 } from 'lucide-react';

const FEATURES = [
  {
    title: "Deep AI Analysis",
    icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />,
    body: "Llama 3.3 70B trained on millions of secure & insecure contract patterns. Identifies complex logic flaws that static tools miss.",
    list: ["Critical vulnerability detection", "Exact line number locations", "Fix recommendation snippets"]
  },
  {
    title: "Blockchain Verified",
    icon: <LinkIcon className="w-8 h-8 text-emerald-500" />,
    body: "Every audit generates a cryptographic hash of the source and report, recorded immutably on Mantle Network. Publicly queryable.",
    list: ["Unmodifiable audit history", "Tamper-proof source hashes", "Mantle Explorer integration"]
  },
  {
    title: "Built for Mantle",
    icon: <Zap className="w-8 h-8 text-emerald-500" />,
    body: "Native support for Mantle-specific patterns. Optimized for high-throughput, low-latency verification on the Mantle ecosystem.",
    list: ["mETH & USDY integration checks", "L2-specific gas optimizations", "Ecosystem security insights"]
  }
];

export default function FeatureCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {FEATURES.map((feature, i) => (
        <div key={i} className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 transition-all duration-300">
          <div className="mb-6 p-3 w-fit rounded-2xl bg-emerald-500/10 border border-emerald-500/20 group-hover:scale-110 transition-transform">
            {feature.icon}
          </div>
          <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{feature.title}</h3>
          <p className="text-white/50 text-sm leading-relaxed mb-6">
            {feature.body}
          </p>
          <ul className="space-y-3">
            {feature.list.map((item, j) => (
              <li key={j} className="flex items-center gap-2 text-[13px] text-white/70 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500/60" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
